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

import * as managerAPI from "../../Apis/reservation";

import { formatDate } from "../../Apis/util";

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
  createResIcon: {
    width: "100%",
    display: "flex",
    justifyContent: "right",
  },
};

const useStyles = makeStyles(styles);

export default function Res(props) {
  const classes = useStyles();
  const defaultComponentState = {
    loading: true,
    apiCalled: false,
  };

  const [componentState, setComponentState] = React.useState(
    defaultComponentState
  );
  const [ResData, setResData] = React.useState([]);

  if (componentState.apiCalled === false) {
    managerAPI.getResById(
      "",
      (data) => {
        setResData(data);
      },
      (data) => {},
      () => {},
      "state=pending"
    );
    setComponentState({
      loading: false,
      apiCalled: true,
    });
  }

  const getTableData = () => {
    console.log(ResData);
    return ResData.map((item, index) => {
      console.log(item);
      return [
        item.warehouse,
        formatDate(item.from) + " - " + formatDate(item.to),
        item.status,
      ];
    });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardBody>
              {componentState.loading ? <p>Loading...</p> : ""}
              {ResData.length > 0 ? (
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Warehouse Name", "Starting From-To", "Status"]}
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
