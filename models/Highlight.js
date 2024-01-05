import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const HighlightSchema = new Schema({
  name: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  timestamps: true,
});

const Highlight = models?.Highlight || model('Highlight', HighlightSchema);
export default Highlight;