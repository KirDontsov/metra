import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";


import { routes } from "./routes";

import NavBar from "./components/NavBar";
import Burger from "./mob_components/Burger";

import "./scss/App.scss";

const supportsHistory = "pushState" in window.history;

class App extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 768;
    const renderSwitch = () => (
      <Switch>
        {routes.map(route => {
          const component = route.component;
          return (
            <Route
              key={route.id}
              exact={route.isExact}
              path={route.path}
              component={component}
              status={route.status}
            />
          );
        })}
      </Switch>
    );

    if (isMobile) {
      return (
        <Router forceRefresh={!supportsHistory}>
          <Fragment>
            <Helmet>
              <title>Metra taxi</title>
              <meta name="description" content="Metra" />
            </Helmet>
            <div className="wrapper">
              <Burger routes={routes.filter(route => route.isNavBar)} />
              {renderSwitch()}
            </div>
          </Fragment>
        </Router>
      );
    } else {
      return (
        <Router forceRefresh={!supportsHistory}>
          <Fragment>
            <Helmet>
              <title>Metra taxi</title>
              <meta name="description" content="Metra" />
            </Helmet>

            <div className="wrapper">
              <NavBar routes={routes.filter(route => route.isNavBar)} />
              {renderSwitch()}
            </div>
          </Fragment>
        </Router>
      );
    }
  }
}

export default App;
