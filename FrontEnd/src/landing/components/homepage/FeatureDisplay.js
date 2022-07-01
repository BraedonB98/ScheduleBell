import React from "react";

import "./styling/FeatureDisplay.css";

const FeatureDisplay = (props) => {
  let content = (
    <div className="Feature-Display__Content">
      <h2 className="Feature-Display__Title">{props.title}</h2>
      <p className="Feature-Display__Text">{props.children}</p>
    </div>
  );
  return (
    <div className="Feature-Display">
      {props.alignContent === "right" && content}
      <div className="Feature-Display__Demonstrative">
        <img
          alt={props.demoAlt}
          src={props.demo}
          className="Feature-Display__Demo-Img"
        />
      </div>
      {props.alignContent !== "right" && content}
    </div>
  );
};

export default FeatureDisplay;
