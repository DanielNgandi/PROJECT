const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const UNCATEGORIZED_BUDGET_ID = 0;

const getBudgets = async (req, res) => {
  try {
  const budgets = await prisma.budget.findMany({
    include: { expenses: true },
  });
  res.json(budgets);
} catch (error) {
  console.error("Error fetching budget", error);
    res.status(500).json({ error: "Internal Server Error" });
}
};

const createBudget = async (req, res) => {
  
  const { name, max } = req.body;
  try {
  const budget = await prisma.budget.create({
    data: { name, max },
  });
  res.json(budget);
} catch (error) {
  console.error("Error creating budget", error);
  res.status(500).json({ error: "Internal Server Error" });
}
};

const deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
  await prisma.expense.updateMany({
    where: { budgetId: parseInt(id) },
    data: { budgetId: UNCATEGORIZED_BUDGET_ID },
  });
 
  const budget = await prisma.budget.delete({
    where: { id: parseInt(id) },
  });
  res.json(budget);
} catch (error) {
  console.error("Error deleting budget", error);
  res.status(500).json({ error: "Internal Server Error" });
}
};

module.exports = {getBudgets, createBudget, deleteBudget}