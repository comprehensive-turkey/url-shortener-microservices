import mongoose, { Schema } from "mongoose";

interface IShortId extends Document {
  originalUrl: string;
  shortId: string;
}

const schema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    unique: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
});

const ShortId = mongoose.model<IShortId>("ShortId", schema);

export default ShortId;
