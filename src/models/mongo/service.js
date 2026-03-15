import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trackSchema = new Schema({
  salonid: {
    type: Schema.Types.ObjectId,
    ref: "Salon",
  },
  title: String,
  category: String,
});

export const Track = Mongoose.model("Service", serviceSchema);
