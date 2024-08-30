import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { apiClient } from '../services/apiClient'; // Adjust path based on your folder structure

// Define types for the Budget object and the form state
interface Budget {
  id: number;
  userId: number;
  category: string;
  limit: number;
}

interface FormState {
  id: number | null;
  category: string;
  limit: string; // Use string to easily manage input field values
}

const BudgetsList: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [form, setForm] = useState<FormState>({ id: null, category: '', limit: '' });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const userId = 1; // Example: Replace with dynamic user ID if available from context/auth

  // Fetch budgets when the component mounts
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await apiClient.get<Budget[]>(`/budgets/${userId}`);
      setBudgets(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      handleError(error, 'Error fetching budgets');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const budgetData = { ...form, limit: parseFloat(form.limit), userId };

    try {
      if (isEditMode && form.id) {
        await apiClient.put(`/budgets/${form.id}`, budgetData);
        setSuccessMessage('Budget updated successfully');
      } else {
        await apiClient.post('/budgets', budgetData);
        setSuccessMessage('Budget created successfully');
      }
      fetchBudgets();
      resetForm();
    } catch (error) {
      handleError(error, isEditMode ? 'Error updating budget' : 'Error creating budget');
    }
  };

  const handleEdit = (budget: Budget) => {
    setForm({ id: budget.id, category: budget.category, limit: budget.limit.toString() });
    setIsEditMode(true);
    setSuccessMessage(null); // Clear success message on edit
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/budgets/${id}`);
      setSuccessMessage('Budget deleted successfully');
      fetchBudgets();
    } catch (error) {
      handleError(error, 'Error deleting budget');
    }
  };

  const resetForm = () => {
    setForm({ id: null, category: '', limit: '' });
    setIsEditMode(false);
    setSuccessMessage(null); // Clear success message on reset
  };

  const handleError = (error: unknown, defaultMessage: string) => {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError(defaultMessage);
    }
    setSuccessMessage(null); // Clear any success message when an error occurs
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Budgets</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="limit"
            placeholder="Limit"
            value={form.limit}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {isEditMode ? 'Update Budget' : 'Create Budget'}
        </button>
        {isEditMode && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-4 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <ul className="list-disc pl-6">
        {budgets.map((budget) => (
          <li key={budget.id} className="mb-2 flex justify-between items-center">
            <span>{budget.category} - ${budget.limit.toFixed(2)}</span>
            <div>
              <button
                onClick={() => handleEdit(budget)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-300 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(budget.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetsList;
