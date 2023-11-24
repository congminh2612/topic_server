import Topic from "../model/Topic.js";

const createTopic = async (req, res) => {
  const newTopic = new Topic({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  });
  try {
    const topic = await newTopic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getTopic = async (req, res) => {
  const topics = await Topic.find();
  return res.status(200).json(topics);
};
const getTopicById = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await Topic.findById(id);
    if (!topic) {
      res.status(404).json("Topic not found");
    }
    res.status(200).json(topic);
  } catch (error) {
    res.json(error);
  }
};

const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id });

    if (!topic) {
      res.status(400).json("Topic not found");
    }

    const deleteTopic = await Topic.deleteOne({ _id: topic._id });
    res.status(200).json("Delete Successfully");
  } catch (error) {}
};
const updateTopic = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const existingTopic = await Topic.findById(id);
    if (!existingTopic) {
      res.status(404).json("Topic not found");
    }

    const updateTopic = await Topic.updateOne({ _id: id }, updateData);
    res.status(201).json(updateTopic);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getUserByTopic = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await Topic.findById(id).populate("subscribers");
    if (!topic) {
      return res.status(404).json("Topic not found");
    }
    const subscribers = topic.subscribers;
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export {
  createTopic,
  getTopic,
  deleteTopic,
  updateTopic,
  getUserByTopic,
  getTopicById,
};
