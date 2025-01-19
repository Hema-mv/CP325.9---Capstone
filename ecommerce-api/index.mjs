import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';


import productRoutes from './routes/productRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import users from './routes/user.mjs';

dotenv.config();
const PORT = process.env.PORT || 5050;
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', users);
// const customLogger = (tokens, req, res) => {
//   // Example: Only log requests with status code 4xx or 5xx
//   const status = tokens.status(req, res);
//   if (status >= 400) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       status,
//       tokens['response-time'](req, res), 'ms',
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['user-agent'](req, res)
//     ].join(' ');
//   }
//   //return null;
// };

// // Use morgan middleware with custom logging function
// app.use(morgan(customLogger));
app.get("/*", (req, res) => {
    res.redirect("/");
  });
  
  //Golbal errror handling
  app.use((err, _req, res, next) => {
    res.status(500).send("there was an issue on the server");
  });
  
  app.get("/", (req, res) => {
    res.send(
      "<h1>You are in Ecommerce-Api</li> <li> entries - /api/calendar</li> <li> todos - /api/todos</li> <ol>"
    );
  });

  mongoose.connect(process.env.ATLAS_URI)
   .then(() => console.log('MongoDB connected')) 
   .catch(err => console.log(err));


   app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
