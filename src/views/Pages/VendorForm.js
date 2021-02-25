import React from "react";
import HubspotForm from 'react-hubspot-form'


// @material-ui/core components
import { Grid } from "@material-ui/core";


export default function VendorForm() {

  return (
    <Grid container>
      <HubspotForm
        portalId='7906452'
        formId='040765a3-169f-4e30-ba7a-b54de4d91334'
        onSubmit={() => console.log('Submit!')}
        onReady={(form) => console.log('Form ready!')}
        loading={<div>Loading...</div>}
      />
    </Grid>
  );
}
