import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch";
import ChkBoxDropDown from "components/ChkBoxDropDown/ChkBoxDropDown.jsx";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CheckboxExample(props) {
  const checked = props.item.isChecked;
  const distance = props.item.distance;
  // const { distance, setDistance } = props;
  // const handleToggle = (value) => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecked(newChecked);
  // };

  const handleClick = (e) => {
    props.handleChange({
      id: e.target.value,
      distance: distance,
      selected: !props.selected,
      index: props.index,
    });
  };

  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
      }}
      className={
        classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal
      }
    >
      <FormControlLabel
        control={
          <Checkbox
            // checked={false}
            onClick={handleClick}
            checkedIcon={<Check className={classes.checkedIcon} />}
            icon={<Check className={classes.uncheckedIcon} />}
            classes={{
              checked: classes.checked,
              root: classes.checkRoot,
            }}
            disabled={props.viewOnly}
            checked={props.item.isChecked}
          />
        }
        classes={{ label: classes.label }}
        label={props.item.value}
      />
      <div>
        {props.viewOnly ? (
          <TextField
            value={`Within ${distance} km`}
            disabled={true}
            style={{ marginLeft: 30 }}
          />
        ) : (
          <ChkBoxDropDown
            // value={props.distance ? props.distance : 0.5}
            // disabled={!props.selected}
            value={distance}
            disabled={!checked}
            handleChange={(i) => {
              props.handleDistanceChange(i);
            }}
            style={{ marginLeft: 30 }}
          />
        )}
      </div>
    </div>
  );
}
