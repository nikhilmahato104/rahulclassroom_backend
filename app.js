import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

import indexRouter from './routes/index.js';
import adminRouter from './routes/admin.js';
import class8Router from './routes/class8.js';
import class9Router from './routes/class9.js';
import class10Router from './routes/class10.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("Database connected!");
})
.catch((err) => {
    console.error("Database connection error:", err);
});

const app = express();
app.use(cors()); // ⬅️ This allows frontend (e.g., localhost:5173) to access backend

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // REQUIRED for reading JSON body from AJAX


app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/class8', class8Router);
app.use('/class9', class9Router);
app.use('/class10', class10Router);

const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});