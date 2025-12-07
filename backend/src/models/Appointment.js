import mongoose from "mongoose";

const { Schema } = mongoose;

const AppointmentSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["scheduled", "rescheduled", "cancelled", "completed"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

AppointmentSchema.index({ customerId: 1 });
AppointmentSchema.index({ staffId: 1 });

export default mongoose.model("Appointment", AppointmentSchema);
