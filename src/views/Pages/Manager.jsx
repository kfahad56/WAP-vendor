import React, { useState } from 'react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import NavPills from 'components/NavPills/NavPills';

import { makeStyles } from "@material-ui/core/styles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import CustomInput from 'components/CustomInput/CustomInput';
import Heading from 'components/Heading/Heading';
import * as managerAPI from '../../Apis/manager.ts';

const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  cardCategory: {
    margin: "0",
    color: "#999999"
  },
  profileInfo: {
    fontSize: 10
  }
};

const useStyles = makeStyles(styles);

const Manager = () => {
  const classes = useStyles();
  const defaultState = {
    email: "",
  }
  const defaultManager = new managerAPI.Manager({

    name: "",
    email: "",
    mobile: "",

  });
  const defaultComponentState = {
    loading: true,
    apiCalled: false,
  };
  const editDialogDefaultState = {
    open: false,
    regCustomerID: 0,
    activeManager: defaultManager,
    isSaving: false,
    messages: [],
  };
  const [state, setState] = useState(defaultState);
  const [managerData, setManagerData] = React.useState(defaultManager);
  const [componentState, setComponentState] = React.useState(
    defaultComponentState
  );
  if (componentState.apiCalled === false) {
    managerAPI.getManager(
      (data) => {
        setManagerData(data);
      },
      (data) => { },
      () => { }
    );
    setComponentState({
      loading: false,
      apiCalled: true
    });
  }


  return (
    <div>
      <Card>
        <CardBody>
          <div>
            <div style={{ display: "flex" }}>
              {/* <Heading title="Manager Name:" /> */}
              <div style={{ marginTop: 19, fontSize: 24 }}>
                {managerData.name}
              </div>
            </div>
            <div className={classes.profileInfo}>
              <div style={{ display: "flex", marginTop: 32 }}>

                <Heading title="Email: " />
                <div style={{ marginTop: 12, marginLeft: 10, fontSize: 15 }}>

                  {managerData.email}
                </div>
              </div>
            </div>
            <div className={classes.profileInfo}>
              <div style={{ display: "flex" }}>

                <Heading title="Contact: " />
                <div style={{ marginTop: 12, marginLeft: 10, fontSize: 15 }}>

                  {managerData.mobile}
                </div>
              </div>
              {/* <div className={classes.profileInfo}>
                      <Heading title="Link: " />
                    </div> */}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Manager;