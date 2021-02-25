import * as base from "./base";
import { getDate, toDate } from './util'

export class Reservation {
  warehouse: string = "";
  from: any = "";
  to: any = "";
  status: string = "";
  // mobile: number = 0;
  // start_date: Date = new Date();
  // end_date: Date = new Date();

  constructor(json: any) {
    if (json) {
      this.warehouse = json.warehouse.name
      this.from = toDate(json.start_date)
      this.to = toDate(json.end_date)
      this.status = json.status
    }
  }
  // getCreateObject(): string {
  //   return JSON.stringify({
  //     "first_name": this.first_name,
  //     "last_name": this.last_name,
  //     "company": 1,
  //     "email": this.email,
  //     "mobile": this.mobile,
  //     "start_date": getDate(this.start_date),
  //     "end_date": getDate(this.end_date),
  //   })
  // }
  // getEditObject(): string {
  //   return ""
  // }
  // validate(): string[] {
  //   let errors = []
  //   if (this.first_name.length === 0)
  //     errors.push("First Name cannot be empty");

  //   return errors
  // }
}
// export const postReserveWarehouse = async (
//   id: number,
//   manager: Reservation,
//   successCallback: (json: string) => void,
//   errorCallback: (msg: string[]) => void
// ) => {
//   // let errors = manager.validate();
//   // if (errors.length > 0) {
//   //   errorCallback(errors);
//   //   return;
//   // }
//   const response = await base.postAPI(`anonymous/warehouse/${id}/reserve?fingerprint=string`, manager.getCreateObject());
//   if (!response.ok || response.status !== 200) {
//     if (response.status === 404) {
//       errorCallback(["Manager with this ID doesn't exist"]);
//     }
//   }

//   let json = await response.json()
//   successCallback(json);
// }

export const getResById = async (
  id: number,
  setResData: (ResData: Reservation[]) => void,
  setPageData: (ResPageData: base.pageData) => void,
  errorCallback: () => void
) => {
  const response = await base.getApi("customer/reservation")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();
  let data = json.data.map((item: any) => new Reservation(item))
  console.log(data)
  setResData(data)
}
