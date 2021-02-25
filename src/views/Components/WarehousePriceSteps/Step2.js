import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PictureUpload from "components/CustomUpload/PictureUpload.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { IconButton, Tooltip } from "@material-ui/core";
import Info from "components/Typography/Info";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  inputAdornment: {
    position: "relative",
  },
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      premium_storage_cost_per_sqft_per_week: {
        error: false,
        value: "",
        desc: "Premium rate for additional space required",
        placeholder: "Premium storage cost /sqft /week",
        helperText: "Premium storage cost /sqft /week",
      },
      premium_handling_in_charge_per_carton: {
        error: false,
        value: "",
        desc: "Premium rate to handle additional Inbound cartons ",
        placeholder: "Premium handling-in charge /carton",
        helperText: "Premium handling-in charge /carton",
      },
      premium_handling_in_charge_per_pallet: {
        error: false,
        value: "",
        desc: "Premium rate to handle additional Inbound pallets",
        placeholder: "Premium handling-in charge /pallet",
        helperText: "Premium handling-in charge /pallet",
      },
      premium_handling_out_charge_per_carton: {
        error: false,
        value: "",
        desc: "Premium rate to pick, pack and despatch additional cartons",
        placeholder: "Premium handling-out charge /carton",
        helperText: "Premium handling-out charge /carton",
      },
      premium_handling_out_charge_per_pallet: {
        error: false,
        value: "",
        desc: "Premium rate to pick, pack and despatch additional pallets ",
        placeholder: "Premium handling-out charge /pallet",
        helperText: "Premium handling-out charge /pallet",
      },
      premium_delivery_charge_per_drop: {
        error: false,
        value: "",
        desc:
          "Premium charge for delivery (beyond agreed daily number or more than agreed criteria of radius (Kms), Weight (Kgs) or Volume (Cub.m.) per drop",
        placeholder: "Premium delivery charge /drop",
        helperText: "Premium delivery charge /drop",
      },
    };
  }
  sendState() {
    return {
      premium_storage_cost_per_sqft_per_week: this.state
        .premium_storage_cost_per_sqft_per_week,
      premium_handling_in_charge_per_carton: this.state
        .premium_handling_in_charge_per_carton,
      premium_handling_in_charge_per_pallet: this.state
        .premium_handling_in_charge_per_pallet,
      premium_handling_out_charge_per_carton: this.state
        .premium_handling_out_charge_per_carton,
      premium_handling_out_charge_per_pallet: this.state
        .premium_handling_out_charge_per_pallet,
      premium_delivery_charge_per_drop: this.state
        .premium_delivery_charge_per_drop,
    };
  }
  // function that returns true if value is email, false otherwise
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
  // function that verifies number is not negative
  verifyPositiveNumber(value) {
    return parseInt(value) >= 0;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
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
      case "positiveNumber":
        let temp = this.state[stateName];
        if (this.verifyPositiveNumber(event.target.value)) {
          temp.error = false;
          this.setState({ [stateName]: temp });
        } else {
          temp.error = true;
          this.setState({ [stateName]: temp });
        }
        break;
      default:
        break;
    }
    this.setState({
      [stateName]: { ...this.state[stateName], value: event.target.value },
    });
  }
  componentDidUpdate() {
    if (this.props.data.ratesLoaded && !this.state.dataLoaded) {
      this.setState({ dataLoaded: true, ...this.props.data });
    }
  }
  isValidated() {
    if (
      this.state.premium_storage_cost_per_sqft_per_week.error ||
      this.state.premium_handling_in_charge_per_carton.error ||
      this.state.premium_handling_out_charge_per_carton.error ||
      this.state.premium_handling_in_charge_per_pallet.error ||
      this.state.premium_handling_out_charge_per_pallet.error ||
      this.state.premium_delivery_charge_per_drop.error
    )
      return false;
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        {/* <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Let{"'"}s start with the basic information (with validation)
          </h4>
        </GridItem> */}
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.premium_storage_cost_per_sqft_per_week.error}
            labelText={
              <span>
                {this.state.premium_storage_cost_per_sqft_per_week.placeholder}
              </span>
            }
            helperText={this.state.premium_storage_cost_per_sqft_per_week.desc}
            value={this.state.premium_storage_cost_per_sqft_per_week.value}
            id="premium_storage_cost_per_sqft_per_week"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "premium_storage_cost_per_sqft_per_week",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.premium_handling_in_charge_per_carton.error}
            labelText={
              <span>
                {this.state.premium_handling_in_charge_per_carton.placeholder}
              </span>
            }
            helperText={this.state.premium_handling_in_charge_per_carton.desc}
            value={this.state.premium_handling_in_charge_per_carton.value}
            id="premium_handling_in_charge_per_carton"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "premium_handling_in_charge_per_carton",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.premium_handling_out_charge_per_carton.error}
            labelText={
              <span>
                {this.state.premium_handling_out_charge_per_carton.placeholder}
              </span>
            }
            helperText={this.state.premium_handling_out_charge_per_carton.desc}
            value={this.state.premium_handling_out_charge_per_carton.value}
            id="premium_handling_out_charge_per_carton"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "premium_handling_out_charge_per_carton",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.premium_handling_in_charge_per_pallet.error}
            labelText={
              <span>
                {this.state.premium_handling_in_charge_per_pallet.placeholder}
              </span>
            }
            helperText={this.state.premium_handling_in_charge_per_pallet.desc}
            value={this.state.premium_handling_in_charge_per_pallet.value}
            id="premium_handling_in_charge_per_pallet"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "premium_handling_in_charge_per_pallet",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.premium_handling_out_charge_per_pallet.error}
            labelText={
              <span>
                {this.state.premium_handling_out_charge_per_pallet.placeholder}
              </span>
            }
            helperText={this.state.premium_handling_out_charge_per_pallet.desc}
            value={this.state.premium_handling_out_charge_per_pallet.value}
            id="premium_handling_out_charge_per_pallet"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "premium_handling_out_charge_per_pallet",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.premium_delivery_charge_per_drop.error}
            labelText={
              <span>
                {this.state.premium_delivery_charge_per_drop.placeholder}
              </span>
            }
            helperText={this.state.premium_delivery_charge_per_drop.desc}
            value={this.state.premium_delivery_charge_per_drop.value}
            id="premium_delivery_charge_per_drop"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "premium_delivery_charge_per_drop",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step2);
