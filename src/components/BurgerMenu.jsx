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
            <li>Statistic</li>
            <li>developer</li>
            <li>Config</li>
            <li>instructions</li>
            <li>Log in</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default BurgerMenu;
