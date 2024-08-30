// ExpenseManager.tsx
import React, { useEffect, useState } from 'react';
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../services/apiClient';

interface Expense {
  id: string;
  userId: string;
  category: string;
  amount: number;
  description?: string;
  date: string;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Expense, 'id'>>({
    userId: '1', // Replace with the actual userId
    category: '',
    amount: 0,
    description: '',
    date: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses(formData.userId);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError('Error fetching expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createExpense(formData);
      fetchExpenses(); // Refresh the list after creating a new expense
      setFormData({ userId: '1', category: '', amount: 0, description: '', date: '' });
    } catch (error) {
      console.error("Error creating expense:", error);
      setError('Error creating expense');
    }
  };

  const handleEditClick = (expense: Expense) => {
    setIsEditing(true);
    setEditId(expense.id);
    setFormData({
      userId: expense.userId,
      category: expense.category,
      amount: expense.amount,
      description: expense.description,
      date: expense.date,
    });
  };

  const handleUpdateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;

    try {
      await updateExpense(editId, formData);
      fetchExpenses(); // Refresh the list after updating the expense
      setIsEditing(false);
      setEditId(null);
      setFormData({ userId: '1', category: '', amount: 0, description: '', date: '' });
    } catch (error) {
      console.error("Error updating expense:", error);
      setError('Error updating expense');
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      fetchExpenses(); // Refresh the list after deleting the expense
    } catch (error) {
      console.error("Error deleting expense:", error);
      setError('Error deleting expense');
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Expense Manager</h1>

      <form
        onSubmit={isEditing ? handleUpdateExpense : handleCreateExpense}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-3 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2 border-b">Category</th>
            <th className="px-4 py-2 border-b">Amount</th>
            <th className="px-4 py-2 border-b">Description</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-t">
              <td className="px-4 py-2 border-b">{expense.category}</td>
              <td className="px-4 py-2 border-b">{expense.amount.toFixed(2)}</td>
              <td className="px-4 py-2 border-b">{expense.description || 'N/A'}</td>
              <td className="px-4 py-2 border-b">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleEditClick(expense)}
                  className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-300 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
