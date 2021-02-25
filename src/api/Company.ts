import * as base from "api/base"

export class Company implements base.serverFunctions {
  name: string = ""
  signatory: string = ""
  mobile: string = ""
  email: string = ""
  cin: string = ""
  pan: string = ""
  account_name: string = ""
  account_number: string = ""
  account_ifsc: string = ""
  gstin: string = ""

  constructor(json: any) {
    if (json) {
      this.name = json.company_name ? json.company_name : ""
      this.signatory = json.company_signatory ? json.company_signatory : ""
      this.mobile = json.company_mobile ? json.company_mobile : ""
      this.email = json.company_email ? json.company_email : ""
      this.cin = json.company_cin ? json.company_cin : ""
      this.pan = json.company_pan ? json.company_pan : ""
      this.account_name = json.account_name ? json.account_name : "";
      this.account_number = json.account_number ? json.account_number : "";
      this.account_ifsc = json.account_ifsc ? json.account_ifsc : "";
      this.gstin = json.gstin ? json.gstin : "";
    }
  }

  setProperties(json: any) {
    this.name = json.name
    this.signatory = json.signatory
    this.mobile = json.mobile
    this.email = json.email
    this.cin = json.cin
    this.pan = json.pan
    this.account_name = json.account_name
    this.account_number = json.account_number
    this.account_ifsc = json.account_ifsc
    this.gstin = json.gstin
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
      "company_pan": this.pan,
      "account_name": this.account_name,
      "account_number": this.account_number,
      "account_ifsc": this.account_ifsc,
      "gstin": this.gstin
    })
  }

  validate(): string[] {
    let errors: string[] = [];
    if (!(this.name.length > 0)) errors.push("Name Cannot Be Empty")
    if (!(this.signatory.length > 0)) errors.push("Signatory Cannot Be Empty")
    if (!/^^$|[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(this.pan)) errors.push("Invalid Pan Number")
    if (this.mobile ? !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(this.mobile) : false) errors.push('Invalid Mobile Phone')

    if ((this.account_ifsc || this.account_number) && this.account_name.length === 0) errors.push("Bank Name Required")
    if (!/^^$|\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(this.gstin)) errors.push('Invalid GST')
    if (!/^^$|([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/.test(this.cin)) errors.push("Invalid CIN")
    if (!/^^$|[A-Z]{4}0[A-Z0-9]{6}$/.test(this.account_ifsc)) errors.push('Invalid IFSC')
    if (!/^^$|\d{9,18}$/.test(this.account_number)) errors.push('Invalid Account Number')
    return errors
  }
}


export const getCompany = async (
  setCompanyData: (AccountManagerData: Company) => void,
  errorCallback: () => void,
) => {
  const response = await base.getApi("vendor/company")
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
  const errors = manager.validate()
  if (errors.length > 0) {
    errorCallback();
    return errors;
  }
  const response = await base.postAPI("vendor/company", manager.getEditObject())

  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }

  successCallback();
}