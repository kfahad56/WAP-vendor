/* eslint-disable */
import * as base from "api/base"
import * as util from "views/util"

export class Documentation {
  id: number = 0
  name: string = ""
  currentStep: string = ''
  status: string = ''
  customer_name: string = ''
  date_created: string = ''
  expiry_date: string = ''
  booked_space: Number = 0

  constructor(json: any) {
    if (json) {
      this.id = json.id
      this.name = json.warehouse_name
      this.currentStep = this.getStep(json.status)
      this.status = this.getStatus(json.status)
      this.booked_space = json.booked_space;
      this.customer_name = json.customer_name;
      this.date_created = util.formatDate(new Date(json.date_created));
      this.expiry_date = util.formatDate(new Date(json.date_expire));
    }
  }

  getStep(index: number) {
    /**
     * 0: Customer not uploaded
        1: Pending
        2: Submitted
        3: Approved By Hubshub
        4: Customer Review
        5: Active
        6: Expired
        7: Withdrawn
     */
    switch (index) {
      case 0:
        return "Wait For Requirements Document"
        break;
      case 1:
        return "Upload Quotation Document"
        break;
      case 2:
        return "Submitted for admin Approval"
        break;
      case 3:
      case 4:
        return "Customer Review"
        break;
      case 5:
        return "Active"
        break;
      case 6:
        return "Expired"
      case 7:
        return "Vendor cannot fulfil"
      default:
        return "Invalid State"
        break;
    }
  }

  getStatus(bool: boolean) {
    return bool ? 'Success' : 'Pending'
  }

  setProperties(json: any) {
    this.id = json.id
    this.name = json.name
    this.currentStep = json.currentStep
    this.status = json.status
  }
}


export const getDocumentation = async (
  id: number,
  text: string,
  setDocumentationData: (documentationData: Documentation[]) => void,
  errorCallback: () => void,
) => {
  const response = await base.getApi(`vendor/contractual_agreement?search=${text}`)
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();

  let data: Documentation[] = json.data.map((item: any, index: any) => new Documentation(item))
  setDocumentationData(data);
}
