import mongoose, { Schema, models } from 'mongoose'

const ReferralSchema = new Schema({
  referrer: { type: String, required: true }, // userId of the person who shared the link
  newUser: { type: String, required: true },  // userId of the new user who signed up
  createdAt: { type: Date, default: Date.now }
});

export default models.Referral || mongoose.model('Referral', ReferralSchema);