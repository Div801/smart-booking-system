import mongoose from "mongoose";

const { Schema } = mongoose;

const StaffSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialties: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

StaffSchema.index({ userId: 1 });

export default mongoose.model("Staff", StaffSchema);
