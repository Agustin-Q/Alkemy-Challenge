require('dotenv').config();
const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig.development);
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { checkTokenSetUser, checkAuth } = require('./middlewares/auth');
const cors = require('cors');

// Middlewares 
app.use(cors());
app.use(express.json({
  limit: "1mb"
}));
app.use(checkTokenSetUser);

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

app.post('/api/v0/account', async(req, res) => {
  try {
    console.log(req.body);
    const newAccount = await knex('Account').insert(req.body);
    return res.json({ status: 'Success' });
  } catch (error) {
    console.error('Error inserting new account to DB');
    console.log(error);
    res.status(400).json({
      status: 'Failed',
      message: error.message,
      error: error,
    });

  }
});

/*
Login route, it returns a jwt
*/
app.post('/api/v0/login', (req, res) => {
  console.log('/api/v0/login');
  console.log(req.body);
  knex.select().from('Account').where({ email: req.body.email }).then((account) => {
    console.log('return from db');
    account = account[0]; // Get first and only record
    console.log(account);
    console.log(req.body.password);
    if(!account){ // if account does not exists
      console.log('Account does not exists');
      res.status(401).json({
        status: 'Failed',
        message: 'Auth failed',
      })
      return;
    }
    if (req.body.password === account.password) { // check pass
      console.log('Password match, responding with token!');
      const token = jwt.sign({ email: account.email, account_id: account.id, name: account.name }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.json({
        status: 'Success',
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

/*
Add record to DB
*/
app.post('/api/v0/record', (req, res) => {
  console.log(req.body);
  let newRecord = req.body;
  newRecord.Account_id = req.user.account_id;
  knex('Record').insert(newRecord).then((record) => {
    console.log(record);
    res.json({ status: 'Success' });
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
Get records
Query parameters
limit: limit number of records to return, default 5.
offset: offset the records to return, default 0.
*/

app.get('/api/v0/record', (req, res) => {
  knex
    .select()
    .table('Record')
    .where('Account_id', req.user.account_id)
    .limit(req.query.limit || 5)
    .offset(req.query.offset || 0)
    .orderBy('created_at', 'desc')
    .then((records) => {
      console.log(records);
      res.json(records);
    }).catch((error) => {
      res.status(400).json({
        status: 'Failed',
        message: error.message,
        error: error,
      })
    });
});

/*
modify record to DB
*/
app.put('/api/v0/record', (req, res) => {
  console.log(req.body);
  let newRecord = req.body;
  newRecord.Account_id = req.user.account_id;
  knex('Record')
    .where({
      id: req.body.id,
      Account_id: req.user.account_id,
    })
    .update(newRecord)
    .then((record) => {
      console.log(record);
      res.json({ status: 'Success' });
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
Delete record to DB
*/
app.delete('/api/v0/record', (req, res) => {
  console.log(req.body);
  knex('Record')
    .where({
      id: req.body.id,
      Account_id: req.user.account_id,
    })
    .del()
    .then((record) => {
      console.log(record);
      res.json({ status: 'Success' });
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
Get Balance
*/
app.get('/api/v0/balance', (req, res) => {
  //get all records for user
  knex
    .select()
    .table('Record')
    .where('Account_id', req.user.account_id)
    .then((records) => {
      let balance = 0;
      records.forEach((record) => {
        if (record.type == 'Debit') {
          balance -= record.amount;
        } else {
          balance += record.amount;
        }
      });
      res.json({ balance: balance })
    }).catch((error) => {
      res.status(400).json({
        status: 'Failed',
        message: error.message,
        error: error,
      })
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`)
});
