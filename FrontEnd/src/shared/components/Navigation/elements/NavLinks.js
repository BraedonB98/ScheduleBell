import React, { useContext, useState } from "react";
import NavItem from "./NavItem";
import UserDropDown from "./UserDropDown";
import Header from "./Header";
import { AuthContext } from "../../../context/auth-context";

import "../styling/NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext); //eslint-disable-next-line
  return (
    <ul className="nav-links">
      {!auth.isLoggedIn && <NavItem to="/" title={"Home"}></NavItem>}
      {!auth.isLoggedIn && <NavItem to="/auth" title={"Login"}></NavItem>}
      {auth.isLoggedIn && <NavItem to="/" title={"DashBoard"}></NavItem>}

      {auth.isLoggedIn && <NavItem to="/staff" title={"Staff"}></NavItem>}

      {auth.isLoggedIn && <NavItem to="/schedule" title={"Schedule"}></NavItem>}
      {
        auth.isLoggedIn && <NavItem to="/sales" title={"Sales"}></NavItem>
        /*//!and is manager
         */
      }
      {auth.isLoggedIn && (
        <NavItem to="/location" title={"Locations"}></NavItem>
      )}
      {
        auth.isLoggedIn && (
          <NavItem to="/organization" title={"Organization"}></NavItem>
        )
        /*//!and is authOrg
         */
      }

      {auth.isLoggedIn &&
        props.userDropDown && ( //props.userDropDown indicates user in desktop mode and no side drawer available
          <UserDropDown />
          /*//!USE CSS TO MAKE IT APPEAR WHEN HOVERED OVER AND DISAPPEAR WHEN NOT HOVERED OVER
           */
        )}
      {auth.isLoggedIn && !props.userDropDown && (
        <React.Fragment>
          <NavItem to="/user-preferences" title={"Settings"}></NavItem>
          <NavItem to="/" onClick={auth.logout}>
            LOGOUT
          </NavItem>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavLinks;
