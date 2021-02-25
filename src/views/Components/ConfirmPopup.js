import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

export default function ConfirmPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [content, setContent] = React.useState({
    titleText: "Are You Sure?",
    contentText: "If You Click Proceed, A Certain Action Will Happen.",
  });

  React.useEffect(() => {
    // Opens the popup
    setOpen(props.open);

    // Sets title or content if even one of them is passed else uses the default values
    if (props.titleText || props.contentText) {
      setContent((prevState) => ({
        ...prevState,
        titleText: props.titleText,
        contentText: props.contentText,
      }));
    }
  }, [props.open, props.titleText, props.contentText]);

  const handleClose = () => {
    if (props.handleClose) props.handleClose();
    else setOpen(false);
  };

  const handleSubmit = () => {
    props.handleSubmit(message);
    handleClose();
  };

  const validateMessage = () => {
    return message.length > 160 ? false : true;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{content.titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content.contentText}
          </DialogContentText>
          {props.message && props.message.show ? (
            <TextField
              autoFocus
              error={
                validateMessage() ? "" : "The length must be between 0-160"
              }
              margin="dense"
              id="message"
              value={message}
              onChange={(event) => {
                let message = event.target.value;
                setMessage(message);
              }}
              helperText="The length must be between 0-160"
              label={props.message.label || "Message"}
              type={props.message.type || "text"}
              rowsMax={16}
              multiline
              fullWidth
            />
          ) : (
            <React.Fragment />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            autoFocus
            disabled={props.message.show && !validateMessage() ? true : false}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
