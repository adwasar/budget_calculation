import { getSnapshot } from 'mobx-state-tree';

import LoginMessage from '../components/LoginMessage';
import { isLogin, recordsHistory } from '../storage';

function PageStatistics() {
  return (
    <>
      <div className="container">
        <div className="s-60"></div>

        <div>
          {getSnapshot(isLogin).state ? (
            <>
              <div>Record history: {JSON.stringify(getSnapshot(recordsHistory))}</div>
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
