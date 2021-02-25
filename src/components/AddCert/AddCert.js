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
        accept=".pdf"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => {
          props.handleUpload(e.target.files);
        }}
      />
      <label htmlFor="contained-button-file">
        <div>
          <IconButton
            // style={{ marginLeft: 0 }}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <AddIcon />
          </IconButton>
        </div>
      </label>
    </div>
  );
}
