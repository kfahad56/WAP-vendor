/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import BusinessIcon from "@material-ui/icons/Business";
import AssignmentIcon from "@material-ui/icons/Assignment";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import PictureUpload from "components/CustomUpload/PictureUpload.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// Default Image
import defaultImage from "assets/img/default-avatar.png";
import customInputStyle from "assets/jss/material-dashboard-pro-react/components/customInputStyle";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

// API
import * as CityAPI from "api/Cities";
import * as StateAPI from "api/States";

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
      firstName: "",
      firstNameState: "",
      lastName: "",
      lastNameState: "",
      email: "",
      emailState: "",
      name: "",
      nameState: "",
      company_signatory: "",
      company_signatoryState: "",
      displayName: "",
      phone: "",
      website: "",
      mobile: "",

      address_attention: "",
      address_state: "",
      address_city: "",
      address_str_1: "",
      address_str_2: "",
      address_zip: "",
      address_phone: "",

      // dropdowns
      stateData: [],
      stateString: "",
      cityData: [],
      cityString: "",
    };
  }
  sendState() {
    return this.state;
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
  verifyMobile(value) {
    const mobileRex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (mobileRex.test(value)) {
      return true;
    }
    return false;
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
      case "mobile":
        if (this.verifyMobile(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.props.profileHandleChange(stateName, event.target.value);
    this.setState({ [stateName]: event.target.value });
  }
  propogateChange(name, value) {
    this.props.profileHandleChange(name, value);
  }
  isValidated() {
    if (
      this.state.firstNameState === "success" &&
      this.state.company_signatoryState === "success" &&
      this.state.lastNameState === "success" &&
      this.state.emailState === "success"
    ) {
      return true;
    } else {
      if (this.state.firstNameState !== "success") {
        this.setState({ firstNameState: "error" });
      }
      if (this.state.lastNameState !== "success") {
        this.setState({ lastNameState: "error" });
      }
      if (this.state.company_signatoryState !== "success") {
        this.setState({ company_signatoryState: "error" });
      }
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
    }
    return false;
  }

  getCity = () => {
    CityAPI.getCities(
      this.state.address_state ? this.state.address_state.id : "",
      (data) => {
        this.setState({ cityData: data });
      },
      () => {},
      () => {
        console.log("error");
      }
    );
  };

  componentDidMount = () => {
    StateAPI.getStates(
      (data) => {
        this.setState({ stateData: data });
      },
      () => {},
      () => {
        console.log("errors");
      }
    );
    this.getCity();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.firstName !== this.props.firstName) {
      this.setState({
        firstName: this.props.firstName,
        firstNameState: this.props.firstName ? "success" : "error",
        lastName: this.props.lastName,
        lastNameState: this.props.lastName ? "success" : "error",
        email: this.props.email,
        mobile: this.props.mobile,
        emailState: this.props.email ? "success" : "error",

        // New Fields
        address_attention: this.props.address_attention,
        address_attentionState: this.props.address_attention
          ? "success"
          : "error",
        address_state: {
          id: this.props.address_state,
          value: this.props.address_state,
          name: this.props.address_state,
        },
        address_stateState: this.props.address_state ? "success" : "error",
        address_city: {
          id: this.props.address_city,
          value: this.props.address_city,
          name: this.props.address_city,
        },
        address_cityState: this.props.address_city ? "success" : "error",
        address_zip: this.props.address_zip ? this.props.address_zip + "" : "",
        address_zipState: this.props.address_zip ? "success" : "error",
        address_str_1: this.props.address_str_1,
        address_str_1State: this.props.address_str_1 ? "success" : "error",
        address_phone: this.props.address_phone,
        address_phoneState: this.props.address_phone ? "success" : "error",
        website: this.props.website,
        websiteState: this.props.website ? "success" : "error",
      });
    }
  };

  render() {
    const Dropdown = (props) => {
      const { data, labelText, value, disabled, onChange } = props;
      return (
        <FormControl fullWidth className="marginDense">
          <InputLabel id="demo-simple-select-label">{labelText}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={onChange}
            disabled={disabled}
          >
            {data.map((item, index) => {
              return (
                <MenuItem key={index} name={item.id} value={item.value}>
                  {item.name ? item.name : item.value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    };

    const PictureUpload = (prop) => {
      // console.log(prop.image);
      const [file, setFile] = React.useState(null);
      const [imagePreviewUrl, setImagePreviewUrl] = React.useState(prop.image);
      // console.log(prop);
      const handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let newFile = e.target.files[0];
        setFile(newFile);
        if (newFile) {
          let url = URL.createObjectURL(newFile);
          setImagePreviewUrl(url);
          this.props.profileHandleChange(e.target.name, url);
          this.props.setNewProfilePic(newFile);
        }
        // reader.onloadend = () => {
        //   setFile(newFile);
        //   setImagePreviewUrl(reader.result);
        // };
        // if (newFile) {
        //   reader.readAsDataURL(newFile);
        // }
      };
      // eslint-disable-next-line
      const handleSubmit = (e) => {
        e.preventDefault();
        // this.state.file is the file/image uploaded
        // in this function you can save the image (this.state.file) on form submit
        // you have to call it yourself
      };
      return (
        <div className="picture-container">
          <div className="picture">
            {/* {console.log(file ? "component" : "parent")} */}
            {prop.image || imagePreviewUrl ? (
              <img
                src={file === null ? prop.image : imagePreviewUrl}
                className="picture-src"
                alt={"..."}
              />
            ) : (
              <img src={defaultImage} className="picture-src" alt={"..."} />
            )}
            <input
              accept="image/*"
              type="file"
              name="profilePic"
              // value={file ? URL.createObjectURL(file) : prop.image}
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          <h6 className="description">Choose Picture</h6>
        </div>
      );
    };
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          {/* <h4 className={classes.infoText}>
            Let{"'"}s start with the basic information (with validation)
          </h4> */}
        </GridItem>
        <GridItem xs={12} sm={4}>
          <PictureUpload image={this.props.profilePic} />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <CustomInput
            error={this.state.firstNameState === "error"}
            labelText={
              <span>
                First Name <small>(required)</small>
              </span>
            }
            id="firstName"
            value={this.state.firstName}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => this.change(event, "firstName", "length", 3),
            }}
          />
          <CustomInput
            error={this.state.lastNameState === "error"}
            labelText={
              <span>
                Last Name <small>(required)</small>
              </span>
            }
            id="lastName"
            value={this.state.lastName}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => this.change(event, "lastName", "length", 3),
            }}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.emailState === "error"}
            labelText={
              <span>
                Email <small>(required)</small>
              </span>
            }
            value={this.state.email}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => this.change(event, "email", "email"),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.state.mobile)}
            labelText={
              <span>
                Phone <small>(required)</small>
              </span>
            }
            value={this.state.mobile}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => {
                this.state.mobile = event.target.value;
                this.setState({ ...this.state });
                this.propogateChange("mobile", event.target.value);
              },
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            labelText={<span>Website</span>}
            error={
              !/^^$|((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(
                this.state.website
              )
            }
            value={this.state.website}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => {
                this.state.website = event.target.value;
                this.setState({ ...this.state });
                this.propogateChange("website", event.target.value);
              },
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <p style={{ textAlign: "center", margin: 0 }}>Billing Address</p>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            labelText={<span>Attention</span>}
            value={this.state.address_attention}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => {
                this.state.address_attention = event.target.value;
                this.setState({ ...this.state });
                this.propogateChange("address_attention", event.target.value);
              },
            }}
          />
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            labelText={<span>State</span>}
            value={this.state.address_state}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => {
                this.state.address_state = event.target.value;
                this.setState({ ...this.state });
                this.propogateChange("address_state", event.target.value);
              },
            }}
          />
        </GridItem> */}
        {/* <CustomInput
          labelText={<span>City</span>}
          value={this.state.address_city}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => {
              this.state.address_city = event.target.value;
              this.setState({ ...this.state });
              this.propogateChange("address_city", event.target.value);
            },
          }}
        /> */}
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <Dropdown
            labelText="State"
            data={this.state.stateData}
            value={
              this.state.address_state
                ? this.state.address_state.value
                : this.state.address_state
            }
            onChange={(event, element) => {
              this.state.address_state = {
                id: element.props.name,
                name: element.props.children,
                value: element.props.value,
              };
              this.setState({ ...this.state });
              this.propogateChange("address_state", element.props.name);

              // Call cities
              this.getCity();
            }}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={12} lg={10} style={{ marginTop: 18 }}>
          <Dropdown
            labelText="City"
            data={this.state.cityData}
            value={this.state.address_city.value}
            onChange={(event, element) => {
              console.log(element);
              this.state.address_city = {
                id: element.props.name,
                name: element.props.children,
                value: element.props.value,
              };
              this.setState({ ...this.state });
              this.propogateChange("address_city", element.props.name);
            }}
            disabled={this.state.address_state ? false : true}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={!/^^$|[0-9]{6}$/.test(this.state.address_zip) ? true : false}
            labelText={<span>Pincode</span>}
            value={this.state.address_zip}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => {
                this.state.address_zip = event.target.value;
                this.setState({ ...this.state });
                this.propogateChange("address_zip", event.target.value);
              },
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            labelText={<span>Address</span>}
            value={this.state.address_str_1}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => {
                this.state.address_str_1 = event.target.value;
                this.setState({ ...this.state });
                this.propogateChange("address_str_1", event.target.value);
              },
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={
              this.state.address_phone
                ? !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.state.address_phone)
                : false
            }
            labelText={<span>Phone</span>}
            value={this.state.address_phone}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => {
                console.log(
                  this.state.address_phone
                    ? !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(
                        this.state.address_phone
                      )
                    : false
                );
                this.state.address_phone = event.target.value;
                this.setState({ ...this.state });
                this.propogateChange("address_phone", event.target.value);
              },
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
