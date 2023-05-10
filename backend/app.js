
//MONGODB PW: bC6a2n2mSy3NGYqv //
//MONGODB CONNECTION: mongodb+srv://voislav21:<password>@cluster0.b6e5igi.mongodb.net/?retryWrites=true&w=majority //

// Import express and mongoose //
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.use((req, res, next) => {
  console.log('Request received!');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Your request was successful!' });
  next();
});

app.use((req, res, next) => {
  console.log('Response sent successfully!');
});

module.exports = app;