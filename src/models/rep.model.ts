import mongoose from 'mongoose';

const RepSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model('Rep', RepSchema);
