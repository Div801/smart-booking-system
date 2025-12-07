import mongoose from "mongoose";

const { Schema } = mongoose;

const QueueTokenSchema = new Schema(
  {
    tokenNumber: { type: Number, required: true },
    staffId: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
QueueTokenSchema.index({ customerId: 1 });

export default mongoose.model("QueueToken", QueueTokenSchema);
