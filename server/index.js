const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const userModel = require('./models/databaseModel');
const authRoutes = require('./routes/auth');

mongoose
  .connect("mongodb://127.0.0.1:27017/merndatabase", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database is connected');
    app.listen(5000 || 5000, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Server is running in',  5000);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/', authRoutes);

module.exports = app;
