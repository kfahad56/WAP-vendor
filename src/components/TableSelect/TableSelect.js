/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-pro-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const classes = useStyles();
  const handleToggle = (value) => {
    props.handleToggle(value);
  };
  const { checkList, checkedList } = props;
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: props.rtlActive,
  });
  return (
    <Table className={classes.table}>
      <TableBody>
        {checkList.map((value) => (
          <TableRow key={value.id} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>
              <Checkbox
                checked={
                  checkedList.filter((i) => i.id === value.id).length > 0
                }
                tabIndex={-1}
                onClick={() => handleToggle(value)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.root,
                }}
              />
            </TableCell>
            <TableCell className={tableCellClasses}>{value.value}</TableCell>
            <TableCell className={classes.tableActions}></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array,
};
