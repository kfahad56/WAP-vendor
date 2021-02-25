import * as base from "api/base"
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
  displayName: string = ""
  phone: string = ""
  website: string = ""

  account_bank: string = ""
  account_number: string = ""
  account_ifsc: string = ""
  gstin: string = ""

  address_attention: string = ""
  address_state: string = ""
  address_city: string = ""
  address_str_1: string = ""
  address_str_2: string = ""
  address_zip: string = ""
  address_phone: string = ""

  constructor(json: any) {
    if (json) {
      this.firstName = json.first_name ? json.first_name : ""
      this.lastName = json.last_name ? json.last_name : ""
      this.mobile = json.mobile ? json.mobile : ""
      this.email = json.email ? json.email : ""
      this.profilePic = json.profile_pic
      this.gst = json.gst
      this.address_attention = json.address ? json.address.attention : ""
      this.address_state = json.address ? json.address.state : ""
      this.address_city = json.address ? json.address.city : ""
      this.address_str_1 = json.address ? json.address.address : ""
      this.address_str_2 = json.address ? json.address.address : ""
      this.address_zip = json.address ? json.address.pincode : ""
      this.address_phone = json.address ? json.address.mobile : ""
      this.website = json.website
      // this.company_signatory = json.company ? json.company.company_signatory : ""
      // this.name = json.company ? json.company.company_name : ""
    }
  }

  setProperties(json: any) {
    this.firstName = json.firstName
    this.lastName = json.lastName
    this.mobile = json.mobile
    this.email = json.email
    this.profilePic = json.profilePic
    this.gst = json.gst
    this.address_attention = json.address_attention ? json.address_attention : ""
    this.address_state = json.address_state ? json.address_state : ""
    this.address_city = json.address_city ? json.address_city : ""
    this.address_str_1 = json.address_str_1 ? json.address_str_1 : ""
    this.address_str_2 = json.address_str_2 ? json.address_str_2 : ""
    this.address_zip = json.address_zip ? json.address_zip : ""
    this.address_phone = json.address_phone ? json.address_phone : ""
    this.website = json.website
  }

  getCreateObject() {
    return JSON.stringify({
      "first_name": this.firstName,
      "last_name": this.lastName,
      "mobile": this.mobile,
      "email": this.email,
      // "gst": this.gst,
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
      "website": this.website,
      "attention": this.address_attention,
      "state": this.address_state,
      "city": this.address_city,
      "pincode": this.address_zip,
      "address": this.address_str_1,
      "address_mobile": this.address_phone,
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
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.mobile))
      errors.push("Mobile Number Invalid");
    if (this.address_phone ? !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.address_phone) : false)
      errors.push("Address Phone Invalid");
    if (this.email.length === 0 && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email))
      errors.push("Invalid Email");
    if (!/^^$|[0-9]{6}$/.test(this.address_zip))
      errors.push("Invalid Zipcode");
    if (!/^^$|((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(this.website))
      errors.push("Invalid Website URL");
    console.log(errors)
    return errors;
  }

}


export class GST implements base.serverFunctions {
  name: string = ""
  gst: string = ""

  constructor(json: any) {
    if (json) {
      this.name = json.name
      this.gst = json.gst
    }
  }

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
  const response = await base.postAPI(`vendor/profile`, manager.getEditObject());
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
  const response = await base.putAPI(`vendor/profile`, manager.getPutObject());
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
  const response = await base.getApi("vendor/profile")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();

  setProfileData(new Profile(json));
}


export const getGst = async (
  setdropdownData: (dropdownData: GST[]) => void,
  errorCallback: () => void,
) => {
  const response = await base.getApi("vendor/gst")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();

  let temp = json.data.map((item: any) => new GST(item))
  setdropdownData(temp);
}



export const updateGst = async (
  data: [],
  successCallback: () => void,
  errorCallback: () => void,
) => {
  const response = await base.postAPI("vendor/gst", JSON.stringify(data))
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  successCallback();
}