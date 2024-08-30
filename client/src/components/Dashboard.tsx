import React, { useEffect, useState } from 'react';
import { apiClient } from '../services/apiClient';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'; // Import Recharts components

interface Budget {
  id: number;
  userId: number;
  category: string;
  limit: number;
}

interface Expense {
  id: string;
  userId: string;
  category: string;
  amount: number;
  description?: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);

  useEffect(() => {
    fetchBudgetsAndExpenses();
  }, []);

  const fetchBudgetsAndExpenses = async () => {
    try {
      const userId = 1; // Replace with dynamic user ID if available from context/auth
      const budgetResponse = await apiClient.get<Budget[]>(`/budgets/${userId}`);
      const expenseResponse = await apiClient.get<Expense[]>(`/expenses/${userId}`);

      setBudgets(budgetResponse.data);
      setExpenses(expenseResponse.data);
      calculateTotals(budgetResponse.data, expenseResponse.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const calculateTotals = (budgets: Budget[], expenses: Expense[]) => {
    const totalExpenseAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalBudgetAmount = budgets.reduce((sum, budget) => sum + budget.limit, 0);
    const remaining = totalBudgetAmount - totalExpenseAmount;

    setTotalExpenses(totalExpenseAmount);
    setRemainingBudget(remaining);
  };

  // Prepare data for the pie chart
  const pieChartData = budgets.map((budget) => {
    const categoryExpenses = expenses
      .filter((expense) => expense.category === budget.category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return { name: budget.category, value: categoryExpenses };
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Define colors for pie chart slices

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="font-semibold text-xl mb-2">Total Expenses</h2>
          <p className="text-2xl">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="font-semibold text-xl mb-2">Remaining Budget</h2>
          <p className="text-2xl">${remainingBudget.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 col-span-1 md:col-span-2">
          <h2 className="font-semibold text-xl mb-4">Categories Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {pieChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {budgets.map((budget) => {
            const categoryExpenses = expenses
              .filter((expense) => expense.category === budget.category)
              .reduce((sum, expense) => sum + expense.amount, 0);
            const remainingCategoryBudget = budget.limit - categoryExpenses;

            return (
              <div key={budget.id} className="mt-4">
                <h3 className="font-medium text-lg">{budget.category}</h3>
                <p className="text-sm text-gray-600">Total Spent: ${categoryExpenses.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Remaining Budget: ${remainingCategoryBudget.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
