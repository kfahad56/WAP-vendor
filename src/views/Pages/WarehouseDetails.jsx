/* eslint-disable */
import React, { useState } from 'react';

// Template
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Button from '../../components/CustomButtons/Button';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import Heading from '../../components/Heading/Heading';
import Timeline from '../../components/Timeline/Timeline';


// charts
import { straightLinesChart, simpleBarChart } from "../../variables/charts";
import ChartistGraph from 'react-chartist';


// material-ui/core
import { makeStyles } from "@material-ui/core/styles";


// @material-ui/icons
import CardTravel from "@material-ui/icons/CardTravel";
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";


import templateStyles from "../../assets/jss/material-dashboard-pro-react/views/chartsStyle";

const styles = {
  ...templateStyles,
  button: {
    width: 200,
    height: 75,
    fontSize: 13
  },
  title: {
    fontSize: 20
  },
  slider: {

  },
  contentContainer: {
    marginTop: 50
  },
  noNotification: {
    marginTop: 20,
    fontSize: 15
  },
  warehouseName: {
    marginLeft: 20,
    marginBottom: 80
  }
}

const useStyles = makeStyles(styles)

const WarehouseDetails = props => {
  const classes = useStyles()
  const defaultState = {
    apiCalled: false,
    isLoading: false,
  }

  const defaultNotification = {
    advanceShipment: [{
        inverted: true,
        badgeColor: "success",
        badgeIcon: CardTravel,
        title: "Some Title",
        titleColor: "success",
        body: (
          <p>Wifey made the best Father's Day meal ever. So thankful so happy so blessed. Thank you for making my family We just had fun with the “future” theme !!!   It was a fun night all together ... The always rude Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in downtown.</p>
        ),
        footerTitle: "11 hours ago via Twitter",
        footer: (<div/>)
      }],
    delivery: [],
    others: [],
    selected: 1,
  }

  const [state, setState] = useState(defaultState);
  const [notification, setNotification] = useState(defaultNotification)
  const [performance, setPerformance] = useState([1])


  const renderContent = () => {
    if (notification.selected === 1) return (
      notification.advanceShipment.length > 0 ? <Timeline stories={notification.advanceShipment}/> : 
      <div className={classes.noNotification}>
        <Heading title="No Notifications" textAlign="center"/>
      </div> 
    )
    else if (notification.selected === 2) return (
      notification.delivery.length > 0 ? <Timeline stories={notification.delivery}/> : 
      <div className={classes.noNotification}>
        <Heading title="No Notifications" textAlign="center"/>
      </div> 
    )
    else if (notification.selected === 3) return (
      notification.others.length > 0 ? <Timeline stories={notification.others}/> : 
      <div className={classes.noNotification}>
        <Heading title="No Notifications" textAlign="center"/>
      </div> 
    )
  }

  const renderDetails = (
    <div>
      <div className={classes.slider}></div>
      <div className={classes.slider}></div>
    </div>
  )

  const renderPerformance = (
    <div>
      <GridContainer>
        {performance.map((item, index) => <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart-white-colors"
                data={simpleBarChart.data}
                type="Bar"
                options={simpleBarChart.options}
                responsiveOptions={simpleBarChart.responsiveOptions}
                listener={simpleBarChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Simple Bar Chart</h4>
              <p className={classes.cardCategory}>Bar Chart</p>
            </CardBody>
          </Card>
        </GridItem>)}
      </GridContainer>
    </div>
  )

  const renderNotification = (
    <div>
      <GridContainer>
        <GridItem>
          <Button
            className={classes.button} color={notification.selected === 1 ? "" : "info"}
            onClick={() => {
              setNotification((prevState) => ({
                ...prevState,
                selected: 1
              }))
            }}>
            Advance Shipment
          </Button>
        </GridItem>
        <GridItem>
          <Button className={classes.button} color={notification.selected === 2 ? "" : "info"}
            onClick={() => {
              setNotification((prevState) => ({
                ...prevState,
                selected: 2
              }))
            }}>
            Delivery
          </Button>
        </GridItem>
        <GridItem>
          <Button className={classes.button} color={notification.selected === 3 ? "" : "info"}
            onClick={() => {
              setNotification((prevState) => ({
                ...prevState,
                selected: 3
              }))
            }}>
            Others
          </Button>
        </GridItem>
      </GridContainer>
      {renderContent()}
    </div>
  )

  return (
    <div>
      <div className={classes.warehouseName}>
      <Heading title="Warehouse Name" />
      </div>
      <CustomTabs
        plainTabs
        headerColor="info"
        tabs={[
          {
            tabName: "Warehouse Details",
            tabIcon: Face,
            tabContent: renderDetails
          },
          // {
          //   tabName: "Performance",
          //   tabIcon: Build,
          //   tabContent: renderPerformance
          // },
          {
            tabName: "Notification",
            tabIcon: Chat,
            tabContent: renderNotification
          }
        ]}
      />
      <div className={classes.contentContainer}>
        {/* {renderContent()} */}
      </div>
    </div>
  );
}

export default WarehouseDetails;