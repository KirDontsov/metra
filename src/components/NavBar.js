import React from "react";
import { NavLink, Link } from "react-router-dom";
// import Search from "./Search";
import "../scss/Nav.scss";

const NavBar = props => {
  function handleClick(e) {
    props.slide(true);
    scrollToTop();
  }
  function scrollToTop() {
    let div = document.querySelector(".wrapper");
    div.scrollTop = 0;
  }
  return (
    <div className="nav-wrapper">
      {/* <div className="center">
				<div className="nav__top">
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
      </div>
			</div> */}
      <div className="center">
        {props.routes.map(route =>
          route.id === 1 ? (
            <Link
              className={route.className}
              exact={true}
              activeclassname="active"
              key={route.path}
              to={route.path}
              onClick={e => handleClick(e)}
            >
              {route.name}
            </Link>
          ) : null
        )}
        <nav>
          {props.routes.map(
            route =>
              route.id > 1 && (
                <NavLink
                  className={route.className}
                  exact={true}
                  activeclassname="active"
                  key={route.path}
                  to={route.path}
                >
                  {route.name}
                </NavLink>
              )
          )}
        </nav>
        <div className="rightNav">
          {/* <a href="tel:+79181233333" className="phone">
          +7 (918) 123-33-33
        </a> */}
          <a href="tel:+78614133333" className="phone">
            +7 (861-41) 3-33-33
          </a>
        </div>

        {/* <Search /> */}
      </div>
    </div>
  );
};

export default NavBar;
