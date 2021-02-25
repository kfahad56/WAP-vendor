import * as base from "./base";
import { getDate, toDate } from "./util";
export class Tour implements base.serverFunctions {
    name: string = "";
    status: string = "";
    datetime?: Date = undefined;
    constructor(json: any) {
        if (json) {
            this.name = json.warehouse.name;
            this.status = json.status;
            this.datetime = toDate(json.datetime);
        }
    }
    setProperties(json: any): void {
        this.name = json.name;
        this.datetime = json.datetime;
        this.status = json.status;
    }
    getEditObject(): string {
        return JSON.stringify({
            "status": this.status,
            "datetime": this.datetime,
            "warehouse": {
                "name": this.name,
            },
        });
    }
    getCreateObject(): string {
        return JSON.stringify({
            "status": this.status,
            "datetime": this.datetime,
            "warehouse": {
                "name": this.name,
            },
        });
    }
}
export const getTourById = async (
    id: number,
    setTourData: (TourData: Tour[]) => void,
    setPageData: (TourPageData: base.pageData) => void,
    errorCallback: () => void
) => {
    const response = await base.getApi("customer/tours")
    if (response.ok === false || response.status !== 200) {
        errorCallback();
        return;
    }
    let json = await response.json();
    let data = json.data.map((item: any) => new Tour(item))
    setTourData(data);
}

export const getTour = async (
    setTourData: (TourData: Tour[]) => void,
    setPageData: (TourPageData: base.pageData) => void,
    errorCallback: () => void,
    params: string
) => {
    const response = await base.getApi("customer/tours?" + params)
    if (response.ok === false || response.status !== 200) {
        errorCallback();
        return;
    }
    let json = await response.json();
    let data = json.data.map((item: any) => new Tour(item))
    setTourData(data);
}
