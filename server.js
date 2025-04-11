import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const hashedPassword = await bcrypt.hash('Madhu@123', 10);
    await Admin.create({ username: 'Madhu', password: hashedPassword });

    console.log('✅ Admin user created!');
    process.exit(); // exit after success
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1); // exit with failure
  }
};

createAdmin();
