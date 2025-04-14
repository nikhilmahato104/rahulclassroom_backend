// import express from 'express';
// import mongoose from 'mongoose';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import session from 'express-session';

// import indexRouter from './routes/index.js';
// import adminRouter from './routes/admin.js';
// import class8Router from './routes/class8.js';
// import class9Router from './routes/class9.js';
// import class10Router from './routes/class10.js';
// import class11artsRouter from './routes/class11arts.js';


// dotenv.config();

// // ----------------------
// // MongoDB Connection
// // ----------------------
// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("Database connected!");
// })
// .catch((err) => {
//   console.error("Database connection error:", err);
// });

// // ----------------------
// // App Setup
// // ----------------------
// const app = express();
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // ----------------------
// // Session Setup (✅ Moved BEFORE routes)
// // ----------------------
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'fallbackSecret',
//   resave: false,
//   saveUninitialized: false,
// }));

// // ----------------------
// // View Engine
// // ----------------------
// app.set('view engine', 'ejs');
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.set('views', path.join(__dirname, 'views'));

// // ----------------------
// // Routes
// // ----------------------
// app.use('/', indexRouter);
// app.use('/admin', adminRouter);
// app.use('/class8', class8Router);
// app.use('/class9', class9Router);
// app.use('/class10', class10Router);
// app.use('/class11arts', class11artsRouter);
// // ----------------------
// // Start Server
// // ----------------------
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });





// import express from 'express';
// import mongoose from 'mongoose';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import session from 'express-session';

// import indexRouter from './routes/index.js';
// import adminRouter from './routes/admin.js';
// import class8Router from './routes/class8.js';
// import class9Router from './routes/class9.js';
// import class10Router from './routes/class10.js';
// import class11artsRouter from './routes/class11arts.js';
// import mcqTestRouter from './routes/mcqTest.js'; // ✅ Added MCQ Test Router
// import studentRouter from './routes/student.js'; 
// dotenv.config();

// // ----------------------
// // MongoDB Connection
// // ----------------------
// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("Database connected!");
// })
// .catch((err) => {
//   console.error("Database connection error:", err);
// });

// // ----------------------
// // App Setup
// // ----------------------
// const app = express();
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // ----------------------
// // Session Setup
// // ----------------------
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'fallbackSecret',
//   resave: false,
//   saveUninitialized: false,
// }));

// // ----------------------
// // View Engine
// // ----------------------
// app.set('view engine', 'ejs');
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.set('views', path.join(__dirname, 'views'));

// // ----------------------
// // Routes
// // ----------------------
// app.use('/', indexRouter);
// app.use('/admin', adminRouter);
// app.use('/class8', class8Router);
// app.use('/class9', class9Router);
// app.use('/class10', class10Router);
// app.use('/class11arts', class11artsRouter);
// app.use('/mcqTest', mcqTestRouter); // ✅ Mounted MCQ Test Router
// app.use('/student', studentRouter);
// // ----------------------
// // Start Server
// // ----------------------
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });





//view result




import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';

// Import Routers
import indexRouter from './routes/index.js';
import adminRouter from './routes/admin.js';
import class8Router from './routes/class8.js';
import class9Router from './routes/class9.js';
import class10Router from './routes/class10.js';
import class11artsRouter from './routes/class11arts.js';
import mcqTestRouter from './routes/mcqTest.js';
import studentRouter from './routes/student.js';
import viewResultRouter from './routes/viewResult.js';

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallbackSecret',
  resave: false,
  saveUninitialized: false,
}));

app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/class8', class8Router);
app.use('/class9', class9Router);
app.use('/class10', class10Router);
app.use('/class11arts', class11artsRouter);
app.use('/mcqTest', mcqTestRouter);
app.use('/student', studentRouter);
app.use('/viewresult', viewResultRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
