import mongoose, { Schema, models } from 'mongoose'

const HistorySchema = new Schema({
  userId: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default models.History || mongoose.model('History', HistorySchema)