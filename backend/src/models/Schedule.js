import mongoose from "mongoose";

const { Schema } = mongoose;

const ScheduleSchema = new Schema(
  {
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    dayOfWeek: { type: Number, required: true },
    startTime: String,
    endTime: String,
  },
  { timestamps: true }
);

ScheduleSchema.index({ staffId: 1 });

export default mongoose.model("Schedule", ScheduleSchema);
