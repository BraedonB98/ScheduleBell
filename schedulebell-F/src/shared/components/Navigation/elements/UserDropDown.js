import React, { useContext, useState } from "react";
import DropDownMenu from "../../UIElements/dropdown/elements/DropDownMenu";
import DropDownItem from "../../UIElements/dropdown/elements/DropDownItem";
import NavItem from "./NavItem";
import { AuthContext } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";

import "../styling/UserDropDown.css";

const UserDropDown = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext); //eslint-disable-next-line
  const imageUrl = auth.imageUrl;
  const [showUserDropDown, setShowUserDropDown] = useState();
  const settingsHandler = (event) => {
    event.preventDefault();
    setShowUserDropDown(false);
    navigate("/userpreferences");
  };
  const logoutHandler = (event) => {
    setShowUserDropDown(false);
    auth.logout();
  };
  return (
    <NavItem
      className="Nav-Item__Button"
      icon={
        auth.imageUrl
          ? `${process.env.REACT_APP_ASSET_URL}${imageUrl}` //!this may need to be fixed if error
          : `./images/default.svg`
      }
      onOpen={() => {
        setShowUserDropDown(!showUserDropDown);
      }}
    >
      {showUserDropDown && (
        <DropDownMenu>
          <DropDownItem onClick={settingsHandler}>Settings</DropDownItem>
          <DropDownItem onClick={logoutHandler}>Logout</DropDownItem>
        </DropDownMenu>
      )}
      {/*//! remove &nbsp; and fix with css
       */}
      <h1>&nbsp;&nbsp;&nbsp;&nbsp;</h1>
    </NavItem>
  );
};

export default UserDropDown;
