/* eslint-disable */
import React, { useState, useMemo, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import { red, blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EyeIcon from "@material-ui/icons/Visibility";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Alert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ClearIcon from "@material-ui/icons/Clear";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import * as WarehouseComponents from "views/Pages/EditWarehouse";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import RealWizard from "components/Wizard/RealWizard";

// Steps
import Step1 from "views/Components/WarehousePriceSteps/Step1";
import Step2 from "views/Components/WarehousePriceSteps/Step2";
import Step3 from "views/Components/WarehousePriceSteps/Step3";
import Step4 from "views/Components/WarehousePriceSteps/Step4";
import Step5 from "views/Components/WarehousePriceSteps/Step5";

// template components
import CustomButton from "components/CustomButtons/Button";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useDropzone } from "react-dropzone";

import * as Warehouse from "../../api/Warehouse";
import {
  DialogActions,
  DialogTitle,
  TextField,
  DialogContentText,
  Snackbar,
} from "@material-ui/core";
import ConfirmPopup from "views/Components/ConfirmPopup";
import { formatDate } from "views/util";
import { getDate } from "api/util";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  pink: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 20,
    "&:hover": {
      backgroundColor: red[900],
      cursor: "pointer",
    },
  },
  orange: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: blue[500],
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 20,
    "&:hover": {
      backgroundColor: blue[900],
      cursor: "pointer",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const Dropzone = React.memo(function (props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: props.accept,
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((item) => {
        if (props.isValid && !props.isValid(item)) return;
        state.images.push(item);
      });
      if (state.images.length === 0) {
        setState({
          ...state,
          images: [],
        });
        return;
      }
      setState({
        ...state,
        images: [state.images[state.images.length - 1]],
      });
    },
  });
  const { state, setState } = props;
  const classes = useStyles();
  const files = state.images.map((file) => {
    return (
      <>
        <Grid
          item
          style={{
            position: "relative",
          }}
        >
          {props.readOnly === true ? (
            <></>
          ) : (
            <Avatar className={classes.pink}>
              <DeleteIcon
                className={classes.small}
                onClick={() => {
                  state.images = state.images.filter((i) => i !== file);
                  setState({
                    ...state,
                  });
                }}
              />
            </Avatar>
          )}
          <Avatar
            className={classes.orange}
            onClick={() => {
              props.onView(file);
            }}
          >
            <EyeIcon className={classes.small} />
          </Avatar>
          <Tooltip title={file.name}>
            <Avatar
              alt="Remy Sharp"
              className={classes.large}
              src={URL.createObjectURL(file)}
            />
          </Tooltip>
        </Grid>
        <Grid style={{ marginTop: 10 }}>{props.rejectButton}</Grid>
      </>
    );
  });

  // const files = () => {
  //     return <Tooltip title="Warehouse Entrance">
  //         <Avatar alt="Remy Sharp" src={IMG} />
  //     </Tooltip>;
  // }

  return (
    <section
      className="container"
      style={{
        marginTop: 20,
      }}
    >
      {props.readOnly === true ? (
        <></>
      ) : (
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{
            width: "100%",
            height: "150px",
            border: "2px dashed #eeeeee68",
            borderRadius: "25px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#bbb",
          }}
        >
          <input {...getInputProps()} />
          <p>{props.placeholder}</p>
        </div>
      )}
      <h6>{props.uploadhelp || ""}</h6>
      <aside>
        <h4>{props.name}</h4>
        <Grid container spacing={2}>
          {files}
        </Grid>
      </aside>
      {props.actions}
      {state.errors.map((error) => (
        <Alert severity="error">{error}</Alert>
      ))}
    </section>
  );
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RequirementDocument = React.memo(function (props) {
  const [open, setOpen] = useState({
    isOpen: false,
    link: "",
    name: "",
  });
  const classes = useStyles();
  const handleClose = () =>
    setOpen({
      ...open,
      isOpen: false,
    });
  return (
    // <>
    //   <p>ISO Certificate</p>
    //   <p>Signed Agreement Document</p>
    // </>
    <>
      <Dropzone
        state={props.state}
        setState={props.setState}
        // accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        placeholder="Drag 'n' drop Document here, or click to select Document"
        // name="Document"
        // uploadhelp="Document should be of size less than 1MB"
        readOnly={props.readOnly === true}
        isValid={(item) => {
          let requiredSize = 1024 * 1024;
          if (item.size >= requiredSize) {
            return false;
          }
          return true;
        }}
        onView={(item) => {
          // setOpen({
          //     isOpen: true,
          //     link: URL.createObjectURL(item),
          //     name: item.name
          // });
          window.open(URL.createObjectURL(item), "_blank");
        }}
        actions={props.actions}
        rejectButton={props.rejectButton}
      />
    </>
  );
});

