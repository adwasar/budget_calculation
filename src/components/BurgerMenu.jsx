import { NavLink } from 'react-router-dom';

function BurgerMenu({ closeMenu, menuIsOpen }) {
  return (
    <>
      <div className={`burger-menu z-2 ${menuIsOpen ? 'burger-menu_open' : ''}`}>
        <div className="container">
          <div onClick={closeMenu} className="burger-menu__close">
            <span></span>
            <span></span>
          </div>
          <ul>
            <li>
              <NavLink onClick={closeMenu} activeclassname="active" to="/">
                Budget
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} activeclassname="active" to="/statistics">
                Statistics
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} activeclassname="active" to="/developer">
                Developer
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} activeclassname="active" to="/instructions">
                Instructions
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} activeclassname="active" to="/log-in">
                Log in
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default BurgerMenu;
