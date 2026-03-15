import Mongoose from "mongoose";

const { Schema } = Mongoose;

const serviceSchema = new Schema({
  salonid: {
    type: Schema.Types.ObjectId,
    ref: "Salon",
  },
  title: String,
  category: String,
  price: Number,
});

export const Service = Mongoose.model("Service", serviceSchema);
