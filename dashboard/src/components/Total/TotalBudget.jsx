import React from 'react'
import { BudgetCard } from '../BudgetCard/budgetCard';
import {useBudgets} from "../../context/BudgetContex";

function TotalBudgetCard() {
    const{budgets, expenses} = useBudgets()
    const amount = expenses.reduce(
        (total, expense) => total + expense.amount, 0)

    const max = budgets.reduce(
            (total, budgets) => total + budgets.max, 0)
        if (max === 0) return null
  return (
    <BudgetCard amount={amount} name="Total"gray max={max} hideButtons/>
      
  )
}

export default TotalBudgetCard
