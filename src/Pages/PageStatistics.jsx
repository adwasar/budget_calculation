import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react';

import { isLogin } from '../storage';

const PageStatistics = observer(() => (
  <>
    <div className="container">
      <h1>PageStatistics</h1>
      <div>{getSnapshot(isLogin).state ? 'Welcome' : 'Log in please'}</div>
    </div>
  </>
));

export default PageStatistics;
