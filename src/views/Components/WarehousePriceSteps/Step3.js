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

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      allocated_space_per_week: {
        value: "",
        error: false,
        desc:
          "Agreed allocated space for customer to meet daily storage requirement (Business As Usual operation)",
        placeholder: "Allocated space /week",
        helperText: "Allocated space /week",
      },
      allocated_handled_in_cartons_per_day: {
        value: "",
        error: false,
        desc:
          "Agreed maximum number of inbound cartons per day (Business As Usual operation)",
        placeholder: "Allocated handled-in cartons /day",
        helperText: "Allocated handled-in cartons /day",
      },
      allocated_handled_in_pallet_per_day: {
        value: "",
        error: false,
        desc:
          "Agreed maximum number of inbound pallets per day (Business As Usual operation)",
        placeholder: "Allocated handled-in pallet /day",
        helperText: "Allocated handled-in pallet /day",
      },
      allocated_handled_out_cartons_per_day: {
        value: "",
        error: false,
        desc:
          "Agreed maximum number of outbound cartons per day (Business As Usual operation)",
        placeholder: "Allocated handled-out cartons /day",
        helperText: "Allocated handled-out cartons /day",
      },
      allocated_handled_out_pallet_per_day: {
        value: "",
        error: false,
        desc:
          "Agreed maximum number of outbound pallets per day (Business As Usual operation)",
        placeholder: "Allocated handled-out pallet /day",
        helperText: "Allocated handled-out pallet /day",
      },
      allocated_no_of_deliveries: {
        value: "",
        error: false,
        desc:
          "Agreed maximum number of deliveries per day  (Business As Usual operation)",
        placeholder: "Allocated # of Deliveries",
        helperText: "Allocated # of Deliveries",
      },
      allocated_delivery_kms_per_drop: {
        value: "",
        error: false,
        desc:
          "Agreed maximum distance for deliveries (in Kms) (Business As Usual operation)",
        placeholder: "Allocated deliveries kms /drop",
        helperText: "Allocated deliveries kms /drop",
      },
      allocated_delivery_Kgs_per_drop: {
        value: "",
        error: false,
        desc: "Agreed maximum weight per drop (Business As Usual operation)",
        placeholder: "Allocated delivery kgs /drop",
        helperText: "Allocated delivery kgs /drop",
      },
      allocated_delivery_Cub_m__per_drop: {
        value: "",
        error: false,
        desc: "Agreeed maximum volume per drop (Business as Ususal operation)",
        placeholder: "Allocated delivery cub.m. /drop",
        helperText: "Allocated delivery cub.m. /drop",
      },
    };
  }
  sendState() {
    return {
      allocated_space_per_week: this.state.allocated_space_per_week,
      allocated_handled_in_cartons_per_day: this.state
        .allocated_handled_in_cartons_per_day,
      allocated_handled_in_pallet_per_day: this.state
        .allocated_handled_in_pallet_per_day,
      allocated_handled_out_cartons_per_day: this.state
        .allocated_handled_out_cartons_per_day,
      allocated_handled_out_pallet_per_day: this.state
        .allocated_handled_out_pallet_per_day,
      allocated_no_of_deliveries: this.state.allocated_no_of_deliveries,
      allocated_delivery_kms_per_drop: this.state
        .allocated_delivery_kms_per_drop,
      allocated_delivery_Kgs_per_drop: this.state
        .allocated_delivery_Kgs_per_drop,
      allocated_delivery_Cub_m__per_drop: this.state
        .allocated_delivery_Cub_m__per_drop,
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
      this.state.allocated_space_per_week.error ||
      this.state.allocated_handled_in_pallet_per_day.error ||
      this.state.allocated_handled_out_pallet_per_day.error ||
      this.state.allocated_handled_in_cartons_per_day.error ||
      this.state.allocated_handled_out_cartons_per_day.error ||
      this.state.allocated_delivery_Kgs_per_drop.error ||
      this.state.allocated_delivery_Cub_m__per_drop.error ||
      this.state.allocated_delivery_kms_per_drop.error ||
      this.state.allocated_no_of_deliveries.error
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
            error={this.state.allocated_space_per_week.error}
            labelText={
              <span>{this.state.allocated_space_per_week.placeholder}</span>
            }
            helperText={this.state.allocated_space_per_week.desc}
            value={this.state.allocated_space_per_week.value}
            id="allocated_space_per_week"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "allocated_space_per_week",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.allocated_handled_in_cartons_per_day.error}
            labelText={
              <span>
                {this.state.allocated_handled_in_cartons_per_day.placeholder}
              </span>
            }
            helperText={this.state.allocated_handled_in_cartons_per_day.desc}
            value={this.state.allocated_handled_in_cartons_per_day.value}
            id="allocated_handled_in_cartons_per_day"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "allocated_handled_in_cartons_per_day",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.allocated_handled_out_cartons_per_day.error}
            labelText={
              <span>
                {this.state.allocated_handled_out_cartons_per_day.placeholder}
              </span>
            }
            helperText={this.state.allocated_handled_out_cartons_per_day.desc}
            value={this.state.allocated_handled_out_cartons_per_day.value}
            id="allocated_handled_out_cartons_per_day"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "allocated_handled_out_cartons_per_day",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.allocated_handled_in_pallet_per_day.error}
            labelText={
              <span>
                {this.state.allocated_handled_in_pallet_per_day.placeholder}
              </span>
            }
            helperText={this.state.allocated_handled_in_pallet_per_day.desc}
            value={this.state.allocated_handled_in_pallet_per_day.value}
            id="allocated_handled_in_pallet_per_day"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "allocated_handled_in_pallet_per_day",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.allocated_handled_out_pallet_per_day.error}
            labelText={
              <span>
                {this.state.allocated_handled_out_pallet_per_day.placeholder}
              </span>
            }
            helperText={this.state.allocated_handled_out_pallet_per_day.desc}
            value={this.state.allocated_handled_out_pallet_per_day.value}
            id="allocated_handled_out_pallet_per_day"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "allocated_handled_out_pallet_per_day",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.allocated_delivery_Kgs_per_drop.error}
            labelText={
              <span>
                {this.state.allocated_delivery_Kgs_per_drop.placeholder}
              </span>
            }
            helperText={this.state.allocated_delivery_Kgs_per_drop.desc}
            value={this.state.allocated_delivery_Kgs_per_drop.value}
            id="allocated_delivery_Kgs_per_drop"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "allocated_delivery_Kgs_per_drop",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.allocated_delivery_Cub_m__per_drop.error}
            labelText={
              <span>
                {this.state.allocated_delivery_Cub_m__per_drop.placeholder}
              </span>
            }
            helperText={this.state.allocated_delivery_Cub_m__per_drop.desc}
            value={this.state.allocated_delivery_Cub_m__per_drop.value}
            id="allocated_delivery_Cub_m__per_drop"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "allocated_delivery_Cub_m__per_drop",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.allocated_no_of_deliveries.error}
            labelText={
              <span>{this.state.allocated_no_of_deliveries.placeholder}</span>
            }
            helperText={this.state.allocated_no_of_deliveries.desc}
            value={this.state.allocated_no_of_deliveries.value}
            id="allocated_no_of_deliveries"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "allocated_no_of_deliveries",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.allocated_delivery_kms_per_drop.error}
            labelText={
              <span>
                {this.state.allocated_delivery_kms_per_drop.placeholder}
              </span>
            }
            helperText={this.state.allocated_delivery_kms_per_drop.desc}
            value={this.state.allocated_delivery_kms_per_drop.value}
            id="allocated_delivery_kms_per_drop"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "allocated_delivery_kms_per_drop",
                  "positiveNumber"
                ),
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
