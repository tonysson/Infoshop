import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import connectDB from './config/db.js';
import colors from 'colors';
import productRoute from './routes/productRoute.js';
import userRoutes from './routes/userRoutes.js'
import { notFound , errorHandler} from './middleware/errorMiddleware.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';
dotenv.config();

//BD CONNECTION
connectDB();

//INITIALIZE EXPRESS
const app = express();

//send json data in body
// app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Morgan middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}


//ROUTES
app.use('/api/products' , productRoute);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal' , (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


//__dirname is not available when using ES6 MODULE , but available when using require synthax
const __dirname = path.resolve()
//access the upload folder by using static method
app.use('/uploads' , express.static(path.join(__dirname, '/uploads')))

//prepare for production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname , '/frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend' , 'build', 'index.html')))
}

//CUSTOM ERROR HANDLING MIDDLWARE
app.use(notFound)
app.use(errorHandler)


//SERVER RUNNING
const PORT = process.env.PORT || 8080;
app.listen(PORT , () => (
  console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.green.bold)
));