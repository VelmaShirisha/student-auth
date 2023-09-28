import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
    <div className={classes.logo}>Student Authentication</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/student" activeClassName={classes.active}>
              Student
            </NavLink>
          </li>
          <li>
            <NavLink to="/dean" activeClassName={classes.active}>
              Dean
            </NavLink>
          </li>
        </ul>
      </nav>

    </header>
  );
};

export default MainNavigation;
