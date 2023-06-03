import React, { Component, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.scss";

const HelloWorldComponent = lazy(() => import("./HelloWorldComponent"));
const AnotherRouteComponent = lazy(() => import("./AnotherRouteComponent"));

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

const render = (Component) => {
  const container = document.getElementById("root");
  
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Component />} />
        <Route
          path="other"
          element={
            <Suspense fallback={<div>Loading Route...</div>}>
              <AnotherRouteComponent />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>,
    container
  );
};

render(App);

if (module.hot) {
  module.hot.accept(".", () => {
    const nextApp = require(".").default;
    render(nextApp);
  });
}
