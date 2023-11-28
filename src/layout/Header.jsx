import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BurgerMenu from '../components/BurgerMenu';

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const closeMenu = () => {
    setMenuIsOpen(false);
  };

  const openMenu = () => {
    setMenuIsOpen(true);
  };

  return (
    <>
      <header className="header s-60 d-flex align-items-center">
        <div className="container">
          <nav className="d-flex w-100 justify-content-between align-items-center">
            <div className="logo">
              <NavLink to="/">Logo</NavLink>
            </div>
            <ul className="list-unstyled d-none d-sm-flex flex-row gap-4 m-0">
              <li>
                <NavLink activeclassname="active" to="/">
                  Statistics
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname="active" to="/developer">
                  Developer
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname="active" to="/config">
                  Config
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname="active" to="/instructions">
                  Instructions
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname="active" to="/log-in">
                  Log in
                </NavLink>
              </li>
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

export default Header;
