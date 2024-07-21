const express = require('express');
const { getExpenses, createExpense,deleteExpense,} = require('../controllers/expensecontroller');
const authenticateToken = require('../middleware/authmiddleware')
const router = express.Router();

router.get('/',authenticateToken, getExpenses);
router.post('/',authenticateToken, createExpense);
router.delete('/:id',authenticateToken, deleteExpense);

module.exports = router;
