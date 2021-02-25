/* eslint-disable */
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icon
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem.js";
import Table from "../../components/Table/Table.js";
import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
import Tasks from "../../components/Tasks/Tasks.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardText from "../../components/Card/CardText.js";
import CardBody from "../../components/Card/CardBody.js";
import EditIcon from "@material-ui/icons/Edit";
import * as managerAPI from 'api/Documentation'
import { bugs, website, server } from "../../variables/general";
import { routePaths, routeLayout } from "../../routes"
import SearchBar from "material-ui-search-bar";

import {
  cardTitle,
  roseColor,
} from "../../assets/jss/material-dashboard-pro-react";
import { Visibility } from "@material-ui/icons";

const styles = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0",
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem",
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px",
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px",
    },
  },
  iconRose: {
    color: roseColor,
  },
  marginTop30: {
    marginTop: "30px",
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px",
    },
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999",
  },
  errorDisplay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};
let timeout = 0;
const useStyles = makeStyles(styles);

const Documentation = (props) => {
  const classes = useStyles();
  const defaultState = {
    apiCalled: false,
    searchText: "",
    list: [],
  }
  const [state, setState] = useState(defaultState);
  const [searchText, setsearchTextData] = React.useState("");
  if (state.apiCalled === false) {
    managerAPI.getDocumentation(
      props.match.params.id,
      searchText,
      (data) => {
        setState((prevState) => ({
          ...prevState,
          list: data.reverse(),
          apiCalled: true
        }))
      },
      () => { console.log('error') }
    )
  }

  const getIcon = (id, status) => {
    if (status.toLowerCase() === "active") {
      return (
        <Visibility
          onClick={() => {
            props.history.push(routeLayout.vendor + routePaths.contract + "/" + id);
          }}
        />
      );
    } else if (status.toLowerCase() === "expired") {
      return <div>-</div>;
    } else {
      return (
        <EditIcon
          onClick={() => {
            props.history.push(routeLayout.vendor + routePaths.contract + "/" + id);
          }}
        />
      );
    }
  }
  const RenderContent = () => {
    return <div>
      <GridContainer>
        <SearchBar
          style={{ marginLeft: 30, marginTop: 5 }}
          value={searchText}
          onChange={(value) => setsearchTextData(value)}
          autoFocus
          onRequestSearch={() => {
            setState((prevState) => ({
              ...prevState,
              apiCalled: false,
            }));
          }}
          onCancelSearch={() => {
            setsearchTextData("")
            setState((prevState) => ({
              ...prevState,
              apiCalled: false,
            }));
          }}
        />
        {/* {state.list.length > 0 ? */}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" text>
              <CardText color="warning">
                <h4 className={classes.cardTitleWhite}>
                  Contractual Agreements
                </h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <Table
                hover
                tableHeaderColor="warning"
                tableHead={[
                  "Warehouse Name",
                  "Customer name",
                  "Date Created",
                  "Expiry date",
                  "Booked space",
                  "Current step",
                  "Review",
                ]}
                tableData={
                  state.list.map((item, index) => {
                    return [
                      item.name,
                      item.customer_name,
                      item.date_created,
                      item.expiry_date,
                      item.booked_space,
                      item.currentStep,
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        {getIcon(item.id, item.currentStep)}
                      </div>
                      // item.currentStep.toLowerCase() === 'active' ? <Visibility
                      //   onClick={() => {
                      //     props.history.push(routeLayout.vendor + routePaths.contract + "/" + item.id);
                      //   }}
                      // /> :
                      //   <EditIcon
                      //     onClick={() => {
                      //       props.history.push(routeLayout.vendor + routePaths.contract + "/" + item.id);
                      //     }}
                      //   />,
                    ]
                  })
                }
              />
            </CardBody>
          </Card>
        </GridItem>
        {/* // : <h3 className={classes.errorDisplay}>No Contracts</h3> */}
        {/* } */}
      </GridContainer>
    </div>
  }

  return (
    //   state.list.length > 0 ?
    //     <RenderContent /> :
    //     (<h3 className={classes.errorDisplay}>
    //       No Contracts
    //     </h3>)
    <RenderContent />
  );
};

export default Documentation;
