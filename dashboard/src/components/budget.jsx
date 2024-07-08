// src/components/Budget.jsx
import React, { useState } from 'react';
import { Stack, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {BudgetCard} from '../layout/budgetCard';
import '../components/Budget.css';
import AddBudgetModal from './addBudgetmodal';
import { useBudgets } from '../context/BudgetContex';

const Budget = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] =useState(false) 
  const {budgets, getBudgetExpenses} = useBudgets();
  return (
    <>
    <div className="budget-page">
    <Container>
      <Stack direction="horizontal" gap="2" className="mb-4">

        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal (true)}>Add Budget</Button>
        <Button variant="secondary">Add Expenses</Button>
      </Stack> 
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem", alignItems:"flex-start",
        }}>
      
      {/* {budgets.map(budget => (
            // const amount = getBudgetExpenses(budget.id).reduce(
            //   (total, expense) => total + expense.amount,
            //   0
            // );
            // return (
              // <BudgetCard
              //   key={budget.id}
              //   name={budget.name}
              //   amount={budget.amount}
              //   max={budget.max}
              // />
            // );
          ))} */}
      </div>
    </Container> 
    <AddBudgetModal show={showAddBudgetModal} handleClose= {() => setShowAddBudgetModal(false)} />
    </div>
    </>
  );
}; 

export default Budget;
