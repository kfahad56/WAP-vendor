/* eslint-disable */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import * as loginAPIs from "api/login";
import { routePaths, routeLayout } from "routes";

export default function Pages(props) {
  const defaultState = {
    loading: true,
    apiCalled: false,
    failed: false,
  };
  const [state, setState] = React.useState(defaultState);

  let token = new URLSearchParams(props.location.search).get("token");

  if (loginAPIs.isLoggedin() === true) {
    return <Redirect from="/" to={routeLayout.vendor + routePaths.dashboard} />;
  }

  if (token === null || token.length === 0) {
    // window.location = "https://hubshub.in/login";
  }

  loginAPIs.refresh(
    token,
    () => {
      setState({
        ...defaultState,
        loading: false,
        apiCalled: true,
        failed: false,
      });
    },
    () => {
      setState({
        ...defaultState,
        loading: false,
        apiCalled: true,
        failed: true,
      });
    }
  );

  if (state.apiCalled === true && state.failed === false)
    return <Redirect from="/" to={routeLayout.vendor + routePaths.dashboard} />;

  if (state.failed === true) {
    // window.location = "https://hubshub.in/login";
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={6} md={6} sm={6}>
        <h5
          style={{
            textAlign: "center",
          }}
        >
          Please wait while we set things up for you!{" "}
          {state.failed ? "Done!" : "..."}
        </h5>
      </Grid>
    </Grid>
  );
}
