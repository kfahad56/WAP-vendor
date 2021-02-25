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
import InputAdornment from "@material-ui/core/InputAdornment";
import Info from "@material-ui/icons/Info";
import CheckboxExample from "components/checkBox";
import TableSelect from "components/TableSelect/TableSelect.js";
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

import { WarehouseRates } from "views/Pages/EditWarehouse";
import { useDropzone } from "react-dropzone";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import DateFnsUtils from "@date-io/date-fns";
import { CertificateDropzone } from "views/Pages/EditWarehouse";

import * as managerAPI from "../../api/Warehouse";
import * as amenitiesAPI from "../../api/Amenities";
import * as addonServiceAPI from "../../api/AddonService";
import * as industryTagAPI from "../../api/IndustryTags";
import * as cityAPI from "../../api/Cities";
import * as stateAPI from "../../api/States";
import * as localityAPI from "../../api/Localities";

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

const WarehouseData = React.memo(function (props) {
  let { state, setState } = props;
  return (
    <>
      <TextField
        id="Warehouse-name"
        label="Warehouse Registered Name"
        helperText="Name under which the warehouse is registered"
        fullWidth={true}
        disabled
        required={true}
        value={state.name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
        margin="dense"
      />
      <Grid container spacing={2}>
        <Grid item md={6} sm={6} xs={6}>
          <TextField
            id="Warehouse-area-capacity"
            label="Area Capacity"
            helperText="Total capacity (sq.ft)"
            type="number"
            required={true}
            disabled
            fullWidth={true}
            margin="dense"
            value={state.capacity}
            onChange={(e) => setState({ ...state, capacity: e.target.value })}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <TextField
            id="Warehouse-area-avalable"
            label="Available area"
            helperText="Currently available area in warehouse (sq.ft)"
            type="number"
            required={true}
            fullWidth={true}
            disabled
            value={state.availableArea}
            onChange={(e) =>
              setState({ ...state, availableArea: e.target.value })
            }
            margin="dense"
          />
        </Grid>
      </Grid>
      <TextField
        id="warehouse-description"
        label="Description"
        multiline
        rowsMax={5}
        fullWidth={true}
        required={true}
        disabled
        margin="dense"
        helperText={
          state.description.length !== 0
            ? `${state.description.length}/400`
            : "Warehouse description in 400 or less characters"
        }
        value={state.description}
        onChange={(e) => setState({ ...state, description: e.target.value })}
      />
      <TextField
        id="Warehouse-gstin"
        label="Warehouse GSTIN"
        helperText="Warehouse GSTIN"
        fullWidth={true}
        required={true}
        disabled
        value={state.gstin}
        onChange={(e) => setState({ ...state, gstin: e.target.value })}
        margin="dense"
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={2}>
          <Grid item md={6} sm={6} xs={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              maxDate={state.availableTo || new Date("3050")}
              margin="normal"
              id="date-picker-inline"
              label="Available From*"
              value={state.availableFrom}
              disabled
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
          <Grid item md={6} sm={6} xs={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              disabled
              id="date-picker-inline"
              label="Available To*"
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
        </Grid>
      </MuiPickersUtilsProvider>
      {state.errors.map((error) => (
        <Alert severity="error">{error}</Alert>
      ))}
    </>
  );
});

const WarehouseAddress = React.memo(function (props) {
  const { state, setState } = props;
  const loadAPI = () => {
    setState({
      ...state,
      apiCalled: true,
    });
    stateAPI.getStates(
      (data) =>
        setState({
          ...state,
          availableStates: data,
          apiCalled: true,
        }),
      () => {},
      () => {}
    );
  };

  const findStateByID = (id) => {
    let items = state.availableStates.filter((item) => item.id === id);
    if (items.length === 0) return null;
    return items[0];
  };

  const loadCityAPI = () => {
    cityAPI.getCities(
      state.selectedState.id,
      (data) =>
        setState({
          ...state,
          availableCities: data,
          apiCalled: true,
        }),
      () => {},
      () => {}
    );
  };

  if (state.apiCalled === false) loadAPI();

  if (state.selectedState !== null && state.availableCities.length === 0)
    loadCityAPI();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} sm={6} xm={6}>
          <FormControl required={true} margin="dense" fullWidth={true}>
            <TextField
              labelId="state-label"
              id="state"
              required={true}
              fullWidth={true}
              disabled
              value={state.selectedState ? state.selectedState.value : ""}
            />
            {/* <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              id="state"
              required={true}
              fullWidth={true}
              disabled
              onChange={(e) => {
                setState({
                  ...state,
                  selectedState: e.target.value,
                });
              }}
              value={state.selectedState}
            >
              {state.availableStates.map((item) => (
                <MenuItem value={item}>{item.value}</MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </Grid>
        <Grid item md={6} sm={6} xm={6}>
          {state.state !== null && state.availableCities.length > 0 ? (
            <FormControl required={true} margin="dense" fullWidth={true}>
              <TextField
                labelId="city-label"
                id="city"
                fullWidth={true}
                disabled
                required={true}
                value={state.selectedCity ? state.selectedCity.value : ""}
              />
              {/* <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                fullWidth={true}
                disabled
                required={true}
                onChange={(e) => {
                  setState({
                    ...state,
                    selectedCity: e.target.value,
                  });
                }}
                value={state.selectedCity}
              >
                {state.availableCities.map((item) => (
                  <MenuItem value={item}>{item.value}</MenuItem>
                ))}
              </Select> */}
            </FormControl>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      <TextField
        id="Warehouse-pincode"
        label="Pincode"
        type="number"
        required={true}
        disabled
        fullWidth={true}
        margin="dense"
        value={state.pincode}
        onChange={(e) => setState({ ...state, pincode: e.target.value })}
      />
      <TextField
        id="warehouse-address"
        label="Full Address"
        multiline
        rowsMax={5}
        fullWidth={true}
        disabled
        required={true}
        margin="dense"
        helperText={
          state.address.length === 0
            ? "Warehouse address in 200 or less characters"
            : `${state.address.length}/200`
        }
        value={state.address}
        onChange={(e) => setState({ ...state, address: e.target.value })}
      />
      {state.errors.map((error) => (
        <Alert severity="error">{error}</Alert>
      ))}
    </>
  );
});

const WarehouseLocality = React.memo(function (props) {
  const { state, setState } = props;

  const loadAPI = async () => {
    localityAPI.getLocalities(
      (data) => {
        let locality = [];
        data.map((item) => {
          let temp = {
            ...item,
            isChecked: false,
            distance: 0.5,
          };
          locality.push(temp);
        });
        setState({
          ...state,
          availableLocality: data,
          selectedLocality: locality,
          apiCalled: true,
        });
      },
      () => {},
      () => {}
    );
  };

  const toggleLocality = (item) => {};

  if (state.apiCalled === false) {
    loadAPI();
  }

  const localityIsSelected = (locality) => {
    return false;
  };

  return (
    <>
      <h5>Locality</h5>
      {state.selectedLocality.map((item, index) => {
        return (
          <CheckboxExample
            handleChange={(temp) => {
              state.selectedLocality[index].isChecked = !state.selectedLocality[
                index
              ].isChecked;
              setState({
                ...state,
              });
            }}
            disabled
            viewOnly
            handleDistanceChange={(value) => {
              state.selectedLocality[index].distance = value;
              setState({
                ...state,
              });
            }}
            item={item}
            index={index}
          />
        );
      })}
    </>
  );
});

const WarehouseMapMarker = React.memo(function (props) {
  const MapWithASearchBox = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnwxVjWJBvN9sUc7O8yPIKN-o08jCkUA&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `300px` }} />,
      mapElement: <div style={{ height: `100%`, position: "relative" }} />,
    }),
    lifecycle({
      componentWillMount() {
        const refs = {};
        this.setState({
          center: {
            lat: 19.076,
            lng: 72.8777,
          },
          markers: [],
          onMapMounted: (ref) => {
            refs.map = ref;
          },
          onSearchBoxMounted: (ref) => {
            refs.searchBox = ref;
          },
          onPlacesChanged: () => {
            const places = refs.searchBox.getPlaces();
            const bounds = new window.google.maps.LatLngBounds();

            places.forEach((place) => {
              if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            const nextMarkers = places.map((place) => ({
              position: place.geometry.location,
            }));
            const nextCenter = _.get(
              nextMarkers,
              "0.position",
              this.state.center
            );

            this.setState({
              center: nextCenter,
              markers: nextMarkers,
            });
            // refs.map.fitBounds(bounds);
          },
        });
      },
    }),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={15}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
      style={{
        height: "100px",
      }}
      options={{
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
      }}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Enter Location here"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `50%`,
            height: `42px`,
            marginTop: `10px`,
            marginLeft: "auto",
            marginRight: "auto",
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            left: "0px !important",
            right: "0px",
          }}
        />
      </SearchBox>
      {props.markers.map((marker, index) => (
        <Marker key={index} position={marker.position} />
      ))}
    </GoogleMap>
  ));
  // return <MapWithControlledZoom />;
  return <MapWithASearchBox />;
});

