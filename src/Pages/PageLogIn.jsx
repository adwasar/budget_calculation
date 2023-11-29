import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react';

import { isLogin } from '../storage';

function PageLogIn() {
  return (
    <div className="container">
      <h1>PageLogIn</h1>
      <button onClick={() => isLogin.toggle()}>Log in</button>
    </div>
  );
}

export default PageLogIn;
