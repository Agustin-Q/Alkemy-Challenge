require('dotenv').config();

  module.exports = {
    production: {
      client: 'pg',
      version: '7.2',
      connection: process.env.DATABASE_URL,
      migrations:{
        directory: './db/migrations',
      }
    },    
    development: {
      client: 'pg',
      version: '7.2',
      connection: {
        host : process.env.POSTGRES_HOST,
        port : process.env.POSTGRES_PORT,
        user : process.env.POSTGRES_USER,
        password : process.env.POSTGRES_PASSWORD,
        database : process.env.POSTGRES_DB
      },
      migrations:{
        directory: './db/migrations',
      }
    }
  };  
