const express = require('express');
const cors =require('cors');
const mongo = require('./connect');
const dotenv = require('dotenv');
const register = require('./Routers/registerrouter');
const books = require('./Routers/bookroutes');
//dotenv configuration
dotenv.config();

//express 
const app = express();
app.use(cors());
app.use(express.json());
//monogoDB Connection 
mongo.connect();

app.use('/register',register);

app.use('/books',books);


//listiening to the port 

app.listen(process.env.PORT);