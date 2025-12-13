import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import User from "./models/User.js";
import Staff from "./models/Staff.js";
import Service from "./models/Service.js";
import Appointment from "./models/Appointment.js";
import QueueToken from "./models/QueueToken.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api", indexRoutes);

app.get("/testmodels", async (req, res, next) => {
  try {
    const uniqueSuffix = Date.now();

    const customer = await User.create({
      name: `Test Customer ${uniqueSuffix}`,
      email: `customer+${uniqueSuffix}@example.com`,
      passwordHash: "test-hash",
      role: "customer",
    });

    const staffUser = await User.create({
      name: `Test Staff ${uniqueSuffix}`,
      email: `staff+${uniqueSuffix}@example.com`,
      passwordHash: "test-hash",
      role: "staff",
    });

    const staff = await Staff.create({
      userId: staffUser._id,
      specialties: [],
      availability: true,
    });

    const service = await Service.create({
      name: `Test Service ${uniqueSuffix}`,
      durationMinutes: 30,
      price: 50,
      staffAllowed: [staff._id],
    });

    const appointment = await Appointment.create({
      customerId: customer._id,
      staffId: staff._id,
      serviceId: service._id,
      date: new Date().toISOString(),
      startTime: "10:00",
      endTime: "10:30",
      status: "scheduled",
    });

    const queueToken = await QueueToken.create({
      tokenNumber: Math.floor(Math.random() * 9000) + 1000,
      staffId: staff._id,
      customerId: customer._id,
      status: "waiting",
      estimatedWaitMinutes: 15,
    });

    res.json({
      customer,
      staffUser,
      staff,
      service,
      appointment,
      queueToken,
    });
  } catch (err) {
    next(err);
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Smart Queue Backend Running 🚀' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
