import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import index from "./index.js";
import PageNotFound from "../src/PageNotFound.jsx";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route path="/" component={index} exact={true} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
