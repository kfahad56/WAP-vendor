import * as base from "./base";
import { getDatetime, getDate } from "./util"

export class WarehousePost implements base.serverFunctions {
  first_name: string = "";
  last_name: string = "";
  company_name: string = "";
  email: string = "";
  mobile: number = 0;
  date: Date = new Date()
  time: string = ""

  constructor(json: any) {
    if (json) {
      this.first_name = json.firstName
      this.last_name = json.lastName
      this.company_name = json.companyName
      this.email = json.registerEmail
      this.mobile = json.mobileNo
      this.date = json.date
      this.time = json.time
    }
  }
  getCreateObject(): string {
    return JSON.stringify({
      "first_name": this.first_name,
      "last_name": this.last_name,
      "company": 1,
      "email": this.email,
      "mobile": this.mobile,
      // "datetime": getDatetime(this.date, this.time)
      "datetime": this.date
    })
  }
  getEditObject(): string {
    return ""
  }
  validate(): string[] {
    let errors = []
    if (this.first_name.length === 0)
      errors.push("First Name cannot be empty");

    return errors
  }
}
export const postTourWarehouse = async (
  id: number,
  manager: WarehousePost,
  successCallback: (json: string) => void,
  errorCallback: (msg: string[]) => void
) => {
  let errors = manager.validate();
  if (errors.length > 0) {
    errorCallback(errors);
    return;
  }
  const response = await base.postAPI(`anonymous/warehouse/${id}/tour?fingerprint=string`, manager.getCreateObject());
  let json = await response.json()

  if (!response.ok || response.status !== 200) {
    console.log(json.detail)
    errorCallback(json.detail)
    return
  }

  successCallback(json);
}

