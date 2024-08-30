// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-lg font-semibold">Expense Tracker</Link>
        <div>
          <Link to="/expenses" className="mr-4">Expenses</Link>
          <Link to="/budgets" className="mr-4">Budgets</Link>
          <Link to="/reports" className="mr-4">Reports</Link>
          <Link to="/" className="mr-4">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
