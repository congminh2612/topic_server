import User from "../model/User.js";

const getAllUser = async (req, res) => {
  const users = await User.find();
  return res.status(200).send(users);
};

export { getAllUser };
