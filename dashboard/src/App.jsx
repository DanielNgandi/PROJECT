import React, { useState, useEffect }from 'react'
import AuthForm from "./components/authentication/AuthForm"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Budget from './pages/Budget';
import { BudgetsProvider } from './context/BudgetContex';
import { UserProvider} from "./context/logincontex"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (you can use a more secure method like checking a token)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setUser({ id: token });
    }
  }, [])

  return  (
    // <Budget />
    <UserProvider>
    <BudgetsProvider>
    <Router>
      
      <Routes>
        <Route path="/signin" element={<AuthForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/Budget" element={isAuthenticated ? <Budget /> : <Navigate to="/signin" />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
      
    </Router>
    </BudgetsProvider>
    </UserProvider>
  )
};

export default App;

