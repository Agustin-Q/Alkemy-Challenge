require('dotenv').config();
const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig.development);
const jwt = require('jsonwebtoken');


async function createAccount (req, res, next){
  try {
    console.log(req.body);
    await knex('Account').insert(req.body);
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
}

function login(req, res) {
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
}

/**
 * Adds record in database.
 * Account id is taken form JWT token in local storage 'Token' item.
 * @param {Object} newRecord- record object
 * @param {number} newRecord.amount - amount for the record.
 * @param {string} newRecord.type - Type of the record, allowed values ['Debit', 'Credit']
 * @param {date} newRecord.date - [Optional] Date of the record, if not defined will use current date.
 * @param {string} newRecord.category - [Optional] Category of the record
 * @param {string} newRecord.description - [Optional] Description for the record 
 * @returns {Object} Returns an array of records objects.
 */

function newRecord(req, res) {
  console.log(req.body);
  let newRecord = req.body;
  // Get id form req.user.account_id which is set in the middleware form the JWT token.
  newRecord.Account_id = req.user.account_id;
  // Check if date is present if not use current date
  if(!newRecord.date) newRecord.date = new Date();
  // Insert to DB
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
}

function getRecord (req, res){
  knex
    .select()
    .table('Record')
    .where('Account_id', req.user.account_id)
    .limit(req.query.limit || 10)
    .offset(req.query.offset || 0)
    .orderBy('date', 'desc')
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
}

function updateRecord(req, res) {
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
}

function deleteRecord (req, res) {
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
}

function getBalance (req, res) {
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
}

module.exports = {
  createAccount,
  login,
  newRecord,
  getRecord,
  updateRecord,
  deleteRecord,
  getBalance
}