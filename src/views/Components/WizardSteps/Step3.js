import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import * as companyAPI from "Apis/Company";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  ...customSelectStyle,
};

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameState: "",
      signatory: "",
      signatoryState: "",
      cin: "",
      cinState: "",
      pan: "",
      panState: "",
      email: "",
      emailState: "",
      mobile: "",
      mobileState: "",
    };
  }

  componentDidMount() {
    companyAPI.getCompany(
      (obj) => {
        this.setState({
          name: obj.name,
          nameState: obj.name.length > 0 ? "success" : "error",
          signatory: obj.signatory,
          signatoryState: obj.signatory.length > 0 ? "success" : "error",
          cin: obj.cin,
          cinState: obj.cin.length > 0 ? "success" : "error",
          pan: obj.pan,
          panState: obj.pan.length > 0 ? "success" : "error",
          email: obj.email,
          emailState: obj.email.length > 0 ? "success" : "error",
          mobile: obj.mobile,
          mobileState: obj.mobile.length > 0 ? "success" : "error",
        });
      },
      () => {
        console.log("error");
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.saveClicked !== this.props.saveClicked &&
      this.props.saveClicked === true
    ) {
      if (this.isValidated()) {
        let manager = new companyAPI.Company();
        manager.setProperties({
          name: this.state.name,
          signatory: this.state.signatory,
          email: this.state.email,
          mobile: this.state.mobile,
          cin: this.state.cin,
          pan: this.state.pan,
        });
        companyAPI.updateCompany(
          manager,
          () => {
            this.props.toogleSaveClick();
            this.props.successFunction();
          },
          () => {
            this.props.toogleSaveClick();
            this.props.errorFunction();
          }
        );
      } else this.props.validationError();
    }
  }

  sendState() {
    return this.state;
  }

  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  verifyMobile(value) {
    const mobileRex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (mobileRex.test(value)) {
      return true;
    }
    return false;
  }
  verifyPan(value) {
    const panRex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (panRex.test(value)) return true;
    return false;
  }
  handleChange = (stateName, value, type, args) => {
    switch (type) {
      case "email":
        if (this.verifyEmail(value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(value, args)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "pan":
        if (this.verifyPan(value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "mobile":
        if (this.verifyMobile(value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: value });
  };
  isValidated() {
    if (
      this.state.nameState === "error" ||
      this.state.emailState === "error" ||
      this.state.mobileState === "error" ||
      this.state.panState === "error" ||
      this.state.cinState === "error" ||
      this.state.signatoryState === "error"
    )
      return false;
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={5} sm={5} md={5} lg={5}>
          <CustomInput
            error={this.state.nameState === "error"}
            labelText={
              <span>
                Name <small>(required)</small>
              </span>
            }
            id="company-name"
            inputProps={{
              value: this.state.name,
              onChange: (e) => {
                this.handleChange("name", e.target.value, "length", 5);
              },
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
        <GridItem xs={5} sm={5} md={5} lg={5}>
          <CustomInput
            error={this.state.signatoryState === "error"}
            labelText={
              <span>
                Signatory <small>(required)</small>
              </span>
            }
            id="company-signatory"
            inputProps={{
              value: this.state.signatory,
              onChange: (e) => {
                this.handleChange("signatory", e.target.value, "length", 5);
              },
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
        <GridItem xs={5} sm={5} md={5} lg={5}>
          <CustomInput
            error={this.state.panState === "error"}
            labelText={
              <span>
                Pan <small>(required)</small>
              </span>
            }
            id="company-pan"
            inputProps={{
              value: this.state.pan,
              onChange: (e) => {
                this.handleChange("pan", e.target.value, "pan");
              },
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
        <GridItem xs={5} sm={5} md={5} lg={5}>
          <CustomInput
            error={this.state.cinState === "error"}
            labelText={
              <span>
                CIN <small>(required)</small>
              </span>
            }
            id="company-cin"
            inputProps={{
              value: this.state.cin,
              onChange: (e) => {
                this.handleChange("cin", e.target.value, "length", 5);
              },
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
        <GridItem xs={5} sm={5} md={5} lg={5}>
          <CustomInput
            error={this.state.mobileState === "error"}
            labelText={
              <span>
                Phone Number <small>(required)</small>
              </span>
            }
            id="company-mobile"
            inputProps={{
              value: this.state.mobile,
              onChange: (e) => {
                this.handleChange("mobile", e.target.value, "mobile");
              },
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
        <GridItem xs={5} sm={5} md={5} lg={5}>
          <CustomInput
            error={this.state.emailState === "error"}
            labelText={
              <span>
                Email <small>(required)</small>
              </span>
            }
            id="company-email"
            inputProps={{
              value: this.state.email,
              onChange: (e) => {
                this.handleChange("email", e.target.value, "email");
              },
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step3);
