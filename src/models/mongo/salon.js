import Mongoose from "mongoose";

const { Schema } = Mongoose;

const salonSchema = new Schema({
  name: String,
  area: String,
  address: String,
  specialties: String,
  rating: Number,
  notes: String,
  latitude: Number,
  longitude: Number,
  image: String,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Salon = Mongoose.model("Salon", salonSchema);
