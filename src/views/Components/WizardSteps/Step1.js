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

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.firstName !== this.props.firstName) {
      this.setState({
        firstName: this.props.firstName,
        firstNameState: this.props.firstName.length > 0 ? "success" : "error",
        lastName: this.props.lastName,
        lastNameState: this.props.lastName.length > 0 ? "success" : "error",
        // company_signatory: this.props.company_signatory,
        // company_signatoryState:
        //   this.props.company_signatory.length > 0 ? "success" : "error",
        // name: this.props.name,
        // nameState: this.props.name.length > 0 ? "success" : "error",
        email: this.props.email,
        emailState: this.props.email.length > 0 ? "success" : "error",
      });
    }
  };

  render() {
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
              type="file"
              name="profilePic"
              accept={"image/*"}
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
            // success={this.state.firstNameState === "success"}
            error={this.state.firstNameState === "error"}
            labelText={
              <span>
                First Name <small>(required)</small>
              </span>
            }
            id="firstName"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: this.state.firstName,
              onChange: (event) => this.change(event, "firstName", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            // success={this.state.lastNameState === "success"}
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
              value: this.state.lastName,
              onChange: (event) => this.change(event, "lastName", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <RecordVoiceOver className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
          {/* <CustomInput
            success={this.state.nameState === "success"}
            error={this.state.nameState === "error"}
            labelText={
              <span>
                Company Name <small>(required)</small>
              </span>
            }
            id="name"
            formControlProps={{
              fullWidth: true,
            }}
            value={this.state.name}
            inputProps={{
              onChange: (event) => this.change(event, "name", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <BusinessIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            success={this.state.company_signatoryState === "success"}
            error={this.state.company_signatoryState === "error"}
            labelText={
              <span>
                Authorized Signatory <small>(required)</small>
              </span>
            }
            id="company_signatory"
            formControlProps={{
              fullWidth: true,
            }}
            value={this.state.company_signatory}
            inputProps={{
              onChange: (event) =>
                this.change(event, "company_signatory", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <AssignmentIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          /> */}
        </GridItem>

        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            // success={this.state.emailState === "success"}
            error={this.state.emailState === "error"}
            labelText={
              <span>
                Email <small>(required)</small>
              </span>
            }
            id="email"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: this.state.email,
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
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step1);
