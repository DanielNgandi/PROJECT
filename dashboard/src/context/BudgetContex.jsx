import React, { useContext,createContext} from "react";
import {v4 as uuidv4} from 'uuid';
import useLocalStorage from "../Hook/storage";

const BudgetContext = createContext();

export const UNCOTEGORISED_BUDGET_ID = "Uncategorized"

export  function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetsProvider = ({children}) => {
   const [budgets, setBudgets]= useLocalStorage("budgets",[]);
   const  [expenses, setExpenses] =useLocalStorage("expenses",[]);
   
console.log(expenses)
   function getBudgetExpenses(budgetId){
     return expenses.filter(expenses => expenses.budgetId === budgetId); 
   }
   function addExpense ({description, amount, budgetId}){
    setExpenses(prevExpenses => {
       
        return [...prevExpenses, {id: uuidv4(), description, amount, budgetId}]
     })

   }
   function addBudget ({ name, max }){
     setBudgets(prevBudgets => {
        if (prevBudgets.find(budget => budget.name === name)){
          return prevBudgets ;
        }
        return [...prevBudgets, {id: uuidv4(), name, max}]
     });
   }
   console.log(addBudget)
   function deleteBudget (id){
     setBudgets(prevBudgets => {
        return prevBudgets.filter(budget => budget.id !== id)
     });
   }
   function deleteExpense(id){
    setExpenses(prevExpenses => {
        return prevExpenses.filter( expenses=> expenses.id !== id)
     });
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