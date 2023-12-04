import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: String,
    description: String,
    date: String,
    time: String,
    secondDate: String,
    telefon: String,
    isChecked: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);


const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
