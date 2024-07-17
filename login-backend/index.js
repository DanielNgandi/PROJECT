// index.js
const express = require('express');
const cors = require('cors');
const routes = require('./routers/loginroutes');
const budgetRouter = require('./routers/budgetroute');
const expenseRouter = require('./routers/expenseroute');

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use('/budgets', budgetRouter);
app.use('/expenses', expenseRouter);

app.get('/', (req, res) => {
  res.send('Budget API');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(5500, () => {
  console.log('Server is running on port 5500');
});
