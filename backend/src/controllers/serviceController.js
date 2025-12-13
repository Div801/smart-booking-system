import Service from "../models/Service.js";

const createService = async (req, res, next) => {
  try {
    const { name, durationMinutes, price } = req.body;

    if (!name || !durationMinutes || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const service = await Service.create({
      name,
      durationMinutes,
      price,
    });

    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

const getServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    next(error);
  }
};

export { createService, getServices };