const MapBox = React.memo(function (props) {
  // const map = new mapboxgl.Map({
  //     container: this.mapRef.current,
  //     style: 'mapbox://styles/mapbox/streets-v9',
  //     center: [this.props.center.lng, this.props.center.lat],
  //     zoom
  // });

  React.useEffect(() => {
    var map = new mapboxgl.Map({
      container: "mapbox-gl-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [props.state.lng, props.state.lat],
      zoom: 13,
    });
    window.map = map;

    var marker = new mapboxgl.Marker({
      draggable: false,
      color: "blue",
    });
    window.marker = marker;
    marker.setLngLat([props.state.lng, props.state.lat]);
    marker.addTo(map);
    map.addControl(
      new mapboxgl.NavigationControl({ position: "bottom-right" }),
      "bottom-right"
    );
  });

  return (
    <>
      <div
        style={{
          width: "100%",
          position: "relative",
          height: "300px",
        }}
      >
        <p>Drag Marker or Search location</p>
        <div
          style={{
            width: "100%",
            height: 300,
          }}
          id="mapbox-gl-map"
        ></div>
      </div>
    </>
  );
});

function WarehouseOfferings_old(props) {
  var bugs = [
    'Sign contract for "What are conference organizers afraid of?"',
    "Lines From Great Russian Literature? Or E-mails From My Boss?",
    "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    "Create 4 Invisible User Experiences you Never Knew About",
  ];
  var website = [
    "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    'Sign contract for "What are conference organizers afraid of?"',
  ];
  var server = [
    "Lines From Great Russian Literature? Or E-mails From My Boss?",
    "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    'Sign contract for "What are conference organizers afraid of?"',
  ];
  return (
    <>
      <CustomTabs
        title="Tasks:"
        headerColor="rose"
        tabs={[
          {
            tabName: "Bugs",
            tabIcon: BugReport,
            tabContent: (
              <Tasks
                checkedIndexes={[0, 3]}
                tasksIndexes={[0, 1, 2, 3]}
                tasks={bugs}
              />
            ),
          },
          {
            tabName: "Website",
            tabIcon: Code,
            tabContent: (
              <Tasks
                checkedIndexes={[0]}
                tasksIndexes={[0, 1]}
                tasks={website}
              />
            ),
          },
          {
            tabName: "Server",
            tabIcon: Cloud,
            tabContent: (
              <Tasks
                checkedIndexes={[1]}
                tasksIndexes={[0, 1, 2]}
                tasks={server}
              />
            ),
          },
        ]}
      />
    </>
  );
}

