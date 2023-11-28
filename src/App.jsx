import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';

import PageStatistics from './Pages/PageStatistics.jsx';
import PageDeveloper from './Pages/PageDeveloper.jsx';
import PageConfig from './Pages/PageConfig.jsx';
import PageInstructions from './Pages/PageInstructions.jsx';
import PageLogIn from './Pages/PageLogIn.jsx';

function App() {
  return (
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
  );
}

export default App;
