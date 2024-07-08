import React, { useState, useEffect }from 'react'
import AuthForm from './components/AuthForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Budget from './components/budget';
import { BudgetsProvider } from './context/BudgetContex';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (you can use a more secure method like checking a token)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return  (
    <Router>
      <BudgetsProvider>
      <Routes>
        <Route path="/signin" element={<AuthForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/budget" element={isAuthenticated ? <Budget /> : <Navigate to="/signin" />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
      </BudgetsProvider>
    </Router>
  );
};

export default App;