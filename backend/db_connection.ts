const Pool = require('pg').Pool
const conn = new Pool({
  user: 'docker',
  host: 'node-db',
  database: 'ratatouille',
  password: '12345',
  port: 5432,
})
export {conn};