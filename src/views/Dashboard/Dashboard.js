/* eslint-disable */
import React, { useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { routePaths, routeLayout } from "routes";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";

import * as StatsAPI from "api/Statistics";
import * as WarehouseAPI from "api/Warehouse";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();

  // ComponentDidMount and ComponentDidUpdate Equivalent for Hooks
  // useEffect(() => {});

  const defaultState = {
    isLoading: true,
    apiCalled: false,
    statsApiDone: false,
    warehouseApiDone: false,
    statsData: new StatsAPI.Statistics(),
    warehouseData: [],
  };

  const [state, setState] = React.useState(defaultState);

  if (state.apiCalled === false) {
    StatsAPI.getStatistics(
      (data) => {
        setState((prevState) => ({
          ...prevState,
          statsData: data,
          statsApiDone: true,
          apiCalled: true,
        }));
      },
      () => {},
      () => {}
    );

    WarehouseAPI.getWarehouse(
      (data) => {
        setState((prevState) => ({
          ...prevState,
          warehouseData: data,
          warehouseApiDone: true,
        }));
      },
      () => {},
      () => {},
      "state=approved"
    );

    setState({
      ...state,
      apiCalled: true,
      isLoading: false,
    });
  }
  return state.isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {/* Stats */}
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="warning" stats icon style={{ height: 85 }}>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h3 className={classes.cardTitle}>
                {/* {state.statsData.warhouseNo} */}
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Recent Uploads */}
      {/* <GridContainer>
        {state.warehouseData.map((item, index) => (
          <GridItem xs={12} sm={12} md={4}>
            {console.log(item)}
            <Card chart className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <img src={item.image.file} alt="..." />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button simple color="info" justIcon>
                      <VisibilityIcon
                        className={classes.underChartIcons}
                        onClick={(e) =>
                          props.history.push(
                            routeLayout.vendor +
                              routePaths.viewWarehouse +
                              "/" +
                              item.warehouseVersionId
                          )
                        }
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Change Data"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <Edit
                        className={classes.underChartIcons}
                        onClick={(e) =>
                          props.history.push(
                            routeLayout.vendor +
                              routePaths.editWarehouse +
                              "/" +
                              item.warehouseVersionId
                          )
                        }
                      />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardTitle}>{item.name}</h4>
                <p className={classes.cardCategory}>
                  Rs. {item.areaRate} sq ft
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}></div>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </GridContainer> */}
    </div>
  );
}
