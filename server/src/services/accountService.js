const knexConfig = require('../../knexfile.js');
const knex = require('knex')(knexConfig.development);
const jwt = require('jsonwebtoken');


async function createAccount (req, res, next){
  try {
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
  knex.select().from('Account').where({ email: req.body.email }).then((account) => {
    account = account[0]; // Get first and only record
    if(!account){ // if account does not exists
      console.log('Account does not exists');
      res.status(401).json({
        status: 'Failed',
        message: 'Auth failed',
      })
      return;
    }
    if (req.body.password === account.password) { // check password
      //Password match, responding with token
      const token = jwt.sign({ email: account.email, account_id: account.id, name: account.name }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.json({
        status: 'Success',
        token: token
      });
    } else {
      //Password does not match
      res.status(401).json({
        status: 'Failed',
        message: 'Auth failed',
      })
    }
  }).catch((error) => {
    res.status(400).json({
      status: 'Failed',
      message: error.message,
      error: error,
    });
  });
}

module.exports = {
  createAccount,
  login,
}