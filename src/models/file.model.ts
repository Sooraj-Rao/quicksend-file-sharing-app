import mongoose from "mongoose";

const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    fileName: String,
    file: {
      type: Object,
    },
    code: {
      type: Number,
    },
  },
  { timestamps: true }
);

const File = mongoose.models.files || mongoose.model("files", fileSchema);

export default File;
