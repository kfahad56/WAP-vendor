import * as base from "./base";
export class WarehousePost implements base.serverFunctions {
    first_name: string = "";
    last_name: string = "";
    company_name: string = "";
    email: string = "";
    mobile: number = 0;
    message: string = "";
    constructor(json: any) {
        if (json) {
            this.first_name = json.firstName
            this.last_name = json.lastName
            this.company_name = json.companyName
            this.email = json.registerEmail
            this.mobile = json.mobileNo
            this.message = json.message
        }
    }
    getCreateObject(): string {
        return JSON.stringify({
            "first_name": this.first_name,
            "last_name": this.last_name,
            "company": this.company_name,
            "email": this.email,
            "mobile": this.mobile,
            "message": this.message
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
export const postEnquiryWarehouse = async (
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
    const response = await base.postAPI(`anonymous/warehouse/${id}/enquiry?fingerprint=string`, manager.getCreateObject());
    let json = await response.json()
    if (!response.ok || response.status !== 200) {
        errorCallback(json.detail);
    }

    successCallback(json);
}

