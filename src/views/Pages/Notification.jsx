/* eslint-disable */
import React, { useState, useEffect } from "react";
import Timeline from "components/Timeline/Timeline";

import * as notificationManager from "api/Notification";

import { makeStyles } from "@material-ui/core/styles"

import { NotificationAction } from "views/Components/NotificationAction"
import Button from 'components/CustomButtons/Button'

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
    getNotifications();
  }, [props.match.params.id]);

  const notificationCall = () => {
    // console.log(props.match.params.id)
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

  const getNotifications = () => {
    // Clear Prev Timer
    // if (interval) {
    //   clearInterval(interval)
    // }
    notificationCall()

    // if id is not provided
    // if (props.match.params.id) {
    // First Call

    // Set Timer
    // interval = setInterval(() => notificationCall(), 10000)
    // }
  };

  const createStories = (data) => {
    let temp = data.map((item) => {
      let temp = NotificationAction(item, props.history);
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
    // props.match.params.id ?
    (stories.length > 0 ?
      <Timeline simple stories={stories} /> :
      (<h3 className={classes.NoNotification}>
        No Notifications
      </h3>)
    )
    // : (
    //   <h3 className={classes.NoNotification}>
    //     Select A Warehouse
    //   </h3>
    // )
  );
};

export default Notifications;