const RejectPopup = React.memo(function (props) {
  const [state, setState] = useState({
    message: "",
    open: false,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, open: props.open }));
  }, [props.open]);

  const handleClose = () => {
    props.handleClose();
  };

  const handleSuccess = () => {
    Warehouse.verifyDocument(
      props.id,
      state.message,
      () => {
        console.log("success");
        handleClose();
        window.location.href = "/vendor/documentation";
      },
      () => {
        console.log("error");
      }
    );
  };

  return (
    <div>
      <Dialog
        open={state.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reject Requirement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please send a message, to help the customer understand why you
            rejected the requirements document.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Message"
            type="text"
            fullWidth
            multiline
            rowsMax={10}
            onChange={(e) => {
              let value = e.target.value;
              setState((prevState) => ({
                ...prevState,
                message: value,
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSuccess} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

const RequirementsDocument = (props) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Requirements
      </Typography>
      {props.readOnly === true ? (
        <Typography variant="p" gutterBottom>
          Please view the Requirement Document Below
        </Typography>
      ) : (
        <Typography variant="p" gutterBottom>
          Please upload your requirements for this warehouse using the following
          format
        </Typography>
      )}
      <RequirementDocument
        onUpload={props.onUpload}
        {...props}
        readOnly={props.readOnly === true}
        actions={props.actions}
      />
      <Divider
        style={{
          marginTop: 20,
        }}
      />
    </>
  );
};

const QuotationDocument = (props) => {
  const {
    warehouseRates,
    setWarehouseRates,
    warehouseRatesRef,
    setUploadQuotationPopup,
  } = props;
  const { state, setState } = props;
  const WarehouseRates = React.memo(function (props) {
    const { setState } = props;
    const isReadOnly = props.readOnly === true ? true : false;
    const approvalData = props.state;
    const ref = props._ref;
    const { quotationState, quotationSetState } = props;

    let steps = [
      {
        stepId: 1,
        stepName: "Standard Charges",
        stepComponent: Step1,
        stepProps: {
          data: approvalData,
          viewOnly: props.viewOnly,
          submitClicked: state.submitClicked,
        },
      },
      {
        stepId: 2,
        stepName: "Premium Charges",
        stepComponent: Step2,
        stepProps: {
          data: approvalData,
          viewOnly: props.viewOnly,
          submitClicked: state.submitClicked,
        },
      },
      {
        stepId: 3,
        stepName: "Assumptions",
        stepComponent: Step3,
        stepProps: {
          data: approvalData,
          viewOnly: props.viewOnly,
          submitClicked: state.submitClicked,
        },
      },
      {
        stepId: 4,
        stepName: "KPIs and SLAs",
        stepComponent: Step4,
        stepProps: { data: approvalData, viewOnly: props.viewOnly },
      },
      {
        stepId: 5,
        stepName: "Contract Details",
        stepComponent: Step5,
        stepProps: { data: quotationState, viewOnly: props.viewOnly },
      },
    ];

    if (props.additionalSteps) {
      steps = steps.concat(props.additionalSteps);
    }
    return (
      // <div>
      <Grid container>
        <RealWizard
          validate
          button
          ref={ref}
          title="Indicative Rates (in ₹)"
          finishButton
          subtitle="(These rates cannot be changed later)"
          finishButtonClick={(value) => {
            let temp = {};
            // console.log(value);

            for (const property in value) {
              temp = { ...temp, ...value[property] };
            }

            setState((prevState) => ({
              ...prevState,
              storage_cost_per_sqft_per_week:
                temp.storage_cost_per_sqft_per_week,
              premium_storage_cost_per_sqft_per_week:
                temp.premium_storage_cost_per_sqft_per_week,
              handling_in_charge_per_carton: temp.handling_in_charge_per_carton,

              handling_in_charge_per_pallet: temp.handling_in_charge_per_pallet,

              handling_out_charge_per_carton:
                temp.handling_out_charge_per_carton,

              handling_out_charge_per_pallet:
                temp.handling_out_charge_per_pallet,

              vas_copacking_per_unit: temp.vas_copacking_per_unit,
              premium_handling_in_charge_per_carton:
                temp.premium_handling_in_charge_per_carton,

              premium_handling_in_charge_per_pallet:
                temp.premium_handling_in_charge_per_pallet,

              premium_handling_out_charge_per_carton:
                temp.premium_handling_out_charge_per_carton,

              premium_handling_out_charge_per_pallet:
                temp.premium_handling_out_charge_per_pallet,

              delivery_charge_per_drop: temp.delivery_charge_per_drop,
              premium_delivery_charge_per_drop:
                temp.premium_delivery_charge_per_drop,

              other_charges_per_week: temp.other_charges_per_week,
              SLA_inbound_perf_trucks_unloaded_percent:
                temp.SLA_inbound_perf_trucks_unloaded_percent,

              SLA_inbound_perf_put_away_percent:
                temp.SLA_inbound_perf_put_away_percent,

              SLA_outbound_perf_orders_picked_percent:
                temp.SLA_outbound_perf_orders_picked_percent,

              SLA_outbound_perf_orders_packed_dispatched_percent:
                temp.SLA_outbound_perf_orders_packed_dispatched_percent,

              SLA_stock_mgmt_percent: temp.SLA_stock_mgmt_percent,
              SLA_returns_mgmt_percent: temp.SLA_returns_mgmt_percent,
              SLA_complaint_perf_percent: temp.SLA_complaint_perf_percent,

              SLA_otif_delivery_percent: temp.SLA_otif_delivery_percent,

              kpi_inbound_perf_trucks_unloaded_hours:
                temp.kpi_inbound_perf_trucks_unloaded_hours,

              kpi_inbound_perf_put_away_hours:
                temp.kpi_inbound_perf_put_away_hours,

              kpi_outbound_perf_orders_picked_hours:
                temp.kpi_outbound_perf_orders_picked_hours,

              kpi_outbound_perf_orders_packed_dispatched_hours:
                temp.kpi_outbound_perf_orders_packed_dispatched_hours,

              kpi_returns_mgmt_days: temp.kpi_returns_mgmt_days,

              kpi_complaint_perf_days: temp.kpi_complaint_perf_days,
              allocated_space_per_week: temp.allocated_space_per_week,
              allocated_handled_in_cartons_per_day:
                temp.allocated_handled_in_cartons_per_day,

              allocated_handled_in_pallet_per_day:
                temp.allocated_handled_in_pallet_per_day,

              allocated_handled_out_cartons_per_day:
                temp.allocated_handled_out_cartons_per_day,

              allocated_handled_out_pallet_per_day:
                temp.allocated_handled_out_pallet_per_day,

              allocated_no_of_deliveries: temp.allocated_no_of_deliveries,

              allocated_delivery_kms_per_drop:
                temp.allocated_delivery_kms_per_drop,

              partner_remarks_observations: temp.partner_remarks_observations,

              allocated_delivery_Kgs_per_drop:
                temp.allocated_delivery_Kgs_per_drop,

              allocated_delivery_Cub_m__per_drop:
                temp.allocated_delivery_Cub_m__per_drop,

              submitClicked: true,
            }));
            quotationSetState((prevState) => ({
              ...prevState,
              availableFrom: temp.availableFrom,
              availableTo: temp.availableTo,
              areasqft: temp.areasqft,
            }));

            setUploadQuotationPopup((prevState) => ({
              ...prevState,
              open: true,
            }));
          }}
          color="warning"
          steps={steps}
        />
      </Grid>
    );
  });
  const classes = useStyles();
  // console.log(state);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Quotation
      </Typography>
      {props.ReadOnly === true ? (
        <Typography variant="p" gutterBottom>
          Please view the Quotation Document Below
        </Typography>
      ) : (
        <Typography variant="p" gutterBottom>
          Please upload your Quotation for the above requirement
          {/* using the
          following
          <a
            target="_blank"
            href="https://s3.ap-south-1.amazonaws.com/public.hubshub.in/contracts/partner-quotation-format.xlsx"
          >
            <b>{" format"}</b>
          </a> */}
        </Typography>
      )}
      {props.ReadOnly !== true ? (
        <>
          {/* <p>Quotation form here</p> */}
          <WarehouseRates
            state={warehouseRates}
            setState={setWarehouseRates}
            _ref={warehouseRatesRef}
            quotationState={state}
            quotationSetState={setState}
            setUploadQuotationPopup={setUploadQuotationPopup}
          />
          {/* <Grid container spacing={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item md={4} sm={4} xs={8}>
                <KeyboardDatePicker
                  variant="inline"
                  autoOk={true}
                  format="dd/MM/yyyy"
                  maxDate={state.availableTo || new Date("3050")}
                  margin="normal"
                  id="date-picker-inline"
                  label={
                    <span>
                      Allocated From <small>(required)</small>
                    </span>
                  }
                  value={state.availableFrom}
                  onChange={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      availableFrom: value,
                    }))
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item md={4} sm={4} xs={8}>
                <KeyboardDatePicker
                  variant="inline"
                  autoOk={true}
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label={
                    <span>
                      Allocated To <small>(required)</small>
                    </span>
                  }
                  minDate={state.availableFrom || new Date()}
                  value={state.availableTo}
                  onChange={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      availableTo: value,
                    }));
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item md={4} sm={4} xs={8} style={{ marginTop: 10 }}>
                <TextField
                  id="Warehouse-pincode"
                  label={
                    <span>
                      Area sq.ft <small>(required)</small>
                    </span>
                  }
                  type="number"
                  required={true}
                  fullWidth={true}
                  margin="dense"
                  value={state.areasqft}
                  onChange={(e) =>
                    setState({ ...state, areasqft: e.target.value })
                  }
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid> */}
          {props.actions}
        </>
      ) : (
        state.images.map((file) => {
          return (
            <Grid container>
              <Grid
                item
                style={{
                  position: "relative",
                }}
              >
                <Avatar
                  className={classes.orange}
                  onClick={() => {
                    window.open(URL.createObjectURL(file), "_blank");
                  }}
                >
                  <EyeIcon className={classes.small} />
                </Avatar>
                <Tooltip title={file.name}>
                  <Avatar
                    alt="Remy Sharp"
                    className={classes.large}
                    src={URL.createObjectURL(file)}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          );
        })
      )}
      <Divider
        style={{
          marginTop: 20,
        }}
      />
    </>
  );
};

const dataURLtoFile = (base64str, filename) => {
  var binary = atob(base64str.replace(/\s/g, ""));
  var len = binary.length;
  var buffer = new ArrayBuffer(len);
  var view = new Uint8Array(buffer);
  for (var i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }
  var blob = new Blob([view], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  return blob;
};

const dataURLtopdf = (base64str, filename) => {
  var binary = atob(base64str.replace(/\s/g, ""));
  var len = binary.length;
  var buffer = new ArrayBuffer(len);
  var view = new Uint8Array(buffer);
  for (var i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }
  var blob = new Blob([view], { type: "application/pdf" });
  return blob;
};

const ContractAgreement = (props) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Contract Agreement
      </Typography>
      <Typography variant="p" gutterBottom>
        Please view the Contract Agreement Below
      </Typography>
      <RequirementDocument
        actions={props.actions}
        {...props}
        readOnly={true}
        actions={props.actions}
      />
      {/* <Divider
        style={{
          marginTop: 20,
        }}
      /> */}
    </>
  );
};

const Contract = (props) => {
  const defaults = {
    contract: {
      id: props.match.params.id,
      detailsToken: "",
      apiCalled: false,
      showLoading: true,
      RequirementsReadOnly: false,
      QuotationDisplay: false,
      QuotationReadOnly: false,
      ContractDisplay: false,
      ContractReadOnly: false,
    },
    RequirementDocument: {
      images: [],
      apiCalled: true,
      errors: [],
    },
    QuotationDocument: {
      images: [],
      apiCalled: true,
      // availableFrom: null,
      // availableTo: null,
      // areasqft: null,
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
      errors: [],
    },
    ContractDocument: {
      images: [],
      apiCalled: true,
      errors: [],
    },
    confirmPopup: {
      open: false,
      titleText: "Are You Sure?",
      message: {
        show: false,
        label: "",
      },
      contentText: "This Action Is Irreversible.",
      successFunction: () => {},
    },
    WarehouseRates: {
      ratesLoaded: false,
      storage_cost_per_sqft_per_week: {
        value: "",
        error: false,
        desc: 'Rate of space "allocated" for this contract.',
        placeholder: "Storage cost /sqft /week",
        helperText: "Storage cost /sqft /week",
      },
      premium_storage_cost_per_sqft_per_week: {
        value: "",
        error: false,
        desc: "Premium rate for additional space required",
        placeholder: "Premium storage cost /sqft /week",
        helperText: "Premium storage cost /sqft /week",
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
      premium_handling_in_charge_per_carton: {
        value: "",
        error: false,
        desc: "Premium rate to handle additional Inbound cartons ",
        placeholder: "Premium handling-in charge /carton",
        helperText: "Premium handling-in charge /carton",
      },
      premium_handling_in_charge_per_pallet: {
        value: "",
        error: false,
        desc: "Premium rate to handle additional Inbound pallets",
        placeholder: "Premium handling-in charge /pallet",
        helperText: "Premium handling-in charge /pallet",
      },
      premium_handling_out_charge_per_carton: {
        value: "",
        error: false,
        desc: "Premium rate to pick, pack and despatch additional cartons",
        placeholder: "Premium handling-out charge /carton",
        helperText: "Premium handling-out charge /carton",
      },
      premium_handling_out_charge_per_pallet: {
        value: "",
        error: false,
        desc: "Premium rate to pick, pack and despatch additional pallets ",
        placeholder: "Premium handling-out charge /pallet",
        helperText: "Premium handling-out charge /pallet",
      },
      delivery_charge_per_drop: {
        value: "",
        error: false,
        desc:
          "Delivery charge per drop within agreed criteria. e.g. within 10 kms, less than 20kgs, below 0.1 cub. m. Figures with vary. Average number of drops per day to be agreed.",
        placeholder: "Delivery charge /drop",
        helperText: "Delivery charge /drop",
      },
      premium_delivery_charge_per_drop: {
        value: "",
        error: false,
        desc:
          "Premium charge for delivery (beyond agreed daily number or more than agreed criteria of radius (Kms), Weight (Kgs) or Volume (Cub.m.) per drop",
        placeholder: "Premium delivery charge /drop",
        helperText: "Premium delivery charge /drop",
      },
      other_charges_per_week: {
        value: "",
        error: false,
        desc:
          "Any additional cost which warehouse incurs. e.g. labour union fee, local council fee etc.",
        placeholder: "Other charges /week",
        helperText: "Other charges /week",
      },
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
      partner_remarks_observations: {
        value: "",
        error: false,
        desc:
          "Any additional observation (non-commercial, not contractually binding)",
        placeholder: "Partner remarks observations",
        helperText: "Partner remarks observations",
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
      submitClicked: false,
    },
    uploadQuotationPopup: {
      open: false,
      titleText: "Are You Sure?",
      contentText:
        "This Will Mean You Have Accepted The Customer's Requirements.",
    },
    Snackbar: {
      open: false,
      component: <></>,
      message: "",
    },
  };

  const [contract, setContract] = useState(defaults.contract);
  const [confirmPopup, setConfirmPopup] = useState(defaults.confirmPopup);
  const [uploadQuotationPopup, setUploadQuotationPopup] = useState(
    defaults.uploadQuotationPopup
  );
  const [requirementDocument, setRequirementDocument] = useState(
    defaults.RequirementDocument
  );
  const [quotationDocument, setQuotationDocument] = useState(
    defaults.QuotationDocument
  );
  const [contractDocument, setContractDocument] = useState(
    defaults.ContractDocument
  );
  const [warehouseRates, setWarehouseRates] = useState(defaults.WarehouseRates);
  const [snackbar, setSnackbar] = useState(defaults.Snackbar);

  const classes = useStyles();

  if (contract.apiCalled === false) {
    setContract((prevState) => ({ ...prevState, apiCalled: true }));

    Warehouse.getContractByID(
      contract.id,
      (data) => {
        Warehouse.getDocuments(
          data.token,
          (documents) => {
            setContract({
              ...defaults.contract,
              apiCalled: true,
              showLoading: false,
              detailsToken: data.token,
              RequirementsReadOnly:
                documents.requirements !== null &&
                documents.requirements.length !== 0,
              QuotationReadOnly:
                documents.quotation !== null &&
                documents.quotation.length !== 0,
              QuotationDisplay:
                documents.requirements !== null &&
                documents.requirements.length !== 0,
              ContractDisplay:
                documents.contract !== null && documents.contract.length !== 0,
              ContractReadOnly:
                documents.contract !== null && documents.contract.length !== 0,
            });
            if (
              documents.requirements !== null &&
              documents.requirements.length !== 0
            ) {
              let file = dataURLtoFile(documents.requirements);
              setRequirementDocument({
                ...defaults.RequirementDocument,
                images: [file],
              });
            }
            if (
              documents.quotation !== null &&
              documents.quotation.length !== 0
            ) {
              let file = dataURLtopdf(documents.quotation);
              setQuotationDocument({
                ...defaults.QuotationDocument,
                images: [file],
              });
            } else {
              // Found the problem here the warehouse_id is the warehouse id and warehouse get is using warehouse_version_id to
              // query the warehouses not warehouse_id and is_active in conjunction.
              // Have a solution ready will apply it later
              Warehouse.getWarehouseById(
                data.warehouse_version_id,
                (data) => {
                  warehouseRates.storage_cost_per_sqft_per_week.value =
                    data.storage_cost_per_sqft_per_week;
                  warehouseRates.premium_storage_cost_per_sqft_per_week.value =
                    data.premium_storage_cost_per_sqft_per_week;
                  warehouseRates.handling_in_charge_per_carton.value =
                    data.handling_in_charge_per_carton;
                  warehouseRates.handling_in_charge_per_pallet.value =
                    data.handling_in_charge_per_pallet;
                  warehouseRates.handling_out_charge_per_carton.value =
                    data.handling_out_charge_per_carton;
                  warehouseRates.handling_out_charge_per_pallet.value =
                    data.handling_out_charge_per_pallet;
                  warehouseRates.vas_copacking_per_unit.value =
                    data.vas_copacking_per_unit;
                  warehouseRates.premium_handling_in_charge_per_carton.value =
                    data.premium_handling_in_charge_per_carton;
                  warehouseRates.premium_handling_in_charge_per_pallet.value =
                    data.premium_handling_in_charge_per_pallet;
                  warehouseRates.premium_handling_out_charge_per_carton.value =
                    data.premium_handling_out_charge_per_carton;
                  warehouseRates.premium_handling_out_charge_per_pallet.value =
                    data.premium_handling_out_charge_per_pallet;
                  warehouseRates.delivery_charge_per_drop.value =
                    data.delivery_charge_per_drop;
                  warehouseRates.premium_delivery_charge_per_drop.value =
                    data.premium_delivery_charge_per_drop;
                  warehouseRates.other_charges_per_week.value =
                    data.other_charges_per_week;
                  warehouseRates.SLA_inbound_perf_trucks_unloaded_percent.value =
                    data.SLA_inbound_perf_trucks_unloaded_percent;
                  warehouseRates.SLA_inbound_perf_put_away_percent.value =
                    data.SLA_inbound_perf_put_away_percent;
                  warehouseRates.SLA_outbound_perf_orders_picked_percent.value =
                    data.SLA_outbound_perf_orders_picked_percent;
                  warehouseRates.SLA_outbound_perf_orders_packed_dispatched_percent.value =
                    data.SLA_outbound_perf_orders_packed_dispatched_percent;
                  warehouseRates.SLA_stock_mgmt_percent.value =
                    data.SLA_stock_mgmt_percent;
                  warehouseRates.SLA_returns_mgmt_percent.value =
                    data.SLA_returns_mgmt_percent;
                  warehouseRates.SLA_complaint_perf_percent.value =
                    data.SLA_complaint_perf_percent;
                  warehouseRates.SLA_otif_delivery_percent.value =
                    data.SLA_otif_delivery_percent;
                  warehouseRates.kpi_inbound_perf_trucks_unloaded_hours.value =
                    data.kpi_inbound_perf_trucks_unloaded_hours;
                  warehouseRates.kpi_inbound_perf_put_away_hours.value =
                    data.kpi_inbound_perf_put_away_hours;
                  warehouseRates.kpi_outbound_perf_orders_picked_hours.value =
                    data.kpi_outbound_perf_orders_picked_hours;
                  warehouseRates.kpi_outbound_perf_orders_packed_dispatched_hours.value =
                    data.kpi_outbound_perf_orders_packed_dispatched_hours;
                  warehouseRates.kpi_returns_mgmt_days.value =
                    data.kpi_returns_mgmt_days;
                  warehouseRates.kpi_complaint_perf_days.value =
                    data.kpi_complaint_perf_days;
                  warehouseRates.allocated_space_per_week.value =
                    data.allocated_space_per_week;
                  warehouseRates.allocated_handled_in_cartons_per_day.value =
                    data.allocated_handled_in_cartons_per_day;
                  warehouseRates.allocated_handled_in_pallet_per_day.value =
                    data.allocated_handled_in_pallet_per_day;
                  warehouseRates.allocated_handled_out_cartons_per_day.value =
                    data.allocated_handled_out_cartons_per_day;
                  warehouseRates.allocated_handled_out_pallet_per_day.value =
                    data.allocated_handled_out_pallet_per_day;
                  warehouseRates.allocated_no_of_deliveries.value =
                    data.allocated_no_of_deliveries;
                  warehouseRates.allocated_delivery_kms_per_drop.value =
                    data.allocated_delivery_kms_per_drop;
                  warehouseRates.partner_remarks_observations.value =
                    data.partner_remarks_observations;
                  warehouseRates.allocated_delivery_Kgs_per_drop.value =
                    data.allocated_delivery_Kgs_per_drop;
                  warehouseRates.allocated_delivery_Cub_m__per_drop.value =
                    data.allocated_delivery_Cub_m__per_drop;
                  warehouseRates.ratesLoaded = true;
                  setWarehouseRates({
                    ...warehouseRates,
                  });
                },
                (pageData) => {},
                () => {}
              );
            }
            if (
              documents.contract !== null &&
              documents.contract.length !== 0
            ) {
              let file = dataURLtopdf(documents.contract);
              setContractDocument({
                ...defaults.ContractDocument,
                images: [file],
              });
            }
          },
          () => {}
        );
      },
      () => {}
    );
  }

  let warehouseRatesRef = React.useRef(null);

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setSnackbar({
            ...snackbar,
            open: false,
          });
        }}
      >
        {snackbar.component}
      </Snackbar>
      <Backdrop className={classes.backdrop} open={contract.showLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <RequirementsDocument
        state={requirementDocument}
        setState={setRequirementDocument}
        readOnly={true}
        actions={<></>}
        rejectButton={
          contract.QuotationReadOnly ? (
            <></>
          ) : (
            <div style={{ marginLeft: 10 }}>
              <CustomButton
                variant="contained"
                onClick={() => {
                  setConfirmPopup((prevState) => ({
                    ...prevState,
                    open: true,
                    message: {
                      show: true,
                      label: "",
                    },
                    contentText:
                      "Please send a message, to help the customer understand why you rejected the requirements document.",
                    successFunction: (message) => {
                      Warehouse.verifyDocument(
                        props.match.params.id,
                        message,
                        () => {
                          window.location.href = "/vendor/documentation";
                        },
                        () => {
                          console.log("error");
                        }
                      );
                    },
                  }));
                }}
              >
                Regret
              </CustomButton>
            </div>
          )
        }
      />
      {contract.QuotationDisplay ? (
        <QuotationDocument
          state={quotationDocument}
          warehouseRatesRef={warehouseRatesRef}
          warehouseRates={warehouseRates}
          setWarehouseRates={setWarehouseRates}
          setState={setQuotationDocument}
          ReadOnly={contract.QuotationReadOnly}
          setUploadQuotationPopup={setUploadQuotationPopup}
          actions={
            contract.QuotationReadOnly !== true ? (
              <Grid
                style={{
                  marginTop: 20,
                }}
              >
                {/* <Button
                  variant="contained"
                  // onClick={() => {
                  //   console.log(warehouseRatesRef.current.finishButtonClick());
                  //   if (
                  //     !warehouseRatesRef.current.isValid() ||
                  //     quotationDocument.areasqft === null ||
                  //     quotationDocument.availableFrom === null ||
                  //     quotationDocument.availableTo === null
                  //   ) {
                  //     // alert("Please fill all the required fields");
                  //     // warehouseRatesRef.current.finishButtonClick();
                  //     // setSnackbar((prevState) => ({
                  //     //   ...prevState,
                  //     //   open: true,
                  //     //   component: (
                  //     //     <Alert severity="error">
                  //     //       Please correct all form errors
                  //     //     </Alert>
                  //     //   ),
                  //     // }));
                  //     // console.log(warehouseRates);
                  //     return;
                  //   }

                  //   setUploadQuotationPopup((prevState) => ({
                  //     ...prevState,
                  //     open: true,
                  //   }));
                  // }}
                >
                  {" "}
                  Upload{" "}
                </Button> */}
                <ConfirmPopup
                  open={uploadQuotationPopup.open}
                  titleText={uploadQuotationPopup.titleText}
                  contentText={uploadQuotationPopup.contentText}
                  handleClose={() =>
                    setUploadQuotationPopup((prevState) => ({
                      ...prevState,
                      open: false,
                    }))
                  }
                  handleSubmit={() => {
                    setContract({
                      ...contract,
                      showLoading: true,
                    });
                    Warehouse.uploadContract(
                      props.match.params.id,
                      {
                        storage_cost_per_sqft_per_week: warehouseRates
                          .storage_cost_per_sqft_per_week.value
                          ? warehouseRates.storage_cost_per_sqft_per_week.value
                          : 0.0,
                        premium_storage_cost_per_sqft_per_week: warehouseRates
                          .premium_storage_cost_per_sqft_per_week.value
                          ? warehouseRates
                              .premium_storage_cost_per_sqft_per_week.value
                          : 0.0,
                        handling_in_charge_per_carton: warehouseRates
                          .handling_in_charge_per_carton.value
                          ? warehouseRates.handling_in_charge_per_carton.value
                          : 0.0,
                        handling_in_charge_per_pallet: warehouseRates
                          .handling_in_charge_per_pallet.value
                          ? warehouseRates.handling_in_charge_per_pallet.value
                          : 0.0,
                        handling_out_charge_per_carton: warehouseRates
                          .handling_out_charge_per_carton.value
                          ? warehouseRates.handling_out_charge_per_carton.value
                          : 0.0,
                        handling_out_charge_per_pallet: warehouseRates
                          .handling_out_charge_per_pallet.value
                          ? warehouseRates.handling_out_charge_per_pallet.value
                          : 0.0,
                        vas_copacking_per_unit: warehouseRates
                          .vas_copacking_per_unit.value
                          ? warehouseRates.vas_copacking_per_unit.value
                          : 0.0,
                        premium_handling_in_charge_per_carton: warehouseRates
                          .premium_handling_in_charge_per_carton.value
                          ? warehouseRates.premium_handling_in_charge_per_carton
                              .value
                          : 0.0,
                        premium_handling_in_charge_per_pallet: warehouseRates
                          .premium_handling_in_charge_per_pallet.value
                          ? warehouseRates.premium_handling_in_charge_per_pallet
                              .value
                          : 0.0,
                        premium_handling_out_charge_per_carton: warehouseRates
                          .premium_handling_out_charge_per_carton.value
                          ? warehouseRates
                              .premium_handling_out_charge_per_carton.value
                          : 0.0,
                        premium_handling_out_charge_per_pallet: warehouseRates
                          .premium_handling_out_charge_per_pallet.value
                          ? warehouseRates
                              .premium_handling_out_charge_per_pallet.value
                          : 0.0,
                        delivery_charge_per_drop: warehouseRates
                          .delivery_charge_per_drop.value
                          ? warehouseRates.delivery_charge_per_drop.value
                          : 0.0,
                        premium_delivery_charge_per_drop: warehouseRates
                          .premium_delivery_charge_per_drop.value
                          ? warehouseRates.premium_delivery_charge_per_drop
                              .value
                          : 0.0,
                        other_charges_per_week: warehouseRates
                          .other_charges_per_week.value
                          ? warehouseRates.other_charges_per_week.value
                          : 0.0,
                        SLA_inbound_perf_trucks_unloaded_percent: warehouseRates
                          .SLA_inbound_perf_trucks_unloaded_percent.value
                          ? warehouseRates
                              .SLA_inbound_perf_trucks_unloaded_percent.value
                          : 0.0,
                        SLA_inbound_perf_put_away_percent: warehouseRates
                          .SLA_inbound_perf_put_away_percent.value
                          ? warehouseRates.SLA_inbound_perf_put_away_percent
                              .value
                          : 0.0,
                        SLA_outbound_perf_orders_picked_percent: warehouseRates
                          .SLA_outbound_perf_orders_picked_percent.value
                          ? warehouseRates
                              .SLA_outbound_perf_orders_picked_percent.value
                          : 0.0,
                        SLA_outbound_perf_orders_packed_dispatched_percent: warehouseRates
                          .SLA_outbound_perf_orders_packed_dispatched_percent
                          .value
                          ? warehouseRates
                              .SLA_outbound_perf_orders_packed_dispatched_percent
                              .value
                          : 0.0,
                        SLA_stock_mgmt_percent: warehouseRates
                          .SLA_stock_mgmt_percent.value
                          ? warehouseRates.SLA_stock_mgmt_percent.value
                          : 0.0,
                        SLA_returns_mgmt_percent: warehouseRates
                          .SLA_returns_mgmt_percent.value
                          ? warehouseRates.SLA_returns_mgmt_percent.value
                          : 0.0,
                        SLA_complaint_perf_percent: warehouseRates
                          .SLA_complaint_perf_percent.value
                          ? warehouseRates.SLA_complaint_perf_percent.value
                          : 0.0,
                        SLA_otif_delivery_percent: warehouseRates
                          .SLA_otif_delivery_percent.value
                          ? warehouseRates.SLA_otif_delivery_percent.value
                          : 0.0,
                        kpi_inbound_perf_trucks_unloaded_hours: warehouseRates
                          .kpi_inbound_perf_trucks_unloaded_hours.value
                          ? warehouseRates
                              .kpi_inbound_perf_trucks_unloaded_hours.value
                          : 0.0,
                        kpi_inbound_perf_put_away_hours: warehouseRates
                          .kpi_inbound_perf_put_away_hours.value
                          ? warehouseRates.kpi_inbound_perf_put_away_hours.value
                          : 0.0,
                        kpi_outbound_perf_orders_picked_hours: warehouseRates
                          .kpi_outbound_perf_orders_picked_hours.value
                          ? warehouseRates.kpi_outbound_perf_orders_picked_hours
                              .value
                          : 0.0,
                        kpi_outbound_perf_orders_packed_dispatched_hours: warehouseRates
                          .kpi_outbound_perf_orders_packed_dispatched_hours
                          .value
                          ? warehouseRates
                              .kpi_outbound_perf_orders_packed_dispatched_hours
                              .value
                          : 0.0,
                        kpi_returns_mgmt_days: warehouseRates
                          .kpi_returns_mgmt_days.value
                          ? warehouseRates.kpi_returns_mgmt_days.value
                          : 0.0,
                        kpi_complaint_perf_days: warehouseRates
                          .kpi_complaint_perf_days.value
                          ? warehouseRates.kpi_complaint_perf_days.value
                          : 0.0,
                        allocated_space_per_week: warehouseRates
                          .allocated_space_per_week.value
                          ? warehouseRates.allocated_space_per_week.value
                          : 0.0,
                        allocated_handled_in_cartons_per_day: warehouseRates
                          .allocated_handled_in_cartons_per_day.value
                          ? warehouseRates.allocated_handled_in_cartons_per_day
                              .value
                          : 0.0,
                        allocated_handled_in_pallet_per_day: warehouseRates
                          .allocated_handled_in_pallet_per_day.value
                          ? warehouseRates.allocated_handled_in_pallet_per_day
                              .value
                          : 0.0,
                        allocated_handled_out_cartons_per_day: warehouseRates
                          .allocated_handled_out_cartons_per_day.value
                          ? warehouseRates.allocated_handled_out_cartons_per_day
                              .value
                          : 0.0,
                        allocated_handled_out_pallet_per_day: warehouseRates
                          .allocated_handled_out_pallet_per_day.value
                          ? warehouseRates.allocated_handled_out_pallet_per_day
                              .value
                          : 0.0,
                        allocated_no_of_deliveries: warehouseRates
                          .allocated_no_of_deliveries.value
                          ? warehouseRates.allocated_no_of_deliveries.value
                          : 0.0,
                        allocated_delivery_kms_per_drop: warehouseRates
                          .allocated_delivery_kms_per_drop.value
                          ? warehouseRates.allocated_delivery_kms_per_drop.value
                          : 0.0,
                        partner_remarks_observations: warehouseRates
                          .partner_remarks_observations.value
                          ? warehouseRates.partner_remarks_observations.value
                          : 0.0,
                        allocated_delivery_Kgs_per_drop: warehouseRates
                          .allocated_delivery_Kgs_per_drop.value
                          ? warehouseRates.allocated_delivery_Kgs_per_drop.value
                          : 0.0,
                        allocated_delivery_Cub_m__per_drop: warehouseRates
                          .allocated_delivery_Cub_m__per_drop.value
                          ? warehouseRates.allocated_delivery_Cub_m__per_drop
                              .value
                          : 0.0,
                        // ...quotationDocument,
                        rent_from: getDate(
                          quotationDocument.availableFrom.value
                        ),
                        rent_to: getDate(quotationDocument.availableTo.value),
                        area: quotationDocument.areasqft.value,
                      },
                      () => {
                        setContract({
                          ...contract,
                          QuotationReadOnly: true,
                          showLoading: true,
                          apiCalled: false,
                        });
                      },
                      (errorMessage) => {
                        setSnackbar((prevState) => ({
                          ...prevState,
                          open: true,
                          message: errorMessage
                            ? errorMessage
                            : "Some error occured. Try again later.",
                          component: (
                            <Alert severity="error">
                              {errorMessage
                                ? errorMessage
                                : "Some error occured. Try again later."}
                            </Alert>
                          ),
                        }));
                        setContract((prevState) => ({
                          ...prevState,
                          showLoading: false,
                        }));
                        console.log(errorMessage);
                      }
                    );

                    // setContract({
                    //   ...contract,
                    //   QuotationReadOnly: true,
                    // });
                    // TODO PRATIK
                    // When Success on Upload
                  }}
                />
              </Grid>
            ) : (
              <></>
            )
          }
        />
      ) : (
        <></>
      )}
      {contract.ContractDisplay ? (
        <ContractAgreement
          state={contractDocument}
          setState={setContractDocument}
          ReadOnly={contract.ContractReadOnly}
        />
      ) : (
        <></>
      )}

      {/* Popups */}
      <ConfirmPopup
        open={confirmPopup.open}
        message={confirmPopup.message}
        titleText={confirmPopup.titleText}
        contentText={confirmPopup.contentText}
        handleClose={() =>
          setConfirmPopup((prevState) => ({
            ...prevState,
            open: false,
            message: { ...prevState.message, show: false },
          }))
        }
        handleSubmit={confirmPopup.successFunction}
      />
    </>
  );
};

export default Contract;
