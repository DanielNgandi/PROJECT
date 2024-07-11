

//Budget.jsx
import React, { useState } from 'react';
import { Stack, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {BudgetCard} from '../components/BudgetCard/budgetCard';
import '../pages/Budget.css'
import AddBudgetModal from '../components/addBudget/addBudgetmodal';
import { useBudgets } from '../context/BudgetContex';
 import AddExpenseModal from '../components/addExpense/addExpensemodal';
 //import TotalBudgetCard from '../components/uncategorizedBudget/uncategorizedBudgetCard';
 //import UncategorizedBudgetCard from '../components/uncategorizedBudget/uncategorizedBudgetCard';


const Budget= () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [AddExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const {budgets,  getBudgetExpenses } = useBudgets();
   console.log(budgets)
  
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
    <div className="budget-page">
    <Container>
      <Stack direction="horizontal" gap="2" className="mb-4">

        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal (true)}>Add Budget</Button>
        <Button variant="secondary" onClick={() => openAddExpenseModal (true)}>Add Expenses</Button>
      </Stack> 
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem", alignItems:"flex-start",
        }}>
      {/* {budgets.map(budget => (
         <BudgetCard 
         key={budget.key}
         name={budget.name}
         amount={budget.amount}
         max={budget.max}
         ></BudgetCard>
      ))}
    */}
    
    
   {/* {
    mybudget.map((budget)=>{
      const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
      return (
     <BudgetCard key={budget.id} 
     name={budget.name.name}  
     max={budget.name.max}
     amount={amount}
     onAddExpenseClick = {() =>openAddExpenseModal(budget.id)}
     />
      ) 
  })
   } */}

     {
    budgets.map((budget)=>{
      const amount = getBudgetExpenses(budget.id).reduce((total, expenses) => total + expenses.amount, 0);
      return (
     <BudgetCard key={budget.id} 
     name={budget.name} 
     amount={amount} 
     max={budget.max}
     onAddExpenseClick = {() =>openAddExpenseModal(budget.id)}
     />
      )
  })
   }
       {/* <UncategorizedBudgetCard /> */}
    

   </div>
    </Container> 
    <AddBudgetModal 
    show={showAddBudgetModal} 
    handleClose= {() => setShowAddBudgetModal(false)} 
      />

<AddExpenseModal 
show={showAddExpenseModal} 
defaultBudgetId={AddExpenseModalBudgetId}
handleClose= {() => setShowAddExpenseModal(false)}
 />
    </div>
  )
}; 

export default Budget;

