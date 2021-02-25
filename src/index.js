/*!

=========================================================
* Material Dashboard PRO React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Authorize from "layouts/Authorize";

import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin";

import { routePaths, routeLayout } from "routes";

import "assets/jss/material-dashboard-pro-react";
import "assets/css/material-dashboard-pro-react.min.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/rtl" component={RtlLayout} />
      <Route path={routeLayout.auth} component={AuthLayout} />
      <Route path="/Authorize" component={Authorize} />
      <Route path={routeLayout.customer} component={AdminLayout} />
      <Redirect from="/" to={routeLayout.customer + routePaths.dashboard} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
