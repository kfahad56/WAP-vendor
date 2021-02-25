import * as base from "Apis/base"
import * as Cookies from 'js-cookie'
export class Profile implements base.serverFunctions {
  firstName: string = ""
  lastName: string = ""
  mobile: string = ""
  company_signatory: string = ""
  email: string = ""
  profilePic: string = ""
  gst: string = ""
  name: string = ""

  constructor(json: any) {
    if (json) {
      this.firstName = json.first_name
      this.lastName = json.last_name
      this.mobile = json.mobile
      this.company_signatory = json.company ? json.company.company_signatory : ""
      this.email = json.email
      this.profilePic = json.profile_pic
      this.gst = json.gst
      this.name = json.company ? json.company.company_name : ""

    }
  }

  setProperties(json: any) {
    this.firstName = json.firstName ? json.firstName : ""
    this.lastName = json.lastName ? json.lastName : ""
    this.mobile = json.mobile ? json.mobile : ""
    this.email = json.email ? json.email : ""
    this.profilePic = json.profilePic
    this.gst = json.gst ? json.gst : ""
  }

  getCreateObject() {
    return JSON.stringify({
      "first_name": this.firstName,
      "last_name": this.lastName,
      "mobile": this.mobile,
      "email": this.email,
      "gst": this.gst,
      // "name": this.name,
      // "company_signatory": this.company_signatory
    })
  }

  getEditObject() {
    return JSON.stringify({
      "first_name": this.firstName,
      "last_name": this.lastName,
      "mobile": this.mobile,
      "email": this.email,
      "company": this.name,
      "signatory": this.company_signatory
    })
  }

  getPutObject() {
    let form = new FormData()
    form.append('profile_pic', this.profilePic)
    return form
  }

  validate(): string[] {
    let errors: string[] = [];
    if (this.firstName.length === 0)
      errors.push("First Name cannot be empty");
    if (this.lastName.length === 0)
      errors.push("Last Name cannot be empty");
    if (this.email.length === 0 && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email))
      errors.push("Email cannot be empty");

    return errors;
  }
}


export class GST implements base.serverFunctions {
  id: number = 0
  name: string = ""
  gst: string = ""

  constructor(json: any) {
    if (json) {
      this.id = json.id
      this.name = json.name
      this.gst = json.gst
    }
  }

  // setProperties(json: any) {
  //   this.firstName = json.firstName
  //   this.lastName = json.lastName
  //   this.mobile = json.mobile
  //   this.email = json.email
  //   this.profilePic = json.profilePic
  //   this.gst = json.gst
  //   this.company_signatory = json.company_signatory
  //   this.name = json.name

  // }

  getCreateObject() {
    return JSON.stringify({
      "name": this.name,
      "gst": this.gst,
    })
  }

  getEditObject() {
    return JSON.stringify({
      "name": this.name,
      "gst": this.gst,
    })
  }

  validate(): string[] {
    let errors: string[] = [];
    if (this.name.length === 0)
      errors.push("Name cannot be empty");
    if (this.gst.length === 0)
      errors.push("GST cannot be empty");

    return errors;
  }
}


export const updateProfile = async (
  manager: Profile,
  successCallback: () => void,
  errorCallback: (msg: string[]) => void
) => {
  let errors = manager.validate();
  if (errors.length > 0) {
    errorCallback(errors);
    return;
  }
  const response = await base.postAPI(`customer/profile`, manager.getEditObject());
  if (!response.ok || response.status !== 200) {
    if (response.status === 422 || response.status === 409) {
      errorCallback(["Phone number or email already used"]);
      return;
    }
  }

  let json = await response.json()
  let profile = new Profile(json)
  Cookies.set(base.customerName, profile.firstName + ' ' + profile.lastName, base.cookieSettings)
  successCallback();
}


export const updateProfilePic = async (
  manager: Profile,
  successCallback: () => void,
  errorCallback: (msg: string[]) => void
) => {
  let errors = manager.validate();
  if (errors.length > 0) {
    errorCallback(errors);
    return;
  }
  const response = await base.putAPI(`customer/profile`, manager.getPutObject());
  let json = await response.json()
  if (!response.ok || response.status !== 200) {
    errorCallback(json);
    return;
  }

  successCallback();
}


export const getProfile = async (
  setProfileData: (AccountManagerData: Profile) => void,
  errorCallback: () => void,
) => {
  const response = await base.getApi("customer/profile")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();

  setProfileData(new Profile(json));
}


export const getGst = async (
  successCallback: (dropdownData: GST[]) => void,
  errorCallback: () => void,
) => {
  const response = await base.getApi("customer/gst")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();

  let temp = json.data.map((item: any) => new GST(item))
  successCallback(temp);
}



export const updateGst = async (
  data: [],
  successCallback: () => void,
  errorCallback: () => void,
) => {
  const response = await base.postAPI("customer/gst", JSON.stringify(data))
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  successCallback();
}