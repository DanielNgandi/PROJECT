//Budget.jsx
import React, { useState } from 'react';
import { Stack, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {BudgetCard} from '../components/BudgetCard/budgetCard';
import '../pages/Budget.css'
import AddBudgetModal from '../components/addBudget/addBudgetmodal';
import { UNCATEGORIZED_BUDGET_NAME, useBudgets } from '../context/BudgetContex';
import AddExpenseModal from '../components/addExpense/addExpensemodal';
import TotalBudgetCard from '../components/Total/TotalBudget';
import UncategorizedBudgetCard from '../components/uncategorizedBudget/uncategorizedBudgetCard';
import ViewExpensesModal from '../components/addExpense/viewExpensesmodal';
import { useLocation, useNavigate } from 'react-router-dom';
import {useUser} from "../context/logincontex"

const Budget= () => {
  const location = useLocation();
  const username = location.state?.username || 'User';
  const navigate = useNavigate();
  const { logout } = useUser(); 

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [AddExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const {budgets,  getBudgetExpenses } = useBudgets();
   console.log(budgets)
  
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId)
  }
  function handleDeleteBudget(id) {
    deleteBudget({ id });
  }
  function handleLogout() {
    logout();
    navigate('/signin');
  }
  function convertToCSV(array) {
    const header = Object.keys(array[0]).join(',');
    const rows = array.map(obj => Object.values(obj).join(','));
    return [header, ...rows].join('\n');
  }

  function downloadCSV(content, fileName) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleDownloadExpense() {
    if (expense.length === 0) {
      alert('No expense to download.');
      return;
    }
    const csvContent = convertToCSV(expense);
    downloadCSV(csvContent, 'expenses.csv');
  }

  return (
    <div className="budget-page">
    <Container>
    <header className="header">
    <h2>Welcome, {username}!</h2>
    </header>
    <div className='budget'>
    <p>This is my budget application</p>
    </div>
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h3 className="me-auto">Budgets</h3>
        <Button variant="primary" onClick={() => setShowAddBudgetModal (true)}>Add Budget</Button>
        <Button variant="secondary" onClick={() => openAddExpenseModal (UNCATEGORIZED_BUDGET_NAME)}>Add Expenses</Button>
      </Stack> 
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
      <Button variant="info" onClick={handleDownloadExpense}>Download Expenses</Button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem", alignItems:"flex-start",
        }}
        >
    
     {
    budgets.map((budget)=>{
      const amount = getBudgetExpenses(budget.id).reduce((total, expenses) => total + expenses.amount, 0);
      return (
     <BudgetCard 
     key={budget.id} 
     name={budget.name} 
     amount={amount} 
     max={budget.max}
     onAddExpenseClick = {() =>openAddExpenseModal(budget.id)}
     onViewExpensesClick = {() =>setViewExpensesModalBudgetId(budget.id)}
     onDeleteClick={() => handleDeleteBudget(budget.id)} 

     />
      )
  })
   }
  <UncategorizedBudgetCard onAddExpenseClick = 
  {openAddExpenseModal}  onViewExpensesClick = {()=> setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_NAME)}/>
    
  <TotalBudgetCard />
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

 <ViewExpensesModal
budgetId={viewExpensesModalBudgetId}
handleClose= {() => setViewExpensesModalBudgetId()}
/> 
    </div>
  )
}; 
  
export default Budget;