const WarehouseOfferings = React.memo(function (props) {
  const [open, setOpen] = React.useState(false);
  const { state, setState } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (state.apiCalled === false) {
    amenitiesAPI.getAmenities(
      (amenitiesData) => {
        addonServiceAPI.getAddonService(
          (servicesData) => {
            industryTagAPI.getIndustryTags(
              (tagdata) => {
                setState({
                  ...state,
                  availableIndustryTags: tagdata,
                  availableAmenities: amenitiesData,
                  availableServices: servicesData,
                  apiCalled: true,
                });
              },
              (pageData) => {},
              (error) => {}
            );
          },
          (pageData) => {},
          (error) => {}
        );
      },
      (pageData) => {},
      (error) => {}
    );
  }

  const RenderChips = (props) => {
    const { title, items } = props;
    const renderChip = (item) => {
      return (
        <>
          <Chip
            style={{
              marginLeft: 10,
              marginTop: 10,
            }}
            label={item.value}
          />
        </>
      );
    };
    return (
      <>
        <h5>{title}</h5>
        {items.length === 0 && <p>No {title} Selected</p>}
        {/* {items.length > 3 ? (
          <>
            {renderChip(items[0])}
            {renderChip(items[1])}
            {renderChip(items[2])}
            {renderChip({ id: 0, value: "..." })}
          </>
        ) : (
            ""
          )} */}
        {items.length > 0 ? <>{items.map((item) => renderChip(item))}</> : ""}
      </>
    );
  };

  const toggleAmenity = (item) => {
    let isFound = false;
    let result = state.selectedAmenities.filter((i) => {
      if (i.id !== item.id) return true;
      isFound = true;
      return false;
    });

    if (isFound) {
      setState({
        ...state,
        selectedAmenities: result,
      });
    } else {
      state.selectedAmenities.push(item);
      setState({
        ...state,
      });
    }
  };

  const toggleServices = (item) => {
    let isFound = false;
    let result = state.selectedServices.filter((i) => {
      if (i.id !== item.id) return true;
      isFound = true;
      return false;
    });

    if (isFound) {
      setState({
        ...state,
        selectedServices: result,
      });
    } else {
      state.selectedServices.push(item);
      setState({
        ...state,
      });
    }
  };

  const toggleTags = (item) => {
    let isFound = false;
    let result = state.selectedIndustryTags.filter((i) => {
      if (i.id !== item.id) return true;
      isFound = true;
      return false;
    });

    if (isFound) {
      setState({
        ...state,
        selectedIndustryTags: result,
      });
    } else {
      state.selectedIndustryTags.push(item);
      setState({
        ...state,
      });
    }
  };

  return (
    <>
      <Grid container style={{ marginTop: 20 }}>
        <Grid item xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
          <RenderChips title="Amenities" items={state.selectedAmenities} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
          <RenderChips title="Services" items={state.selectedServices} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
          <RenderChips
            title="Industry Tags"
            items={state.selectedIndustryTags}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div>
            {/* <Button
              variant="contained"
              fullWidth={true}
              margin="dense"
              onClick={handleClickOpen}
            >
              Amenities / Services / Tags
            </Button> */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                <CustomTabs
                  title="Tasks:"
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Amenities",
                      tabIcon: BugReport,
                      tabContent: (
                        <TableSelect
                          checkedList={state.selectedAmenities}
                          checkList={state.availableAmenities}
                          handleToggle={(item) => {
                            toggleAmenity(item);
                          }}
                        />
                      ),
                    },
                    {
                      tabName: "Services",
                      tabIcon: Code,
                      tabContent: (
                        <TableSelect
                          checkedList={state.selectedServices}
                          checkList={state.availableServices}
                          handleToggle={(item) => {
                            toggleServices(item);
                          }}
                        />
                      ),
                    },
                    {
                      tabName: "Industry Tags",
                      tabIcon: Cloud,
                      tabContent: (
                        <TableSelect
                          checkedList={state.selectedIndustryTags}
                          checkList={state.availableIndustryTags}
                          handleToggle={(item) => {
                            toggleTags(item);
                          }}
                        />
                      ),
                    },
                  ]}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
      </Grid>
    </>
  );
});

const WarehouseCertificates = React.memo(function (props) {
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
      <CertificateDropzone
        viewOnly
        state={props.state}
        setState={props.setState}
        accept="application/pdf"
        placeholder="Drag 'n' drop certificates here, or click to select certificates"
        name="Certificates"
        onView={(item) => {
          setOpen({
            isOpen: true,
            link: URL.createObjectURL(item),
            name: item.name,
          });
        }}
      />
      <Dialog
        open={open.isOpen}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {open.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <iframe width="100%" height="100%" style={{}} src={open.link} />
        </DialogContent>
      </Dialog>
    </>
  );
});

