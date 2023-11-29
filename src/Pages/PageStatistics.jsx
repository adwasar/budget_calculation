import { getSnapshot } from 'mobx-state-tree';

import LoginMessage from '../components/LoginMessage';
import { isLogin } from '../storage';

function PageStatistics() {
  return (
    <>
      <div className="container">
        <div>{getSnapshot(isLogin).state ? '' : <LoginMessage />}</div>
      </div>
    </>
  );
}

export default PageStatistics;
