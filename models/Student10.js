import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  roll: { type: Number, required: true },
  name: { type: String, required: true },
});

const Student10 = mongoose.model('Student10', studentSchema);

export default Student10; // This is the crucial part