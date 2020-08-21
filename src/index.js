import React, { Component, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import "./index.scss"

const HelloWorldComponent = lazy(() => import("./HelloWorldComponent"));

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <HelloWorldComponent />
        </Suspense>
      </>
    );
  }
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept(".", () => {
    const nextApp = require(".").default;
    render(nextApp);
  });
}
