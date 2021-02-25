/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// @material-ui/icons
import ExpandMore from "@material-ui/icons/ExpandMore";

import styles from "../../assets/jss/material-dashboard-pro-react/components/accordionStyle";

const useStyles = makeStyles(styles);

export default function Accordion(props) {
  let MobStyle = {
    width: "62vw",
    height: "55vw",
    marginLeft: "15vw"
  }
  const [active, setActive] = React.useState(props.active);
  const handleChange = panel => (event, expanded) => {
    setActive(expanded ? panel : -1);
  };
  const classes = useStyles();
  const { collapses } = props;
  return (
    <div className={classes.root}>
      {collapses.map((prop, key) => {
        return (
          <ExpansionPanel
            expanded={active === key}
            onChange={handleChange(key)}
            key={key}
            classes={{
              root: classes.expansionPanel,
              expanded: classes.expansionPanelExpanded
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              classes={{
                root: classes.expansionPanelSummary,
                expanded: classes.expansionPanelSummaryExpaned,
                content: classes.expansionPanelSummaryContent,
                expandIcon: classes.expansionPanelSummaryExpandIcon
              }}
            >
              <h4 className={classes.title}>{prop.title}</h4>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              <div>
                <img style={MobStyle} src={prop.image}
                />
                <div className={"accordianDesc " + prop.className} style={{ marginLeft: "4px" }}>{prop.content}</div>
              </div>


            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}

Accordion.defaultProps = {
  active: -1
};

Accordion.propTypes = {
  // index of the default active collapse
  active: PropTypes.number,
  collapses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.node
    })
  ).isRequired
};
