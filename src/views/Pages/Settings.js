// // @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import CustomInput from "../../components/CustomInput/CustomInput.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import * as managerAPI from "../../Apis/settings.ts";
import * as activateAPI from "../../Apis/activate";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import TermsPopup from '../Pages/TermsPopup/TermsPopup';
import * as Cookie from "js-cookie";
import * as base from "../../Apis/base";
class Settings extends React.Component {
  defaultsettings = new managerAPI.Settings({
    password: "",
    old_password: "",
  });
  defaultComponentState = {
    apiCalled: false,
  };
  defaultState = {
    newpass: "",
    newpassState: "",
    currpass: "",
    currpassState: "",
    retypepass: "",
    retypepassState: "",
    successMessage: "",
    activateSuccessMessage: "",
    errorMessage: "",
    activateErrorMessage: "",
    termsTrue: false,
    tc: true,
    currpassVisibility: false,
    newpassVisibility: false,
    retypepassVisibility: false,
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  sendState() {
    return this.state;
  }
  handleSimple = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };
  verifyPass = (retype, pass) => {
    if (retype === pass) return true;
    return false;
  };

  handleSubmit = () => {
    if (this.isValidated()) {
      let manager = new managerAPI.Settings({
        password: this.state.newpass,
        old_password: this.state.currpass,
      });
      managerAPI.updateSettings(
        manager,
        (data) => {
          // setProperties(data);
          console.log(this.defaultState);
          this.setState(
            {
              ...this.defaultState,
              successMessage: "Your Password Is Changed Successfully",
            },
            () => setTimeout(() => this.setState({ successMessage: "" }), 3000)
          );
        },
        (data) => {
          this.setState({ errorMessage: data[0] });
        }
      );
    }
  };
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "retypepass":
        if (this.verifyPass(event.target.value, this.state.newpass)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            event.target.value
          )
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.newpassState === "success" &&
      this.state.currpassState === "success" &&
      this.state.retypepassState === "success"
    ) {
      return true;
    } else {
      if (this.state.newpassState !== "success") {
        this.setState({
          newpassState: "error",
          errorMessage: "Enter A Valid New Password",
        });
      }
      if (this.state.currpassState !== "success") {
        this.setState({
          currpassState: "error",
          errorMessage: "Enter A Valid Current Password",
        });
      }

      if (this.state.retypepassState !== "success") {
        this.setState({
          retypepassState: "error",
          errorMessage: "Password Didn't Match",
        });
      }
    }
    return false;
  }
  isActivate = () => {
    activateAPI.activateAccount(
      this.state.tc,
      () => {
        this.setState(
          {
            ...this.defaultState,
            activateSuccessMessage: "Your Account Is Activated",
          },
          () => setTimeout(() => this.setState({ activateSuccessMessage: "" }), 3000)
        );
        Cookie.set(base.userType, "customer_vendor", base.cookieSettings);
      },
      (data) => {
        this.setState({ activateErrorMessage: data[0] });
      }
    )
  }
  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevProps.newpass !== this.props.newpass) {
  //     this.setState({
  //       newpass: this.props.newpass,
  //       newpassState: "success",
  //       currpass: this.props.currpass,
  //       currpassState: "success",
  //       retypepass: this.props.retypepass,
  //       retypepassState: "success",
  //     });
  //   }
  // };

  toggleVisibility = (state) => {
    this.setState({ [state]: !this.state[state] });
  };

  render() {
    const { classes } = this.props;
    const openTermsTrue = () => {
      this.setState({ ...this.state.defaultState, tc: true, termsTrue: false })
      this.isActivate();
    }
    const closeTermsTrue = () => {
      this.setState({ ...this.state.defaultState, tc: false, termsTrue: false })
    }
    return (
      <GridContainer>
        {this.state.termsTrue ?
          <TermsPopup
            handleClose={closeTermsTrue}
            handleAgree={openTermsTrue} /> : <></>}
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <h4 className={classes.cardIconTitle}>
                Help Us Change Your Password !
              </h4>
            </CardHeader>
            <CardBody>
              <form>
                <CustomInput
                  success={this.state.currpassState === "success"}
                  error={this.state.currpassState === "error"}
                  labelText={
                    <span>
                      Current Password <small>(required)</small>
                    </span>
                  }
                  helperText="Current password"
                  id="currpass"
                  value={this.state.currpass}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: this.state.currpassVisibility ? "text" : "password",
                    onChange: (event) =>
                      this.change(event, "currpass", "length", 4),
                    endAdornment: (
                      <IconButton
                        position="end"
                        className={classes.inputAdornment}
                        onClick={() =>
                          this.toggleVisibility("currpassVisibility")
                        }
                      >
                        {!this.state.currpassVisibility ? (
                          <Visibility className={classes.inputAdornmentIcon} />
                        ) : (
                          <VisibilityOff
                            className={classes.inputAdornmentIcon}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                <CustomInput
                  success={this.state.newpassState === "success"}
                  error={this.state.newpassState === "error"}
                  labelText={
                    <span>
                      New Password <small>(required)</small>
                    </span>
                  }
                  id="newpass"
                  value={this.state.newpass}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  helperText="Password must contain at least 1 upper and lower case character, 1 number, 1 special character and length must be at least 8 characters"
                  inputProps={{
                    type: this.state.newpassVisibility ? "text" : "password",
                    onChange: (event) =>
                      this.change(event, "newpass", "password"),
                    endAdornment: (
                      <IconButton
                        position="end"
                        className={classes.inputAdornment}
                        onClick={() =>
                          this.toggleVisibility("newpassVisibility")
                        }
                      >
                        {!this.state.newpassVisibility ? (
                          <Visibility className={classes.inputAdornmentIcon} />
                        ) : (
                          <VisibilityOff
                            className={classes.inputAdornmentIcon}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                <CustomInput
                  success={this.state.retypepassState === "success"}
                  error={this.state.retypepassState === "error"}
                  labelText={
                    <span>
                      Re-type Password <small>(required)</small>
                    </span>
                  }
                  id="retypepass"
                  helperText="Re-type new password to confirm"
                  value={this.state.retypepass}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: this.state.retypepassVisibility ? "text" : "password",
                    onChange: (event) =>
                      this.change(event, "retypepass", "retypepass", 4),
                    endAdornment: (
                      <IconButton
                        position="end"
                        className={classes.inputAdornment}
                        onClick={() =>
                          this.toggleVisibility("retypepassVisibility")
                        }
                      >
                        {!this.state.retypepassVisibility ? (
                          <Visibility className={classes.inputAdornmentIcon} />
                        ) : (
                          <VisibilityOff
                            className={classes.inputAdornmentIcon}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                <div style={{ color: "green", fontsize: "8" }}>
                  {this.state.successMessage ? this.state.successMessage : ""}
                </div>
                <div style={{ color: "red", fontsize: "8" }}>
                  {this.state.errorMessage ? this.state.errorMessage : ""}
                </div>
                <Button color="rose" onClick={() => this.handleSubmit()}>
                  Submit
                </Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
        {Cookie.get(base.userType) === "customer_vendor" ? "" : <GridItem xs={12} sm={12} md={12}>
          <h4 className={{ marginBottom: '10px' }}>Activate Your Account</h4>
          <div style={{ color: "green", fontsize: "8" }}>
            {this.state.activateSuccessMessage ? this.state.activateSuccessMessage : ""}
          </div>
          <div style={{ color: "red", fontsize: "8" }}>
            {this.state.activateErrorMessage ? this.state.activateErrorMessage : ""}
          </div>
          <Button color="rose" onClick={() => this.setState({ ...this.state.defaultState, termsTrue: true })}>
            Activate
          </Button>
        </GridItem>}
      </GridContainer>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Settings);
