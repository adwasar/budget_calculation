import { useEffect, useState } from 'react';
import { getSnapshot, onSnapshot } from 'mobx-state-tree';

import LoginMessage from '../components/LoginMessage';
import { isLogin, recordsHistory, coefficient } from '../storage';

function PageStatistics() {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [currency, setCurrency] = useState('UAH');

  useEffect(() => {
    if (currency !== 'UAH') {
      fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .then((response) => response.json())
        .then((data) => {
          const usdInfo = data.find((currencyApi) => currencyApi.cc === currency).rate;
          coefficient.setValue(usdInfo);
          setUpdateFlag((prevFlag) => !prevFlag);
        })
        .catch((error) => {
          console.error('Ошибка при получении данных о курсах валют', error);
        });
    } else {
      coefficient.setValue(1);
      setUpdateFlag((prevFlag) => !prevFlag);
    }
  }, [currency]);

  useEffect(() => {
    const disposer = onSnapshot(recordsHistory, () => {
      setUpdateFlag((prevFlag) => !prevFlag);
    });

    return () => disposer();
  }, []);

  const data = getSnapshot(recordsHistory).records;
  const totalBalance = data.reduce((acc, el) => acc + el.balance, 0);

  const handleDeleteDate = (el) => {
    recordsHistory.deleteRecord(el.date);
  };

  const handleSelectChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div>
          {getSnapshot(isLogin).state ? (
            <>
              <div className="s-60"></div>
              <select value={currency} onChange={handleSelectChange}>
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              <div className="s-20"></div>

              <div className={totalBalance >= 0 ? 'c-green' : 'c-red'}>
                Total: {(totalBalance / coefficient.value).toFixed(2)}
              </div>
              <div className="s-20"></div>
              <ul>
                {data.map((el, i) => {
                  return (
                    <div key={i}>
                      <li className="border p-2 d-flex justify-content-between align-items-center">
                        <div>
                          <div>date: {el.date}</div>
                          <div className={el.balance >= 0 ? 'c-green' : 'c-red'}>
                            budget: {(el.balance / coefficient.value).toFixed(2)}
                          </div>
                        </div>
                        <button onClick={() => handleDeleteDate(el)} className="button-delete">
                          X
                        </button>
                      </li>
                      <div className="s-10"></div>
                    </div>
                  );
                })}
              </ul>
            </>
          ) : (
            <LoginMessage />
          )}
        </div>
      </div>
    </>
  );
}

export default PageStatistics;
