import mongoose from "mongoose";

const { Schema } = mongoose;

const ServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    price: { type: Number, required: true },
    staffAllowed: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);
