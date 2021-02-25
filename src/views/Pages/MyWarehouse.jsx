/* eslint-disable */
import React, { useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem.js";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

// @material-ui/icons
import Visibility from "@material-ui/icons/Visibility";
// import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import DescriptionIcon from "@material-ui/icons/Description";
import NotificationsIcon from "@material-ui/icons/Notifications";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// Template ../../Components
import Heading from "../../components/Heading/Heading";

// styles
import styles from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import * as WarehouseAPI from "../../Apis/warehouse1.ts";
import { routeLayout, routePaths } from "../../routes";
import { public_url } from "Apis/base";

const customStyles = {
  ...styles,
  subTitle: {
    display: "flex",
    justifyContent: "center",
  },
  headingContainer: {
    marginBottom: 80,
  },
  cardProductTitle: {
    ...styles.cardProductTitle,
    fontSize: 18,
    marginBottom: 8,
  },
  cardProductDesciprion: {
    ...styles.cardProductDesciprion,
  },

  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
  },

  cardRate: {
    ...styles.cardProductTitle,
    fontSize: 15,
  },
  cardHeaderImage: {
    // width: 300,
    // height: 150,
    objectFit: 'cover'
  },
  noWarehouseText: {
    '@media only screen and (max-width: 420px)': {
      textAlign: 'center',
    }
  }
};

const useStyles = makeStyles(customStyles);

