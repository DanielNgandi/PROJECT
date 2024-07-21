import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BudgetsProvider} from "./context/BudgetContex.jsx"
import {UserProvider} from "./context/logincontex.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <UserProvider>
    <BudgetsProvider>
       <App />
    </BudgetsProvider>
    </UserProvider>
  </React.StrictMode>,
)
