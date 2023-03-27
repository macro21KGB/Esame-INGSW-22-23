const Pool = require('pg').Pool

const conn = new Pool({ // for docker testing
  user: 'docker',
  host: 'node-db',
  database: 'ratatouille',
  password: '12345',
  port: 5432,
})

/*
const conn = new Pool({ // for local testing
  user: 'docker',
  host: 'localhost',
  database: 'ratatouille',
  password: '12345',
  port: 42069,
})
*/

export {conn};