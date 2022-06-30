import React from "react";
import { NavLink } from "react-router-dom";

import "../styling/NavItem.css";

const NavItem = (props) => {
  let NavLinkActive;
  return (
    <li className={props.to ? "" : "Nav-Item"}>
      {props.to && (
        <NavLink to={props.to}>
          {({ isActive }) =>
            isActive ? (
              <React.Fragment>
                {props.title}
                {props.children ? props.children : ""}
              </React.Fragment>
            ) : (
              props.title
            )
          }
        </NavLink>
      )}
      {!props.to && (
        <React.Fragment>
          <div
            className="Nav-Item__Button"
            onClick={(event) => props.onOpen(event)}
          >
            {props.icon ? (
              <div className="Nav-Item__Button">
                <img
                  alt={props.iconAlt}
                  src={props.icon}
                  className="Nav-Item__image"
                />
              </div>
            ) : undefined}
          </div>
          {props.children}
        </React.Fragment>
      )}
    </li>
  );
};

export default NavItem;

// import React from "react";
// import { NavLink } from "react-router-dom";

// import "../styling/NavItem.css";

// const NavItem = (props) => {
//   return (
//     <li>
//       <NavLink to={props.to}>
//         <React.Fragment>
//           {({ isActive }) =>
//             isActive ? (
//               <React.Fragment>
//                 {props.children ? props.children : ""}
//               </React.Fragment>
//             ) : undefined
//           }
//           {props.title}
//           {props.icon ? (
//             <div className="Nav-Item__Button">
//               <img alt="NavItem" src={props.icon} className="Nav-Item__image" />
//             </div>
//           ) : undefined}
//         </React.Fragment>
//       </NavLink>
//     </li>
//   );
// };

// export default NavItem;
