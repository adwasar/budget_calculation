import { getSnapshot } from 'mobx-state-tree';

import LoginMessage from '../components/LoginMessage';
import { isLogin } from '../storage';

function PageBudget() {
  return (
    <>
      <div className="container">
        <div>
          {getSnapshot(isLogin).state ? (
            <>
              <div>content</div>
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
