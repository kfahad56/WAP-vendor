/* eslint-disable */
import React, { useCallback, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import Slide from "@material-ui/core/Slide";
import CheckboxExample from "components/checkBox";
import TableSelect from "components/TableSelect/TableSelect.js";
import * as WarehouseComponents from "views/Pages/EditWarehouse";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import IMG from "assets/img/card-1.jpeg";
import Tooltip from "@material-ui/core/Tooltip";
import {
  compose,
  withProps,
  lifecycle,
  withState,
  withHandlers,
} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import Avatar from "@material-ui/core/Avatar";
import _ from "lodash";
import DeleteIcon from "@material-ui/icons/Delete";
import EyeIcon from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import mapboxSDK from "@mapbox/mapbox-sdk";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

import { useDropzone } from "react-dropzone";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import DateFnsUtils from "@date-io/date-fns";

import * as managerAPI from "../../api/Warehouse";
import * as amenitiesAPI from "../../api/Amenities";
import * as addonServiceAPI from "../../api/AddonService";
import * as industryTagAPI from "../../api/IndustryTags";
import * as cityAPI from "../../api/Cities";
import * as stateAPI from "../../api/States";
import * as localityAPI from "../../api/Localities";
import ConfirmPopup from "views/Components/ConfirmPopup";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWNvb2w0MTUxIiwiYSI6ImNrZTVwbjJjdzBiNDIyeW41dmc4bmExcTkifQ.gtlBKhY-JUZTQepkMWOAfg";

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
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

export default function EditWarehouse(props) {
  const defaults = {
    WarehouseData: {
      name: "",
      capacity: "",
      price: "",
      description: "",
      availableArea: "",
      availableFrom: null,
      availableTo: null,
      apiCalled: true,
      gstin: "",
      errors: [],
    },
    WarehouseImagePicker: {
      images: [],
      apiCalled: true,
      errors: [],
    },
    State: {
      loading: true,
      apiCalled: false,
    },
    WarehouseLocality: {
      availableLocality: [],
      selectedLocality: [],
      apiCalled: false,
      errors: [],
    },
    WarehouseAddress: {
      availableStates: [],
      availableCities: [],
      selectedState: null,
      selectedCity: null,
      pincode: "",
      address: "",
      apiCalled: false,
      citiesLoaded: false,
      errors: [],
    },
    WarehouseOfferings: {
      availableAmenities: [],
      availableServices: [],
      availableIndustryTags: [],
      selectedAmenities: [],
      selectedServices: [],
      selectedIndustryTags: [],
      apiCalled: false,
      errors: [],
    },
    WarehouseCertificates: {
      images: [],
      apiCalled: true,
      errors: [],
    },
    WarehouseRates: {
      storage_cost_per_sqft_per_week: {
        value: 0,
        error: false,
        desc: 'Rate of space "allocated" for this contract.',
        placeholder: "Storage cost /sqft /week",
        helperText: "Storage cost /sqft /week",
      },
      premium_storage_cost_per_sqft_per_week: {
        value: 0,
        error: false,
        desc: "Premium rate for additional space required",
        placeholder: "Premium storage cost /sqft /week",
        helperText: "Premium storage cost /sqft /week",
      },
      handling_in_charge_per_carton: {
        value: 0,
        error: false,
        desc: "Rate to handle Inbound cartons",
        placeholder: "Handling-in charge /carton",
        helperText: "Handling-in charge /carton",
      },
      handling_in_charge_per_pallet: {
        value: 0,
        error: false,
        desc: "Rate to handle Inbound pallet",
        placeholder: "Handling-in charge /pallet",
        helperText: "Handling-in charge /pallet",
      },
      handling_out_charge_per_carton: {
        value: 0,
        error: false,
        desc: "Rate to pick, pack and despatch outbound cartons",
        placeholder: "Handling-out charge /carton",
        helperText: "Handling-out charge /carton",
      },
      handling_out_charge_per_pallet: {
        value: 0,
        error: false,
        desc: "Rate to pick, pack and despatch outbound pallets ",
        placeholder: "Handling-out charge /pallet",
        helperText: "Handling-out charge /pallet",
      },
      vas_copacking_per_unit: {
        value: 0,
        error: false,
        desc: "Rate to carry out additional tasks like co-packing",
        placeholder: "VAS copacking /unit",
        helperText: "VAS copacking /unit",
      },
      premium_handling_in_charge_per_carton: {
        value: 0,
        error: false,
        desc: "Premium rate to handle additional Inbound cartons ",
        placeholder: "Premium handling-in charge /carton",
        helperText: "Premium handling-in charge /carton",
      },
      premium_handling_in_charge_per_pallet: {
        value: 0,
        error: false,
        desc: "Premium rate to handle additional Inbound pallets",
        placeholder: "Premium handling-in charge /pallet",
        helperText: "Premium handling-in charge /pallet",
      },
      premium_handling_out_charge_per_carton: {
        value: 0,
        error: false,
        desc: "Premium rate to pick, pack and despatch additional cartons",
        placeholder: "Premium handling-out charge /carton",
        helperText: "Premium handling-out charge /carton",
      },
      premium_handling_out_charge_per_pallet: {
        value: 0,
        error: false,
        desc: "Premium rate to pick, pack and despatch additional pallets ",
        placeholder: "Premium handling-out charge /pallet",
        helperText: "Premium handling-out charge /pallet",
      },
      delivery_charge_per_drop: {
        value: 0,
        error: false,
        desc:
          "Delivery charge per drop within agreed criteria. e.g. within 10 kms, less than 20kgs, below 0.1 cub. m. Figures with vary. Average number of drops per day to be agreed.",
        placeholder: "Delivery charge /drop",
        helperText: "Delivery charge /drop",
      },
      premium_delivery_charge_per_drop: {
        value: 0,
        error: false,
        desc:
          "Premium charge for delivery (beyond agreed daily number or more than agreed criteria of radius (Kms), Weight (Kgs) or Volume (Cub.m.) per drop",
        placeholder: "Premium delivery charge /drop",
        helperText: "Premium delivery charge /drop",
      },
      other_charges_per_week: {
        value: 0,
        error: false,
        desc:
          "Any additional cost which warehouse incurs. e.g. labour union fee, local council fee etc.",
        placeholder: "Other charges /week",
        helperText: "Other charges /week",
      },
      SLA_inbound_perf_trucks_unloaded_percent: {
        value: 0,
        error: false,
        desc: "Expected level of performance of unloading inbound trucks",
        placeholder: "SLA inbound performance trucks unloaded %",
        helperText: "SLA inbound performance trucks unloaded %",
      },
      SLA_inbound_perf_put_away_percent: {
        value: 0,
        error: false,
        desc: "Expected level of performance of putting stock in warehouse",
        placeholder: "SLA inbound performance put away %",
        helperText: "SLA inbound performance put away %",
      },
      SLA_outbound_perf_orders_picked_percent: {
        value: 0,
        error: false,
        desc:
          "Expected level of performance of orders (picked within agreed time)",
        placeholder: "SLA outbound performance orders picked %",
        helperText: "SLA outbound performance orders picked %",
      },
      SLA_outbound_perf_orders_packed_dispatched_percent: {
        value: 0,
        error: false,
        desc:
          "Expected level of performance of orders (packed and despatched within agreed time)",
        placeholder: "SLA outbound performace orders packed dispatched %",
        helperText: "SLA outbound performace orders packed dispatched %",
      },
      SLA_stock_mgmt_percent: {
        value: 0,
        error: false,
        desc:
          "Maximum percentage of products out of total products stored for which stock adjustement was needed (% stock adjustment (total number of stock location adjustment against total number of locations)",
        placeholder: "SLA stock mgmt %",
        helperText: "SLA stock mgmt %",
      },
      SLA_returns_mgmt_percent: {
        value: 0,
        error: false,
        desc:
          "Expected level of percentage of returns processes as per agreed process",
        placeholder: "SLA returns mgmt %",
        helperText: "SLA returns mgmt %",
      },
      SLA_complaint_perf_percent: {
        value: 0,
        error: false,
        desc:
          "Expected level of percentage of complaints resolved per agreed process",
        placeholder: "SLA compliant performance %",
        helperText: "SLA compliant performance %",
      },
      SLA_otif_delivery_percent: {
        value: 0,
        error: false,
        desc:
          "Expected level of performance of deliveries made On-Time In - Full",
        placeholder: "SLA otif delivery %",
        helperText: "SLA otif delivery %",
      },
      kpi_inbound_perf_trucks_unloaded_hours: {
        value: 0,
        error: false,
        desc: "Measure of performance of unloading inbound trucks",
        placeholder: "KPI inbound performance trucks unloaded hrs",
        helperText: "KPI inbound performance trucks unloaded hrs",
      },
      kpi_inbound_perf_put_away_hours: {
        value: 0,
        error: false,
        desc: "Measure of performance of putting stock in warehouse",
        placeholder: "KPI inbound performance put away hrs",
        helperText: "KPI inbound performance put away hrs",
      },
      kpi_outbound_perf_orders_picked_hours: {
        value: 0,
        error: false,
        desc: "Measure of performance of orders (picked within agreed time)",
        placeholder: "KPI outbound performance orders picked hrs",
        helperText: "KPI outbound performance orders picked hrs",
      },
      kpi_outbound_perf_orders_packed_dispatched_hours: {
        value: 0,
        error: false,
        desc:
          "Measure of performance of orders (packed and despatched within agreed time)",
        placeholder: "KPI outbound performance orders packed dispatched hrs",
        helperText: "KPI outbound performance orders packed dispatched hrs",
      },
      kpi_returns_mgmt_days: {
        value: 0,
        error: false,
        desc: "Percentage of returns processes as per agreed process",
        placeholder: "KPI returns mgmt days",
        helperText: "KPI returns mgmt days",
      },
      kpi_complaint_perf_days: {
        value: 0,
        error: false,
        desc: "Percentage of complaints resolved per agreed process",
        placeholder: "KPI compliant performance days",
        helperText: "KPI compliant performance days",
      },
      allocated_space_per_week: {
        value: 0,
        error: false,
        desc:
          "Agreed allocated space for customer to meet daily storage requirement (Business As Usual operation)",
        placeholder: "Allocated space /week",
        helperText: "Allocated space /week",
      },
      allocated_handled_in_cartons_per_day: {
        value: 0,
        error: false,
        desc:
          "Agreed maximum number of inbound cartons per day (Business As Usual operation)",
        placeholder: "Allocated handled-in cartons /day",
        helperText: "Allocated handled-in cartons /day",
      },
      allocated_handled_in_pallet_per_day: {
        value: 0,
        error: false,
        desc:
          "Agreed maximum number of inbound pallets per day (Business As Usual operation)",
        placeholder: "Allocated handled-in pallet /day",
        helperText: "Allocated handled-in pallet /day",
      },
      allocated_handled_out_cartons_per_day: {
        value: 0,
        error: false,
        desc:
          "Agreed maximum number of outbound cartons per day (Business As Usual operation)",
        placeholder: "Allocated handled-out cartons /day",
        helperText: "Allocated handled-out cartons /day",
      },
      allocated_handled_out_pallet_per_day: {
        value: 0,
        error: false,
        desc:
          "Agreed maximum number of outbound pallets per day (Business As Usual operation)",
        placeholder: "Allocated handled-out pallet /day",
        helperText: "Allocated handled-out pallet /day",
      },
      allocated_no_of_deliveries: {
        value: 0,
        error: false,
        desc:
          "Agreed maximum number of deliveries per day  (Business As Usual operation)",
        placeholder: "Allocated # of Deliveries",
        helperText: "Allocated # of Deliveries",
      },
      allocated_delivery_kms_per_drop: {
        value: 0,
        error: false,
        desc:
          "Agreed maximum distance for deliveries (in Kms) (Business As Usual operation)",
        placeholder: "Allocated deliveries kms /drop",
        helperText: "Allocated deliveries kms /drop",
      },
      partner_remarks_observations: {
        value: 0,
        error: false,
        desc:
          "Any additional observation (non-commercial, not contractually binding)",
        placeholder: "Partner remarks observations",
        helperText: "Partner remarks observations",
      },
      allocated_delivery_Kgs_per_drop: {
        value: 0,
        error: false,
        desc: "Agreed maximum weight per drop (Business As Usual operation)",
        placeholder: "Allocated delivery kgs /drop",
        helperText: "Allocated delivery kgs /drop",
      },
      allocated_delivery_Cub_m__per_drop: {
        value: 0,
        error: false,
        desc: "Agreeed maximum volume per drop (Business as Ususal operation)",
        placeholder: "Allocated delivery cub.m. /drop",
        helperText: "Allocated delivery cub.m. /drop",
      },
    },
    Snackbar: {
      open: false,
      component: <></>,
    },
    map: {
      lng: 72.8777,
      lat: 19.076,
    },
    submitStatus: {
      loading: false,
    },
    editWarehouseState: {
      id: props.match.params.id || 0,
      loaded: true,
      warehouse: new managerAPI.Warehouse(),
    },
    confirmPopup: {
      open: false,
      titleText: "Are You Sure?",
      contentText: "You Won't Be Able To Edit During Approval Process",
    },
  };
  const warehouseRatesRef = React.useRef(null);
  const [editWarehouseState, setEditWarehouseState] = useState(
    defaults.editWarehouseState
  );
  const [confirmPopup, setConfirmPopup] = useState(defaults.confirmPopup);
  const [warehouseData, setWarehouseData] = useState(defaults.WarehouseData);
  const loadWarehouseData = (w) => {
    let warehouse = w;
    setWarehouseData({
      ...warehouseData,
      name: warehouse.name,
      capacity: warehouse.areaSqFt,
      price: warehouse.areaRate,
      description: warehouse.desc,
      availableFrom: warehouse.availableFrom,
      availableTo: warehouse.availableTo,
      availableArea: warehouse.availableArea,
      apiCalled: true,
    });
  };
  const [warehouseImages, setWarehouseImages] = useState(
    defaults.WarehouseImagePicker
  );
  const loadWarehouseImages = async (w) => {
    let { warehouse } = editWarehouseState;
    warehouse = w;
    let files = [];
    for (let i = 0; i < warehouse.images.length; i++) {
      let image = warehouse.images[i];
      let response = await fetch(image.file, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
      });
      let data = await response.blob();
      let metadata = {
        type: "image/jpeg",
      };
      files.push(new File([data], image.description, metadata));
    }

    setWarehouseImages({
      ...warehouseImages,
      images: files,
    });
  };
  const [state, setState] = useState(defaults.State);
  const [warehouseLocality, setWarehouseLocality] = useState(
    defaults.WarehouseLocality
  );
  const loadWarehouseLocality = async (w) => {
    let { warehouse } = editWarehouseState;
    warehouse = w;
    localityAPI.getLocalities(
      (data) => {
        let selectedLocality = [...data];
        const getLocalityValue = (item) => {
          let s = warehouse.locality.filter((i) => i.id === item.id);
          if (s.length === 0)
            return {
              ...item,
              isChecked: false,
              distance: 0.5,
            };
          else
            return {
              ...item,
              isChecked: true,
              distance: s[0].distance,
            };
        };
        let state = selectedLocality.map((item) => getLocalityValue(item));
        setWarehouseLocality({
          ...warehouseLocality,
          availableLocality: selectedLocality,
          selectedLocality: state,
          apiCalled: true,
        });
      },
      (pageData) => {},
      () => {}
    );
  };
  const [warehouseAddress, setWarehouseAddress] = useState(
    defaults.WarehouseAddress
  );
  const loadWarehouseAddress = async (w) => {
    let { warehouse } = editWarehouseState;
    warehouse = w;
    let cities = await new Promise((resolve) => {
      cityAPI.getCities(
        warehouse.state.id,
        (c) => resolve(c),
        (pageData) => {},
        () => {}
      );
    });
    let states = await new Promise((resolve) => {
      stateAPI.getStates(
        (data) => resolve(data),
        (pageData) => {},
        () => {}
      );
    });
    let selectedState = states.filter((i) => i.id === warehouse.state.id)[0];
    let selectedCity = cities.filter((i) => i.id === warehouse.city.id)[0];
    setWarehouseAddress({
      ...defaults.WarehouseAddress,
      availableCities: cities,
      selectedCity: selectedCity,
      availableStates: states,
      selectedState: selectedState,
      pincode: warehouse.pincode,
      address: warehouse.address,
      apiCalled: true,
      citiesLoaded: true,
    });
  };
  const [warehouseOfferings, setWarehouseOfferings] = useState(
    defaults.WarehouseOfferings
  );
  const loadWarehouseOfferings = async (w) => {
    let { warehouse } = editWarehouseState;
    warehouse = w;
    let amenities = await new Promise((resolve) => {
      amenitiesAPI.getAmenities(
        (data) => resolve(data),
        (pageData) => {},
        () => {}
      );
    });
    let services = await new Promise((resolve) => {
      addonServiceAPI.getAddonService(
        (data) => resolve(data),
        (pageData) => {},
        () => {}
      );
    });
    let industryTags = await new Promise((resolve) => {
      industryTagAPI.getIndustryTags(
        (data) => resolve(data),
        (pageData) => {},
        () => {}
      );
    });
    setWarehouseOfferings({
      ...defaults.WarehouseOfferings,
      availableAmenities: amenities,
      availableServices: services,
      availableIndustryTags: industryTags,
      apiCalled: true,
      selectedServices: warehouse.addonServices.map((i) => {
        return { ...i, value: i.name };
      }),
      selectedAmenities: warehouse.amenities.map((i) => {
        return { ...i, value: i.name };
      }),
      selectedIndustryTags: warehouse.industryTags.map((i) => {
        return { ...i, value: i.name };
      }),
    });
  };
  const [warehouseCertificates, setWarehouseCertificates] = useState(
    defaults.WarehouseCertificates
  );
  const loadWarehouseCertificates = async (w) => {
    let { warehouse } = editWarehouseState;
    warehouse = w;
    let files = [];
    for (let i = 0; i < warehouse.certificates.length; i++) {
      let image = warehouse.certificates[i];
      let response = await fetch(image.file, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
      });
      let data = await response.blob();
      let metadata = {
        type: "application/pdf",
      };
      files.push({
        file: new File([data], image.description, metadata),
        description: image.description,
      });
    }
    setWarehouseCertificates({
      ...defaults.WarehouseCertificates,
      images: files,
    });
  };
  const [snackbar, setSnackbar] = useState(defaults.Snackbar);
  const [map, setMap] = useState(defaults.map);
  const loadWarehouseMap = () => {};
  const [warehouseRates, setWarehouseRates] = useState(defaults.WarehouseRates);
  const loadWarehouseRates = async (w) => {
    //TODO load WarehouseRates
  };
  const [submitStatus, setSubmitStatus] = useState(defaults.submitStatus);

  if (editWarehouseState.loaded === false) {
    setEditWarehouseState({
      ...editWarehouseState,
      loaded: true,
    });
    managerAPI.getWarehouseById(
      editWarehouseState.id,
      (w) => {
        setEditWarehouseState({
          ...editWarehouseState,
          loaded: true,
          warehouse: w,
        });
        loadWarehouseData(w);
        loadWarehouseAddress(w);
        loadWarehouseImages(w);
        loadWarehouseLocality(w);
        loadWarehouseAddress(w);
        loadWarehouseOfferings(w);
        loadWarehouseCertificates(w);
      },
      (pageData) => {},
      () => {}
    );
  }

  const validate = {
    warehouseData: () => {
      let errors = [];
      let now = new Date();
      // const compareDate = (date1, date2) => {
      //   return date1.setHours(0,0,0,0)
      // }
      // console.log(warehouseData.availableFrom);
      if (warehouseData.name.length === 0) {
        errors.push("Warehouse name cannot be empty");
      }
      if (warehouseData.capacity.length === 0) {
        errors.push("Warehouse capacity cannot be empty");
      }
      if (warehouseData.description.length === 0) {
        errors.push("Warehouse description cannot be empty");
      }
      if (warehouseData.description.length > 400) {
        errors.push("Warehouse description cannot more than 400 characters");
      }
      if (warehouseData.gstin.length === 0) {
        errors.push("Warehouse GSTIN cannot be empty");
      } else if (
        !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(
          warehouseData.gstin
        )
      ) {
        errors.push("Warehouse GSTIN is invalid");
      }
      if (warehouseData.availableArea.length === 0) {
        errors.push("Warehouse available Area cannot be empty");
      }
      if (warehouseData.availableFrom === null) {
        errors.push("Warehouse available From cannot be empty");
      }
      // else if (
      //   warehouseData.availableFrom.setHours(0, 0, 0, 0) <
      //   now.setHours(0, 0, 0, 0)
      // ) {
      //   errors.push("Warehouse available From is invalid");
      // }
      if (warehouseData.availableTo === null) {
        errors.push("Warehouse available To cannot be empty");
      } else if (
        warehouseData.availableTo.setHours(0, 0, 0, 0) <
        warehouseData.availableFrom.setHours(0, 0, 0, 0)
      ) {
        errors.push("Warehouse available To is invalid");
      }
      if (+warehouseData.capacity < +warehouseData.availableArea) {
        errors.push("Available area cannot be more than the capacity");
      }
      setWarehouseData({
        ...warehouseData,
        errors: errors,
      });
      return errors.length === 0;
    },
    warehouseImages: () => {
      let errors = [];

      if (warehouseImages.images.length < 3)
        errors.push("Please add 3 or more Warehouse Images");

      if (warehouseImages.images.length > 5)
        errors.push("Cannot add more than 5 Warehouse Images");

      setWarehouseImages({
        ...warehouseImages,
        errors: errors,
      });

      return errors.length === 0;
    },
    warehouseAddress: () => {
      let errors = [];

      if (warehouseAddress.selectedState === null) {
        errors.push("Please select state");
      }
      if (warehouseAddress.selectedCity === null) {
        errors.push("Please select city");
      }
      if (warehouseAddress.pincode.length === 0) {
        errors.push("Pincode cannot be empty");
      }
      if (warehouseAddress.pincode.length !== 6) {
        errors.push("Please enter a valid Pincode");
      }
      if (warehouseAddress.address.length === 0) {
        errors.push("Warehouse Address cannot be empty");
      }
      if (warehouseAddress.address.length > 200) {
        errors.push("Warehouse Address cannot be more than 200 characters");
      }
      setWarehouseAddress({
        ...warehouseAddress,
        errors: errors,
      });

      return errors.length === 0;
    },

    warehouseCertificates: () => {
      let errors = [];

      for (let i = 0; i < warehouseCertificates.images.length; i++) {
        if (!warehouseCertificates.images[i].description) {
          errors.push(true);
        }
      }

      setWarehouseCertificates((prevState) => ({
        ...prevState,
        errors: errors,
      }));

      return errors.length === 0;
    },
    warehouseRates: () => {
      let errors = [];

      if (!warehouseRatesRef.current.isValid())
        errors.push("Warehouse rates contain invalid values");

      setWarehouseRates((prevState) => ({
        ...prevState,
        errors: errors,
      }));

      return errors.length === 0;
    },
  };

  const snackhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  let mapRendered = false;
  const history = useHistory();

  const Map = useMemo(
    () => <WarehouseComponents.MapBox state={map} setState={setMap} />,
    []
  );

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12}>
          {/* <p>
                        {map.lat}, {map.lng}
                    </p> */}
          {Map}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <WarehouseComponents.WarehouseData
            state={warehouseData}
            setState={setWarehouseData}
          />
          <WarehouseComponents.WarehouseImagePicker
            state={warehouseImages}
            setState={setWarehouseImages}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <WarehouseComponents.WarehouseLocality
            state={warehouseLocality}
            setState={setWarehouseLocality}
          />
          <WarehouseComponents.WarehouseAddress
            state={warehouseAddress}
            setState={setWarehouseAddress}
          />
          <WarehouseComponents.WarehouseOfferings
            state={warehouseOfferings}
            setState={setWarehouseOfferings}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {/* <WarehouseCertificates /> */}
          <WarehouseComponents.WarehouseCertificates
            state={warehouseCertificates}
            setState={setWarehouseCertificates}
          />
        </Grid>
        <WarehouseComponents.WarehouseRates
          state={warehouseRates}
          setState={setWarehouseRates}
          _ref={warehouseRatesRef}
        />
        <Grid
          container
          style={{
            justifyContent: "space-around",
          }}
        >
          <Grid item xs={12} sm={12} md={4}>
            <WarehouseComponents.SubmitSection
              state={submitStatus}
              onClick={() => {
                if (
                  !(
                    validate.warehouseData() &&
                    validate.warehouseImages() &&
                    validate.warehouseAddress() &&
                    validate.warehouseCertificates() &&
                    validate.warehouseRates()
                  )
                ) {
                  setSnackbar({
                    ...snackbar,
                    open: true,
                    component: (
                      <Alert severity="error">
                        Please correct all form errors
                      </Alert>
                    ),
                  });
                } else {
                  warehouseRatesRef.current.finishButtonClick();

                  // To add condition for edit later
                  setConfirmPopup((prevState) => ({
                    ...prevState,
                    open: true,
                  }));
                }
              }}
            />
            <ConfirmPopup
              open={confirmPopup.open}
              titleText={confirmPopup.titleText}
              contentText={confirmPopup.contentText}
              handleClose={() =>
                setConfirmPopup((prevState) => ({ ...prevState, open: false }))
              }
              handleSubmit={() => {
                setSubmitStatus((prevState) => ({
                  ...prevState,
                  loading: true,
                }));
                let warehouse = new managerAPI.Warehouse();
                warehouse.warehouseVersionId =
                  editWarehouseState.warehouse.warehouseVersionId;
                let selectedLocality = warehouseLocality.selectedLocality.filter(
                  (i) => i.isChecked
                );
                warehouse.setProperties({
                  // Warehouse Data
                  name: warehouseData.name,
                  licenseNo: "",
                  areaSqFt: warehouseData.capacity,
                  availableArea: warehouseData.availableArea,
                  areaRate: warehouseData.price,
                  desc: warehouseData.description,
                  availableFrom: warehouseData.availableFrom,
                  availableTo: warehouseData.availableTo,
                  gstin: warehouseData.gstin,

                  // Warehouse Address
                  country: "India",
                  state: warehouseAddress.selectedState.id,
                  city: warehouseAddress.selectedCity.id,
                  address: warehouseAddress.address,
                  pincode: warehouseAddress.pincode,

                  latitude: map.lat,
                  longitude: map.lng,

                  // Warehouse Locality
                  locality: selectedLocality,

                  // Warehouse Offerings
                  amenities: warehouseOfferings.selectedAmenities,
                  addonServices: warehouseOfferings.selectedServices,
                  industryTags: warehouseOfferings.selectedIndustryTags,
                  certificates: warehouseCertificates.images,
                  images: warehouseImages.images,

                  //Warehouse Rates
                  storage_cost_per_sqft_per_week: warehouseRates
                    .storage_cost_per_sqft_per_week.value
                    ? warehouseRates.storage_cost_per_sqft_per_week.value
                    : 0.0,
                  premium_storage_cost_per_sqft_per_week: warehouseRates
                    .premium_storage_cost_per_sqft_per_week.value
                    ? warehouseRates.premium_storage_cost_per_sqft_per_week
                        .value
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
                  vas_copacking_per_unit: warehouseRates.vas_copacking_per_unit
                    .value
                    ? warehouseRates.vas_copacking_per_unit.value
                    : 0.0,
                  premium_handling_in_charge_per_carton: warehouseRates
                    .premium_handling_in_charge_per_carton.value
                    ? warehouseRates.premium_handling_in_charge_per_carton.value
                    : 0.0,
                  premium_handling_in_charge_per_pallet: warehouseRates
                    .premium_handling_in_charge_per_pallet.value
                    ? warehouseRates.premium_handling_in_charge_per_pallet.value
                    : 0.0,
                  premium_handling_out_charge_per_carton: warehouseRates
                    .premium_handling_out_charge_per_carton.value
                    ? warehouseRates.premium_handling_out_charge_per_carton
                        .value
                    : 0.0,
                  premium_handling_out_charge_per_pallet: warehouseRates
                    .premium_handling_out_charge_per_pallet.value
                    ? warehouseRates.premium_handling_out_charge_per_pallet
                        .value
                    : 0.0,
                  delivery_charge_per_drop: warehouseRates
                    .delivery_charge_per_drop.value
                    ? warehouseRates.delivery_charge_per_drop.value
                    : 0.0,
                  premium_delivery_charge_per_drop: warehouseRates
                    .premium_delivery_charge_per_drop.value
                    ? warehouseRates.premium_delivery_charge_per_drop.value
                    : 0.0,
                  other_charges_per_week: warehouseRates.other_charges_per_week
                    .value
                    ? warehouseRates.other_charges_per_week.value
                    : 0.0,
                  SLA_inbound_perf_trucks_unloaded_percent: warehouseRates
                    .SLA_inbound_perf_trucks_unloaded_percent.value
                    ? warehouseRates.SLA_inbound_perf_trucks_unloaded_percent
                        .value
                    : 0.0,
                  SLA_inbound_perf_put_away_percent: warehouseRates
                    .SLA_inbound_perf_put_away_percent.value
                    ? warehouseRates.SLA_inbound_perf_put_away_percent.value
                    : 0.0,
                  SLA_outbound_perf_orders_picked_percent: warehouseRates
                    .SLA_outbound_perf_orders_picked_percent.value
                    ? warehouseRates.SLA_outbound_perf_orders_picked_percent
                        .value
                    : 0.0,
                  SLA_outbound_perf_orders_packed_dispatched_percent: warehouseRates
                    .SLA_outbound_perf_orders_packed_dispatched_percent.value
                    ? warehouseRates
                        .SLA_outbound_perf_orders_packed_dispatched_percent
                        .value
                    : 0.0,
                  SLA_stock_mgmt_percent: warehouseRates.SLA_stock_mgmt_percent
                    .value
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
                    ? warehouseRates.kpi_inbound_perf_trucks_unloaded_hours
                        .value
                    : 0.0,
                  kpi_inbound_perf_put_away_hours: warehouseRates
                    .kpi_inbound_perf_put_away_hours.value
                    ? warehouseRates.kpi_inbound_perf_put_away_hours.value
                    : 0.0,
                  kpi_outbound_perf_orders_picked_hours: warehouseRates
                    .kpi_outbound_perf_orders_picked_hours.value
                    ? warehouseRates.kpi_outbound_perf_orders_picked_hours.value
                    : 0.0,
                  kpi_outbound_perf_orders_packed_dispatched_hours: warehouseRates
                    .kpi_outbound_perf_orders_packed_dispatched_hours.value
                    ? warehouseRates
                        .kpi_outbound_perf_orders_packed_dispatched_hours.value
                    : 0.0,
                  kpi_returns_mgmt_days: warehouseRates.kpi_returns_mgmt_days
                    .value
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
                    ? warehouseRates.allocated_handled_in_cartons_per_day.value
                    : 0.0,
                  allocated_handled_in_pallet_per_day: warehouseRates
                    .allocated_handled_in_pallet_per_day.value
                    ? warehouseRates.allocated_handled_in_pallet_per_day.value
                    : 0.0,
                  allocated_handled_out_cartons_per_day: warehouseRates
                    .allocated_handled_out_cartons_per_day.value
                    ? warehouseRates.allocated_handled_out_cartons_per_day.value
                    : 0.0,
                  allocated_handled_out_pallet_per_day: warehouseRates
                    .allocated_handled_out_pallet_per_day.value
                    ? warehouseRates.allocated_handled_out_pallet_per_day.value
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
                    ? warehouseRates.allocated_delivery_Cub_m__per_drop.value
                    : 0.0,
                });
                warehouse.warehouseVersionId =
                  editWarehouseState.warehouse.warehouseVersionId;
                console.log(editWarehouseState.warehouse);
                //TODO set loading & Button Disabled
                setSubmitStatus({
                  ...submitStatus,
                  loading: true,
                });
                managerAPI.addWarehouse(
                  warehouse,
                  () => {
                    setWarehouseData({ ...defaults.WarehouseData });
                    setWarehouseAddress({ ...defaults.WarehouseAddress });
                    setWarehouseCertificates({
                      ...defaults.WarehouseCertificates,
                    });
                    setWarehouseImages({ ...defaults.WarehouseImagePicker });
                    setSnackbar({
                      ...snackbar,
                      open: true,
                      component: (
                        <Alert severity="success">
                          Warehouse Created Sucessfully
                        </Alert>
                      ),
                    });
                    setSubmitStatus({
                      ...submitStatus,
                      loading: false,
                    });
                    setTimeout(() => {
                      history.push("/vendor/my-warehouse");
                    }, 1000);
                  },
                  (e) => {
                    setSnackbar({
                      ...snackbar,
                      open: true,
                      component: (
                        <Alert severity="error">
                          {e.length > 0 ? e[0] : "Some Error Occured"}
                        </Alert>
                      ),
                    });
                    setSubmitStatus({
                      ...submitStatus,
                      loading: false,
                    });
                  }
                );
              }}
            />
          </Grid>
        </Grid>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={snackhandleClose}
        >
          {snackbar.component}
        </Snackbar>
      </Grid>
    </>
  );
}
