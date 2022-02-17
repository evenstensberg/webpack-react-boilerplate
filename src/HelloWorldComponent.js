import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class HelloWorldComponent extends PureComponent {
  render() {
    return (
      <>
        <h1>Hello World!</h1>
        <Link to="other">Navigate</Link>
      </>
    );
  }
}


export default HelloWorldComponent;
