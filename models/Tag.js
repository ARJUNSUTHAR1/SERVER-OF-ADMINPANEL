import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const TagSchema = new Schema({
  name: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  timestamps: true,
});

const Tag = models?.Tag || model('Tag', TagSchema);
export default Tag;