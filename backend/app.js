
//MONGODB PW: bC6a2n2mSy3NGYqv //
//MONGODB CONNECTION: mongodb+srv://voislav21:<password>@cluster0.b6e5igi.mongodb.net/?retryWrites=true&w=majority //

// Import express and mongoose //
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import the routes //
const userRoutes = require('./routes/user');

const app = express();

// Connect to database //
mongoose.connect('mongodb+srv://voislav21:bC6a2n2mSy3NGYqv@cluster0.b6e5igi.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected successfully to mongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to mongoDB Atlas!');
        console.error(error);
    });

app.use(express.json());

// Avoid CORS errors by allowing access //
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// Register the routers within express app, where the requests and response are sent and received //
app.use('/api/auth', userRoutes);

module.exports = app;