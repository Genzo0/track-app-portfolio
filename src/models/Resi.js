import mongoose, { Schema } from "mongoose";

const resiSchema = new Schema(
  {
    noResi: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    telp: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Resi = mongoose.models.Resi || mongoose.model("Resi", resiSchema);

export default Resi;
