import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  roll: { type: Number, required: true },
  name: { type: String, required: true },
  fees: {
    type: Map,
    of: Boolean,
    default: {
      "jan-2025": false,
      "feb-2025": false,
      "mar-2025": false,
      "apr-2025": false,
      "may-2025": false,
      "jun-2025": false,
      "jul-2025": false,
      "aug-2025": false,
      "sep-2025": false,
      "oct-2025": false,
      "nov-2025": false,
      "dec-2025": false,
      "jan-2026": false,
      "feb-2026": false,
      "mar-2026": false,
      "apr-2026": false,
      "may-2026": false
    }
  }
});

const Student9 = mongoose.model('Student9', studentSchema);

export default Student9;
