/* eslint-disable */
import React, { useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// @material-ui/icons
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import DescriptionIcon from "@material-ui/icons/Description";
import NotificationsIcon from "@material-ui/icons/Notifications";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// Template Components
import Heading from "components/Heading/Heading";

// styles
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import * as WarehouseAPI from "api/Warehouse";
import { routeLayout, routePaths } from "routes";
import FixedPlugin from "components/FixedPlugin/FixedPlugin";
import ConfirmPopup from "views/Components/ConfirmPopup";

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
  cardChangesRecommended: {
    ...styles.cardProductTitle,
    fontSize: 13
  },
  cardHeaderImage: {
    // width: 300,
    // height: 150,
    objectFit: 'cover'
  },
  noWarehouseText: {
    textTransform: 'initalize',
    '@media only screen and (max-width: 426px)': {
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
    approvedWarehouseData: [],
    pendingWarehouseData: [],
  };
  const defaultConfirmPopup = {
    open: false,
    titleText: "Are You Sure?",
    contentText: "This Action Is Irreversible.",
    successFunction: () => { },
  }

  const [state, setState] = useState(defaultState);
  const [confirmPopup, setConfirmPopup] = useState(defaultConfirmPopup)
  if (state.apiCalled === false) {
    // Warehouse Call
    WarehouseAPI.getWarehouse(
      (data) => {
        let pendingWarehouseData = [];
        let approvedWarehouseData = [];

        data.map((item) => {
          if (item.isApproved)
            setState((prevState) => ({
              ...prevState,
              approvedWarehouseData: approvedWarehouseData.push(item),
            }));
          else
            setState((prevState) => ({
              ...prevState,
              pendingWarehouseData: pendingWarehouseData.push(item),
            }));
        });
        setState((prevState) => ({
          ...prevState,
          pendingWarehouseData: pendingWarehouseData,
          approvedWarehouseData: approvedWarehouseData,
          isLoading: false,
        }));
      },
      () => { },
      () => { }
      // "state=approved"
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
      onClick={(e) => toolTipProps.onClick(e)}
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
        <img src={cardProps.data.image} alt="..." />
      </CardHeader>
      <CardBody>
        <div className={classes.cardHoverUnder}>{cardProps.tooltip}</div>
        <div className={classes.cardProductTitle}>{cardProps.data.name}</div>
        <div className={classes.cardProductDesciprion}>
          {cardProps.data.desc}
        </div>
      </CardBody>
      <CardFooter chart className={classes.cardFooter}>
        {cardProps.leftFooterType === 'rate' ?
          <div className={classes.cardRate}>₹{cardProps.data.areaRate}/sq ft /week</div> :
          cardProps.data.changesRecommended ?
            <p className={classes.cardChangesRecommended}>Changes Recommended</p> : <div></div>
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
        <ConfirmPopup
          open={confirmPopup.open}
          titleText={confirmPopup.titleText}
          contentText={confirmPopup.contentText}
          handleClose={() =>
            setConfirmPopup((prevState) => ({
              ...prevState,
              open: false,
            }))
          }
          handleSubmit={confirmPopup.successFunction}
        />
        {/* Fixed Plugin */}
        <div
          className="fixed-plugin"
          style={{
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 0, 0, 0.9)'
          }}
          onClick={() => props.history.push(routeLayout.vendor + routePaths.createWarehouse)}>
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
        </div>
        {/* <GridContainer>
          <Button
            variant="outlined"
            onClick={() => props.history.push(routeLayout.vendor + routePaths.createWarehouse)}>
            Add Warehouse
          </Button>
        </GridContainer> */}

        {/* Approved */}
        <Heading title="Approved Warehouses" textAlign="center" />
        {state.approvedWarehouseData.length > 0 ? (
          <div>
            <GridContainer className={classes.gridContainer}>
              {state.approvedWarehouseData.map((item, index) => (
                <GridItem xs={12} sm={12} md={4}>
                  <CardComponent
                    leftFooterType='rate'
                    data={{
                      image: item.image.file,
                      warehouseVersionId: item.warehouseVersionId,
                      name: item.name,
                      areaRate: item.areaRate,
                      desc: item.desc,
                      location: { city: item.city.name, state: item.state.name },
                    }}
                    tooltip={
                      <div>
                        <ToolTipComponent
                          onClick={(e) => {
                            props.history.push(
                              routeLayout.vendor +
                              routePaths.viewWarehouse +
                              "/" +
                              item.warehouseVersionId
                            );
                          }}
                          color="info"
                          icon={Visibility}
                          title="View"
                        />
                        <ToolTipComponent
                          onClick={(e) => {
                            props.history.push(
                              routeLayout.vendor +
                              routePaths.editWarehouse +
                              "/" +
                              item.warehouseVersionId
                            );
                          }}
                          color="transparent"
                          icon={Edit}
                          title="Edit"
                        />
                        {/* <ToolTipComponent
                          onClick={(e) => {
                            props.history.push(
                              routeLayout.vendor +
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
                              routeLayout.vendor +
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
                              routeLayout.vendor +
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
                          icon={item.isActive ? RemoveCircleIcon : AddCircleIcon}
                          title="Remove"
                        /> */}
                        {item.isDisabled ?
                          <ToolTipComponent
                            onClick={(e) => {
                              setConfirmPopup((prevState) => ({
                                ...prevState,
                                open: true,
                                contentText: "This will activate your warehouse for others to see",
                                successFunction: () => {
                                  let manager = new WarehouseAPI.Warehouse()
                                  manager.warehouseVersionId = item.warehouseVersionId
                                  manager.isDisabled = false
                                  WarehouseAPI.disableWarehouse(
                                    manager,
                                    () => {
                                      state.approvedWarehouseData[index].isDisabled = false
                                      setState({ ...state })
                                    },
                                    () => { console.log('error') }
                                  )
                                }
                              }))
                            }}
                            color="transparent"
                            icon={AddCircleIcon}
                            title="Enable"
                          />
                          :
                          <ToolTipComponent
                            onClick={(e) => {
                              setConfirmPopup((prevState) => ({
                                ...prevState,
                                open: true,
                                contentText: "This will disable and hide your warehouse from others",
                                successFunction: () => {
                                  let manager = new WarehouseAPI.Warehouse()
                                  manager.warehouseVersionId = item.warehouseVersionId
                                  manager.isDisabled = true
                                  WarehouseAPI.disableWarehouse(
                                    manager,
                                    () => {
                                      state.approvedWarehouseData[index].isDisabled = true
                                      setState({ ...state })
                                    },
                                    () => { console.log('error') }
                                  )
                                }
                              }))
                            }}
                            color="transparent"
                            icon={RemoveCircleIcon}
                            title="Disable"
                          />

                        }
                      </div>
                    }
                  />
                </GridItem>
              ))}
            </GridContainer>
          </div>
        ) : (
            <div className={classes.noWarehouseText}>No Approved Warehouses</div>
          )}
        {/* Pending */}
        <Heading title="Pending Warehouses" textAlign="center" />
        {state.pendingWarehouseData.length > 0 ? (
          <div>
            <GridContainer className={classes.gridContainer}>
              {state.pendingWarehouseData.map((item, index) => (
                <GridItem xs={12} sm={12} md={4}>
                  <CardComponent
                    data={{
                      image: item.image.file,
                      changesRecommended: item.changesRecommended,
                      warehouseVersionId: item.warehouseVersionId,
                      name: item.name,
                      areaRate: item.areaRate,
                      desc: item.desc,
                      location: { city: item.city.name, state: item.state.name },
                    }}
                    tooltip={
                      <>
                        <ToolTipComponent
                          onClick={(e) => {
                            props.history.push(
                              routeLayout.vendor +
                              routePaths.viewWarehouse +
                              "/" +
                              item.warehouseVersionId
                            );
                          }}
                          color="info"
                          icon={Visibility}
                          title="View"
                        />
                        {item.changesRecommended ?
                          <ToolTipComponent
                            onClick={(e) => {
                              props.history.push(
                                routeLayout.vendor +
                                routePaths.editWarehouse +
                                "/" +
                                item.warehouseVersionId
                              );
                            }}
                            color="transparent"
                            icon={Edit}
                            title="Edit"
                          /> : <React.Fragment />
                        }
                      </>
                    }
                  />
                </GridItem>
              ))}
            </GridContainer>
          </div>
        ) : (
            <div className={classes.noWarehouseText}>No Pending Warehouses</div>
          )}
      </div>
    );
};

export default MyWarehouse;
