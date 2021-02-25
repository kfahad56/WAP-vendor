// import React from "react";
// // react plugin for creating charts
// import ChartistGraph from "react-chartist";
// // react plugin for creating vector maps
// import { VectorMap } from "react-jvectormap";

// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import Tooltip from "@material-ui/core/Tooltip";
// import Icon from "@material-ui/core/Icon";

// // @material-ui/icons
// // import ContentCopy from "@material-ui/icons/ContentCopy";
// import Store from "@material-ui/icons/Store";
// // import InfoOutline from "@material-ui/icons/InfoOutline";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// // import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Refresh from "@material-ui/icons/Refresh";
// import Edit from "@material-ui/icons/Clear";
// import Place from "@material-ui/icons/Place";
// import ArtTrack from "@material-ui/icons/ArtTrack";
// import Language from "@material-ui/icons/Language";

// // core components
// import GridContainer from "../../components/Grid/GridContainer";
// import GridItem from "../../components/Grid/GridItem.js";
// import Table from "../../components/Table/Table.js";
// import Button from "../../components/CustomButtons/Button.js";
// import Danger from "../../components/Typography/Danger.js";
// import Card from "../../components/Card/Card.js";
// import CardHeader from "../../components/Card/CardHeader.js";
// import CardIcon from "../../components/Card/CardIcon.js";
// import CardBody from "../../components/Card/CardBody.js";
// import CardFooter from "../../components/Card/CardFooter.js";

// import styles from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";

// import priceImage1 from "../../assets/img/card-2.jpeg";
// import priceImage2 from "../../assets/img/card-3.jpeg";
// import priceImage3 from "../../assets/img/card-1.jpeg";
// import * as StatsAPI from "../../Apis/Statistics";
// import * as WarehouseAPI from "../../Apis/WarehouseCustomer";
// const useStyles = makeStyles(styles);

// export default function Dashboard() {
//   const classes = useStyles();
//   const defaultState = {
//     isLoading: true,
//     apiCalled: false,
//     statsApiDone: false,
//     warehouseApiDone: false,
//     statsData: new StatsAPI.Statistics(),
//     warehouseData: [],
//   };

//   const [state, setState] = React.useState(defaultState);

//   if (state.apiCalled === false) {
//     StatsAPI.getStatistics(
//       (data) => {
//         setState((prevState) => ({
//           ...prevState,
//           statsData: data,
//           statsApiDone: true,
//           apiCalled: true,
//         }));
//       },
//       () => { },
//       () => { }
//     );

//     WarehouseAPI.getWarehouseById(
//       "",
//       (data) => {
//         setState((prevState) => ({
//           ...prevState,
//           warehouseData: data,
//           warehouseApiDone: true,
//         }));
//       },
//       () => { },
//       () => { },
//     );

//     setState({
//       ...state,
//       apiCalled: true,
//       isLoading: false,
//     });
//   }
//   return state.isLoading ? (
//     <h1>Loading...</h1>
//   ) : (
//       <div>
//         {/* <h3>Manage Listings</h3> */}
//         <GridContainer>
//           <GridItem xs={12} sm={6} md={6} lg={3}>
//             <Card>
//               <CardHeader color="warning" stats icon>
//                 <CardIcon color="warning">
//                   <Icon></Icon>
//                 </CardIcon>
//                 <p className={classes.cardCategory}>My Warehouses</p>
//                 <h3 className={classes.cardTitle}>
//                   {state.statsData.rented_warehouse}
//                 </h3>
//               </CardHeader>
//             </Card>
//           </GridItem>
//         </GridContainer>
//         <GridContainer>
//           {state.warehouseData.map((item, index) => (
//             <GridItem xs={12} sm={12} md={4}>
//               <Card product className={classes.cardHover}>
//                 <CardHeader image className={classes.cardHeaderHover}>
//                   <a href="#pablo" onClick={e => e.preventDefault()}>
//                     <img src={item.image.file} alt="..." />
//                   </a>
//                 </CardHeader>
//                 <CardBody>
//                   <div className={classes.cardHoverUnder}>
//                     <Tooltip
//                       id="tooltip-top"
//                       title="View"
//                       placement="bottom"
//                       classes={{ tooltip: classes.tooltip }}
//                     >
//                       <Button color="transparent" simple justIcon>
//                         <ArtTrack className={classes.underChartIcons} />
//                       </Button>
//                     </Tooltip>

