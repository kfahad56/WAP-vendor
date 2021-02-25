/* eslint-disable */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function UploadButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="image-upload"
        multiple
        type="file"
        onChange={(e) => {
          props.handleUpload(e.target.files[0]);
        }}
      />
      <label htmlFor="image-upload">
        <div
          style={{ width: 50, border: 1, borderStyle: "solid", padding: 50 }}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <AddIcon />
          </IconButton>
        </div>
      </label>
      {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <AddIcon />
        </IconButton>
      </label> */}
    </div>
  );
}
