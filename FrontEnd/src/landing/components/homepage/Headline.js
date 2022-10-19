import React from "react";

import "./styling/Headline.css";

const Headline = (props) => {
  return (
    <div className="Headline">
      <div className="Headline__Content">
        <h1 className="Headline__Title">{props.title}</h1>
        <p className="Headline__Subtitle">{props.subtitle}</p>
      </div>
      <div className="Headline__Demonstrative">
        <img
          alt={props.demoAlt}
          src={props.demo}
          className="Headline__Demo-Img"
        />
      </div>
    </div>
  );
};

export default Headline;
