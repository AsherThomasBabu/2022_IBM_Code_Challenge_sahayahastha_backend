import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: true },
});

export default mongoose.model('OTP', OTPSchema);
