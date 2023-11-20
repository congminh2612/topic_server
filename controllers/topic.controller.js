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

export { createTopic };
