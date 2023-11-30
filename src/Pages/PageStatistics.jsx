import { getSnapshot } from 'mobx-state-tree';

import LoginMessage from '../components/LoginMessage';
import { isLogin, recordsHistory } from '../storage';
import { useEffect } from 'react';

function PageStatistics() {
  const data = getSnapshot(recordsHistory).records;
  const totalBalance = data.reduce((acc, el) => acc + el.balance, 0);

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
                      <li className="border p-2">
                        <div>date: {el.date}</div>
                        <div className={el.balance >= 0 ? 'c-green' : 'c-red'}>
                          budget: {el.balance}
                        </div>
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
