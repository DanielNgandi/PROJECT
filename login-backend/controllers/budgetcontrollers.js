const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const UNCATEGORIZED_BUDGET_NAME = "uncategorized";

const getBudgets = async (req, res) => {
  try {
    const userId = req.userId;
  const budgets = await prisma.budget.findMany({
    where: { userId: userId }, 
    include: { expenses: true },
  });
  res.json(budgets);
} catch (error) {
  console.error("Error fetching budget", error);
    res.status(500).json({ error: "Internal Server Error" });
}
};

const createBudget = async (req, res) => {
  
  const { name, max} = req.body;
  try {
  const userId = req.userId;
  const budget = await prisma.budget.create({
    data: { name, max, userId},
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
    const userId = req.userId;
  await prisma.expense.updateMany({
    where: { budgetId: parseInt(id), userId: userId },
    data: { budgetId: UNCATEGORIZED_BUDGET_NAME },
  });
 
  const budget = await prisma.budget.delete({
    where: { id: parseInt(id), userId: userId },
  });
  res.json(budget);
} catch (error) {
  console.error("Error deleting budget", error);
  res.status(500).json({ error: "Internal Server Error" });
}
};

module.exports = {getBudgets, createBudget, deleteBudget}