import mongoose from "mongoose";

const { Schema } = mongoose;

const QueueTokenSchema = new Schema(
  {
    tokenNumber: Number,
    staffId: { type: Schema.Types.ObjectId, ref: "Staff" },
    customerId: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["waiting", "serving", "done"],
      default: "waiting",
    },
    estimatedWaitMinutes: Number,
  },
  { timestamps: true }
);

QueueTokenSchema.index({ staffId: 1 });

export default mongoose.model("QueueToken", QueueTokenSchema);
