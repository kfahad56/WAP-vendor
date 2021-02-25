import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import { IconButton } from "@material-ui/core";
import { Remove, Add } from "@material-ui/icons";

const style = {
  root: {
    position: "relative",
    height: "100%",
    // display: "flex",
    // flexDirection: "column",
  },
  addButtonContainer: {
    // position: "absolute",
    // bottom: 0,
    // right: "50%",
  },
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      desgin: false,
      code: false,
      develop: false,
      dropdown: [],
      dropdownData: "",
      mapOnced: false,
    };
  }

  sendState() {
    return this.state;
  }
  // handleSimple = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };
  handleChange = (value, name, index) => {
    let data = this.state.dropdown;
    if (name === "name") data[index].name = value;
    else if (name === "value") data[index].gst = value;
    this.setState({ dropdown: data });
  };
  isValidated() {
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          {this.props.gstData.map((item, index) => {
            let name = item.name;
            let value = item.gst;
            return (
              <GridContainer justify="center">
                <GridItem xs={5} sm={5} md={5} lg={5}>
                  <CustomInput
                    // success={name.length > 0}
                    error={name.length === 0}
                    labelText={
                      <span>
                        Name <small>(required)</small>
                      </span>
                    }
                    id="gstname"
                    inputProps={{
                      value: name,
                      onChange: (e) => {
                        this.props.handleChange(e.target.value, "name", index);
                      },
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={5} sm={5} md={5} lg={5}>
                  <CustomInput
                    // success={value.length > 0}
                    error={
                      !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(
                        value
                      )
                    }
                    labelText={
                      <span>
                        Number <small>(required)</small>
                      </span>
                    }
                    id="gstnumber"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: value,
                      onChange: (e) => {
                        this.props.handleChange(e.target.value, "value", index);
                      },
                    }}
                  />
                </GridItem>
                <GridItem>
                  <IconButton
                    style={{
                      marginTop: 20,
                    }}
                    round
                    onClick={() => this.props.removeGST(index)}
                  >
                    <Remove />
                  </IconButton>
                </GridItem>
              </GridContainer>
            );
          })}
        </div>
        {/* <div
          className={classes.addButtonContainer}
          
        > */}
        <IconButton round onClick={() => this.props.addGST()}>
          <Add />
        </IconButton>
        {/* </div> */}
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step2);
