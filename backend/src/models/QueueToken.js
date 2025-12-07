import mongoose from "mongoose";

const QueueTokenSchema = new mongoose.Schema({});

export default mongoose.model("QueueToken", QueueTokenSchema);
