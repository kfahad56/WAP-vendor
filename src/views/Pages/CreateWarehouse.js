/* eslint-disable */

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { useParams } from "react-router";

// material-ui icons
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Divider, TextField } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

// custom components
import SelectionMap from "components/SelectionMap/SelectionMap";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import { NavLink } from "react-router-dom";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import CustomInput from "components/CustomInput/CustomInput";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import CheckboxExample from "components/checkBox";
import AddCert from "components/AddCert/AddCert";
import UploadButton from "components/UploadButton/UploadButton";
import DropDownMulti from "components/DropDownMulti/DropDownMulti.js";
import DropDownSingle from "components/DropDownSingle/DropDownSingle.jsx";
import DatePicker from "components/DatePicker/DatePicker";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import * as managerAPI from "api/Warehouse";
import * as amenitiesAPI from "api/Amenities";
import * as addonServiceAPI from "api/AddonService";
import * as industryTagAPI from "api/IndustryTags";
import * as cityAPI from "api/Cities";
import * as stateAPI from "api/States";
import * as localityAPI from "api/Localities";
import { compareAsc } from "date-fns";
import { routeLayout, routePaths } from "routes";

const styles = {
  customCardContentClass: {
    paddingLeft: "0",
    paddingRight: "0",
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

export default function CreateWarehouse(props) {
  const defaultCompanyManager = managerAPI.Warehouse;

  const defaultComponentState = {
    loading: true,
    apiCalled: false,
    localityCalled: false,
  };

  const editDialogDefaultState = {
    open: false,
    warehouseID: 0,
    activeCompanyManager: defaultCompanyManager,
    isSaving: false,
    messages: [],
  };

  const [editDialog, setEditDialog] = React.useState(editDialogDefaultState);
  const [componentState, setComponentState] = React.useState(
    defaultComponentState
  );
  const [warehouseData, setWarehouseData] = React.useState(
    new editDialog.activeCompanyManager()
  );

  const [amenityData, setAmenityData] = React.useState([]);
  const [addonServiceData, setAddonService] = React.useState([]);
  const [industryTagData, setIndustryTag] = React.useState([]);
  const [localityData, setLocality] = React.useState([]);
  const [stateData, setState] = React.useState([]);
  const [cityData, setCity] = React.useState([]);

  const getLocalityIndex = (arr, id) => {
    return arr.map((item) => item.id).indexOf(id);
  };

  // const getCoords = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((location) => {
  //       setWarehouseData((prevData) => ({
  //         ...prevData,
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //       }));
  //     });
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // };

  const RegularMap = withScriptjs(
    withGoogleMap((temp) => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{
          lat: temp.coords.latitude,
          lng: temp.coords.longitude,
        }}
        defaultOptions={{
          scrollwheel: true,
          draggableCursor: "default",
        }}
        onClick={(e) => {
          let lat = e.latLng.lat();
          let lng = e.latLng.lng();
          setWarehouseData((prevData) => ({
            ...prevData,
            latitude: lat,
            longitude: lng,
          }));
        }}
      >
        <Marker
          defaultPosition={{
            lat: temp.coords.latitude,
            lng: temp.coords.longitude,
          }}
          noRedraw={true}
        />
      </GoogleMap>
    ))
  );

  if (componentState.apiCalled === false) {
    // Called locality first so we can have both the arrays to work with
    // (selected coming from warehouse and all locality options coming from locality)
    if (componentState.localityCalled === false) {
      let tempLocalityData = [];
      localityAPI.getLocalities(
        (value) => {
          tempLocalityData = value;
          setLocality(
            value.map((item) => {
              return { ...item, selected: false };
            })
          );
          setComponentState((prevData) => ({
            ...prevData,
            localityCalled: true,
          }));
          if (props.match.params.id) {
            setEditDialog((prevData) => ({
              ...prevData,
              warehouseID: props.match.params.id,
            }));
            managerAPI.getWarehouseById(
              props.match.params.id,
              (data) => {
                cityAPI.getCities(
                  data.state.id,
                  setCity,
                  () => {},
                  () => {
                    console.log("error");
                  }
                );
                data.city = data.city.id;
                data.state = data.state.id;

                let locality = tempLocalityData;
                data.locality.map((item, index) => {
                  let localityDataIndex = getLocalityIndex(locality, item.id);
                  locality[localityDataIndex].selected = true;
                  locality[localityDataIndex].distance = item.distance;
                });
                console.log("second");
                setLocality(locality);
                setWarehouseData((prevData) => data);
              },
              () => {},
              () => {
                console.log("error");
              }
            );
          }
        },
        () => {},
        () => {
          console.log("error");
        }
      );
    }

    stateAPI.getStates(
      (data) => {
        setState(data);
      },
      () => {},
      () => {
        console.log("error");
      }
    );

    amenitiesAPI.getAmenities(
      setAmenityData,
      () => {},
      () => {
        console.log("error");
      }
    );
    addonServiceAPI.getAddonService(
      setAddonService,
      () => {},
      () => {
        console.log("error");
      }
    );
    industryTagAPI.getIndustryTags(
      setIndustryTag,
      () => {},
      () => {
        console.log("error");
      }
    );

    setComponentState({
      apiCalled: true,
      loading: false,
    });
  }

  const handleSubmit = () => {
    let data = new editDialog.activeCompanyManager();

    let locality = [];
    localityData.map((item, index) => {
      if (item.selected === true) locality.push(item);
    });

    data.setProperties({
      warehouseVersionId: warehouseData.warehouseVersionId,
      id: warehouseData.id,
      name: warehouseData.name,
      licenseNo: warehouseData.licenseNo,
      areaSqFt: warehouseData.areaSqFt,
      areaRate: warehouseData.areaRate,
      country: warehouseData.country,
      state: warehouseData.state,
      city: warehouseData.city,
      address: warehouseData.address,
      pincode: warehouseData.pincode,
      latitude: warehouseData.latitude,
      longitude: warehouseData.longitude,
      availableFrom: warehouseData.availableFrom,
      availableTo: warehouseData.availableTo,
      desc: warehouseData.desc,
      locality: locality,
      amenities: warehouseData.amenities,
      addonServices: warehouseData.addonServices,
      industryTags: warehouseData.industryTags,
      certificates: warehouseData.certificates,
      images: warehouseData.images,
    });

    if (editDialog.warehouseID === 0)
      managerAPI.addWarehouse(
        data,
        () => {
          console.log("successful");
          props.history.push(routeLayout.vendor + routePaths.pendingWarehose);
        },
        (errors) => {
          console.log(errors);
        }
      );
    else
      managerAPI.updateWarehouse(
        data,
        () => {
          console.log("successful");
          props.history.push(routeLayout.vendor + routePaths.pendingWarehose);
          f;
        },
        (errors) => {
          console.log(errors);
        }
      );
  };

  return componentState.loading ? (
    <></>
  ) : (
    <GridContainer>
      <GridItem>
        <div style={{ display: "flex" }}>
          <div>
            <CustomInput
              labelText="Registered Warehouse Name *"
              id="float"
              formControlProps={{
                fullWidth: true,
              }}
              name="name"
              value={warehouseData.name}
              handleChange={(value) =>
                setWarehouseData((prevData) => ({
                  ...prevData,
                  name: value,
                }))
              }
            />
            {/* <CustomInput
                labelText="Registered Warehouse Lisence No. *"
                id="float"
                formControlProps={{
                  fullWidth: true,
                }}
                value={warehouseData.licenseNo}
                handleChange={(value) =>
                  setWarehouseData((prevData) => ({
                    ...prevData,
                    licenseNo: value,
                  }))
                }
              /> */}
            <CustomInput
              labelText="Area Sq. Ft.*"
              id="float"
              formControlProps={{
                fullWidth: true,
              }}
              value={warehouseData.areaSqFt}
              handleChange={(value) =>
                setWarehouseData((prevData) => ({
                  ...prevData,
                  areaSqFt: value,
                }))
              }
            />
            <p>Warehouse Address *</p>
            <CustomInput
              labelText="Country *"
              id="float"
              formControlProps={{
                fullWidth: true,
              }}
              value={warehouseData.country ? warehouseData.country : "India"}
              handleChange={(value) =>
                setWarehouseData((prevData) => ({
                  ...prevData,
                  country: value,
                }))
              }
            />
            <div style={{ display: "flex" }}>
              <DropDownSingle
                state={warehouseData.state === 0 ? "" : warehouseData.state}
                city={warehouseData.city === 0 ? "" : warehouseData.city}
                stateList={stateData}
                cityList={cityData}
                handleCity={(e) => {
                  setWarehouseData((prevData) => ({
                    ...prevData,
                    city: e.target.value,
                  }));
                }}
                handleState={(e) => {
                  setWarehouseData((prevState) => ({
                    ...prevState,
                    state: e.target.value,
                  }));
                  cityAPI.getCities(
                    e.target.value,
                    setCity,
                    () => {},
                    () => {
                      console.log("error");
                    }
                  );
                }}
              />
            </div>
            <CustomInput
              labelText="Pincode *"
              id="float"
              formControlProps={{
                fullWidth: true,
              }}
              value={warehouseData.pincode}
              handleChange={(value) =>
                setWarehouseData((prevState) => ({
                  ...prevState,
                  pincode: value,
                }))
              }
            />

            <CustomInput
              inputProps={{
                multiline: true,
                rows: 3,
              }}
              labelText="Address *"
              value={warehouseData.address}
              defaultValue=""
              handleChange={(event) => {
                setWarehouseData((prevState) => ({
                  ...prevState,
                  address: event,
                }));
              }}
            />

            <div>
              <p>Place Pointer On Map</p>
              <SelectionMap
                height="200px"
                width="300px"
                edit={editDialog.warehouseID}
                // coords={
                //   warehouseData.latitude !== 0 &&
                //   warehouseData.longitude !== 0
                //     ? {
                //         latitude: warehouseData.latitude,
                //         longitude: warehouseData.longitude,
                //       }
                //     : false
                // }
                coords={{
                  latitude: warehouseData.latitude,
                  longitude: warehouseData.longitude,
                }}
                callBack={(lat, lng) =>
                  setWarehouseData((prevData) => ({
                    ...prevData,
                    latitude: lat,
                    longitude: lng,
                  }))
                }
              />
              {/* <RegularMap
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVlFLJuccEHLtVAW2FU5J3GuIXzQ1gfcU"
                  loadingElement={<div style={{ height: "100%" }} />}
                  containerElement={
                    <div
                      style={{ height: "200px", width: "300px", marginTop: 10 }}
                    />
                  }
                  mapElement={<div style={{ height: "100%" }} />}
                  // coords={
                  //   warehouseData.latitude === 0 &&
                  //   warehouseData.longitude === 0
                  //     ? getCoords()
                  //     : {
                  //         latitude: warehouseData.latitude,
                  //         longitude: warehouseData.longitude,
                  //       }
                  // }
                  coords={{
                    latitude: warehouseData.latitude,
                    longitude: warehouseData.longitude,
                  }}
                /> */}
            </div>
          </div>

          <div style={{ marginLeft: 20 }}>
            <Divider orientation="vertical" />
          </div>
        </div>
      </GridItem>
      <GridItem>
        <div style={{ display: "flex", height: "100%", width: 350 }}>
          <div>
            <p>Availibility </p>

            <div style={{ display: "flex" }}>
              <DatePicker
                handleChange={(date) => {
                  setWarehouseData((prevState) => ({
                    ...prevState,
                    availableFrom: date,
                  }));
                }}
                defaultValue={warehouseData.availableFrom}
                label="From"
                edit={editDialog.warehouseID}
                style={{ marginRight: 10 }}
                disablePast
              />
              <DatePicker
                handleChange={(date) =>
                  setWarehouseData((prevState) => ({
                    ...prevState,
                    availableTo: date,
                  }))
                }
                defaultValue={warehouseData.availableTo}
                edit={editDialog.warehouseID}
                label="To"
                style={{ marginLeft: 10 }}
                disablePast
              />
            </div>
            {/* <p>Warehouse Rate</p> */}
            <CustomInput
              labelText="Rs/Area Sq. Ft.*"
              id="float"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                disabled: editDialog.warehouseID,
              }}
              value={warehouseData.areaRate}
              handleChange={(value) =>
                setWarehouseData((prevState) => ({
                  ...prevState,
                  areaRate: value,
                }))
              }
            />
            {/* <p>Description *</p> */}
            <CustomInput
              inputProps={{
                multiline: true,
                rows: 3,
                fullWidth: true,
              }}
              labelText="Description *"
              value={warehouseData.desc}
              handleChange={(value) =>
                setWarehouseData((prevState) => ({
                  ...prevState,
                  desc: value,
                }))
              }
            />

            <div style={{ display: "flex" }}>
              <p style={{ width: 200, marginTop: 32 }}>
                Certifcations And Licenses
              </p>
              <AddCert
                style={{ marginLeft: 200 }}
                handleUpload={(files) => {
                  setWarehouseData((prevState) => ({
                    ...prevState,
                    certificates: warehouseData.certificates.concat(
                      Array.from(files).map((item) => item)
                    ),
                  }));
                }}
              />
            </div>
            <div>
              {warehouseData.certificates.map((item, index) => {
                return (
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <PictureAsPdfIcon />
                    <div style={{ marginLeft: "10px" }}>{item.name}</div>
                  </div>
                );
              })}
            </div>
            <br />
            <div>
              <p style={{ marginBottom: "40px" }}>Locality</p>
              {localityData.map((item, index) => {
                return (
                  <CheckboxExample
                    handleChange={(temp) => {
                      let locality = localityData;
                      locality[temp.index].selected = temp.selected;
                      locality[temp.index].distance = temp.distance;
                      setLocality(locality);
                    }}
                    label={item.value}
                    selected={item.selected}
                    distance={item.distance}
                    index={index}
                  />
                );
              })}
            </div>
          </div>

          <div style={{ marginLeft: 20 }}>
            <Divider orientation="vertical" />
          </div>
        </div>
      </GridItem>
      <GridItem>
        <div style={{ display: "flex" }}>
          <div>
            <DropDownMulti
              selectionList={amenityData}
              label="Amenities"
              value={warehouseData.amenities}
              handleChange={(value) => {
                setWarehouseData((prevState) => ({
                  ...prevState,
                  amenities: value,
                }));
              }}
            />

            <br />
            <DropDownMulti
              selectionList={addonServiceData}
              label="Addon Services"
              value={warehouseData.addonServices}
              handleChange={(value) => {
                setWarehouseData((prevState) => ({
                  ...prevState,
                  addonServices: value,
                }));
              }}
            />
            <br />
            <DropDownMulti
              selectionList={industryTagData}
              value={warehouseData.industryTags}
              label="Industry Tags"
              handleChange={(value) => {
                // if (value.id in warehouseData.industryTags) {}
                setWarehouseData((prevState) => ({
                  ...prevState,
                  industryTags: value,
                }));
              }}
            />
            <br />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {warehouseData.images.slice(0, 5).map((item, index) => {
                let element;

                if (typeof item.file == "undefined") {
                  const reader = new FileReader();
                  reader.readAsDataURL(item);
                  element = (
                    <img
                      style={{ objectFit: "contain" }}
                      id={"image" + index}
                      width={"200px"}
                      height={"150px"}
                    />
                  );
                  reader.onload = (e) => {
                    document.getElementById("image" + index).src =
                      reader.result;
                  };
                } else {
                  element = (
                    <img
                      id={"image" + index}
                      style={{ objectFit: "contain" }}
                      width={"200px"}
                      height={"150px"}
                      src={item.file}
                    />
                  );
                }

                return element;
              })}
            </div>
            {warehouseData.images.length >= 5 ? (
              <></>
            ) : (
              <UploadButton
                handleUpload={(file) => {
                  setWarehouseData((prevState) => ({
                    ...prevState,
                    images: warehouseData.images.concat([file]),
                  }));
                }}
              />
            )}
            <div onClick={() => handleSubmit()}>
              <Button style={{ marginTop: 20, width: 200 }}>Submit</Button>
            </div>
          </div>
        </div>
      </GridItem>
    </GridContainer>
  );
}
