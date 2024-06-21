import mongoose, { Document, Model, Schema as MongooseSchema } from "mongoose";

interface IFile extends Document {
  fileName: string;
  file: string;
  code: number;
}

const fileSchema = new MongooseSchema<IFile>(
  {
    fileName: { type: String, required: true },
    file: { type: String, required: true },
    code: { type: Number, required: true },
  },
  { timestamps: true }
);

const File: Model<IFile> =
  (mongoose.models && (mongoose.models.File as Model<IFile>)) ||
  mongoose.model<IFile>("File", fileSchema);

export default File;
