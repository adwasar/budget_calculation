import { getSnapshot } from 'mobx-state-tree';

import { isLogin } from '../storage';

function PageStatistics() {
  return (
    <>
      <div className="container">
        <h1>PageStatistics</h1>
        <div>{getSnapshot(isLogin).state ? '' : 'Log in please'}</div>
      </div>
    </>
  );
}

export default PageStatistics;
