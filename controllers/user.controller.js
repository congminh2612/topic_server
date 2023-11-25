import Topic from "../model/Topic.js";
import User from "../model/User.js";

const getAllUser = async (req, res) => {
  const users = await User.find();
  return res.status(200).send(users);
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json("User not found");
    }
    const deleteUser = await User.deleteOne({ _id: user._id });
    res.status(200).json("Delete Successfully");
  } catch (error) {}
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      res.status(404).json("User not found");
    }
    const updateUser = await User.updateOne({ _id: id }, updateData);
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
const subscribeTopic = async (req, res) => {
  const { userId, topicId } = req.query;

  try {
    const user = await User.findById(userId);
    const topic = await Topic.findById(topicId);
    if (!user || !topic) {
      return res.status(404).json("User or Topic not found");
    }
    if (user.subscribedTopics.includes(topicId)) {
      return res.status(400).json("User already subscribed to this topic");
    }
    user.subscribedTopics.push(topicId);
    topic.subscribers.push(userId);
    await user.save();
    await topic.save();

    res.status(200).json("Successfully subscribed to the topic");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const unSubscribeTopic = async (req, res) => {
  const { userId, topicId } = req.query;
  try {
    const user = await User.findById(userId);
    const topic = await Topic.findById(topicId);

    if (!user || !topic) {
      return res.status(404).json("User or Topic not found");
    }
    if (!user.subscribedTopics.includes(topicId)) {
      return res.status(400).json("User is not subscribed to this topic");
    }
    // Lọc ra các phần tử khác với topicId trong mảng subscribedTopics của user
    user.subscribedTopics = user.subscribedTopics.filter(
      (id) => id.toString() !== topicId.toString()
    );

    // Lọc ra các phần tử khác với userId trong mảng subscribers của topic
    topic.subscribers = topic.subscribers.filter(
      (id) => id.toString() !== userId.toString()
    );
    await user.save();
    await topic.save();
    res.status(200).json("Successfully unsubscribed from the topic");
  } catch (error) {
    res.json(error);
  }
};
const getTopicByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("subscribedTopics");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const subscribedTopics = user.subscribedTopics;
    res.json(subscribedTopics);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.json(error);
  }
};

export {
  getAllUser,
  deleteUser,
  updateUser,
  subscribeTopic,
  unSubscribeTopic,
  getTopicByUser,
  getUserById,
};
