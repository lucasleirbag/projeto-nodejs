const connection = require('./infrastructure/database');

connection.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Query results:', results);
  connection.end();
});
