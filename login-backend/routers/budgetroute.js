const express = require('express');
const {getBudgets,createBudget,deleteBudget,} = require('../controllers/budgetcontrollers');

const router = express.Router();

router.get('/', getBudgets);
router.post('/', createBudget);
router.delete('/:id', deleteBudget);
  
module.exports = router;
