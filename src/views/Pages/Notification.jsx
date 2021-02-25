import React, { useState, useEffect } from "react";
import Timeline from "components/Timeline/Timeline";

import * as notificationManager from "Apis/Notification";

import { makeStyles } from "@material-ui/core/styles"

import { NotificationAction } from "views/Components/NotificationAction"
import Button from "components/CustomButtons/Button"

// Icons
import Fingerprint from "@material-ui/icons/Fingerprint";

const styles = {
  NoNotification: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const useStyles = makeStyles(styles)

let interval = null

const Notifications = (props) => {
  const classes = useStyles()
  const defaultPageState = {
    totalData: 0,
    perPage: 0,
    currentPage: 0,
  };

  const [stories, setStories] = useState([]);
  const [pageState, setPageState] = useState(defaultPageState);

  useEffect(() => {
    notificationCall()
  }, [props.match.params.id]);

  const notificationCall = () => {
    notificationManager.getWarehouses(
      props.match.params.id,
      (data) => {
        createStories(data);
      },
      (data) => {
        setPageState((prevState) => ({
          ...prevState,
          data,
        }));
      },
      () => {
        console.log("error");
      }
    )
  }

  const createStories = (data) => {
    let temp = data.map((item) => {
      let temp = NotificationAction(item, props.history)
      return {
        inverted: true,
        badgeColor: temp.color,
        badgeIcon: temp.icon,
        title: item.title,
        footer: temp.action ? (
          <Button
            round
            color="github"
            onClick={() => {
              temp.action();
            }}
          >
            Action
          </Button>
        ) : null,
        titleColor: "danger",
        body: <p>{item.body}</p>,
        footerTitle: item.timeAgo,
      };
    });

    setStories([...temp]);
  };

  return (
    stories.length > 0 ?
      <Timeline simple stories={stories} /> :
      (<h3 className={classes.NoNotification}>
        No Notifications
      </h3>)
  );
};

export default Notifications;
