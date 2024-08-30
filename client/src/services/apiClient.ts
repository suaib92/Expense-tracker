// apiClient.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Replace with the actual key used to store the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication
export const registerUser = async (username: string, email: string, password: string) => {
  return apiClient.post('/auth/register', { username, email, password });
};

export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  
  // Store the token after login
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token); // Store token securely
  }

  return response;
};

// Expenses
export const createExpense = async (expense: { userId: string; description: string; amount: number; date: string; category: string; }) => {
  return apiClient.post('/expenses', expense);
};

export const getExpenses = async (userId: string) => {
  return apiClient.get(`/expenses/${userId}`);
};

export const updateExpense = async (id: string, updatedExpense: { description?: string; amount?: number; date?: string; category?: string; }) => {
  return apiClient.put(`/expenses/${id}`, updatedExpense);
};

export const deleteExpense = async (id: string) => {
  return apiClient.delete(`/expenses/${id}`);
};

// Budgets
export const createBudget = async (budget: { userId: string; category: string; limit: number; }) => {
  return apiClient.post('/budgets', budget);
};

export const getBudgets = async (userId: string) => {
  return apiClient.get(`/budgets/${userId}`);
};

export const updateBudget = async (id: string, updatedBudget: { category?: string; limit?: number; }) => {
  return apiClient.put(`/budgets/${id}`, updatedBudget);
};

export const deleteBudget = async (id: string) => {
  return apiClient.delete(`/budgets/${id}`);
};
