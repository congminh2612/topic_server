import User from "../model/User.js";
import CryptoJS from "crypto-js";
import { generateAccessToken } from "../services/jwtService.js";

const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    isAdmin: req.body.isAdmin,
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Wrong password or email");
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password)
      return res.status(401).json("Wrong password or email");

    const accessToken = generateAccessToken(user);
    const { password, ...info } = user._doc;
    return res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { register, login };
