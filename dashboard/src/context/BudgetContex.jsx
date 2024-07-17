import React, { useContext,createContext, useState, useEffect} from "react";
import axios from 'axios';
//import {v4 as uuidv4} from 'uuid';
//import useLocalStorage from "../Hook/storage";

const BudgetContext = createContext();

export const UNCATEGORIZED_BUDGET_NAME = "Uncategorized"

export  function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetsProvider = ({children}) => {
   const [budgets, setBudgets]= useState([]);
   const  [expenses, setExpenses] =useState([]);

   useEffect(() => {
    axios.get('http://localhost:5500/budgets').then(res => setBudgets(res.data));
    axios.get('http://localhost:5500/expenses').then(res => setExpenses(res.data));
  }, []);
console.log(expenses)
function getBudgetExpenses(budgetId){
     return expenses.filter(expenses => expenses.budgetId === budgetId); 
   }
async function addExpense({ description, amount, budgetId }) {
    try {
          let parsedBudgetId = budgetId;
      if (budgetId === UNCATEGORIZED_BUDGET_NAME) {
        
        let uncategorizedBudget = budgets.find(b => b.name === UNCATEGORIZED_BUDGET_NAME);
        if (!uncategorizedBudget) {
          const response = await axios.post('http://localhost:5500/budgets', { name: UNCATEGORIZED_BUDGET_NAME, max: 0 });
          uncategorizedBudget = response.data;
          setBudgets(prevBudgets => [...prevBudgets, uncategorizedBudget]);
        }
        parsedBudgetId = uncategorizedBudget.id;
      }

      const payload = { description, amount, budgetId: parsedBudgetId };
      console.log("Payload to send:", payload);

      const response = await axios.post('http://localhost:5500/expenses', payload);
      setExpenses(prevExpenses => [...prevExpenses, response.data]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  }
  
async function addBudget ({ name, max }){
  const response = await axios.post('http://localhost:5500/budgets', { name, max });
  setBudgets(prevBudgets => [...prevBudgets, response.data]);
}
   console.log(addBudget)

async function deleteBudget ({id}){
  try {
  await axios.delete(`http://localhost:5500/budgets/${id}`);
  setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id));
  setExpenses(prevExpenses => prevExpenses.map(expense => {
    if (expense.budgetId !== id) return expense;
    return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
  }));
} catch (error) {
  console.error("Error deleting budget:", error);
}
}

async function deleteExpense({id}){
    await axios.delete(`http://localhost:5500/expenses/${id}`);
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  }

    return (
     <BudgetContext.Provider value ={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
       {children} 
       </BudgetContext.Provider> 
    );
};