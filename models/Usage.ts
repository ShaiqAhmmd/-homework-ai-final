import mongoose, { Schema, models } from 'mongoose'

const UsageSchema = new Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  count: { type: Number, default: 0 },
})

UsageSchema.index({ userId: 1, date: 1 }, { unique: true })

export default models.Usage || mongoose.model('Usage', UsageSchema)