import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

const CustomSnackbar = (props) => {
  const defaultState = {
    open: false,
    duration: 6000,
    severity: "success",
    message: "Successful",
  };
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      open: props.open,
      duration: props.duration ? props.duration : defaultState.duration,
      severity: props.severity ? props.severity : defaultState.severity,
      message: props.message ? props.message : defaultState.message,
    }));
    // eslint-disable-next-line
  }, [props.open, props.duration, props.severity, props.message]);

  const handleClose = () => {
    if (props.handleClose) props.handleClose();
    setState((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <Snackbar
      open={state.open}
      autoHideDuration={state.duration}
      onClose={handleClose}
    >
      <Alert severity={state.severity}>{state.message}</Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;

CustomSnackbar.propTypes = {
  severity: PropTypes.oneOf(["error", "success", "warning"]).isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
