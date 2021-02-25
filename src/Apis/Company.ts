import * as base from "Apis/base"

export class Company implements base.serverFunctions {
  name: string = ""
  signatory: string = ""
  mobile: string = ""
  email: string = ""
  cin: string = ""
  pan: string = ""

  constructor(json: any) {
    if (json) {
      this.name = json.company_name ? json.company_name : ""
      this.signatory = json.company_signatory ? json.company_signatory : ""
      this.mobile = json.company_mobile ? json.company_mobile : ""
      this.email = json.company_email ? json.company_email : ""
      this.cin = json.company_cin ? json.company_cin : ""
      this.pan = json.company_pan ? json.company_pan : ""
    }
  }

  setProperties(json: any) {
    this.name = json.name
    this.signatory = json.signatory
    this.mobile = json.mobile
    this.email = json.email
    this.cin = json.cin
    this.pan = json.pan
  }

  getCreateObject() {
    return ""
  }

  getEditObject() {
    return JSON.stringify({
      "company_name": this.name,
      "company_signatory": this.signatory,
      "company_mobile": this.mobile,
      "company_email": this.email,
      "company_cin": this.cin,
      "company_pan": this.pan
    })
  }

  validate(): string[] {
    let errors: string[] = [];
    if (this.name.length === 0)
      errors.push("First Name cannot be empty");
    if (this.cin.length === 0)
      errors.push("Last Name cannot be empty");
    if (this.mobile.length !== 10)
      errors.push("Invalid Mobile Number");
    if (this.email.length === 0 && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email))
      errors.push("Invalid Email");
    if (this.signatory.length === 0)
      errors.push("Signatory cannot be empty");
    if (this.pan.length === 0)
      errors.push("PAN cannot be empty");
    return errors;
  }
}


export const getCompany = async (
  setCompanyData: (AccountManagerData: Company) => void,
  errorCallback: () => void,
) => {
  const response = await base.getApi("customer/company")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();

  setCompanyData(new Company(json));
}



export const updateCompany = async (
  manager: Company,
  successCallback: () => void,
  errorCallback: () => void,
) => {
  const response = await base.postAPI("customer/company", manager.getEditObject())

  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }

  successCallback();
}