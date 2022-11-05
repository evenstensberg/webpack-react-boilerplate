import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import "./assets/styles/index.scss";
import svgLogo from "./assets/images/logo.svg";

class HelloWorldComponent extends PureComponent {
  render() {
    return (
      <div className="container">
        <Link to="other">Navigate</Link>
        <img src={svgLogo} height="40" width="40" />
      </div>
    );
  }
}

export default HelloWorldComponent;
