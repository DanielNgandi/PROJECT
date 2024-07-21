

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getExpenses = async (req, res) => {
  try{
    const userId = req.userId;
  const expenses = await prisma.expense.findMany({
    where: { userId: userId },
  });
  res.json(expenses);
  }catch (error) {
    console.error("Error fetching expense", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

const createExpense = async (req, res) => {
  const { description, amount, budgetId } = req.body;
  if (!description || !amount || !budgetId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userId = req.userId;
    const expense = await prisma.expense.create({
      data: {
        description,
        amount: parseFloat(amount),
        budgetId,
        userId, 
      },
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try{
    const userId = req.userId;
  const expense = await prisma.expense.delete({
    where: { id: parseInt(id), userId: userId },
  });
  res.json(expense);
} catch (error) {
  console.error("Error deleting expense", error);
    res.status(500).json({ error: "Internal Server Error" });
}
};

module.exports = {getExpenses, createExpense, deleteExpense}