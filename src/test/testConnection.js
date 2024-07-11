const connection = require('../infrastructure/database');

connection.query('SELECT 1 + 1 AS solution', (error, results) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
  connection.end();
});
