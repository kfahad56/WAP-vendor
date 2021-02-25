import React from 'react';

// template
import Wizard from 'components/Wizard/Wizard'
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import Step1 from "views/Components/WizardSteps/Step1.js";
import Step2 from "views/Components/WizardSteps/Step2.js";
import Step3 from "views/Components/WizardSteps/Step3.js";

import * as profileAPI from "Apis/Profile";
import * as dropdownAPI from "Apis/Profile";
import CustomSnackbar from 'views/Components/CustomSnackbar';



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
    message: '',
    handleClose: () => { }
  }

  const [state, setState] = React.useState(defaultState);
  const [profile, setProfile] = React.useState(new profileAPI.Profile());
  const [dropdown, setDropdown] = React.useState([]);
  const [popup, setPopup] = React.useState(popupDefault);

  if (state.apiCalled === false) {
    profileAPI.getProfile(
      (data) => {
        // console.log(data)
        setProfile(data)
      },
      () => { }
    )

    setState((prevState) => ({
      ...prevState,
      apiCalled: true
    }))

    dropdownAPI.getGst(
      (data) => {
        setDropdown(data)
      },
      () => { }
    )

    setState((prevState) => ({
      ...prevState,
      apiCalled: true
    }))
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

  const gstHandleChange = (value, name, index) => {
    console.log('in')
    let data = dropdown
    if (name === 'name') data[index].name = value
    else if (name === 'value') data[index].gst = value
    setDropdown(() => ([...data]))
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

  const companySavedClicked = () => {
    setState((prevState) => ({
      ...prevState,
      companySaveClicked: !state.companySaveClicked
    }))
  }

  return (
    <GridContainer justify="center">
      <CustomSnackbar
        open={popup.open}
        message={popup.message}
        severity={popup.severity}
        handleClose={() => {
          setPopup((prevState) => ({ ...popupDefault, message: prevState.message }))
          popup.handleClose()
        }} />
      <GridItem xs={12} sm={8}>
        <Wizard
          validate
          steps={[
            { stepName: "About", stepComponent: Step1, stepId: "about", stepProps: { ...profile, profileHandleChange, setNewProfilePic } },
            { stepName: "GST Information", stepComponent: Step2, stepId: "gst", stepProps: { gstData: dropdown, handleChange: gstHandleChange, addGST, removeGST } },
            {
              stepName: "Company", stepComponent: Step3, stepId: "company", stepProps: {
                ...profile,
                saveClicked: state.companySaveClicked,
                toogleSaveClick: companySavedClicked,
                history: props.history,
                successFunction: () => { setPopup((prevState) => ({ ...prevState, open: true, message: "Changes Successfully Saved", severity: 'success' })) },
                errorFunction: () => { setPopup((prevState) => ({ ...prevState, open: true, message: "Some Error Occured", severity: 'error' })) },
                validationError: () => { setPopup((prevState) => ({ ...prevState, open: true, message: "Some Error Occured", severity: 'error' })) },
              }
            }
          ]}
          // profileValid={true}
          profileValid={
            (
              !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(profile.email) &&
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
            if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(profile.email) &&
              profile.firstName.length > 0 &&
              profile.lastName.length > 0
            ) {
              setPopup((prevState) => ({ ...prevState, open: true, message: "Some Error Occured", severity: 'error' }))
            } else {
              let manager = new profileAPI.Profile()
              manager.setProperties({
                firstName: profile.firstName,
                lastName: profile.lastName,
                mobile: profile.mobile,
                email: profile.email,
                profilePic: state.profilePicFile,
                gst: profile.gst,
                company_signatory: profile.company_signatory,
                name: profile.name
              })
              profileAPI.updateProfile(
                manager,
                () => {
                  if (state.profilePicFile) {
                    return
                  }
                  setPopup((prevState) => ({ ...prevState, open: true, message: "Changes Successfully Saved", severity: 'success', handleClose: () => props.history.go(0) }))
                  props.history.go(0)
                },
                () => {
                  setPopup((prevState) => ({ ...prevState, open: true, message: "Email Already Exist", severity: 'error' }))
                },
              )
              if (state.profilePicFile) {
                profileAPI.updateProfilePic(
                  manager,
                  () => {
                    setPopup((prevState) => ({ ...prevState, open: true, message: "Changes Successfully Saved", severity: 'success', handleClose: () => props.history.go(0) }))
                    props.history.go(0)
                  },
                  () => {
                    setPopup((prevState) => ({ ...prevState, open: true, message: "Some Error Occured While Changing Profile Picture", severity: 'error' }))
                  }
                )
              }
            }
          }}
          step2Click={() => {
            let valid = true

            // Validation Error Snackbar
            dropdown.map((item, index) => {
              if (item.name.length === 0 || !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(item.gst)) {
                setPopup((prevState) => ({ ...prevState, open: true, message: "Some Error Occured", severity: 'error' }))
                valid = false
              }
            })

            if (valid) {
              profileAPI.updateGst(
                dropdown,
                () => {
                  setPopup((prevState) => ({ ...prevState, open: true, message: "Changes Successfully Saved", severity: 'success' }))
                },
                () => {
                  setPopup((prevState) => ({ ...prevState, open: true, message: "Some Error Occured", severity: 'error' }))
                }
              )
            }
          }}
          step3Click={() => {
            companySavedClicked()
          }}
          title="Build Your Profile"
          subtitle="This information will let us know more about you."
        />
      </GridItem>
    </GridContainer>
  );
}

export default EditProfile;