const Dropzone = React.memo(function (props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: props.accept,
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((item) => {
        state.images.push(item);
      });
      setState({
        ...state,
        images: state.images,
      });
    },
  });
  const { state, setState } = props;
  const classes = useStyles();
  const files = state.images.map((file) => {
    return (
      <Grid
        item
        style={{
          position: "relative",
        }}
      >
        {/* <Avatar className={classes.pink}>
          <DeleteIcon
            className={classes.small}
            onClick={() => {
              state.images = state.images.filter((i) => i !== file);
              setState({
                ...state,
              });
            }}
          />
        </Avatar> */}
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
      {/* <div
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
      </div> */}
      <aside>
        <h4>{props.name}</h4>
        <Grid container spacing={2}>
          {files}
        </Grid>
      </aside>
      {state.errors.map((error) => (
        <Alert severity="error">{error}</Alert>
      ))}
    </section>
  );
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const WarehouseImagePicker = React.memo(function (props) {
  const [open, setOpen] = useState({
    isOpen: false,
    link: "",
  });
  return (
    <>
      <Dropzone
        state={props.state}
        setState={props.setState}
        accept="image/*"
        placeholder="Drag 'n' drop some image here, or click to select images"
        name="Images"
        onView={(item) => {
          setOpen({
            isOpen: true,
            link: URL.createObjectURL(item),
          });
        }}
      />
      <Dialog
        open={open.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() =>
          setOpen({
            ...open,
            isOpen: false,
          })
        }
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <img width="100%" height="auto" src={open.link} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
});

// const WarehouseRates = function (props) {
//   const { setState } = props;
//   const isReadOnly = props.readOnly === true ? true : false;
//   const approvalData = props.state;
//   return (
//     <div>
//       <Grid container spacing={4}>
//         <Grid item md={12} ld={12} sm={12} xs={12}>
//           <h3
//             style={{
//               textAlign: "center",
//             }}
//           >
//             Indicative Rates(in ₹)
//           </h3>
//         </Grid>
//         <Grid item md={4} ld={4} sm={6} xs={12}>
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.storage_cost_per_sqft_per_week.placeholder
//             }
//             helperText={approvalData.storage_cost_per_sqft_per_week.helperText}
//             value={approvalData.storage_cost_per_sqft_per_week.value}
//             onChange={(e) => {
//               approvalData.storage_cost_per_sqft_per_week.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.storage_cost_per_sqft_per_week.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.storage_cost_per_sqft_per_week.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.premium_storage_cost_per_sqft_per_week.placeholder
//             }
//             helperText={
//               approvalData.premium_storage_cost_per_sqft_per_week.helperText
//             }
//             value={approvalData.premium_storage_cost_per_sqft_per_week.value}
//             onChange={(e) => {
//               approvalData.premium_storage_cost_per_sqft_per_week.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.premium_storage_cost_per_sqft_per_week.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.premium_storage_cost_per_sqft_per_week.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.handling_in_charge_per_carton.placeholder}
//             helperText={approvalData.handling_in_charge_per_carton.helperText}
//             value={approvalData.handling_in_charge_per_carton.value}
//             onChange={(e) => {
//               approvalData.handling_in_charge_per_carton.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.handling_in_charge_per_carton.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.handling_in_charge_per_carton.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.handling_in_charge_per_pallet.placeholder}
//             helperText={approvalData.handling_in_charge_per_pallet.helperText}
//             value={approvalData.handling_in_charge_per_pallet.value}
//             onChange={(e) => {
//               approvalData.handling_in_charge_per_pallet.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.handling_in_charge_per_pallet.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.handling_in_charge_per_pallet.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.handling_out_charge_per_carton.placeholder
//             }
//             helperText={approvalData.handling_out_charge_per_carton.helperText}
//             value={approvalData.handling_out_charge_per_carton.value}
//             onChange={(e) => {
//               approvalData.handling_out_charge_per_carton.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.handling_out_charge_per_carton.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.handling_out_charge_per_carton.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.handling_out_charge_per_pallet.placeholder
//             }
//             helperText={approvalData.handling_out_charge_per_pallet.helperText}
//             value={approvalData.handling_out_charge_per_pallet.value}
//             onChange={(e) => {
//               approvalData.handling_out_charge_per_pallet.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.handling_out_charge_per_pallet.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.handling_out_charge_per_pallet.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.vas_copacking_per_unit.placeholder}
//             helperText={approvalData.vas_copacking_per_unit.helperText}
//             value={approvalData.vas_copacking_per_unit.value}
//             onChange={(e) => {
//               approvalData.vas_copacking_per_unit.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.vas_copacking_per_unit.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.vas_copacking_per_unit.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.premium_handling_in_charge_per_carton.placeholder
//             }
//             helperText={
//               approvalData.premium_handling_in_charge_per_carton.helperText
//             }
//             value={approvalData.premium_handling_in_charge_per_carton.value}
//             onChange={(e) => {
//               approvalData.premium_handling_in_charge_per_carton.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.premium_handling_in_charge_per_carton.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.premium_handling_in_charge_per_carton.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.premium_handling_in_charge_per_pallet.placeholder
//             }
//             helperText={
//               approvalData.premium_handling_in_charge_per_pallet.helperText
//             }
//             value={approvalData.premium_handling_in_charge_per_pallet.value}
//             onChange={(e) => {
//               approvalData.premium_handling_in_charge_per_pallet.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.premium_handling_in_charge_per_pallet.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.premium_handling_in_charge_per_pallet.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.premium_handling_out_charge_per_carton.placeholder
//             }
//             helperText={
//               approvalData.premium_handling_out_charge_per_carton.helperText
//             }
//             value={approvalData.premium_handling_out_charge_per_carton.value}
//             onChange={(e) => {
//               approvalData.premium_handling_out_charge_per_carton.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.premium_handling_out_charge_per_carton.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.premium_handling_out_charge_per_carton.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.premium_handling_out_charge_per_pallet.placeholder
//             }
//             helperText={
//               approvalData.premium_handling_out_charge_per_pallet.helperText
//             }
//             value={approvalData.premium_handling_out_charge_per_pallet.value}
//             onChange={(e) => {
//               approvalData.premium_handling_out_charge_per_pallet.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.premium_handling_out_charge_per_pallet.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.premium_handling_out_charge_per_pallet.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.allocated_delivery_Kgs_per_drop.placeholder
//             }
//             helperText={approvalData.allocated_delivery_Kgs_per_drop.helperText}
//             value={approvalData.allocated_delivery_Kgs_per_drop.value}
//             onChange={(e) => {
//               approvalData.allocated_delivery_Kgs_per_drop.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.allocated_delivery_Kgs_per_drop.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.allocated_delivery_Kgs_per_drop.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.allocated_delivery_Cub_m__per_drop.placeholder
//             }
//             helperText={
//               approvalData.allocated_delivery_Cub_m__per_drop.helperText
//             }
//             value={approvalData.allocated_delivery_Cub_m__per_drop.value}
//             onChange={(e) => {
//               approvalData.allocated_delivery_Cub_m__per_drop.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.allocated_delivery_Cub_m__per_drop.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.allocated_delivery_Cub_m__per_drop.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item md={4} ld={4} sm={6} xs={12}>
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.delivery_charge_per_drop.placeholder}
//             helperText={approvalData.delivery_charge_per_drop.helperText}
//             value={approvalData.delivery_charge_per_drop.value}
//             onChange={(e) => {
//               approvalData.delivery_charge_per_drop.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.delivery_charge_per_drop.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.delivery_charge_per_drop.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.premium_delivery_charge_per_drop.placeholder
//             }
//             helperText={
//               approvalData.premium_delivery_charge_per_drop.helperText
//             }
//             value={approvalData.premium_delivery_charge_per_drop.value}
//             onChange={(e) => {
//               approvalData.premium_delivery_charge_per_drop.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.premium_delivery_charge_per_drop.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.premium_delivery_charge_per_drop.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.other_charges_per_week.placeholder}
//             helperText={approvalData.other_charges_per_week.helperText}
//             value={approvalData.other_charges_per_week.value}
//             onChange={(e) => {
//               approvalData.other_charges_per_week.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.other_charges_per_week.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.other_charges_per_week.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.SLA_inbound_perf_trucks_unloaded_percent.placeholder
//             }
//             helperText={
//               approvalData.SLA_inbound_perf_trucks_unloaded_percent.helperText
//             }
//             value={approvalData.SLA_inbound_perf_trucks_unloaded_percent.value}
//             onChange={(e) => {
//               approvalData.SLA_inbound_perf_trucks_unloaded_percent.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.SLA_inbound_perf_trucks_unloaded_percent.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.SLA_inbound_perf_trucks_unloaded_percent
//                           .desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.SLA_inbound_perf_put_away_percent.placeholder
//             }
//             helperText={
//               approvalData.SLA_inbound_perf_put_away_percent.helperText
//             }
//             value={approvalData.SLA_inbound_perf_put_away_percent.value}
//             onChange={(e) => {
//               approvalData.SLA_inbound_perf_put_away_percent.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.SLA_inbound_perf_put_away_percent.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.SLA_inbound_perf_put_away_percent.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.SLA_outbound_perf_orders_picked_percent.placeholder
//             }
//             helperText={
//               approvalData.SLA_outbound_perf_orders_picked_percent.helperText
//             }
//             value={approvalData.SLA_outbound_perf_orders_picked_percent.value}
//             onChange={(e) => {
//               approvalData.SLA_outbound_perf_orders_picked_percent.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.SLA_outbound_perf_orders_picked_percent.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.SLA_outbound_perf_orders_picked_percent
//                           .desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.SLA_outbound_perf_orders_packed_dispatched_percent
//                 .placeholder
//             }
//             helperText={
//               approvalData.SLA_outbound_perf_orders_packed_dispatched_percent
//                 .helperText
//             }
//             value={
//               approvalData.SLA_outbound_perf_orders_packed_dispatched_percent
//                 .value
//             }
//             onChange={(e) => {
//               approvalData.SLA_outbound_perf_orders_packed_dispatched_percent.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData
//                         .SLA_outbound_perf_orders_packed_dispatched_percent.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData
//                           .SLA_outbound_perf_orders_packed_dispatched_percent
//                           .desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.SLA_stock_mgmt_percent.placeholder}
//             helperText={approvalData.SLA_stock_mgmt_percent.helperText}
//             value={approvalData.SLA_stock_mgmt_percent.value}
//             onChange={(e) => {
//               approvalData.SLA_stock_mgmt_percent.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.SLA_stock_mgmt_percent.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.SLA_stock_mgmt_percent.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.SLA_returns_mgmt_percent.placeholder}
//             helperText={approvalData.SLA_returns_mgmt_percent.helperText}
//             value={approvalData.SLA_returns_mgmt_percent.value}
//             onChange={(e) => {
//               approvalData.SLA_returns_mgmt_percent.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.SLA_returns_mgmt_percent.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.SLA_returns_mgmt_percent.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.SLA_complaint_perf_percent.placeholder}
//             helperText={approvalData.SLA_complaint_perf_percent.helperText}
//             value={approvalData.SLA_complaint_perf_percent.value}
//             onChange={(e) => {
//               approvalData.SLA_complaint_perf_percent.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.SLA_complaint_perf_percent.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.SLA_complaint_perf_percent.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.SLA_otif_delivery_percent.placeholder}
//             helperText={approvalData.SLA_otif_delivery_percent.helperText}
//             value={approvalData.SLA_otif_delivery_percent.value}
//             onChange={(e) => {
//               approvalData.SLA_otif_delivery_percent.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.SLA_otif_delivery_percent.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.SLA_otif_delivery_percent.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="text"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.partner_remarks_observations.placeholder}
//             helperText={approvalData.partner_remarks_observations.helperText}
//             value={approvalData.partner_remarks_observations.value}
//             onChange={(e) => {
//               approvalData.partner_remarks_observations.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.partner_remarks_observations.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.partner_remarks_observations.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item md={4} ld={4} sm={6} xs={12}>
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.kpi_inbound_perf_trucks_unloaded_hours.placeholder
//             }
//             helperText={
//               approvalData.kpi_inbound_perf_trucks_unloaded_hours.helperText
//             }
//             value={approvalData.kpi_inbound_perf_trucks_unloaded_hours.value}
//             onChange={(e) => {
//               approvalData.kpi_inbound_perf_trucks_unloaded_hours.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.kpi_inbound_perf_trucks_unloaded_hours.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.kpi_inbound_perf_trucks_unloaded_hours.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.kpi_inbound_perf_put_away_hours.placeholder
//             }
//             helperText={approvalData.kpi_inbound_perf_put_away_hours.helperText}
//             value={approvalData.kpi_inbound_perf_put_away_hours.value}
//             onChange={(e) => {
//               approvalData.kpi_inbound_perf_put_away_hours.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.kpi_inbound_perf_put_away_hours.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.kpi_inbound_perf_put_away_hours.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.kpi_outbound_perf_orders_picked_hours.placeholder
//             }
//             helperText={
//               approvalData.kpi_outbound_perf_orders_picked_hours.helperText
//             }
//             value={approvalData.kpi_outbound_perf_orders_picked_hours.value}
//             onChange={(e) => {
//               approvalData.kpi_outbound_perf_orders_picked_hours.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.kpi_outbound_perf_orders_picked_hours.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.kpi_outbound_perf_orders_picked_hours.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.kpi_outbound_perf_orders_packed_dispatched_hours
//                 .placeholder
//             }
//             helperText={
//               approvalData.kpi_outbound_perf_orders_packed_dispatched_hours
//                 .helperText
//             }
//             value={
//               approvalData.kpi_outbound_perf_orders_packed_dispatched_hours
//                 .value
//             }
//             onChange={(e) => {
//               approvalData.kpi_outbound_perf_orders_packed_dispatched_hours.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData
//                         .kpi_outbound_perf_orders_packed_dispatched_hours.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData
//                           .kpi_outbound_perf_orders_packed_dispatched_hours.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.kpi_returns_mgmt_days.placeholder}
//             helperText={approvalData.kpi_returns_mgmt_days.helperText}
//             value={approvalData.kpi_returns_mgmt_days.value}
//             onChange={(e) => {
//               approvalData.kpi_returns_mgmt_days.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.kpi_returns_mgmt_days.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.kpi_returns_mgmt_days.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.kpi_complaint_perf_days.placeholder}
//             helperText={approvalData.kpi_complaint_perf_days.helperText}
//             value={approvalData.kpi_complaint_perf_days.value}
//             onChange={(e) => {
//               approvalData.kpi_complaint_perf_days.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.kpi_complaint_perf_days.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.kpi_complaint_perf_days.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.allocated_space_per_week.placeholder}
//             helperText={approvalData.allocated_space_per_week.helperText}
//             value={approvalData.allocated_space_per_week.value}
//             onChange={(e) => {
//               approvalData.allocated_space_per_week.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.allocated_space_per_week.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.allocated_space_per_week.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.allocated_handled_in_cartons_per_day.placeholder
//             }
//             helperText={
//               approvalData.allocated_handled_in_cartons_per_day.helperText
//             }
//             value={approvalData.allocated_handled_in_cartons_per_day.value}
//             onChange={(e) => {
//               approvalData.allocated_handled_in_cartons_per_day.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.allocated_handled_in_cartons_per_day.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.allocated_handled_in_cartons_per_day.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.allocated_handled_in_pallet_per_day.placeholder
//             }
//             helperText={
//               approvalData.allocated_handled_in_pallet_per_day.helperText
//             }
//             value={approvalData.allocated_handled_in_pallet_per_day.value}
//             onChange={(e) => {
//               approvalData.allocated_handled_in_pallet_per_day.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.allocated_handled_in_pallet_per_day.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.allocated_handled_in_pallet_per_day.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.allocated_handled_out_cartons_per_day.placeholder
//             }
//             helperText={
//               approvalData.allocated_handled_out_cartons_per_day.helperText
//             }
//             value={approvalData.allocated_handled_out_cartons_per_day.value}
//             onChange={(e) => {
//               approvalData.allocated_handled_out_cartons_per_day.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.allocated_handled_out_cartons_per_day.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.allocated_handled_out_cartons_per_day.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.allocated_handled_out_pallet_per_day.placeholder
//             }
//             helperText={
//               approvalData.allocated_handled_out_pallet_per_day.helperText
//             }
//             value={approvalData.allocated_handled_out_pallet_per_day.value}
//             onChange={(e) => {
//               approvalData.allocated_handled_out_pallet_per_day.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.allocated_handled_out_pallet_per_day.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={
//                         approvalData.allocated_handled_out_pallet_per_day.desc
//                       }
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={approvalData.allocated_no_of_deliveries.placeholder}
//             helperText={approvalData.allocated_no_of_deliveries.helperText}
//             value={approvalData.allocated_no_of_deliveries.value}
//             onChange={(e) => {
//               approvalData.allocated_no_of_deliveries.value = e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={approvalData.allocated_no_of_deliveries.desc}
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.allocated_no_of_deliveries.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             type="number"
//             disabled={true}
//             fullWidth={true}
//             placeholder={
//               approvalData.allocated_delivery_kms_per_drop.placeholder
//             }
//             helperText={approvalData.allocated_delivery_kms_per_drop.helperText}
//             value={approvalData.allocated_delivery_kms_per_drop.value}
//             onChange={(e) => {
//               approvalData.allocated_delivery_kms_per_drop.value =
//                 e.target.value;
//               setState({ ...approvalData });
//             }}
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     area-label={
//                       approvalData.allocated_delivery_kms_per_drop.desc
//                     }
//                     edge="end"
//                   >
//                     <Tooltip
//                       title={approvalData.allocated_delivery_kms_per_drop.desc}
//                       arrow
//                     >
//                       <Info />
//                     </Tooltip>
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

const SubmitSection = React.memo(function (props) {
  return (
    <>
      {/* <Button
        // Didn't know how you applied styles so for temp... directly assigned style
        style={{ marginTop: 15 }}
        fullWidth={true}
        variant="contained"
        color="primary"
        onClick={props.onClick}
        disabled={props.state.loading}
      >
        Submit
      </Button> */}
    </>
  );
});

export default function EditWarehouse(props) {
  const defaults = {
    WarehouseData: {
      name: "",
      capacity: "",
      price: "",
      description: "",
      gstin: "",
      availableArea: "",
      availableFrom: null,
      availableTo: null,
      apiCalled: true,
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
      ratesLoaded: false,
      storage_cost_per_sqft_per_week: {
        value: "",
        desc: 'Rate of space "allocated" for this contract.',
        placeholder: "Storage cost /sqft /week",
        helperText: "Storage cost /sqft /week",
      },
      premium_storage_cost_per_sqft_per_week: {
        value: "",
        desc: "Premium rate for additional space required",
        placeholder: "Premium storage cost /sqft /week",
        helperText: "Premium storage cost /sqft /week",
      },
      handling_in_charge_per_carton: {
        value: "",
        desc: "Rate to handle Inbound cartons",
        placeholder: "Handling-in charge /carton",
        helperText: "Handling-in charge /carton",
      },
      handling_in_charge_per_pallet: {
        value: "",
        desc: "Rate to handle Inbound pallet",
        placeholder: "Handling-in charge /pallet",
        helperText: "Handling-in charge /pallet",
      },
      handling_out_charge_per_carton: {
        value: "",
        desc: "Rate to pick, pack and despatch outbound cartons",
        placeholder: "Handling-out charge /carton",
        helperText: "Handling-out charge /carton",
      },
      handling_out_charge_per_pallet: {
        value: "",
        desc: "Rate to pick, pack and despatch outbound pallets ",
        placeholder: "Handling-out charge /pallet",
        helperText: "Handling-out charge /pallet",
      },
      vas_copacking_per_unit: {
        value: "",
        desc: "Rate to carry out additional tasks like co-packing",
        placeholder: "VAS copacking /unit",
        helperText: "VAS copacking /unit",
      },
      premium_handling_in_charge_per_carton: {
        value: "",
        desc: "Premium rate to handle additional Inbound cartons ",
        placeholder: "Premium handling-in charge /carton",
        helperText: "Premium handling-in charge /carton",
      },
      premium_handling_in_charge_per_pallet: {
        value: "",
        desc: "Premium rate to handle additional Inbound pallets",
        placeholder: "Premium handling-in charge /pallet",
        helperText: "Premium handling-in charge /pallet",
      },
      premium_handling_out_charge_per_carton: {
        value: "",
        desc: "Premium rate to pick, pack and despatch additional cartons",
        placeholder: "Premium handling-out charge /carton",
        helperText: "Premium handling-out charge /carton",
      },
      premium_handling_out_charge_per_pallet: {
        value: "",
        desc: "Premium rate to pick, pack and despatch additional pallets ",
        placeholder: "Premium handling-out charge /pallet",
        helperText: "Premium handling-out charge /pallet",
      },
      delivery_charge_per_drop: {
        value: "",
        desc:
          "Delivery charge per drop within agreed criteria. e.g. within 10 kms, less than 20kgs, below 0.1 cub. m. Figures with vary. Average number of drops per day to be agreed.",
        placeholder: "Delivery charge /drop",
        helperText: "Delivery charge /drop",
      },
      premium_delivery_charge_per_drop: {
        value: "",
        desc:
          "Premium charge for delivery (beyond agreed daily number or more than agreed criteria of radius (Kms), Weight (Kgs) or Volume (Cub.m.) per drop",
        placeholder: "Premium delivery charge /drop",
        helperText: "Premium delivery charge /drop",
      },
      other_charges_per_week: {
        value: "",
        desc:
          "Any additional cost which warehouse incurs. e.g. labour union fee, local council fee etc.",
        placeholder: "Other charges /week",
        helperText: "Other charges /week",
      },
      SLA_inbound_perf_trucks_unloaded_percent: {
        value: "",
        desc: "Expected level of performance of unloading inbound trucks",
        placeholder: "SLA inbound performance trucks unloaded %",
        helperText: "SLA inbound performance trucks unloaded %",
      },
      SLA_inbound_perf_put_away_percent: {
        value: "",
        desc: "Expected level of performance of putting stock in warehouse",
        placeholder: "SLA inbound performance put away %",
        helperText: "SLA inbound performance put away %",
      },
      SLA_outbound_perf_orders_picked_percent: {
        value: "",
        desc:
          "Expected level of performance of orders (picked within agreed time)",
        placeholder: "SLA outbound performance orders picked %",
        helperText: "SLA outbound performance orders picked %",
      },
      SLA_outbound_perf_orders_packed_dispatched_percent: {
        value: "",
        desc:
          "Expected level of performance of orders (packed and despatched within agreed time)",
        placeholder: "SLA outbound performace orders packed dispatched %",
        helperText: "SLA outbound performace orders packed dispatched %",
      },
      SLA_stock_mgmt_percent: {
        value: "",
        desc:
          "Maximum percentage of products out of total products stored for which stock adjustement was needed (% stock adjustment (total number of stock location adjustment against total number of locations)",
        placeholder: "SLA stock mgmt %",
        helperText: "SLA stock mgmt %",
      },
      SLA_returns_mgmt_percent: {
        value: "",
        desc:
          "Expected level of percentage of returns processes as per agreed process",
        placeholder: "SLA returns mgmt %",
        helperText: "SLA returns mgmt %",
      },
      SLA_complaint_perf_percent: {
        value: "",
        desc:
          "Expected level of percentage of complaints resolved per agreed process",
        placeholder: "SLA compliant performance %",
        helperText: "SLA compliant performance %",
      },
      SLA_otif_delivery_percent: {
        value: "",
        desc:
          "Expected level of performance of deliveries made On-Time In - Full",
        placeholder: "SLA otif delivery %",
        helperText: "SLA otif delivery %",
      },
      kpi_inbound_perf_trucks_unloaded_hours: {
        value: "",
        desc: "Measure of performance of unloading inbound trucks",
        placeholder: "KPI inbound performance trucks unloaded hrs",
        helperText: "KPI inbound performance trucks unloaded hrs",
      },
      kpi_inbound_perf_put_away_hours: {
        value: "",
        desc: "Measure of performance of putting stock in warehouse",
        placeholder: "KPI inbound performance put away hrs",
        helperText: "KPI inbound performance put away hrs",
      },
      kpi_outbound_perf_orders_picked_hours: {
        value: "",
        desc: "Measure of performance of orders (picked within agreed time)",
        placeholder: "KPI outbound performance orders picked hrs",
        helperText: "KPI outbound performance orders picked hrs",
      },
      kpi_outbound_perf_orders_packed_dispatched_hours: {
        value: "",
        desc:
          "Measure of performance of orders (packed and despatched within agreed time)",
        placeholder: "KPI outbound performance orders packed dispatched hrs",
        helperText: "KPI outbound performance orders packed dispatched hrs",
      },
      kpi_returns_mgmt_days: {
        value: "",
        desc: "Percentage of returns processes as per agreed process",
        placeholder: "KPI returns mgmt days",
        helperText: "KPI returns mgmt days",
      },
      kpi_complaint_perf_days: {
        value: "",
        desc: "Percentage of complaints resolved per agreed process",
        placeholder: "KPI compliant performance days",
        helperText: "KPI compliant performance days",
      },
      allocated_space_per_week: {
        value: "",
        desc:
          "Agreed allocated space for customer to meet daily storage requirement (Business As Usual operation)",
        placeholder: "Allocated space /week",
        helperText: "Allocated space /week",
      },
      allocated_handled_in_cartons_per_day: {
        value: "",
        desc:
          "Agreed maximum number of inbound cartons per day (Business As Usual operation)",
        placeholder: "Allocated handled-in cartons /day",
        helperText: "Allocated handled-in cartons /day",
      },
      allocated_handled_in_pallet_per_day: {
        value: "",
        desc:
          "Agreed maximum number of inbound pallets per day (Business As Usual operation)",
        placeholder: "Allocated handled-in pallet /day",
        helperText: "Allocated handled-in pallet /day",
      },
      allocated_handled_out_cartons_per_day: {
        value: "",
        desc:
          "Agreed maximum number of outbound cartons per day (Business As Usual operation)",
        placeholder: "Allocated handled-out cartons /day",
        helperText: "Allocated handled-out cartons /day",
      },
      allocated_handled_out_pallet_per_day: {
        value: "",
        desc:
          "Agreed maximum number of outbound pallets per day (Business As Usual operation)",
        placeholder: "Allocated handled-out pallet /day",
        helperText: "Allocated handled-out pallet /day",
      },
      allocated_no_of_deliveries: {
        value: "",
        desc:
          "Agreed maximum number of deliveries per day  (Business As Usual operation)",
        placeholder: "Allocated # of Deliveries",
        helperText: "Allocated # of Deliveries",
      },
      allocated_delivery_kms_per_drop: {
        value: "",
        desc:
          "Agreed maximum distance for deliveries (in Kms) (Business As Usual operation)",
        placeholder: "Allocated deliveries kms /drop",
        helperText: "Allocated deliveries kms /drop",
      },
      partner_remarks_observations: {
        value: "",
        desc:
          "Any additional observation (non-commercial, not contractually binding)",
        placeholder: "Partner remarks observations",
        helperText: "Partner remarks observations",
      },
      allocated_delivery_Kgs_per_drop: {
        value: "",
        desc: "Agreed maximum weight per drop (Business As Usual operation)",
        placeholder: "Allocated delivery kgs /drop",
        helperText: "Allocated delivery kgs /drop",
      },
      allocated_delivery_Cub_m__per_drop: {
        value: "",
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
      id: props.match.params.id,
      loaded: false,
      warehouse: new managerAPI.Warehouse(),
    },
  };

  const [editWarehouseState, setEditWarehouseState] = useState(
    defaults.editWarehouseState
  );

  const [warehouseData, setWarehouseData] = useState(defaults.WarehouseData);
  const loadWarehouseData = (w) => {
    let warehouse = w;
    setWarehouseData({
      ...warehouseData,
      name: warehouse.name,
      capacity: warehouse.areaSqFt,
      price: warehouse.areaRate,
      description: warehouse.desc,
      gstin: warehouse.gstin,
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
    warehouseRates.storage_cost_per_sqft_per_week.value =
      w.storage_cost_per_sqft_per_week;
    warehouseRates.premium_storage_cost_per_sqft_per_week.value =
      w.premium_storage_cost_per_sqft_per_week;
    warehouseRates.handling_in_charge_per_carton.value =
      w.handling_in_charge_per_carton;
    warehouseRates.handling_in_charge_per_pallet.value =
      w.handling_in_charge_per_pallet;
    warehouseRates.handling_out_charge_per_carton.value =
      w.handling_out_charge_per_carton;
    warehouseRates.handling_out_charge_per_pallet.value =
      w.handling_out_charge_per_pallet;
    warehouseRates.vas_copacking_per_unit.value = w.vas_copacking_per_unit;
    warehouseRates.premium_handling_in_charge_per_carton.value =
      w.premium_handling_in_charge_per_carton;
    warehouseRates.premium_handling_in_charge_per_pallet.value =
      w.premium_handling_in_charge_per_pallet;
    warehouseRates.premium_handling_out_charge_per_carton.value =
      w.premium_handling_out_charge_per_carton;
    warehouseRates.premium_handling_out_charge_per_pallet.value =
      w.premium_handling_out_charge_per_pallet;
    warehouseRates.delivery_charge_per_drop.value = w.delivery_charge_per_drop;
    warehouseRates.premium_delivery_charge_per_drop.value =
      w.premium_delivery_charge_per_drop;
    warehouseRates.other_charges_per_week.value = w.other_charges_per_week;
    warehouseRates.SLA_inbound_perf_trucks_unloaded_percent.value =
      w.SLA_inbound_perf_trucks_unloaded_percent;
    warehouseRates.SLA_inbound_perf_put_away_percent.value =
      w.SLA_inbound_perf_put_away_percent;
    warehouseRates.SLA_outbound_perf_orders_picked_percent.value =
      w.SLA_outbound_perf_orders_picked_percent;
    warehouseRates.SLA_outbound_perf_orders_packed_dispatched_percent.value =
      w.SLA_outbound_perf_orders_packed_dispatched_percent;
    warehouseRates.SLA_stock_mgmt_percent.value = w.SLA_stock_mgmt_percent;
    warehouseRates.SLA_returns_mgmt_percent.value = w.SLA_returns_mgmt_percent;
    warehouseRates.SLA_complaint_perf_percent.value =
      w.SLA_complaint_perf_percent;
    warehouseRates.SLA_otif_delivery_percent.value =
      w.SLA_otif_delivery_percent;
    warehouseRates.kpi_inbound_perf_trucks_unloaded_hours.value =
      w.kpi_inbound_perf_trucks_unloaded_hours;
    warehouseRates.kpi_inbound_perf_put_away_hours.value =
      w.kpi_inbound_perf_put_away_hours;
    warehouseRates.kpi_outbound_perf_orders_picked_hours.value =
      w.kpi_outbound_perf_orders_picked_hours;
    warehouseRates.kpi_outbound_perf_orders_packed_dispatched_hours.value =
      w.kpi_outbound_perf_orders_packed_dispatched_hours;
    warehouseRates.kpi_returns_mgmt_days.value = w.kpi_returns_mgmt_days;
    warehouseRates.kpi_complaint_perf_days.value = w.kpi_complaint_perf_days;
    warehouseRates.allocated_space_per_week.value = w.allocated_space_per_week;
    warehouseRates.allocated_handled_in_cartons_per_day.value =
      w.allocated_handled_in_cartons_per_day;
    warehouseRates.allocated_handled_in_pallet_per_day.value =
      w.allocated_handled_in_pallet_per_day;
    warehouseRates.allocated_handled_out_cartons_per_day.value =
      w.allocated_handled_out_cartons_per_day;
    warehouseRates.allocated_handled_out_pallet_per_day.value =
      w.allocated_handled_out_pallet_per_day;
    warehouseRates.allocated_no_of_deliveries.value =
      w.allocated_no_of_deliveries;
    warehouseRates.allocated_delivery_kms_per_drop.value =
      w.allocated_delivery_kms_per_drop;
    warehouseRates.partner_remarks_observations.value =
      w.partner_remarks_observations;
    warehouseRates.allocated_delivery_Kgs_per_drop.value =
      w.allocated_delivery_Kgs_per_drop;
    warehouseRates.allocated_delivery_Cub_m__per_drop.value =
      w.allocated_delivery_Cub_m__per_drop;
    warehouseRates.ratesLoaded = true;
    setWarehouseRates({
      ...warehouseRates,
    });
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
        loadWarehouseRates(w);
        if (window.map && window.marker) {
          //TODO load map data
          window.marker.setLngLat([w.longitude, w.latitude]);
          window.marker.addTo(window.map);
          window.map.flyTo({
            center: [w.longitude, w.latitude],
            essential: true,
          });
          return;
        }
      },
      (pageData) => {},
      () => {}
    );
  }

  const validate = {
    warehouseData: () => {
      let errors = [];
      if (warehouseData.name.length === 0) {
        errors.push("Warehouse name cannot be empty");
      }
      if (warehouseData.capacity.length === 0) {
        errors.push("Warehouse capacity cannot be empty");
      }
      if (warehouseData.price.length === 0) {
        errors.push("Warehouse price cannot be empty");
      }
      if (warehouseData.description.length === 0) {
        errors.push("Warehouse description cannot be empty");
      }
      if (warehouseData.description.length > 400) {
        errors.push("Warehouse description cannot more than 400 characters");
      }
      if (warehouseData.availableArea.length === 0) {
        errors.push("Warehouse available Area cannot be empty");
      }
      if (warehouseData.availableFrom === null) {
        errors.push("Warehouse available From cannot be empty");
      }
      if (warehouseData.availableTo === null) {
        errors.push("Warehouse available To cannot be empty");
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
      if (warehouseAddress.address.length === 0) {
        errors.push("Warehouse Address cannot be empty");
      }
      if (warehouseAddress.address.length > 200) {
        errors.push("Warehouse Address cannot be more than 200 characters");
      }

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

  const Map = useMemo(() => <MapBox state={map} setState={setMap} />, []);

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
          <WarehouseData state={warehouseData} setState={setWarehouseData} />
          <WarehouseImagePicker
            state={warehouseImages}
            setState={setWarehouseImages}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <WarehouseLocality
            state={warehouseLocality}
            setState={setWarehouseLocality}
          />
          <WarehouseAddress
            state={warehouseAddress}
            setState={setWarehouseAddress}
          />
          <WarehouseCertificates
            state={warehouseCertificates}
            setState={setWarehouseCertificates}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {/* <WarehouseCertificates /> */}
          <WarehouseOfferings
            state={warehouseOfferings}
            setState={setWarehouseOfferings}
          />
          <SubmitSection
            state={submitStatus}
            onClick={() => {
              if (
                !(
                  validate.warehouseData() &&
                  validate.warehouseImages() &&
                  validate.warehouseAddress()
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
                // To add condition for edit later

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
                });
                warehouse.warehouseVersionId =
                  editWarehouseState.warehouse.warehouseVersionId;
                console.log(editWarehouseState.warehouse);
                //TODO set loading & Button Disabled
                setSubmitStatus({
                  ...submitStatus,
                  loading: true,
                });
                managerAPI.updateWarehouse(
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
                    console.log(e);
                    setSubmitStatus({
                      ...submitStatus,
                      loading: false,
                    });
                  }
                );
              }
            }}
          />
        </Grid>
        <WarehouseRates
          state={warehouseRates}
          setState={setWarehouseRates}
          viewOnly
        />
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
