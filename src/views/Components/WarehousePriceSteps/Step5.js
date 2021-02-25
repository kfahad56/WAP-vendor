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
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { id } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";

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

class Step5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      availableFrom: {
        value: null,
        error: false,
        desc: "The starting date of renting out the warehouse",
        placeholder: "Allocated From",
        helperText: "Allocated From",
      },
      availableTo: {
        value: null,
        error: false,
        desc: "The last date of renting out the warehouse",
        placeholder: "Allocated To",
        helperText: "Allocated To",
      },
      areasqft: {
        value: "",
        error: false,
        desc: "Total space given to the customer",
        placeholder: "Allocated Area",
        helperText: "Allocated Area",
      },
    };
  }
  sendState() {
    return {
      availableFrom: this.state.availableFrom,
      availableTo: this.state.availableTo,
      areasqft: this.state.areasqft,
    };
  }
  // componentDidUpdate() {
  //   if (this.props.data.ratesLoaded && !this.state.dataLoaded) {
  //     this.setState({ dataLoaded: true, ...this.props.data });
  //   }
  // }
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
  verifyPositiveNumber(value) {
    if (parseInt(value) > 0) return true;
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    let temp = this.state[stateName];
    temp.value = event.target ? event.target.value : event;
    switch (type) {
      case "positiveNumber":
        if (this.verifyPositiveNumber(event.target.value)) {
          temp.error = false;
          this.setState({
            [stateName]: temp,
          });
        } else {
          temp.error = true;
          this.setState({
            [stateName]: temp,
          });
        }
        break;
      default:
        break;
    }

    this.setState({ [stateName]: temp });
  }
  isValidated() {
    if (
      this.state.availableFrom.error ||
      this.state.availableTo.error ||
      this.state.areasqft.error
    )
      return false;
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <GridItem xs={12} sm={4} md={4} lg={4}>
            <KeyboardDatePicker
              variant="inline"
              autoOk={true}
              format="dd/MM/yyyy"
              // allowKeyboardControl={false}
              margin="normal"
              id="date-picker-inline"
              label={
                <span>
                  Allocated From <small>(required)</small>
                </span>
              }
              minDate={new Date()}
              maxDate={this.state.availableTo || new Date("3050")}
              helperText={this.state.availableFrom.desc}
              value={this.state.availableFrom.value}
              onChange={(event) => this.change(event, "availableFrom")}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4} lg={4}>
            <KeyboardDatePicker
              variant="inline"
              autoOk={true}
              format="dd/MM/yyyy"
              margin="normal"
              allowKeyboardControl={false}
              id="date-picker-inline"
              label={
                <span>
                  Allocated To <small>(required)</small>
                </span>
              }
              onChange={(event) => this.change(event, "availableTo")}
              minDate={this.state.availableFrom.value || new Date()}
              value={this.state.availableTo.value}
              helperText={this.state.availableTo.desc}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4} lg={4}>
            <CustomInput
              error={this.state.areasqft.error}
              labelText={
                <span>
                  {this.state.areasqft.placeholder} <small>(required)</small>
                </span>
              }
              helperText={this.state.areasqft.desc}
              id="areasqft"
              formControlProps={{
                fullWidth: true,
              }}
              required
              inputProps={{
                type: "number",
                onChange: (event) =>
                  this.change(event, "areasqft", "positiveNumber"),
              }}
            />
          </GridItem>
        </MuiPickersUtilsProvider>
      </GridContainer>
    );
  }
}

Step5.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step5);
