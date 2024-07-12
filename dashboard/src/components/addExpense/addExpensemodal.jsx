import React from 'react'
import {Form, Modal, Button } from 'react-bootstrap'
import { useRef } from 'react'
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from '../../context/BudgetContex'

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()

  const {budgets,addExpense} = useBudgets()
 

  function handleSubmit(e) {
    e.preventDefault()
    addExpense(
    {
        budgetId: budgetIdRef.current.value,
        description: descriptionRef.current.value, 
        amount: parseFloat(amountRef.current.value),
        
  })
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>description</Form.Label>
            <Form.Control ref={descriptionRef} type='text' required />
          </Form.Group>
          <Form.Group className='mb-3' controlId='amount'>
            <Form.Label>amount</Form.Label>
            <Form.Control ref={amountRef} type='number' required min={0} step={10.0} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='budgetId'>
            <Form.Label>budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                <option id= {UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                {budgets.map(budget =>(
                    <option key = {budget.id} value ={budget.id}>{budget.name}</option>
                ))}
                </Form.Select>
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant="primary" type="submit" >
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}