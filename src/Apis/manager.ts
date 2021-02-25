import * as base from "./base";
import { getDate, toDate } from "./util";

export class Manager implements base.serverFunctions {
    name: string = "";
    email: string = "";
    mobile: string = "";
    constructor(json: any) {
        if (json) {
            this.name = json.name;
            this.email = json.email;
            this.mobile = json.mobile;
        }
    }
    setProperties(json: any): void {
        this.name = json.name;
        this.email = json.email;
        this.mobile = json.mobile;
    }

    getEditObject(): string {
        return JSON.stringify({
            "name": this.name,
            "email": this.email,
            "mobile": this.mobile,
        });
    }

    getCreateObject(): string {
        return JSON.stringify({
            "name": this.name,
            "email": this.email,
            "mobile": this.mobile,
        });
    }
    validate(): string[] {
        let errors: string[] = [];

        if (this.name.length === 0)
            errors.push("Manager Name cannot be empty");
        if (this.mobile.length === 0)
            errors.push("Mobile Number cannot be empty");
        return errors;
    }
}

export const getManager = async (
    setManagerData: (RelManagerData: Manager) => void,
    setPageData: (ManagerPageData: base.pageData) => void,
    errorCallback: () => void,
) => {
    const response = await base.getApi("customer/manager")
    if (response.ok === false || response.status !== 200) {
        errorCallback();
        return;
    }
    let json = await response.json();
    let data: Manager = new Manager(json)
    setManagerData(data);

}

