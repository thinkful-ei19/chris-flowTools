const knexConfig = {
    development: {
      client: 'pg',
      connection: process.env.DATABASE_URL || '	postgres://pmpyfkhc:B0wzq840WeSgXurlQ36KuIXMKa4yvv_o@pellefant.db.elephantsql.com:5432/pmpyfkhc',
      debug: true, // http://knexjs.org/#Installation-debug
      pool: {min : 1 , max : 2}
    },
    // test: {
    //   client: 'pg',
    //   connection: process.env.TEST_DATABASE_URL || 'postgres://localhost/flowTools',
    //   pool: {min : 1 , max : 2}
    // },
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL
    }
  };

const environment = process.env.NODE_ENV || 'development';

module.exports = require('knex')(knexConfig[environment]);