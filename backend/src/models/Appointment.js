import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({});

export default mongoose.model("Appointment", AppointmentSchema);
