import { getSnapshot } from 'mobx-state-tree';

import LoginMessage from '../components/LoginMessage';
import { isLogin } from '../storage';
import { useState } from 'react';

function PageBudget() {
  const [expenses, setExpenses] = useState({
    rent: 0,
    products: 0,
    otherExpenses: 0,
  });

  const [income, setIncome] = useState({
    salary: 0,
    otherIncome: 0,
  });

  const handleExpenseChange = (event, expenseType) => {
    const value = parseFloat(event.target.value) || 0;
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [expenseType]: value * -1,
    }));
  };

  const handleIncomeChange = (event, incomeType) => {
    const value = parseFloat(event.target.value) || 0;
    setIncome((prevIncome) => ({
      ...prevIncome,
      [incomeType]: value,
    }));
  };

  const calculateTotal = (values) => {
    return Object.values(values).reduce((total, value) => total + value, 0);
  };

  return (
    <>
      <div className="container">
        <div>
          {getSnapshot(isLogin).state ? (
            <>
              <div className="s-60"></div>
              <div className="row g-5">
                <div className="col">
                  <h2>Expenses</h2>
                  <div>Total: {calculateTotal(expenses)}</div>
                  <div className="s-20"></div>
                  <label htmlFor="rent">Rent:</label>
                  <div className="s-0"></div>
                  <input
                    id="rent"
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleExpenseChange(e, 'rent')}
                  />
                  <div className="s-0"></div>
                  <label htmlFor="products">Products:</label>
                  <div className="s-0"></div>
                  <input
                    id="products"
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleExpenseChange(e, 'products')}
                  />
                  <div className="s-0"></div>
                  <label htmlFor="other-expenses">Other:</label>
                  <div className="s-0"></div>
                  <input
                    id="other-expenses"
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleExpenseChange(e, 'otherExpenses')}
                  />
                </div>

                <div className="col">
                  <h2>Income</h2>
                  <div>Total: {calculateTotal(income)}</div>
                  <div className="s-20"></div>
                  <label htmlFor="salary">Salary: </label>
                  <div className="s-0"></div>
                  <input
                    id="salary"
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleIncomeChange(e, 'salary')}
                  />
                  <div className="s-0"></div>
                  <label htmlFor="other-income">Other: </label>
                  <div className="s-0"></div>
                  <input
                    id="otherIncome"
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleIncomeChange(e, 'otherIncome')}
                  />
                </div>
              </div>
              <div className="s-40"></div>
              <h2>Balance</h2>
              <div>Total: {calculateTotal({ ...income, ...expenses })}</div>
            </>
          ) : (
            <LoginMessage />
          )}
        </div>
      </div>
    </>
  );
}

export default PageBudget;
