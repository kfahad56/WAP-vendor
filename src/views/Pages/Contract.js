import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
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
import DoneIcon from "@material-ui/icons/Done";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  TextField
} from "@material-ui/core";

import * as UTILS from "../../Apis/util";

import { useDropzone } from "react-dropzone";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

// template components
import CustomButton from "components/CustomButtons/Button";

import * as Warehouse from "../../Apis/Warehouse";
import * as ContractAPI from "../../Apis/Contracts";
import {
  DialogActions,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import ConfirmPopup from "views/Components/ConfirmPopup";
import * as Profile from "Apis/Profile";

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
      console.log(acceptedFiles);
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
        <Grid container spacing={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item md={4} sm={4} xs={8}>
              <KeyboardDatePicker
                variant="inline"
                autoOk={true}
                format="dd/MM/yyyy"
                minDate={new Date()}
                margin="normal"
                id="date-picker-inline"
                hidden={state.hide}
                label={
                  <span>
                    Rent From <small>(required)</small>
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
                hidden={state.hide}
                label={
                  <span>
                    Rent To <small>(required)</small>
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
                hidden={state.hide}
                margin="dense"
                value={state.areasqft}
                onChange={(e) =>
                  setState({ ...state, areasqft: e.target.value })
                }
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid style={{ marginTop: 10 }}>{props.verifyButton}</Grid>
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
        // Try this it should work with the .xls too
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        // accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        placeholder="Drag 'n' drop Document here, or click to select Document"
        name="Document"
        uploadhelp={
          !props.readOnly ? "Document should be of size less than 1MB" : ""
        }
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
        {...props}
      />
    </>
  );
});

const QuotationPopup = React.memo(function (props) {
  const defaultState = {
    open: false,
    selected: null,
    data: [],
  };
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      open: props.open,
      data: props.data,
    }));
  }, [props.open, props.data]);

  const handleClose = () => {
    setState({ ...defaultState });
    props.handleClose();
  };

  const handleDropdownChange = (newSelected) => {
    setState((prevState) => ({
      ...prevState,
      selected: {
        id: newSelected.name,
        name: newSelected.children,
        value: newSelected.value,
      },
    }));
  };

  const handleSuccess = () => {
    props.handleSuccess(state.selected);
  };

  return (
    <div>
      <Dialog
        open={state.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          {!state.data.length > 0 ? (
            <DialogContentText id="alert-dialog-description" color="error">
              Please add your GST using the profile tab first.
            </DialogContentText>
          ) : (
            <div>
              <DialogContentText id="alert-dialog-description">
                This will close the deal. Please select one of your GST to
                complete the deal.
              </DialogContentText>
              <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">GST</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.selected ? state.selected.value : null}
                  onChange={(event, element) =>
                    handleDropdownChange(element.props)
                  }
                >
                  {state.data.map((item, index) => {
                    return (
                      <MenuItem key={index} name={item.id} value={item.gst}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            disabled={!props.buttonClickable}
          >
            Disagree
          </Button>
          <Button
            onClick={handleSuccess}
            color="primary"
            autoFocus
            disabled={!state.selected || !props.buttonClickable}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

const VerifyQuotation = (props) => {
  ContractAPI.approveContract(
    props.id,
    props.body,
    () => {
      props.successFunc();
      console.log("success");
    },
    () => {
      if (props.errorFunc) props.errorFunc();
      console.log("error");
    }
  );
};

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
          <a
            target="_blank"
            href="https://s3.ap-south-1.amazonaws.com/public.hubshub.in/contracts/customer-requirement-format.xlsx"
          >
            <b>{" format"}</b>
          </a>
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
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Quotation
      </Typography>
      {props.readOnly === true ? (
        <Typography variant="p" gutterBottom>
          Please view the Quotation Document Below
        </Typography>
      ) : (
        <Typography variant="p" gutterBottom>
          Please upload your Quotation for the above requirement using the
          following format
        </Typography>
      )}
      <RequirementDocument {...props} readOnly={props.readOnly === true} />
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
        onUpload={props.onUpload}
        {...props}
        readOnly={props.readOnly === true}
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
      step: 0,
      detailsToken: "",
      apiCalled: false,
      showLoading: true,
      RequirementsReadOnly: false,
      QuotationDisplay: false,
      QuotationReadOnly: true,
      ContractDisplay: false,
      ContractReadOnly: false,
    },
    RequirementDocument: {
      images: [],
      availableFrom: new Date(),
      availableTo: new Date(),
      areasqft: "",
      hide: false,
      apiCalled: true,
      errors: [],
    },
    QuotationDocument: {
      images: [],
      apiCalled: true,
      errors: [],
    },
    ContractDocument: {
      images: [],
      apiCalled: true,
      errors: [],
    },
    QuotationPopup: {
      open: false,
      successFunction: () => { },
      buttonClickable: true,
    },
    confirmPopup: {
      open: false,
      titleText: "Are You Sure?",
      message: {
        show: false,
        label: "",
      },
      contentText: "This Action Is Irreversible.",
      successFunction: () => { },
    },
    gstData: {
      data: [],
      selected: null,
    },
  };

  const [contract, setContract] = useState(defaults.contract);
  const [gstData, setGstData] = useState(defaults.gstData);
  const [requirementDocument, setRequirementDocument] = useState(
    defaults.RequirementDocument
  );
  const [confirmPopup, setConfirmPopup] = useState(defaults.confirmPopup);
  const [quotationDocument, setQuotationDocument] = useState(
    defaults.QuotationDocument
  );
  const [contractDocument, setContractDocument] = useState(
    defaults.ContractDocument
  );
  const [quotationPopup, setQuotationPopup] = useState(defaults.QuotationPopup);
  const classes = useStyles();

  if (contract.apiCalled === false) {
    Warehouse.getContractByID(
      contract.id,
      (data) => {
        let step = data.status;
        Warehouse.getDocuments(
          data.token,
          (documents) => {
            if (step === 3) {
              Profile.getGst(
                (data) => {
                  setGstData((prevState) => ({ ...prevState, data: data }));
                },
                () => {
                  console.log("error in gst get");
                }
              );
            }
            setContract({
              ...defaults.contract,
              step: step,
              apiCalled: true,
              showLoading: false,
              detailsToken: data.token,
              RequirementsReadOnly:
                documents.requirements !== null &&
                documents.requirements.length !== 0,
              QuotationDisplay:
                documents.quotation !== null &&
                documents.quotation.length !== 0 &&
                step >= 3,
              ContractDisplay:
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
                hide: true,
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
          () => { }
        );
      },
      () => { }
    );
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={contract.showLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <RequirementsDocument
        state={requirementDocument}
        setState={setRequirementDocument}
        readOnly={contract.RequirementsReadOnly}
        actions={
          requirementDocument.images.length !== 0 &&
            contract.RequirementsReadOnly !== true ? (
            <Grid
              style={{
                marginTop: 20,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  if (requirementDocument.areasqft.length !== 0)
                    setConfirmPopup((prevState) => ({
                      ...prevState,
                      open: true,
                      contentText:
                        "These requirements will now be sent to the vendor.",
                      successFunction: () => {
                        setContract({
                          ...contract,
                          showLoading: true,
                        });
                        let file = requirementDocument.images[0];
                        ContractAPI.setUploadContract(props.match.params.id,
                          JSON.stringify({
                            "rent_from": UTILS.getDate(requirementDocument.availableFrom),
                            "rent_to": UTILS.getDate(requirementDocument.availableTo),
                            "area": requirementDocument.areasqft,
                            "pallets": 0
                          }),
                          () => {
                            ContractAPI.uploadContract(
                              props.match.params.id,
                              file,
                              () => {
                                setContract({
                                  ...contract,
                                  showLoading: false,
                                  RequirementsReadOnly: true,
                                });
                              },
                              () => {
                                console.log("error");
                              }
                            );
                          },
                          () => {
                            console.log("error");
                          }
                        )
                      },
                    }));
                  else {
                    alert("Please add SQFT area");
                  }
                }}
              >
                {" "}
                Upload{" "}
              </Button>
            </Grid>
          ) : (
            <></>
          )
        }
      />
      {contract.QuotationDisplay ? (
        <QuotationDocument
          state={quotationDocument}
          setState={setQuotationDocument}
          readOnly={contract.QuotationReadOnly}
          verifyButton={
            contract.ContractDisplay ? (
              <React.Fragment />
            ) : (
              <div style={{ marginLeft: 10 }}>
                <CustomButton
                  onClick={() => {
                    setConfirmPopup((prevState) => ({
                      ...prevState,
                      open: true,
                      message: { ...prevState, show: true, label: "Feedback" },
                      contentText:
                        "This will result in failure of closing the deal. Please help us understand what happened.",
                      successFunction: (message) =>
                        VerifyQuotation({
                          body: { approve: false, body: message, gstin: null },
                          id: props.match.params.id,
                          successFunc: () => {
                            props.history.go(0);
                            // setContract((prevState) => ({...prevState, QuotationDisplay: }))
                          },
                        }),
                    }));
                  }}
                >
                  Request Another Quote
                </CustomButton>
                <CustomButton
                  variant="contained"
                  color="info"
                  onClick={() => {
                    setQuotationPopup((prevState) => ({
                      ...prevState,
                      open: true,
                      successFunction: (gst) => {
                        setQuotationPopup((prevState) => ({
                          ...prevState,
                          buttonClickable: false,
                        }));
                        VerifyQuotation({
                          body: {
                            approve: true,
                            body: "test",
                            gstin: gst.id,
                          },
                          id: props.match.params.id,
                          successFunc: () => {
                            props.history.go(0);
                            setQuotationPopup((prevState) => ({
                              ...prevState,
                              buttonClickable: true,
                            }));
                            // setContract((prevState) => ({...prevState, QuotationDisplay: }))
                          },
                          errorFunc: () => {
                            setQuotationPopup((prevState) => ({
                              ...prevState,
                              buttonClickable: true,
                            }));
                          },
                        });
                      },
                    }));
                  }}
                >
                  Approve
                </CustomButton>
              </div>
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
          readOnly={true}
        />
      ) : (
        <></>
      )}

      {/* Popup */}
      <QuotationPopup
        open={quotationPopup.open}
        handleClose={() =>
          setQuotationPopup((prevState) => ({ ...prevState, open: false }))
        }
        handleSuccess={quotationPopup.successFunction}
        buttonClickable={quotationPopup.buttonClickable}
        data={gstData.data}
      />
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
