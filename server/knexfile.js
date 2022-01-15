require('dotenv').config();

  module.exports = {
    production: {
      client: 'pg',
      version: '7.2',
      connection: process.env.DATABASE_URL,
      migrations:{
        directory: './db/migrations',
      }
    }
  };