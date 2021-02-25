import { Button } from "@material-ui/core";
import React, { useState } from "react";
import ConfirmPopup from "views/Components/ConfirmPopup";

const Test = () => {
  const [state, setState] = useState({
    open: false,
  });

  const togglePopup = () => {
    setState((prevState) => ({ ...prevState, open: !state.open }));
  };

  return (
    <React.Fragment>
      <Button onClick={() => togglePopup()}>Click Me</Button>
      <ConfirmPopup
        open={state.open}
        handleClose={() => togglePopup()}
        titleText="Are You Sure?"
        contentText="This will do XXX"
        handleSubmit={() => console.log("successful")}
      />
    </React.Fragment>
  );
};

export default Test;
