'use strict';
const express = require('express');
const mongoose = require('mongoose');
const DB_URL = 'mongodb://ryan:ryan@ds115446.mlab.com:15446/imooc-test';
mongoose.connect(DB_URL);
const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: String, require: true}
}));


const app = express();
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
})

app.get('/data', async (req, res) => {
  const user = await User.findOne({}, {age: 1, user: 1, _id: 0});
  res.json(user);
})
app.listen(9093);