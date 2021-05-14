import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    date: Date,
    sport: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

EventSchema.virtual("thumbnail_url").get(function () {
  return this.thumbnail;
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
