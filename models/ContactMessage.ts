import mongoose, { Schema, models } from 'mongoose'

const ContactMessageSchema = new Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
})

export default models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema)