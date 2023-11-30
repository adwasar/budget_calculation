import { useEffect, useState } from 'react';
import { getSnapshot } from 'mobx-state-tree';

import LoginMessage from '../components/LoginMessage';
import { isLogin, recordsHistory, coefficient } from '../storage';

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
  const [date, setDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dataInvalid, setDataInvalid] = useState(false);
  const [currency, setCurrency] = useState('UAH');
  // const [coefficient, setCoefficient] = useState(1);

  useEffect(() => {
    if (currency !== 'UAH') {
      fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .then((response) => response.json())
        .then((data) => {
          const usdInfo = data.find((currencyApi) => currencyApi.cc === currency).rate;
          coefficient.setValue(usdInfo);
        })
        .catch((error) => {
          console.error('Ошибка при получении данных о курсах валют', error);
        });
    } else {
      coefficient.setValue(1);
    }
  }, [currency]);

  const handleExpenseChange = (event, expenseType) => {
    const value = parseFloat(event.target.value) || 0;
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [expenseType]: -1 * Math.abs(value),
    }));
  };

  const handleIncomeChange = (event, incomeType) => {
    const value = parseFloat(event.target.value) || 0;

    const validInputRegex = /^(\d+\.?\d*|\.\d*)$/;

    if (validInputRegex.test(value)) {
      setIncome((prevIncome) => ({
        ...prevIncome,
        [incomeType]: value,
      }));
    }
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSelectChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (date) {
      setIsSubmitted(true);
      recordsHistory.addRecord(
        date,
        calculateTotal({ ...income, ...expenses }) * coefficient.value,
      );
      resetState();
    } else {
      setDataInvalid(true);
      setIsSubmitted(false);
    }
  };

  const calculateTotal = (values) => {
    return Object.values(values).reduce((total, value) => total + value, 0);
  };

  const resetState = () => {
    setExpenses({
      rent: 0,
      products: 0,
      otherExpenses: 0,
    });
    setIncome({
      salary: 0,
      otherIncome: 0,
    });
    setDate('');
    setDataInvalid(false);
  };

  useEffect(() => console.log(currency, coefficient));

  return (
    <>
      <div className="container">
        <div>
          {getSnapshot(isLogin).state ? (
            <>
              <div className="s-60"></div>
              <form>
                <h2>Date</h2>
                <input type="month" onChange={handleDateChange} value={date} />
                <div className="c-red">{dataInvalid ? 'Enter date please' : ''}</div>
                <div className="s-40"></div>

                <h2>Currency</h2>
                <select value={currency} onChange={handleSelectChange}>
                  <option value="UAH">UAH</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                <div className="s-40"></div>

                <div className="row g-5">
                  <div className="col">
                    <h2>Expenses</h2>
                    <div className="c-red">Total: {calculateTotal(expenses)}</div>
                    <div className="s-20"></div>
                    <label htmlFor="rent">Rent:</label>
                    <div className="s-0"></div>
                    <input
                      id="rent"
                      type="number"
                      placeholder="0"
                      value={expenses.rent}
                      onChange={(e) => handleExpenseChange(e, 'rent')}
                    />
                    <div className="s-0"></div>
                    <label htmlFor="products">Products:</label>
                    <div className="s-0"></div>
                    <input
                      id="products"
                      type="number"
                      placeholder="0"
                      value={expenses.products}
                      onChange={(e) => handleExpenseChange(e, 'products')}
                    />
                    <div className="s-0"></div>
                    <label htmlFor="other-expenses">Other:</label>
                    <div className="s-0"></div>
                    <input
                      id="other-expenses"
                      type="number"
                      value={expenses.otherExpenses}
                      placeholder="0"
                      onChange={(e) => handleExpenseChange(e, 'otherExpenses')}
                    />
                  </div>

                  <div className="col">
                    <h2>Income</h2>
                    <div className="c-green">Total: {calculateTotal(income)}</div>
                    <div className="s-20"></div>
                    <label htmlFor="salary">Salary: </label>
                    <div className="s-0"></div>
                    <input
                      id="salary"
                      type="text"
                      value={income.salary}
                      placeholder="0"
                      onChange={(e) => handleIncomeChange(e, 'salary')}
                    />
                    <div className="s-0"></div>
                    <label htmlFor="other-income">Other: </label>
                    <div className="s-0"></div>
                    <input
                      id="otherIncome"
                      type="text"
                      value={income.otherIncome}
                      placeholder="0"
                      onChange={(e) => handleIncomeChange(e, 'otherIncome')}
                    />
                  </div>
                </div>
                <div className="s-40"></div>
                <h2>Balance</h2>
                <div
                  className={calculateTotal({ ...income, ...expenses }) >= 0 ? 'c-green' : 'c-red'}
                >
                  Total: {calculateTotal({ ...income, ...expenses })}
                </div>
                <div className="s-40"></div>
                <button onClick={handleSubmit} className="button">
                  Confirm
                </button>
                <div className="s-10"></div>
                <div className="c-green">{isSubmitted ? 'Was submitted' : ''}</div>
              </form>
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
