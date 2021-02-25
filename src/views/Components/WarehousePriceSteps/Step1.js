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

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      storage_cost_per_sqft_per_week: {
        value: "",
        error: false,
        desc: 'Rate of space "allocated" for this contract.',
        placeholder: "Storage cost /sqft /week",
        helperText: "Storage cost /sqft /week",
      },
      handling_in_charge_per_carton: {
        value: "",
        error: false,
        desc: "Rate to handle Inbound cartons",
        placeholder: "Handling-in charge /carton",
        helperText: "Handling-in charge /carton",
      },
      handling_in_charge_per_pallet: {
        value: "",
        error: false,
        desc: "Rate to handle Inbound pallet",
        placeholder: "Handling-in charge /pallet",
        helperText: "Handling-in charge /pallet",
      },
      handling_out_charge_per_carton: {
        value: "",
        error: false,
        desc: "Rate to pick, pack and despatch outbound cartons",
        placeholder: "Handling-out charge /carton",
        helperText: "Handling-out charge /carton",
      },
      handling_out_charge_per_pallet: {
        value: "",
        error: false,
        desc: "Rate to pick, pack and despatch outbound pallets ",
        placeholder: "Handling-out charge /pallet",
        helperText: "Handling-out charge /pallet",
      },
      vas_copacking_per_unit: {
        value: "",
        error: false,
        desc: "Rate to carry out additional tasks like co-packing",
        placeholder: "VAS copacking /unit",
        helperText: "VAS copacking /unit",
      },
      delivery_charge_per_drop: {
        value: "",
        error: false,
        desc:
          "Delivery charge per drop within agreed criteria. e.g. within 10 kms, less than 20kgs, below 0.1 cub. m. Figures with vary. Average number of drops per day to be agreed.",
        placeholder: "Delivery charge /drop",
        helperText: "Delivery charge /drop",
      },
      other_charges_per_week: {
        value: "",
        error: false,
        desc:
          "Any additional cost which warehouse incurs. e.g. labour union fee, local council fee etc.",
        placeholder: "Other charges /week",
        helperText: "Other charges /week",
      },
    };
  }
  sendState = () => {
    console.log("in");
    return {
      storage_cost_per_sqft_per_week: this.state.storage_cost_per_sqft_per_week,
      handling_in_charge_per_carton: this.state.handling_in_charge_per_carton,
      handling_in_charge_per_pallet: this.state.handling_in_charge_per_pallet,
      handling_out_charge_per_carton: this.state.handling_out_charge_per_carton,
      handling_out_charge_per_pallet: this.state.handling_out_charge_per_pallet,
      vas_copacking_per_unit: this.state.vas_copacking_per_unit,
      delivery_charge_per_drop: this.state.delivery_charge_per_drop,
      other_charges_per_week: this.state.other_charges_per_week,
    };
  };
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
  componentDidUpdate(prevProps) {
    if (this.props.data.ratesLoaded && !this.state.dataLoaded) {
      console.log(this.props.data);
      this.setState({ dataLoaded: true, ...this.props.data });
    }
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
  isValidated() {
    if (
      this.state.storage_cost_per_sqft_per_week.error ||
      this.state.handling_in_charge_per_carton.error ||
      this.state.handling_out_charge_per_carton.error ||
      this.state.handling_in_charge_per_pallet.error ||
      this.state.handling_out_charge_per_pallet.error ||
      this.state.vas_copacking_per_unit.error ||
      this.state.delivery_charge_per_drop.error ||
      this.state.other_charges_per_week.error
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
            error={this.state.storage_cost_per_sqft_per_week.error}
            labelText={
              <span>
                {this.state.storage_cost_per_sqft_per_week.placeholder}
              </span>
            }
            helperText={this.state.storage_cost_per_sqft_per_week.desc}
            value={this.state.storage_cost_per_sqft_per_week.value}
            id="storage_cost_per_sqft_per_week"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "storage_cost_per_sqft_per_week",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.handling_in_charge_per_carton.error}
            labelText={
              <span>
                {this.state.handling_in_charge_per_carton.placeholder}
              </span>
            }
            helperText={this.state.handling_in_charge_per_carton.desc}
            value={this.state.handling_in_charge_per_carton.value}
            id="handling_in_charge_per_carton"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "handling_in_charge_per_carton",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.handling_out_charge_per_carton.error}
            labelText={
              <span>
                {this.state.handling_out_charge_per_carton.placeholder}
              </span>
            }
            helperText={this.state.handling_out_charge_per_carton.desc}
            value={this.state.handling_out_charge_per_carton.value}
            id="handling_out_charge_per_carton"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "handling_out_charge_per_carton",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.handling_in_charge_per_pallet.error}
            labelText={
              <span>
                {this.state.handling_in_charge_per_pallet.placeholder}
              </span>
            }
            helperText={this.state.handling_in_charge_per_pallet.desc}
            value={this.state.handling_in_charge_per_pallet.value}
            id="handling_in_charge_per_pallet"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "handling_in_charge_per_pallet",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.handling_out_charge_per_pallet.error}
            labelText={
              <span>
                {this.state.handling_out_charge_per_pallet.placeholder}
              </span>
            }
            helperText={this.state.handling_out_charge_per_pallet.desc}
            value={this.state.handling_out_charge_per_pallet.value}
            id="handling_out_charge_per_pallet"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "handling_out_charge_per_pallet",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.delivery_charge_per_drop.error}
            labelText={
              <span>{this.state.delivery_charge_per_drop.placeholder}</span>
            }
            helperText={this.state.delivery_charge_per_drop.desc}
            value={this.state.delivery_charge_per_drop.value}
            id="delivery_charge_per_drop"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "delivery_charge_per_drop",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.vas_copacking_per_unit.error}
            labelText={
              <span>{this.state.vas_copacking_per_unit.placeholder}</span>
            }
            helperText={this.state.vas_copacking_per_unit.desc}
            value={this.state.vas_copacking_per_unit.value}
            id="vas_copacking_per_unit"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(event, "vas_copacking_per_unit", "positiveNumber"),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.other_charges_per_week.error}
            labelText={
              <span>{this.state.other_charges_per_week.placeholder}</span>
            }
            helperText={this.state.other_charges_per_week.desc}
            value={this.state.other_charges_per_week.value}
            id="other_charges_per_week"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(event, "other_charges_per_week", "positiveNumber"),
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step1);
