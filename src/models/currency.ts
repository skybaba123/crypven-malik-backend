import { Schema, model } from "mongoose";

const currencySchema = new Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, trim: true },
  symbol: { type: String, required: true, trim: true },
  rate: { type: Number, required: true },
});

const Currency = model("Currency", currencySchema);

export default Currency;
