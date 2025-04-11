import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  roll: { type: Number, required: true },
  name: { type: String, required: true },
});

const Student9 = mongoose.model('Student9', studentSchema);

export default Student9;