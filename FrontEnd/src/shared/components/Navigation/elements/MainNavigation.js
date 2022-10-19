import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../../UIElements/other/elements/Backdrop";
import "../styling/MainNavigation.css";
import logo from "../../../icons/ScheduleBellLogo.svg";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <Header className="main-header">
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">
            {" "}
            <img
              className="main-navigation__logo-image"
              src={logo}
              alt="Schedule Bell Logo"
            />
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks userDropDown={!drawerIsOpen} />
        </nav>
      </Header>
    </React.Fragment>
  );
};

export default MainNavigation;
