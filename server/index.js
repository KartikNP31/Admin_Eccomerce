import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import nodemon from 'nodemon';

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";



////data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
// import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import {dataUser, dataAffiliateStat, dataTransaction, dataProductStat, dataProduct, dataOverallStat} from "./data/userData.js"



////configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());


////routes
app.use("/client",clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);



////mongoose
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser : true,
  useUnifiedTopology:true
})
.then( async () => {
  app.listen(PORT, () => console.log(`Server Running on : http://localhost:${PORT}/`));

  ////delete and insert data;
  ////UserData
  await User.deleteMany({});
  console.log('User Data deleted Successfully');
  await User.insertMany(dataUser);
  console.log('User Data imported Successfully');

  //ProductData
  await Product.deleteMany({});
  console.log('Product Data deleted Successfully');
  await Product.insertMany(dataProduct);
  console.log('Product Data imported Successfully');

  ////ProductStatData
  await ProductStat.deleteMany({});
  console.log('ProductStat Data deleted Successfully');
  await ProductStat.insertMany(dataProductStat);
  console.log('ProductStat Data imported Successfully');

  ////TransactionData
  await Transaction.deleteMany({});
  console.log('Transaction Data deleted Successfully');
  await Transaction.insertMany(dataTransaction);
  console.log('Transaction Data imported Successfully');

  ////OverallStatData
  await OverallStat.deleteMany({});
  console.log('Overall Stats Data deleted Successfully');
  await OverallStat.insertMany(dataOverallStat);
  console.log('Overall Stats Data imported Successfully');
})
.catch((error) => console.log(`${error} Unable to connect`));