import { useState } from 'react';
import BurgerMenu from './components/BurgerMenu';

function App() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const closeMenu = () => {
    setMenuIsOpen(false);
  };

  const openMenu = () => {
    setMenuIsOpen(true);
  };

  return (
    <>
      <header className="s-60 d-flex align-items-center">
        <div className="container">
          <nav className="d-flex w-100 justify-content-between align-items-center">
            <div className="logo">Logo</div>
            <ul className="list-unstyled d-none d-sm-flex flex-row gap-4 m-0">
              <li>Statistic</li>
              <li>Developer</li>
              <li>Config</li>
              <li>Instructions</li>
              <li>Log in</li>
            </ul>
            <div onClick={openMenu} className="burger d-sm-none">
              <span className="tt"></span>
              <span className="mm"></span>
              <span className="bb"></span>
            </div>
          </nav>
        </div>
        <BurgerMenu menuIsOpen={menuIsOpen} closeMenu={closeMenu} />
      </header>
    </>
  );
}

export default App;
