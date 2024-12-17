import mongoose from "mongoose";
import { connectDB } from "./db";

connectDB();
const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Packages",
    required: true
  },
  numberOfTravelers: {
    type: Number,
    required: true
  },
  specialRequest: {
    type: String
  },
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
