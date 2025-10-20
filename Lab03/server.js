// LAb03
const connect = require('connect');
const url = require('url');
const app = connect();

// Calculate function
function calculate(req, res) {
  const query = url.parse(req.url, true).query;
  const method = query.method;
  const x = parseFloat(query.x);
  const y = parseFloat(query.y);
  let result;
  let symbol;

  if (isNaN(x) || isNaN(y)) {
    res.end('Error: Both x and y must be numbers.');
    return;
  }

  switch (method) {
    case 'add':
      result = x + y;
      symbol = '+';
      break;
    case 'subtract':
      result = x - y;
      symbol = '-';
      break;
    case 'multiply':
      result = x * y;
      symbol = '*';
      break;
    case 'divide':
      if (y === 0) {
        res.end('Error: Cannot divide by zero.');
        return;
      }
      result = x / y;
      symbol = '/';
      break;
    default:
      res.end('Error: Invalid method. Use add, subtract, multiply, or divide.');
      return;
  }

  res.end(`${x} ${symbol} ${y} = ${result}`);
}

// Set up route
app.use('/lab3', calculate);

// Listen on port 3000
app.listen(3000);

console.log('Server running at http://localhost:3000/lab3');
