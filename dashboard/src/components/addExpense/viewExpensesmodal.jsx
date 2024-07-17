import React from 'react'
import { Modal, Button, Stack } from 'react-bootstrap'
import {UNCATEGORIZED_BUDGET_NAME, useBudgets} from '../../context/BudgetContex'

export default function ViewExpensesModal({ budgetId, handleClose }) {

  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
  const expenses = getBudgetExpenses(budgetId)

  const budget = UNCATEGORIZED_BUDGET_NAME === budgetId ? 
  {name: "Uncategorized", id: UNCATEGORIZED_BUDGET_NAME} 
  : budgets.find(b => b.id === budgetId)
  return (
    <>
    <Modal show={budgetId != null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap="3">
                <div>Expenses - {budget?.name}</div>
                {budgetId !== UNCATEGORIZED_BUDGET_NAME && (
                    <Button onClick={() => {
                        deleteBudget(budget)
                        handleClose();
                    }}  
                    variant='outline-danger '>Delete</Button>
                )}
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <Stack direction='vertical' gap= "3">
                {expenses.map(expense => (
                  <Stack direction='horizontal' gap="2" key={expense.id}>
                    <div className='me-auto fs-4'>{expense.description}</div>
                    <div className='fs-5'>{expense.amount}</div>
                    <Button onClick={() => deleteExpense(expense)} size='sm' variant='outline-danger'>&times;</Button>
                  </Stack>
                ))}
            </Stack>
        </Modal.Body>
    </Modal>
    </>
  )
}