import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import * as loginAPIs from "../Apis/Login";
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
    return <Redirect from="/" to={"/customer/dashboard"} />;
  }

  if (token === null || token.length === 0) {
    // window.location = "https://hubshub.in/login";
  }

  if (state.apiCalled === true && state.failed === false)
    return <Redirect from="/" to={"customer/dashboard"} />;

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