//                     <Tooltip
//                       id="tooltip-top"
//                       title="Remove"
//                       placement="bottom"
//                       classes={{ tooltip: classes.tooltip }}
//                     >
//                       <Button color="danger" simple justIcon>
//                         <Edit className={classes.underChartIcons} />
//                       </Button>
//                     </Tooltip>
//                   </div>
//                   <h4 className={classes.cardProductTitle}>
//                     <a href="#pablo" onClick={e => e.preventDefault()}>
//                       {item.name}
//                     </a>
//                   </h4>

//                 </CardBody>
//                 <CardFooter product>
//                   <div className={classes.price}>
//                     <h4>Rs. {item.areaRate} sq ft</h4>
//                   </div>
//                   <div className={`${classes.stats} ${classes.productStats}`}>
//                     <Place />{item.state.name}
//                   </div>
//                 </CardFooter>
//               </Card>
//             </GridItem>
//           ))}
//         </GridContainer>
//       </div>
//     );
// }
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
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import DescriptionIcon from "@material-ui/icons/Description";
import NotificationsIcon from "@material-ui/icons/Notifications";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

// Template Components
import Heading from "../../components/Heading/Heading";

// styles
import styles from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import * as WarehouseAPI from "../../Apis/Warehouse";
import { routeLayout, routePaths } from "../../routes";

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
    objectFit: "cover",
  },
};

const useStyles = makeStyles(customStyles);

const MyWarehouse = (props) => {
  const classes = useStyles();
  const defaultState = {
    isLoading: true,
    apiCalled: false,
    approvedWarehouseData: [],
    ShortlistedWarehouseData: [],
  };

  const [state, setState] = useState(defaultState);

  if (state.apiCalled === false) {
    // Warehouse Call
    WarehouseAPI.getWarehouse(
      (data) => {
        let ShortlistedWarehouseData = [];
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
              ShortlistedWarehouseData: ShortlistedWarehouseData.push(item),
            }));
        });
        setState((prevState) => ({
          ...prevState,
          ShortlistedWarehouseData: ShortlistedWarehouseData,
          approvedWarehouseData: approvedWarehouseData,
          isLoading: false,
        }));
      },
      () => {},
      () => {}
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
        {/* <div className={classes.cardProductDesciprion}>
          {cardProps.data.desc}
        </div> */}
      </CardBody>
      <CardFooter chart className={classes.cardFooter}>
        <div className={classes.cardRate}>₹{cardProps.data.areaRate}/sq ft</div>
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
      <div
        className="fixed-plugin"
        style={{
          cursor: "pointer",
        }}
        onClick={() =>
          props.history.push(routeLayout.vendor + routePaths.createWarehouse)
        }
      >
        <div id="fixedPluginClasses" className={props.fixedClasses}>
          <div>
            <i
              className="fa fa-plus-circle fa-2x"
              style={{
                color: "#ffffff",
                padding: 10,
                borderRadius: "0 0 6 6",
                width: "auto",
              }}
            />
          </div>
        </div>
      </div>

      {/* Approved */}
      {state.approvedWarehouseData.length > 0 ? (
        <div>
          <Heading title="Rented Warehouses" textAlign="center" />
          <GridContainer className={classes.gridContainer}>
            {state.approvedWarehouseData.map((item, index) => (
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
                      {/* <ToolTipComponent
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
                        /> */}
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
                      <ToolTipComponent
                        onClick={(e) => {}}
                        color="transparent"
                        icon={Delete}
                        title="Remove"
                      />
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
        <></>
      )}
      {/* Shortlisted */}
      {state.ShortlistedWarehouseData.length > 0 ? (
        <div>
          <div className={classes.headingContainer}>
            <Heading title="ShortListed Warehouses" textAlign="center" />
          </div>
          <GridContainer className={classes.gridContainer}>
            {state.ShortlistedWarehouseData.map((item, index) => (
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
                  }
                />
              </GridItem>
            ))}
          </GridContainer>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyWarehouse;
