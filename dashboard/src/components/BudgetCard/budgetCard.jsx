import React from 'react'
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap';

export const BudgetCard = ({ 
  name, 
  amount, 
  max, 
  gray, 
  hideButtons, 
  onAddExpenseClick,
  onViewExpensesClick}) => {
  const classNames = []
  if (amount > max) {
    classNames.push ("bg-danger", "dg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            <div className='me-2'>{name}</div>
            <div className='d-flex align-items-baseline'>
              {amount} 
             {max && (<span className='text-muted fs-6 ms-2'>/{max}</span>)} 
              </div>
        </Card.Title>
       {max && (<ProgressBar className='rounded-pill' variant= {getProgressBarVariant(amount, max)}
        min={0}
        max={max}
        now={amount}
        />
        )} 
       {!hideButtons &&( 
        <Stack direction='horizontal' 
       gap="2" className='mt-4'>
          <Button variant='outline-primary'
           className='ms-auto' onClick={onAddExpenseClick}>
            Add Expense
            </Button>
          <Button variant='outline-secondary' 
          className='ms-auto' onClick={onViewExpensesClick} >view Expenses
          </Button>
        </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

function getProgressBarVariant(amount, max){
  const ratio = amount/max 
  if (ratio < .5 ) return "primary"
  if (ratio < .75 ) return "warning"
  return "danger"
}