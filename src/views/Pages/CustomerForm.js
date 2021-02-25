import React from "react";
import HubspotForm from 'react-hubspot-form'


// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem";


export default function ErrorPage() {
  return (
    <GridContainer>
      <HubspotForm
        portalId='7906452'
        formId='3799a27c-e78b-475f-9a67-a5d8fcf8666c'
        onSubmit={() => console.log('Submit!')}
        onReady={(form) => console.log('Form ready!')}
        loading={<div>Loading...</div>}
      />
    </GridContainer>
  );
}
