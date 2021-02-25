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

class Step4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      SLA_inbound_perf_trucks_unloaded_percent: {
        value: "",
        error: false,
        desc: "Expected level of performance of unloading inbound trucks",
        placeholder: "SLA inbound performance trucks unloaded %",
        helperText: "SLA inbound performance trucks unloaded %",
      },
      SLA_inbound_perf_put_away_percent: {
        value: "",
        error: false,
        desc: "Expected level of performance of putting stock in warehouse",
        placeholder: "SLA inbound performance put away %",
        helperText: "SLA inbound performance put away %",
      },
      SLA_outbound_perf_orders_picked_percent: {
        value: "",
        error: false,
        desc:
          "Expected level of performance of orders (picked within agreed time)",
        placeholder: "SLA outbound performance orders picked %",
        helperText: "SLA outbound performance orders picked %",
      },
      SLA_outbound_perf_orders_packed_dispatched_percent: {
        value: "",
        error: false,
        desc:
          "Expected level of performance of orders (packed and despatched within agreed time)",
        placeholder: "SLA outbound performace orders packed dispatched %",
        helperText: "SLA outbound performace orders packed dispatched %",
      },
      SLA_stock_mgmt_percent: {
        value: "",
        error: false,
        desc:
          "Maximum percentage of products out of total products stored for which stock adjustement was needed (% stock adjustment (total number of stock location adjustment against total number of locations)",
        placeholder: "SLA stock mgmt %",
        helperText: "SLA stock mgmt %",
      },
      SLA_returns_mgmt_percent: {
        value: "",
        error: false,
        desc:
          "Expected level of percentage of returns processes as per agreed process",
        placeholder: "SLA returns mgmt %",
        helperText: "SLA returns mgmt %",
      },
      SLA_complaint_perf_percent: {
        value: "",
        error: false,
        desc:
          "Expected level of percentage of complaints resolved per agreed process",
        placeholder: "SLA compliant performance %",
        helperText: "SLA compliant performance %",
      },
      SLA_otif_delivery_percent: {
        value: "",
        error: false,
        desc:
          "Expected level of performance of deliveries made On-Time In - Full",
        placeholder: "SLA otif delivery %",
        helperText: "SLA otif delivery %",
      },
      kpi_inbound_perf_trucks_unloaded_hours: {
        value: "",
        error: false,
        desc: "Measure of performance of unloading inbound trucks",
        placeholder: "KPI inbound performance trucks unloaded hrs",
        helperText: "KPI inbound performance trucks unloaded hrs",
      },
      kpi_inbound_perf_put_away_hours: {
        value: "",
        error: false,
        desc: "Measure of performance of putting stock in warehouse",
        placeholder: "KPI inbound performance put away hrs",
        helperText: "KPI inbound performance put away hrs",
      },
      kpi_outbound_perf_orders_picked_hours: {
        value: "",
        error: false,
        desc: "Measure of performance of orders (picked within agreed time)",
        placeholder: "KPI outbound performance orders picked hrs",
        helperText: "KPI outbound performance orders picked hrs",
      },
      kpi_outbound_perf_orders_packed_dispatched_hours: {
        value: "",
        error: false,
        desc:
          "Measure of performance of orders (packed and despatched within agreed time)",
        placeholder: "KPI outbound performance orders packed dispatched hrs",
        helperText: "KPI outbound performance orders packed dispatched hrs",
      },
      kpi_returns_mgmt_days: {
        value: "",
        error: false,
        desc: "Percentage of returns processes as per agreed process",
        placeholder: "KPI returns mgmt days",
        helperText: "KPI returns mgmt days",
      },
      kpi_complaint_perf_days: {
        value: "",
        error: false,
        desc: "Percentage of complaints resolved per agreed process",
        placeholder: "KPI compliant performance days",
        helperText: "KPI compliant performance days",
      },
      partner_remarks_observations: {
        value: "",
        error: false,
        desc:
          "Any additional observation (non-commercial, not contractually binding)",
        placeholder: "Partner remarks observations",
        helperText: "Partner remarks observations",
      },
    };
  }
  sendState() {
    return {
      SLA_inbound_perf_trucks_unloaded_percent: this.state
        .SLA_inbound_perf_trucks_unloaded_percent,
      SLA_inbound_perf_put_away_percent: this.state
        .SLA_inbound_perf_put_away_percent,
      SLA_outbound_perf_orders_picked_percent: this.state
        .SLA_outbound_perf_orders_picked_percent,
      SLA_outbound_perf_orders_packed_dispatched_percent: this.state
        .SLA_outbound_perf_orders_packed_dispatched_percent,
      SLA_stock_mgmt_percent: this.state.SLA_stock_mgmt_percent,
      SLA_returns_mgmt_percent: this.state.SLA_returns_mgmt_percent,
      SLA_complaint_perf_percent: this.state.SLA_complaint_perf_percent,
      SLA_otif_delivery_percent: this.state.SLA_otif_delivery_percent,
      kpi_inbound_perf_trucks_unloaded_hours: this.state
        .kpi_inbound_perf_trucks_unloaded_hours,
      kpi_inbound_perf_put_away_hours: this.state
        .kpi_inbound_perf_put_away_hours,
      kpi_outbound_perf_orders_picked_hours: this.state
        .kpi_outbound_perf_orders_picked_hours,
      kpi_outbound_perf_orders_packed_dispatched_hours: this.state
        .kpi_outbound_perf_orders_packed_dispatched_hours,
      kpi_returns_mgmt_days: this.state.kpi_returns_mgmt_days,
      kpi_complaint_perf_days: this.state.kpi_complaint_perf_days,
      partner_remarks_observations: this.state.partner_remarks_observations,
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
  // function that verifies if a string length is within the given limit
  verifyLimit(value, limit) {
    if (value.length <= limit) {
      return true;
    }
    return false;
  }
  // function that verifies number is a valid percentage value
  verifyPercent(value) {
    return parseInt(value) >= 0 && parseInt(value) <= 100;
  }
  // function that verifies number is not negative
  verifyPositiveNumber(value) {
    return parseInt(value) >= 0;
  }
  change(event, stateName, type, stateNameEqualTo) {
    let temp = this.state[stateName];
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          temp.error = false;
          this.setState({ [stateName]: temp });
        } else {
          temp.error = true;
          this.setState({ [stateName]: temp });
        }
        break;
      case "limit":
        if (this.verifyLimit(event.target.value, stateNameEqualTo)) {
          temp.error = false;
          this.setState({ [stateName]: temp });
        } else {
          temp.error = true;
          this.setState({ [stateName]: temp });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          temp.error = false;
          this.setState({ [stateName]: temp });
        } else {
          temp.error = true;
          this.setState({ [stateName]: temp });
        }
        break;
      case "percentage":
        if (this.verifyPercent(event.target.value)) {
          temp.error = false;
          this.setState({ [stateName]: temp });
        } else {
          temp.error = true;
          this.setState({ [stateName]: temp });
        }
        break;
      case "positiveNumber":
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
      this.state.SLA_complaint_perf_percent.error ||
      this.state.SLA_inbound_perf_put_away_percent.error ||
      this.state.SLA_inbound_perf_trucks_unloaded_percent.error ||
      this.state.SLA_otif_delivery_percent.error ||
      this.state.SLA_outbound_perf_orders_packed_dispatched_percent.error ||
      this.state.SLA_outbound_perf_orders_picked_percent.error ||
      this.state.SLA_returns_mgmt_percent.error ||
      this.state.SLA_stock_mgmt_percent.error ||
      this.state.kpi_complaint_perf_days.error ||
      this.state.kpi_inbound_perf_put_away_hours.error ||
      this.state.kpi_inbound_perf_trucks_unloaded_hours.error ||
      this.state.kpi_outbound_perf_orders_packed_dispatched_hours.error ||
      this.state.kpi_outbound_perf_orders_picked_hours.error ||
      this.state.kpi_returns_mgmt_days.error ||
      this.state.partner_remarks_observations.error
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
            error={this.state.SLA_inbound_perf_trucks_unloaded_percent.error}
            labelText={
              <span>
                {
                  this.state.SLA_inbound_perf_trucks_unloaded_percent
                    .placeholder
                }
              </span>
            }
            helperText={
              this.state.SLA_inbound_perf_trucks_unloaded_percent.desc
            }
            value={this.state.SLA_inbound_perf_trucks_unloaded_percent.value}
            id="SLA_inbound_perf_trucks_unloaded_percent"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "SLA_inbound_perf_trucks_unloaded_percent",
                  "percentage"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.SLA_inbound_perf_put_away_percent.error}
            value={this.state.SLA_inbound_perf_put_away_percent.value}
            labelText={
              <span>
                {this.state.SLA_inbound_perf_put_away_percent.placeholder}
              </span>
            }
            helperText={this.state.SLA_inbound_perf_put_away_percent.desc}
            id="SLA_inbound_perf_put_away_percent"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "SLA_inbound_perf_put_away_percent",
                  "percentage"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.SLA_outbound_perf_orders_picked_percent.error}
            value={this.state.SLA_outbound_perf_orders_picked_percent.value}
            labelText={
              <span>
                {this.state.SLA_outbound_perf_orders_picked_percent.placeholder}
              </span>
            }
            helperText={this.state.SLA_outbound_perf_orders_picked_percent.desc}
            id="SLA_outbound_perf_orders_picked_percent"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "SLA_outbound_perf_orders_picked_percent",
                  "percentage"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={
              this.state.SLA_outbound_perf_orders_packed_dispatched_percent
                .error
            }
            value={
              this.state.SLA_outbound_perf_orders_packed_dispatched_percent
                .value
            }
            labelText={
              <span>
                {
                  this.state.SLA_outbound_perf_orders_packed_dispatched_percent
                    .placeholder
                }
              </span>
            }
            helperText={
              this.state.SLA_outbound_perf_orders_packed_dispatched_percent.desc
            }
            id="SLA_outbound_perf_orders_packed_dispatched_percent"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "SLA_outbound_perf_orders_packed_dispatched_percent",
                  "percentage"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.SLA_stock_mgmt_percent.error}
            value={this.state.SLA_stock_mgmt_percent.value}
            labelText={
              <span>{this.state.SLA_stock_mgmt_percent.placeholder}</span>
            }
            helperText={this.state.SLA_stock_mgmt_percent.desc}
            id="SLA_stock_mgmt_percent"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(event, "SLA_stock_mgmt_percent", "percentage"),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.SLA_returns_mgmt_percent.error}
            value={this.state.SLA_returns_mgmt_percent.value}
            labelText={
              <span>{this.state.SLA_returns_mgmt_percent.placeholder}</span>
            }
            helperText={this.state.SLA_returns_mgmt_percent.desc}
            id="SLA_returns_mgmt_percent"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(event, "SLA_returns_mgmt_percent", "percentage"),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.SLA_complaint_perf_percent.error}
            value={this.state.SLA_complaint_perf_percent.value}
            labelText={
              <span>{this.state.SLA_complaint_perf_percent.placeholder}</span>
            }
            helperText={this.state.SLA_complaint_perf_percent.desc}
            id="SLA_complaint_perf_percent"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(event, "SLA_complaint_perf_percent", "percentage"),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.SLA_otif_delivery_percent.error}
            value={this.state.SLA_otif_delivery_percent.value}
            labelText={
              <span>{this.state.SLA_otif_delivery_percent.placeholder}</span>
            }
            helperText={this.state.SLA_otif_delivery_percent.desc}
            id="SLA_otif_delivery_percent"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(event, "SLA_otif_delivery_percent", "percentage"),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.kpi_inbound_perf_trucks_unloaded_hours.error}
            value={this.state.kpi_inbound_perf_trucks_unloaded_hours.value}
            labelText={
              <span>
                {this.state.kpi_inbound_perf_trucks_unloaded_hours.placeholder}
              </span>
            }
            helperText={this.state.kpi_inbound_perf_trucks_unloaded_hours.desc}
            id="kpi_inbound_perf_trucks_unloaded_hours"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "kpi_inbound_perf_trucks_unloaded_hours",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.kpi_inbound_perf_put_away_hours.error}
            value={this.state.kpi_inbound_perf_put_away_hours.value}
            labelText={
              <span>
                {this.state.kpi_inbound_perf_put_away_hours.placeholder}
              </span>
            }
            helperText={this.state.kpi_inbound_perf_put_away_hours.desc}
            id="kpi_inbound_perf_put_away_hours"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "kpi_inbound_perf_put_away_hours",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.kpi_outbound_perf_orders_picked_hours.error}
            value={this.state.kpi_outbound_perf_orders_picked_hours.value}
            labelText={
              <span>
                {this.state.kpi_outbound_perf_orders_picked_hours.placeholder}
              </span>
            }
            helperText={this.state.kpi_outbound_perf_orders_picked_hours.desc}
            id="kpi_outbound_perf_orders_picked_hours"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "kpi_outbound_perf_orders_picked_hours",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={
              this.state.kpi_outbound_perf_orders_packed_dispatched_hours.error
            }
            value={
              this.state.kpi_outbound_perf_orders_packed_dispatched_hours.value
            }
            labelText={
              <span>
                {
                  this.state.kpi_outbound_perf_orders_packed_dispatched_hours
                    .placeholder
                }
              </span>
            }
            helperText={
              this.state.kpi_outbound_perf_orders_packed_dispatched_hours.desc
            }
            id="kpi_outbound_perf_orders_packed_dispatched_hours"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(
                  event,
                  "kpi_outbound_perf_orders_packed_dispatched_hours",
                  "positiveNumber"
                ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.kpi_returns_mgmt_days.error}
            value={this.state.kpi_returns_mgmt_days.value}
            labelText={
              <span>{this.state.kpi_returns_mgmt_days.placeholder}</span>
            }
            helperText={this.state.kpi_returns_mgmt_days.desc}
            id="kpi_returns_mgmt_days"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(event, "kpi_returns_mgmt_days", "positiveNumber"),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.kpi_complaint_perf_days.error}
            value={this.state.kpi_complaint_perf_days.value}
            labelText={
              <span>{this.state.kpi_complaint_perf_days.placeholder}</span>
            }
            helperText={this.state.kpi_complaint_perf_days.desc}
            id="kpi_complaint_perf_days"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              type: "number",
              onChange: (event) =>
                this.change(event, "kpi_complaint_perf_days", "positiveNumber"),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            error={this.state.partner_remarks_observations.error}
            value={this.state.partner_remarks_observations.value}
            labelText={
              <span>{this.state.partner_remarks_observations.placeholder}</span>
            }
            helperText={this.state.partner_remarks_observations.desc}
            id="partner_remarks_observations"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: this.props.viewOnly,
              onChange: (event) =>
                this.change(
                  event,
                  "partner_remarks_observations",
                  "limit",
                  160
                ),
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step4.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step4);
