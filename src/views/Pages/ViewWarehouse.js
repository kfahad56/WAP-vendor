import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex",
  },
};

const useStyles = makeStyles(styles);

export default function ViewWarehouse() {
  const classes = useStyles();

  return <div className={classes.root}>View Page</div>;
}
