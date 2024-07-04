// src/components/Budget.jsx
import React from 'react';
import { Container, Stack, Button } from 'react-bootstrap';

const Budget = () => {
  return (
    <Container>
      <Stack direction="horizontal" gap="2" className="nb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary">Add Budget</Button>
        <Button variant="secondary">Add Expenses</Button>
      </Stack>
    </Container>
  );
};

export default Budget;
