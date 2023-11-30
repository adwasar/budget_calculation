import { useEffect, useState } from 'react';
import { getSnapshot, onSnapshot } from 'mobx-state-tree';

import LoginMessage from '../components/LoginMessage';
import { isLogin, recordsHistory } from '../storage';

function PageStatistics() {
  const [updateFlag, setUpdateFlag] = useState(false);
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

  return (
    <>
      <div className="container">
        <div>
          {getSnapshot(isLogin).state ? (
            <>
              <div className="s-60"></div>
              <div className={totalBalance >= 0 ? 'c-green' : 'c-red'}>Total: {totalBalance}</div>
              <div className="s-20"></div>
              <ul>
                {data.map((el, i) => {
                  return (
                    <div key={i}>
                      <li className="border p-2 d-flex justify-content-between align-items-center">
                        <div>
                          <div>date: {el.date}</div>
                          <div className={el.balance >= 0 ? 'c-green' : 'c-red'}>
                            budget: {el.balance}
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
