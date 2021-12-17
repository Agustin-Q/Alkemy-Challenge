require('dotenv').config();
const knexConfig = require('../knexfile.js');
const express = require('express');
const app = express();
const { checkTokenSetUser, checkAuth } = require('./middlewares/auth');
const cors = require('cors');
const { createAccount, login, newRecord, getRecord, updateRecord, deleteRecord, getBalance } = require('./routes.js');

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

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`)
});