const MyWarehouse = (props) => {
  const classes = useStyles();
  const defaultState = {
    isLoading: true,
    apiCalled: false,
    rentedoutwarehouseData: [],
    shortlistedwarehouseData: [],
  };

  const [state, setState] = useState(defaultState);

  if (state.apiCalled === false) {
    // Warehouse Call
    WarehouseAPI.getWarehouse(
      (data) => {
        setState((prevState) => ({
          ...prevState,
          shortlistedwarehouseData: data,
          isLoading: false,
        }));
      },
      () => { },
      () => { },
      "shortlisted=true"
    );
    WarehouseAPI.getWarehouse(
      (data) => {
        setState((prevState) => ({
          ...prevState,
          rentedoutwarehouseData: data,
          isLoading: false,
        }));
      },
      () => { },
      () => { },
      "rented=true"
    );

    setState({
      ...state,
      apiCalled: true,
    });
  }

  const ToolTipComponent = (toolTipProps) => (
    <Tooltip
      id="tooltip-top"
      title={toolTipProps.title}
      placement="bottom"
      classes={{ tooltip: classes.tooltip }}
    >
      <Button simple color={toolTipProps.color} justIcon round>
        <toolTipProps.icon
          className={classes.underChartIcons}
          onClick={(e) => toolTipProps.onClick(e)}
        />
      </Button>
    </Tooltip>
  );
  const CardComponent = (cardProps) => (
    <Card chart className={classes.cardHover}>
      <CardHeader image className={classes.cardHeaderHover}>
        <img src={cardProps.data.image} alt="..." style={{ maxHeight: 300 }} />
      </CardHeader>
      <CardBody>
        <div className={classes.cardHoverUnder}>{cardProps.tooltip}</div>
        <div className={classes.cardProductTitle}>{cardProps.data.name}</div>
        <div className={classes.cardProductDesciprion}>
          {cardProps.data.desc}
        </div>
      </CardBody>
      <CardFooter chart className={classes.cardFooter}>
        {cardProps.data.areaRate ?
          <div className={classes.cardRate}>₹{cardProps.data.areaRate}/sq ft per week</div> : <div className={classes.cardRate} />
        }
        <div className={classes.stats}>
          <LocationOnIcon />
          {cardProps.data.location.state + ", " + cardProps.data.location.city}
        </div>
      </CardFooter>
    </Card>
  );

  return state.isLoading ? (
    <div>Loading...</div>
  ) : (
      <div>
        {/* Fixed Plugin */}
        {/* <div
          className="fixed-plugin"
          style={{
            cursor: 'pointer',
          }}
          onClick={() => props.history.push(routeLayout.customer + routePaths.createWarehouse)}>
          <div id="fixedPluginClasses" className={props.fixedClasses}>
            <div>
              <i className="fa fa-plus-circle fa-2x" style={{
                color: "#ffffff",
                padding: 10,
                borderRadius: "0 0 6 6",
                width: 'auto'
              }} />
            </div>
          </div>
        </div> */}

        {/* Approved */}
        <Heading title="Rented Warehouses" textAlign="center" />
        {state.rentedoutwarehouseData.length > 0 ? (
          <div>
            <GridContainer className={classes.gridContainer}>
              {state.rentedoutwarehouseData.map((item, index) => (
                <GridItem xs={12} sm={12} md={4}>
                  <CardComponent
                    data={{
                      image: item.image.file,
                      warehouseVersionId: item.warehouseVersionId,
                      name: item.name,
                      desc: item.desc,
                      location: { city: item.city.name, state: item.state.name },
                    }}
                    tooltip={
                      <div>
                        <ToolTipComponent
                          onClick={(e) => {
                            window.location = `${public_url}viewwarehouse/` + item.warehouseVersionId
                          }}
                          color="info"
                          icon={Visibility}
                          title="View"
                        />
                        {/* <ToolTipComponent
                          onClick={(e) => {
                            props.history.push(
                              routeLayout.customer +
                              routePaths.editWarehouse +
                              "/" +
                              item.warehouseVersionId
                            );
                          }}
                          color="transparent"
                          icon={Edit}
                          title="Edit"
                        /> */}
                        {/* <ToolTipComponent
                          onClick={(e) => {
                            props.history.push(
                              routeLayout.customer +
                              routePaths.performance +
                              "/" +
                              item.warehouseVersionId
                            );
                          }}
                          color="transparent"
                          icon={EqualizerIcon}
                          title="Performance"
                        /> */}
                        <ToolTipComponent
                          onClick={(e) => {
                            props.history.push(
                              routeLayout.customer +
                              routePaths.notification +
                              "/" +
                              item.warehouseVersionId
                            );
                          }}
                          color="transparent"
                          icon={NotificationsIcon}
                          title="Notification"
                        />
                        <ToolTipComponent
                          onClick={(e) => {
                            props.history.push(
                              routeLayout.customer +
                              routePaths.documentation +
                              "/" +
                              item.warehouseVersionId
                            );
                          }}
                          color="transparent"
                          icon={DescriptionIcon}
                          title="Documentation"
                        />
                        {/* <ToolTipComponent
                          onClick={(e) => { }}
                          color="transparent"
                          icon={Delete}
                          title="Remove"
                        /> */}
                        {/* {item.disable ?
                        <ToolTipComponent
                          onClick={(e) => { }}
                          color="transparent"
                          icon={AddCircleIcon}
                          title="Enable"
                        />
                        :
                        <ToolTipComponent
                            onClick={(e) => { }}
                            color="transparent"
                            icon={RemoveCircleIcon}
                            title="Disable"
                          />

                        } */}
                      </div>
                    }
                  />
                </GridItem>
              ))}
            </GridContainer>
          </div>
        ) : (
            <div className={classes.noWarehouseText}>No Warehouses Rented</div>
          )}
        {/* Shortlisted */}
        <Heading title="Shortlisted Warehouses" textAlign="center" />
        {state.shortlistedwarehouseData.length > 0 ? (
          <div>
            <div className={classes.headingContainer}>
            </div>
            <GridContainer className={classes.gridContainer}>
              {state.shortlistedwarehouseData.map((item, index) => (
                <GridItem xs={12} sm={12} md={4}>
                  <CardComponent
                    data={{
                      image: item.image.file,
                      warehouseVersionId: item.warehouseVersionId,
                      name: item.name,
                      areaRate: item.areaRate,
                      desc: item.desc,
                      location: { city: item.city.name, state: item.state.name },
                    }}
                    tooltip={
                      <ToolTipComponent
                        onClick={(e) => {
                          window.location = `${public_url}viewwarehouse/` + item.warehouseVersionId
                        }}
                        color="info"
                        icon={Visibility}
                        title="View"
                      />
                    }
                  />
                </GridItem>
              ))}
            </GridContainer>
          </div>
        ) : (
            <div className={classes.noWarehouseText}>You Have Not Shortlisted Any Warehouses</div>
          )}
      </div>
    );
};

export default MyWarehouse;
