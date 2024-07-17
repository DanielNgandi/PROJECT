import React from 'react'
import { BudgetCard } from '../BudgetCard/budgetCard';
import {UNCATEGORIZED_BUDGET_NAME, useBudgets} from "../../context/BudgetContex";

function uncategorizedBudgetCard(props) {
    const{getBudgetExpenses} = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_NAME).reduce(
        (total, expense) => total + expense.amount, 0
      )
        if (amount === 0) return null
  return (
    <BudgetCard amount={amount} name="uncategorized" gray {...props}/>
      
  )
}

export default uncategorizedBudgetCard
