const { Client } = require('pg');

const getConnection = async () => {

  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'my_store',
  });

  await client.connect();
  return client;

}


module.exports = getConnection;
