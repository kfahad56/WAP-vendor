import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/WhatsApp";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/MailOutline";
import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem.js";
import Table from "../../components/Table/Table.js";
import Button from "../../components/CustomButtons/Button.js";
import Danger from "../../components/Typography/Danger.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts";

import styles from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import priceImage1 from "../../assets/img/card-2.jpeg";
import priceImage2 from "../../assets/img/card-3.jpeg";
import priceImage3 from "../../assets/img/card-1.jpeg";
import * as WarehouseAPI from "../../Apis/WarehouseCustomer";
const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const defaultState = {
    isLoading: true,
    apiCalled: false,
    warehouseApiDone: false,
    warehouseData: [],
  };

  const [state, setState] = React.useState(defaultState);

  if (state.apiCalled === false) {


    WarehouseAPI.getWarehouseById(
      "",
      (data) => {
        setState((prevState) => ({
          ...prevState,
          warehouseData: data,
          warehouseApiDone: true,
        }));
      },
      () => { },
      () => { },
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
        {/* <h3>Manage Listings</h3> */}

        <GridContainer>
          {state.warehouseData.map((item, index) => (
            <GridItem xs={12} sm={12} md={4}>
              <Card product className={classes.cardHover}>
                <CardHeader image className={classes.cardHeaderHover}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={item.image.file} alt="..." />
                  </a>
                </CardHeader>
                <CardBody>
                  <div className={classes.cardHoverUnder}>
                    <div className={`${classes.stats} ${classes.productStats}`}>
                      Share
                    </div>
                    <Tooltip
                      id="tooltip-top"
                      title="Mail"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button color="transparent" simple justIcon>
                        <ArtTrack className={classes.underChartIcons} />
                      </Button>
                    </Tooltip>
                    {/* <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip> */}
                    <Tooltip
                      id="tooltip-top"
                      title="WhatsApp"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button color="success" simple justIcon>
                        <Edit className={classes.underChartIcons} />
                      </Button>
                    </Tooltip>
                  </div>
                  <h4 className={classes.cardProductTitle}>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      {item.name}
                    </a>
                  </h4>

                </CardBody>
                <CardFooter product>
                  <div className={classes.price}>
                    <h4>Rs. {item.areaRate} sq ft</h4>
                  </div>
                  <div className={`${classes.stats} ${classes.productStats}`}>
                    <Place />{item.state.name}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
}
