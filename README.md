# Expense Tracker and Budget Management System

## Overview

This is a full-stack Expense Tracker and Budget Management System. It allows users to manage their expenses, set budgets, and generate financial reports. The application is built using React, TypeScript, Node.js, and PostgreSQL, with responsive design using Tailwind CSS.

## Features

- **Dashboard:** View total expenses, remaining budget, and a summary of expenses by category.
- **Expense Manager:** Add, edit, and delete expenses, with a form for expense details.
- **Budgets:** Manage budgets for different categories.
- **Reports:** Generate monthly and yearly financial reports.
- **Authentication:** User registration and login functionality.
- **Responsive Design:** Optimized for both desktop and mobile views.

## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Recharts (for data visualization)
  - Axios (for HTTP requests)

- **Backend:**
  - Node.js
  - TypeScript
  - PostgreSQL

- **Authentication:**
  - JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js (>=14.x)
- PostgreSQL
- Yarn or npm

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/suaib92/expense-tracker.git
   cd expense-tracker
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add your PostgreSQL connection string and other environment variables:

   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/expense_tracker
   JWT_SECRET=your_jwt_secret
   ```

4. **Run database migrations:**

   ```bash
   yarn migrate
   # or
   npm run migrate
   ```

5. **Start the backend server:**

   ```bash
   yarn start
   # or
   npm start
   ```

6. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   yarn install
   # or
   npm install
   ```

7. **Start the frontend development server:**

   ```bash
   yarn dev
   # or
   npm run dev
   ```

8. **Visit the application in your browser:**

   Open `http://localhost:3000` to view the application.

## API Endpoints

- **Authentication:**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Log in and receive a JWT

- **Expenses:**
  - `GET /api/expenses/:userId` - Retrieve expenses for a user
  - `POST /api/expenses` - Create a new expense
  - `PUT /api/expenses/:id` - Update an existing expense
  - `DELETE /api/expenses/:id` - Delete an expense

- **Budgets:**
  - `GET /api/budgets/:userId` - Retrieve budgets for a user
  - `POST /api/budgets` - Create a new budget
  - `PUT /api/budgets/:id` - Update an existing budget
  - `DELETE /api/budgets/:id` - Delete a budget

- **Reports:**
  - `GET /api/reports/:type` - Generate a report (monthly or yearly)

## Folder Structure

- `frontend/`: Contains the React frontend application
  - `src/components/`: React components
  - `src/pages/`: Page components
  - `src/services/`: API client and services
  - `src/App.tsx`: Main application component
- `backend/`: Contains the Node.js backend application
  - `src/controllers/`: Route handlers
  - `src/models/`: Database models
  - `src/routes/`: API routes
  - `src/services/`: Business logic and services
  - `src/index.ts`: Server entry point

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [suaib8211@gmail.com](mailto:suaib8211@gmail.com).

