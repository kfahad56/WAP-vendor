/* eslint-disable */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    justifyContent: 'space-between',
    display: 'flex'
  },
  selectFormControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    root: {
      width: '150px'
    }
  }
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    state: '',
    name: '',
  });

  return (
    <div className={classes.root}>
      <FormControl fullWidth className={classes.selectFormControl} style={{ marginLeft: 0 }}>
        <InputLabel
          htmlFor="state-select"
        >
          Single State
      </InputLabel>
        <Select
          style={{
            width: '150px'
          }}
          value={props.state}
          onChange={props.handleState}
        >
          {props.stateList.map(item => {
            return <MenuItem
              classes={{
                root: classes.selectMenuItem
              }}
              value={item.id}
            >
              {item.value}
            </MenuItem>
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth className={classes.selectFormControl} style={{ marginRight: 0 }}>
        <InputLabel
          htmlFor="simple-select"
        >
          Single City
        </InputLabel>
        <Select
          style={{
            width: '150px',
          }}
          value={props.city}
          disabled={!props.state}
          onChange={props.handleCity}
        >
          {props.cityList.map(item => {
            return <MenuItem
              classes={{
                root: classes.selectMenuItem
              }}
              value={item.id}
            >
              {item.value}
            </MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
}