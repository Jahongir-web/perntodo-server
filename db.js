const Pool = require('pg').Pool

const pool = new Pool({
  connectionString:'postgres://uepsqvdd:AHzTdvziVS5XyrpfK2xuMWLqTXE7X2cv@satao.db.elephantsql.com/uepsqvdd'
})

module.exports = pool