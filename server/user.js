'use strict';
const express = require('express');
const utils = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');

const _filter = {pwd: 0, __v: 0};

Router.get('/list', async (req, res) => {
  const {type} = req.query;
  const doc = await User.find({type});
  return res.json({code: 0, data: doc});
})

Router.post('/update', async (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return json.dumps({code: 1});
  }
    const body = req.body;
    const doc = await User.findByIdAndUpdate(userId, body);
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body);
    return res.json({code: 0, data});
});

Router.post('/login', async (req, res) => {
  const {user, pwd} = req.body;
  const existingUser = await User.findOne({user, pwd: md5Pwd(pwd)}, _filter);
  if (!existingUser) {
    return res.json({code: 1, msg: 'Username or password is wrong!'})
  }
  res.cookie('userId', existingUser._id);
  return res.json({code: 0, data: existingUser});
});

Router.post('/register', async (req, res) => {
  console.log(req.body);
  const {user, pwd, type} = req.body;
  const doc = await User.findOne({user});
  if (doc) {
    return res.json({code: 1, msg: 'Username exists'});
  }
  try {
    const existingUser = await new User({user, pwd: md5Pwd(pwd), type}).save();
    {
      const {user, type, _id} = existingUser;
      res.cookie('userId', _id);
      return res.json({code: 0, data: {user, type, _id}});
    }
  } catch (err) {
    console.log(err);
    return res.json({code: 1, msg:'Server error'});
  }
});

Router.get('/info', async (req, res) => {
  const {userId} = req.cookies;
  if (!userId) {
    return res.json({code: 1});
  }
  try {
    const existingUser = await User.findOne({_id: userId}, _filter);
    if (existingUser) {
      return res.json({code: 0, data: existingUser});
    }
  } catch (err) {
    console.log(err);
    return res.json({code: 1, msg: 'Server error.'});
  }
});

const md5Pwd = pwd => {
  const salt = 'sldkfjas;ldfjkoweihtr3290rul.23opr';
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;