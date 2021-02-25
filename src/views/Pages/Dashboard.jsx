/* eslint-disable */
import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import DescriptionIcon from "@material-ui/icons/Description";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AnnouncementIcon from '@material-ui/icons/Announcement';


// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import * as dashboardAPI from 'api/Dashboard'
// Routes
// import { routePaths, routeLayout } from 'routes'


import { Icon } from "@material-ui/core";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const Dashboard = (props) => {
  const defaultState = {
    apiCalled: false,
  }
  const defaultStats = {
    documentation: 0,
    performance: 0,
    pendingWarehouse: 0,
    notification: 0,
    myWarehouse: 0,
    approved_doc: 0,
    pending_doc: 0
  }

  const [state, setState] = useState(defaultState);
  const [stats, setStats] = useState(defaultStats);
  const classes = useStyles()

  if (!state.apiCalled) {
    dashboardAPI.getStatistics(
      (data) => {
        console.log(data);
        setStats((prevState) => ({
          ...prevState,
          documentation: data.documentation,
          performance: data.performance,
          myWarehouse: data.myWarehouse,
          pendingWarehouse: data.approval,
          notification: data.notification,
          approved_doc: data.approved_doc,
          pending_doc: data.pending_doc
        }))
      },
      () => { console.log('error') }
    )

    setState((prevState) => ({ ...prevState, apiCalled: true }))
  }

  return (
    <GridContainer justify='space-around'>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card style={{
          cursor: 'pointer'
        }} onClick={() => {
          props.history.push("/vendor/my-warehouse");
        }}>
          <CardHeader color="warning" stats icon>
            <CardIcon color="warning">
              {/* <Icon>content_copy</Icon> */}
              <Store />
            </CardIcon>
            <p className={classes.cardCategory}>My Warehouses</p>
            <h3 className={classes.cardTitle}>
            </h3>
          </CardHeader>
          <CardFooter stats>
            <p>Approved: {stats.myWarehouse}</p>
            <p>Under review: {stats.pendingWarehouse}</p>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardHeader color="success" stats icon>
            <CardIcon color="success">
              <EqualizerIcon />
            </CardIcon>
            <p className={classes.cardCategory}>Performance</p>
            <h3 className={classes.cardTitle}>{stats.performance}</h3>
          </CardHeader>
          {/* <CardFooter plain />
           */}
          <CardFooter stats>
            <div className={classes.stats}>
              <AnnouncementIcon />
                Comming Soon
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card style={{
          cursor: 'pointer',
        }} onClick={() => {
          props.history.push("/vendor/documentation");
        }}>
          <CardHeader color="danger" stats icon>
            <CardIcon color="danger">
              {/* <Icon>info_outline</Icon> */}
              <DescriptionIcon />
            </CardIcon>
            <p className={classes.cardCategory}>Documentation</p>
            <h3 className={classes.cardTitle}>{stats.documentation}</h3>
          </CardHeader>
          <CardFooter stats>
            {/* <p>Total: {stats.documentation}</p> */}
            <p>Pending: {stats.pending_doc}</p>
            <p>Approved: {stats.approved_doc}</p>
          </CardFooter>
          {/* <CardFooter stats>
            <div className={classes.stats}>
              <LocalOffer />
                Tracked from Github
              </div>
          </CardFooter> */}
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card style={{
          cursor: 'pointer'
        }} onClick={() => {
          props.history.push("/vendor/notification");
        }}>
          <CardHeader color="info" stats icon>
            <CardIcon color="info">
              {/* <i className="fab fa-twitter" /> */}
              <NotificationsIcon />
            </CardIcon>
            <p className={classes.cardCategory}>Notification</p>
            <h3 className={classes.cardTitle}>{stats.notification}</h3>
          </CardHeader>
          <CardFooter plain />
          {/* <CardFooter stats>
            <div className={classes.stats}>
              <Update />
                Just Updated
              </div>
          </CardFooter> */}
        </Card>
      </GridItem>
    </GridContainer>

  );
};

export default Dashboard;
