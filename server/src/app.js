require('dotenv').config();
const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig.development);
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Middlewares 
app.use(express.json({
  limit: "1mb"
}));

// routes
app.get('/', (req, res) => {
  res.send('Here we should send the front end :)')
});


/*
Create new account
to do:
[ ] Hash password
[ ] Better error handling
*/
app.post('/api/v0/account', (req, res) => {
  console.log(req.body);
  let newAccount = req.body; 
  knex('Account').insert(newAccount).then((record) => {
    console.log(record);
    res.json({status: 'success'});
  }).catch((error) => {
    console.log('Error inserting new account to DB');
    console.log(error);
    res.status(400).json({
      status: 'Failed',
      message: error.message,
      error: error,
    });
  });
});

/*
Login route, it returns a jwt
*/
app.post('/api/v0/login', (req, res) => {
  console.log('/api/v0/login');
  console.log(req.body);
  knex.select().from('Account').where({email: req.body.email}).then((account) => {
    console.log('return from db');
    account = account[0]; // Get first and only record
    console.log(account);
    console.log(req.body.password);
    if (req.body.password == account.password){
      console.log('Password match responding with token!');
      const token = jwt.sign({email: account.email}, process.env.JWT_KEY,{expiresIn: process.env.JWT_EXPIRES_IN});
      res.json({
        status: 'success',
        token: token
      });
    } else {
      res.status(401).json({
        status: 'Failed',
        message: 'Auth failed',
      })
    }
  }).catch((error) => {
    console.log(error);
    res.status(400).json({
      status: 'Failed',
      message: error.message,
      error: error,
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`)
});