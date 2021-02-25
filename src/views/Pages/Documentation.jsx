// eslint-disable-next-line
import React, { useState } from 'react';
import { routeLayout, routePaths } from "../../routes";
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
import EditIcon from '@material-ui/icons/Edit';

import { bugs, website, server } from "../../variables/general";
import * as contractAPI from "../../Apis/Contracts";

import {
  cardTitle,
  roseColor,
} from "../../assets/jss/material-dashboard-pro-react";
import { Visibility } from '@material-ui/icons';
import SearchBar from 'material-ui-search-bar';

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
};

const useStyles = makeStyles(styles);

const Documentation = (props) => {
  const defaults = {
    contracts: {
      list: [],
      apiCalled: false,
      searchText: ""
    }
  }
  let [contracts, setContracts] = useState(defaults.contracts);
  const classes = useStyles();

  if (!contracts.apiCalled) {
    contractAPI.getContracts(
      (data) => setContracts((prevState) => ({ ...prevState, list: data.reverse() })),
      () => { console.log('error') },
      `search=${contracts.searchText}`
    )
    setContracts((prevState) => ({ ...prevState, apiCalled: true }))
  }

  const getIcon = (url, status) => {
    if (status.toLowerCase() === 'completed') {
      return <Visibility onClick={() => props.history.push(url)} />
    } else if (status.toLowerCase() === 'expired') {
      return <div>-</div>
    } else {
      return <EditIcon onClick={() => props.history.push(url)} />
    }
  }

  // const [state, setState] = useState();
  const getTableData = () => {
    return contracts.list.map((item) => [
      item.name,
      item.currentStep,
      // item.status,
      <div style={{ marginLeft: 20 }}>
        {getIcon(routeLayout.customer + routePaths.contract + `/${item.id}`, item.currentStep)}
      </div>
      // item.currentStep.toLowerCase() === 'completed' ? <Visibility onClick={() => {
      //   props.history.push(routeLayout.customer + routePaths.contract + `/${item.id}`);
      // }} /> :
      //   <EditIcon onClick={() => {
      //     props.history.push(routeLayout.customer + routePaths.contract + `/${item.id}`);
      //   }} />
    ])
  }
  return (
    <div>
      <GridContainer>
        <GridItem>
          <SearchBar
            onChange={(value) => setContracts((prevState) => ({ ...prevState, searchText: value }))}
            onRequestSearch={() => setContracts((prevState) => ({ ...prevState, apiCalled: false }))}
            onCancelSearch={() => setContracts((prevState) => ({ ...prevState, searchText: "", apiCalled: false }))}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" text>
              <CardText color="warning">
                <h4 className={classes.cardTitleWhite}>Contractual Agreements</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <Table
                hover
                tableHeaderColor="warning"
                tableHead={[, "Warehouse Name", "Current Step", "Review"]}
                tableData={getTableData()}
              />
            </CardBody>
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="rose"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                    rtlActive={false}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                    rtlActive={false}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                    rtlActive={false}
                  />
                ),
              },
            ]}
          />
        </GridItem> */}
      </GridContainer>
    </div >
  );
}

export default Documentation;