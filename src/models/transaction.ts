import { Schema, model, Types } from "mongoose";

const transactionSchema = new Schema(
  {
    priceAmount: { type: Number, required: true },
    actuallyPaid: { type: Number },

    payoutCurrency: {
      name: { type: String, default: "Nigerian Naira" },
      code: { type: String, default: "NGN" },
      symbol: { type: String, default: "₦" },
      rate: { type: Number, required: true },
      amount: { type: Number, required: true, default: 0 },
    },

    currencyId: String,

    status: {
      type: String,
      require: true,
      default: "waiting",
      enum: ["waiting", "processing", "successful", "expired", "failed"],
    },
    paymentProof: {
      public_id: { type: String },
      secure_url: { type: String },
      width: { type: Number },
      height: { type: Number },
    },
    payoutProof: {
      public_id: { type: String },
      secure_url: { type: String },
      width: { type: Number },
      height: { type: Number },
    },
    coin: {
      label: { type: String, trim: true, required: true },
      value: { type: String, trim: true, required: true },
      iconUrl: String,
      coinId: { type: Types.ObjectId, required: true },
    },
    failedReason: { type: String, trim: true },
    ownerId: { type: Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
