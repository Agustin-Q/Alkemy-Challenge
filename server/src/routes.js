const {newRecord, getRecord, updateRecord, deleteRecord, getBalance } = require('./services/recordService.js');
const {createAccount, login} = require('./services/accountService');

function routes(app){
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
  app.post('/api/v0/record', newRecord);

  /*
  Get records
  Query parameters
  limit: limit number of records to return, default 5.
  offset: offset the records to return, default 0.
  */

  app.get('/api/v0/record', getRecord);

  /*
  modify record to DB
  */
  app.put('/api/v0/record', updateRecord);

  /*
  Delete record to DB
  */
  app.delete('/api/v0/record', deleteRecord);

  /*
  Get Balance
  */
  app.get('/api/v0/balance', getBalance);

  return app;
}

module.exports = routes;