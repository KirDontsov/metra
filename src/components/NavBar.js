import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// import Search from "./Search";
import "../scss/Nav.scss";

const NavBar = props => (
  <div className="nav-wrapper">
    <div className="center">
      {/* <div className="nav__top">
        <div className="left__text">
          <p>Время работы: с 8:00 до 16:00</p>
        </div>
        <div className="right__text">
          <a href="tel:88614133333" className="phone">
            +7 (86-141) 3-33-33
          </a>
          <a href="tel:89181233333" className="phone">
            +7 (918) 123-33-33
          </a>
        </div>
      </div> */}
    </div>
    <div className="center">
      <nav>
        {props.routes.map(route => (
          <NavLink
            className={route.className}
            exact={route.isExact}
            activeClassName="active"
            key={route.path}
            to={route.path}
          >
            {route.name}
          </NavLink>
        ))}
      </nav>
      {/* <Search /> */}
    </div>
  </div>
);

export default NavBar;

NavBar.propTypes = {
  routes: PropTypes.array
};
