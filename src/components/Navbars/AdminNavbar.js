/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks";
import Button from "components/CustomButtons/Button";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";

// apis
import * as warehouseAPI from "api/Warehouse";

const useStyles = makeStyles(styles);

export default function AdminNavbar(props) {
  const classes = useStyles();
  const { color, rtlActive, brandText } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color,
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive,
    });

  const [state, setState] = React.useState({
    apiCalled: false,
  });

  const [warehouseData, setWarehouseData] = React.useState([]);

  if (props.getWarehouse && state.apiCalled === false) {
    warehouseAPI.getWarehouse(
      (data) => {
        let temp = data.map((item) => {
          return { value: item.name, key: item.id, custom: true };
        });
        setWarehouseData([...temp]);
      },
      () => {},
      () => {},
      "state=approved"
    );

    setState((prevState) => ({
      ...prevState,
      apiCalled: true,
    }));
  }
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title} color="transparent">
            {brandText}
          </Button>
          {props.getWarehouse ? (
            <CustomDropdown
              // buttonProps={{ className: classes.title }}
              buttonText="Warehouses"
              hoverColor="transparent"
              dropdownList={warehouseData}
              onClick={(id) => {
                let path = props.location.pathname.split("/");
                props.history.replace(`/${path[1]}/${path[2]}/${id}`);
              }}
            />
          ) : (
            <React.Fragment />
          )}
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks rtlActive={rtlActive} history={props.history} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
};
