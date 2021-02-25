import * as base from "Apis/base"

export class Contracts {
  id: number = 0
  name: string = ""
  currentStep: string = ""
  status: string = ""

  constructor(json: any) {
    if (json) {
      this.id = json.id
      this.name = json.warehouse_name
      this.currentStep = this.getStep(json.status)
      this.status = this.getStatus(json.status)
    }
  }

  getStep(index: number) {
    /**
     * '''
        1: Pending
        2: Submitted
        3: Approved By Hubshub
        4: Active
        5: Expired
        6: Withdrawn
        7: Resubmit Quote
        '''
     */
    switch (index) {
      case 1:
        return "Upload Requirements Document"
      case 2:
        return "Wait For Quotation Document"
      case 3:
        return "Awaiting Approval"
      case 4:
        return "Completed"
      case 5:
        return "Expired"
      case 7:
        return "Resubmission/Upload Quotation"
      default:
        return "Invalid State"
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

export const getContracts = async (
  getData: (data: Contracts[]) => void,
  onError: () => void,
  params: string,
) => {
  const response = await base.getApi('customer/contractual_agreement?' + params);
  if (!response.ok || response.status !== 200) {
    onError();
  }

  let json = await response.json();

  getData(json.data.map((item: any, index: any) => new Contracts(item)));
}

export const getContractByID = async (
  id: number,
  getData: (data: any) => void,
  onError: () => void
) => {
  const response = await base.getApi(`customer/contractual_agreement/${id}`);
  if (!response.ok || response.status !== 200) {
    onError();
  }
  let json = await response.json();
  getData(json);
}

export const uploadContract = async (
  id: number,
  file: any,
  onSuccess: () => void,
  onError: () => void
) => {
  let form = new FormData()
  form.append('file', file)
  const response = await base.postAPI(`customer/contractual_agreement/${id}/file`, form);
  if (!response.ok || response.status !== 200) {
    onError();
  }

  onSuccess();
}

export const setUploadContract = async (
  id: number,
  params: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const response = await base.postAPI(`customer/contractual_agreement/${id}`, params);
  if (!response.ok || response.status !== 200) {
    onError();
  }

  onSuccess();
}

export const approveContract = async (
  id: number,
  body: object,
  onSuccess: () => void,
  onError: () => void
) => {
  const response = await base.postAPI(`customer/contractual_agreement/${id}/verify`, JSON.stringify(body));
  if (!response.ok || response.status !== 200) {
    onError();
  }

  onSuccess();
}

export const getDocuments = async (
  token: string,
  getDocuments: (data: any) => void,
  onError: () => void
) => {
  const response = await base.getApi(`document/${token}`);
  if (!response.ok || response.status !== 200) {
    onError();
  }
  let json = await response.json();
  getDocuments(json);
}