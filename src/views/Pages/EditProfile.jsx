/* eslint-disable */
import React from 'react';

// template
import Wizard from 'components/Wizard/Wizard'
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import Step1 from "views/Components/WizardSteps/Step1.js";
import Step2 from "views/Components/WizardSteps/Step2.js";
import Step3 from "views/Components/WizardSteps/Step3.js";

import * as profileAPI from "api/Profile";
import * as dropdownAPI from "api/Profile";
import * as companyAPI from "api/Company";
import CustomSnackbar from 'views/Components/CustomSnackbar';
import { successBoxShadow } from 'assets/jss/material-dashboard-pro-react';



const EditProfile = (props) => {
  const defaultState = {
    apiCalled: false,
    newProfilePic: false,
    profilePicFile: null,
    isSuccessPopup: false,
    companySaveClicked: false,
  }

  const popupDefault = {
    open: false,
    severity: '',
    message: ''
  }

  const [state, setState] = React.useState(defaultState);
  const [profile, setProfile] = React.useState(new profileAPI.Profile());
  const [company, setCompany] = React.useState(new companyAPI.Company());
  const [dropdown, setDropdown] = React.useState([]);
  const [popup, setPopup] = React.useState(popupDefault);

  if (state.apiCalled === false) {
    profileAPI.getProfile(
      (data) => {
        setProfile(data)
      },
      () => { console.log('error') }
    )

    setState((prevState) => ({
      ...prevState,
      apiCalled: true
    }))

    // dropdownAPI.getGst(
    //   (data) => {
    //     setDropdown(data)
    //   },
    //   () => { }
    // )

    // setState((prevState) => ({
    //   ...prevState,
    //   apiCalled: true
    // }))
  }

  const setNewProfilePic = (file) => {
    setState((prevState) => ({
      ...prevState,
      newProfilePic: true,
      profilePicFile: file
    }))
  }

  const profileHandleChange = (name, value) => {
    setProfile((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const setProfilChange = (profile) => {
    setProfile(profile);
  }

  const gstHandleChange = (value, name, index) => {
    let data = dropdown
    if (name === 'name') data[index].name = value
    else if (name === 'value') data[index].gst = value
    setDropdown([...data])
  }

  const addGST = () => {
    let data = [...dropdown]
    data.push({ name: '', gst: '' })
    setDropdown([...data])
  }

  const removeGST = (index) => {
    let data = [...dropdown]
    data.splice(index, 1)
    setDropdown([...data])
  }

  const getCompanyState = (companyState) => {
    setCompany(({ ...companyState }))
  }

  const companySavedClicked = () => {
    let manager = new companyAPI.Company()
    manager.setProperties({
      name: company.name,
      signatory: company.signatory,
      mobile: company.mobile,
      email: company.email,
      cin: company.cin,
      pan: company.pan,
      account_name: company.account_bank,
      account_number: company.account_number,
      account_ifsc: company.account_ifsc,
      gstin: company.gstin,
    })

    companyAPI.updateCompany(
      manager,
      () => {
        // props.history.push('/')
        setPopup((prevState) => ({ ...prevState, open: true, message: "Changes Successfully Saved" }))
      },
      () => {
        setPopup((prevState) => ({ ...prevState, open: true, message: "Some Error Occured", severity: 'error' }))
      },
    )
    // setState((prevState) => ({
    //   ...prevState,
    //   companySaveClicked: !state.companySaveClicked
    // }))
  }

  return (
    <GridContainer justify="center">
      <CustomSnackbar
        open={popup.open}
        message={popup.message}
        severity={popup.severity}
        handleClose={() => setPopup((prevState) => ({ ...popupDefault, message: prevState.message }))} />
      <GridItem xs={12} sm={8}>
        <Wizard
          validate
          steps={[
            { stepName: "About", stepComponent: Step1, stepId: "about", stepProps: { ...profile, profileHandleChange, setNewProfilePic } },
            {
              stepName: "Company", stepComponent: Step3, stepId: "company", stepProps: {
                // saveClicked: state.companySaveClicked,
                // toogleSaveClick: companySavedClicked,
                // history: props.history
                handleSetState: getCompanyState
              }
            }
          ]}
          // profileValid={true}
          profileValid={
            (
              profile.email.length > 0 &&
              profile.firstName.length > 0 &&
              profile.lastName.length > 0
            ) ? true : false
          }
          // gstValid={true}
          gstValid={() => {
            let bool = false
            dropdown.map((item, index) => {
              if (item.name.length === 0 || item.gst.length === 0) bool = false
            })
            return bool
          }}
          step1Click={() => {
            let manager = new profileAPI.Profile()
            manager.setProperties({
              firstName: profile.firstName,
              lastName: profile.lastName,
              mobile: profile.mobile,
              email: profile.email,
              profilePic: state.profilePicFile,
              gst: profile.gst,
              website: profile.website,
              account_bank: profile.account_bank,
              account_number: profile.account_number,
              account_ifsc: profile.account_ifsc,

              address_attention: profile.address_attention,
              address_state: profile.address_state,
              address_city: profile.address_city,
              address_str_1: profile.address_str_1,
              address_str_2: profile.address_str_2,
              address_zip: profile.address_zip,
              address_phone: profile.address_phone,
            })
            profileAPI.updateProfile(
              manager,
              () => {
                if (state.profilePicFile) {
                  return
                }
                setPopup((prevState) => ({ ...prevState, open: true, message: "Changes Successfully Saved" }))
                props.history.go(0)
              },
              (errors) => {
                setPopup((prevState) => ({ ...prevState, open: true, message: "Some Error Occured", severity: 'error' }))
              },
            )

            if (state.profilePicFile) {
              profileAPI.updateProfilePic(
                manager,
                () => {
                  setPopup((prevState) => ({ ...prevState, open: true, message: "Changes Successfully Saved" }))
                  props.history.go(0)
                  // props.history.push('/')
                },
                (errors) => {
                  setPopup((prevState) => ({ ...prevState, open: true, message: "Some Error Occured While Changing Profile Picture", severity: 'error' }))
                },
              )
            }
          }}
          // step2Click={() => {
          //   let valid = true
          //   dropdown.map((item, index) => {
          //     if (item.name.length === 0 || item.gst.length === 0) valid = false
          //   })
          //   if (valid) {
          //     profileAPI.updateGst(
          //       dropdown,
          //       () => {
          //         props.history.push('/')
          //       },
          //       () => { }
          //     )
          //   }
          // }}
          step2Click={() => {
            if (company.account_number === company.account_number_copy)
              companySavedClicked()
            else setPopup((prevState) => ({ ...prevState, open: true, message: "Some Error Occured", severity: 'error' }))
          }}
          title="Build Your Profile"
          subtitle="This information will let us know more about you."
        />
      </GridItem>
    </GridContainer>
  );
}

export default EditProfile;