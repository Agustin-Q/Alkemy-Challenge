require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    version: '7.2',
    connection: {
      host : process.env.POSTGRADE_HOST,
      port : process.env.POSTGRADE_PORT,
      user : process.env.POSTGRADE_USER,
      password : process.env.POSTGRADE_PASSWORD,
      database : process.env.POSTGRADE_DB
    },
    migrations:{
      directory: './db/migrations',
    }
  }
};  