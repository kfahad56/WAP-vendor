/* eslint-disable */
import React from "react";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import { NavLink } from "react-router-dom";
import Button from "../../components/CustomButtons/Button.js";
import { cardTitle } from "../../assets/jss/material-dashboard-pro-react";

import * as managerAPI from "../../Apis/tour";

import { formatDate } from "../../Apis/util";
import { msToTime } from "../../Apis/util.ts";
import SearchBar from "material-ui-search-bar";

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
  createTourIcon: {
    width: "100%",
    display: "flex",
    justifyContent: "right",
  },
};

const useStyles = makeStyles(styles);

export default function Tour(props) {
  const classes = useStyles();
  const defaultComponentState = {
    loading: true,
    apiCalled: false,
    searchText: "",
  };

  const [componentState, setComponentState] = React.useState(
    defaultComponentState
  );
  const [TourData, setTourData] = React.useState([]);

  if (componentState.apiCalled === false) {
    managerAPI.getTour(
      (data) => {
        setTourData(data);
      },
      (data) => {},
      () => {},
      "search=" + componentState.searchText
    );
    setComponentState((prevState) => ({
      ...prevState,
      loading: false,
      apiCalled: true,
    }));
  }

  const getTableData = () => {
    console.log(TourData);
    return TourData.map((item, index) => {
      return [
        item.name,
        formatDate(item.datetime),
        // msToTime(item.datetime),
        item.status,
      ];
    });
  };

  return (
    <div>
      <GridContainer>
        <GridItem>
          <SearchBar
            onChange={(value) =>
              setComponentState((prevState) => ({
                ...prevState,
                searchText: value,
              }))
            }
            onCancelSearch={() =>
              setComponentState((prevState) => ({
                ...prevState,
                searchText: "",
                apiCalled: false,
              }))
            }
            onRequestSearch={() =>
              setComponentState((prevState) => ({
                ...prevState,
                apiCalled: false,
              }))
            }
          />
        </GridItem>
        <GridItem xs={12}>
          <Card>
            <CardBody>
              {componentState.loading ? <p>Loading...</p> : ""}
              {TourData.length > 0 ? (
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Warehouse Name",
                    "Date",
                    // "Time",
                    "Status",
                  ]}
                  tableData={getTableData()}
                />
              ) : (
                <p>No Data </p>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
