const express = require('express');
const {getBudgets,createBudget,deleteBudget,} = require('../controllers/budgetcontrollers');
const authenticateToken = require ('../middleware/authmiddleware')
const router = express.Router();

router.get('/', authenticateToken, getBudgets);
router.post('/', authenticateToken, createBudget);
router.delete('/:id', authenticateToken, deleteBudget);
  
module.exports = router;
