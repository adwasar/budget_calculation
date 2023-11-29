import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react';

import Layout from './layout/Layout';

import PageStatistics from './pages/PageStatistics.jsx';
import PageDeveloper from './pages/PageDeveloper.jsx';
import PageConfig from './pages/PageConfig.jsx';
import PageInstructions from './pages/PageInstructions.jsx';
import PageLogIn from './pages/PageLogIn.jsx';

const App = observer(() => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PageStatistics />} />
          <Route path="/developer" element={<PageDeveloper />} />
          <Route path="/config" element={<PageConfig />} />
          <Route path="/instructions" element={<PageInstructions />} />
          <Route path="/log-in" element={<PageLogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
));

export default App;
