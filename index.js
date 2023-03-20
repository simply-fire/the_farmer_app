const path = require('path');
const express = reqire('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');



//load ev varibales
dotenv.config({ path: './config/config.env' })


// connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());