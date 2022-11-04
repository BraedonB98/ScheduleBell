import React, { useContext, useState } from "react";
import NavItem from "../../../shared/components/Navigation/elements/NavItem";
import Header from "../../../shared/components/Navigation/elements/Header";
import { AuthContext } from "../../../shared/context/auth-context";

import "./LocationSubNavigation.css";

const LocationSubNav = (props) => {
  const auth = useContext(AuthContext);
  return (
    <Header className="sub-header">
      <ul className="nav-links__sub-menu">
        <NavItem to="/view" title={"View"}></NavItem>
        <NavItem to="/edit" title={"Edit"}></NavItem>
        <NavItem to="/report" title={"Report"}></NavItem>
        <NavItem to="/labor" title={"Labor"}></NavItem>
      </ul>
    </Header>
  );
};

export default LocationSubNav;
