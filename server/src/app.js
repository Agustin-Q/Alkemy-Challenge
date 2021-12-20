require('dotenv').config();
const express = require('express');
const app = express();
const { checkTokenSetUser, checkAuth } = require('./middlewares/auth');
const cors = require('cors');
const routes = require('./routes.js');
// Middlewares 
app.use(cors());
app.use(express.json({
  limit: "1mb"
}));
app.use(checkTokenSetUser);

// Setup static server
app.use(express.static('../client/build'));
app.get('/', function(req, res){
  res.sendFile('../client/build/static' + '/index.html');
});

// Setup routes
routes(app);

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`)
});
