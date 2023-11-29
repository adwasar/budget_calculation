import { getSnapshot } from 'mobx-state-tree';
import { isLogin } from '../storage';

function PageBudget() {
  return (
    <>
      <div className="container">
        <h1>PageBudget</h1>
        <div>{getSnapshot(isLogin).state ? '' : 'Log in please'}</div>
      </div>
    </>
  );
}

export default PageBudget;
