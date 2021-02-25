/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import { Grid, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import * as companyAPI from "api/Company";

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
      signatory: "",
      cin: "",
      pan: "",
      email: "",
      mobile: "",

      account_bank: "",
      account_number: "",
      account_number_copy: "",
      account_ifsc: "",
      gstin: "",

      apiCalled: false,
    };
  }

  handleSetState = (newState) => {
    this.props.handleSetState(newState);
    this.setState({ ...newState });
  };

  render() {
    const { classes } = this.props;
    if (this.state.apiCalled === false) {
      //Calling API
      companyAPI.getCompany(
        (data) => {
          this.state.name = data.name;
          this.state.signatory = data.signatory;
          this.state.mobile = data.mobile;
          this.state.email = data.email;
          this.state.cin = data.cin;
          this.state.pan = data.pan;

          this.state.account_bank = data.account_name;
          this.state.account_number = data.account_number;
          this.state.account_number_copy = data.account_number;
          this.state.account_ifsc = data.account_ifsc;
          this.state.gstin = data.gstin;

          this.state.apiCalled = true;
          this.setState({ ...this.state });
        },
        () => {}
      );
    }
    return (
      <Grid contianer spacing={2} alignItems="center" wrap="wrap">
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <h3>Company Details</h3>
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <TextField
            fullWidth={true}
            type="text"
            margin="dense"
            error={this.state.name.length > 0 ? false : true}
            label={
              <div>
                Company Name <small>(required)</small>
              </div>
            }
            value={this.state.name}
            onChange={(e) => {
              this.state.name = e.target.value;
              this.handleSetState({ ...this.state });
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <TextField
            fullWidth={true}
            type="text"
            margin="dense"
            error={this.state.signatory.length > 0 ? false : true}
            // label="Authoried Signatory(required)"
            label={
              <div>
                Authoried Signatory <small>(required)</small>
              </div>
            }
            value={this.state.signatory}
            onChange={(e) => {
              this.state.signatory = e.target.value;
              this.handleSetState({ ...this.state });
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <TextField
            type="text"
            error={!/^^$|[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(this.state.pan)}
            margin="dense"
            fullWidth={true}
            label="Company PAN"
            value={this.state.pan}
            onChange={(e) => {
              this.state.pan = e.target.value;
              this.handleSetState({ ...this.state });
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <TextField
            fullWidth={true}
            error={
              !/^^$|([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/.test(
                this.state.cin
              )
            }
            type="text"
            margin="dense"
            label="Company CIN"
            value={this.state.cin}
            onChange={(e) => {
              this.state.cin = e.target.value;
              this.handleSetState({ ...this.state });
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <TextField
            fullWidth={true}
            error={
              this.state.mobile
                ? !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.state.mobile)
                : false
            }
            type="text"
            margin="dense"
            label="Company Mobile"
            value={this.state.mobile}
            onChange={(e) => {
              this.state.mobile = e.target.value;
              this.handleSetState({ ...this.state });
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <h3>Company Account Details</h3>
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <TextField
            fullWidth={true}
            error={
              (this.state.account_ifsc || this.state.account_number) &&
              this.state.account_bank.length === 0
                ? true
                : false
            }
            type="text"
            margin="dense"
            label="Bank Name "
            value={this.state.account_bank}
            onChange={(e) => {
              this.state.account_bank = e.target.value;
              this.handleSetState({ ...this.state });
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <TextField
            fullWidth={true}
            error={!/^^$|\d{9,18}$/.test(this.state.account_number)}
            type="text"
            margin="dense"
            label="Bank Account Number"
            value={this.state.account_number}
            onChange={(e) => {
              this.state.account_number = e.target.value;
              this.handleSetState({ ...this.state });
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <TextField
            fullWidth={true}
            error={
              this.state.account_number === this.state.account_number_copy
                ? false
                : true
            }
            type="text"
            margin="dense"
            label="Re-enter Bank Account Number"
            value={this.state.account_number_copy}
            onChange={(e) => {
              this.state.account_number_copy = e.target.value;
              this.handleSetState({ ...this.state });
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <TextField
            fullWidth={true}
            error={!/^^$|[A-Z]{4}0[A-Z0-9]{6}$/.test(this.state.account_ifsc)}
            type="text"
            margin="dense"
            label="Bank IFSC"
            value={this.state.account_ifsc}
            onChange={(e) => {
              this.state.account_ifsc = e.target.value;
              this.handleSetState({ ...this.state });
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} sm={12} lg={12}>
          <TextField
            fullWidth={true}
            error={
              !/^^$|\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(
                this.state.gstin
              )
            }
            type="text"
            margin="dense"
            label="GSTIN"
            value={this.state.gstin}
            onChange={(e) => {
              this.state.gstin = e.target.value;
              this.handleSetState({ ...this.state });
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step3);
