const {newRecord, getRecord, updateRecord, deleteRecord, getBalance } = require('./services/recordService.js');
const {createAccount, login} = require('./services/accountService');
const { checkAuth } = require('./middlewares/auth.js');
const { response } = require('express');

function routes(app){
    /*
  Check if server is running
  */
  app.get('/api/v0/status', (req, res) => {
    res.json({status: "success"});
  });
  /*
  Create new account
  */
  app.post('/api/v0/account', createAccount);

  /*
  Login route, it returns a jwt
  */
  app.post('/api/v0/login', login);

  /*
  Add record to DB
  */
  app.post('/api/v0/record', checkAuth, newRecord);

  /*
  Get records
  Query parameters
  limit: limit number of records to return, default 5.
  offset: offset the records to return, default 0.
  */

  app.get('/api/v0/record', checkAuth, getRecord);

  /*
  modify record to DB
  */
  app.put('/api/v0/record', checkAuth, updateRecord);

  /*
  Delete record to DB
  */
  app.delete('/api/v0/record', checkAuth, deleteRecord);

  /*
  Get Balance
  */
  app.get('/api/v0/balance', checkAuth, getBalance);

  return app;
}

module.exports = routes;