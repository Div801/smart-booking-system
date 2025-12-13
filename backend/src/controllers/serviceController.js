import Service from "../models/Service.js";
import Staff from "../models/Staff.js";

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

const updateService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const { name, durationMinutes, price } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (durationMinutes !== undefined) updateData.durationMinutes = durationMinutes;
    if (price !== undefined) updateData.price = price;

    const service = await Service.findByIdAndUpdate(serviceId, updateData, {
      new: true,
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const deleted = await Service.findByIdAndDelete(serviceId);

    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted" });
  } catch (error) {
    next(error);
  }
};

const assignServiceToStaff = async (req, res, next) => {
  try {
    const { serviceId, staffId } = req.params;

    const service = await Service.findById(serviceId);
    const staff = await Staff.findById(staffId);

    if (!service || !staff) {
      return res.status(404).json({ message: "Service or Staff not found" });
    }

    if (!service.staffAllowed.includes(staffId)) {
      service.staffAllowed.push(staffId);
    }

    if (!staff.specialties.includes(serviceId)) {
      staff.specialties.push(serviceId);
    }

    await Promise.all([service.save(), staff.save()]);

    const updatedService = await Service.findById(serviceId).populate("staffAllowed");

    res.json(updatedService);
  } catch (error) {
    next(error);
  }
};

export {
  createService,
  getServices,
  updateService,
  deleteService,
  assignServiceToStaff,
};
