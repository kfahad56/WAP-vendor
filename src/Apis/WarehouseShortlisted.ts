import * as base from "./base";

export class Warehouse implements base.serverFunctions {
    id: number = 0;
    name: string = "";
    state: number = 0;
    areaRate: string = "";
    images: ([] | [File]) = [];
    image?: File = undefined;

    constructor(json: any) {
        if (json) {
            this.id = json.id
            this.name = json.name;
            this.state = json.location.state;
            this.areaRate = json.area_rate;
            this.images = json.images;
            this.image = json.image;
        }
    }
    setProperties(json: any): void {
        this.id = json.id
        this.name = json.name;
        this.state = json.state;
        this.areaRate = json.areaRate;
        this.images = json.images;
    }

    getEditObject(): string {
        return JSON.stringify({
            "name": this.name,
            "area_rate": this.areaRate,
            "location": {
                "state": this.state,
            },
        });
    }
    getCreateObject(): string {
        return JSON.stringify({
            "name": this.name,
            "area_rate": this.areaRate,
            "location": {
                "state": this.state,
            },
            });
        }
    }
export const getWarehouseById = async (
    id: number,
    setWarehouseData: (AccountManagerData: Warehouse) => void,
    setPageData: (ManagerPageData: base.pageData) => void,
    // errorCallback: () => void
) => {
    const response = await base.getApi(`customer/warehouse?shortlisted=true`)
    if (response.ok === false || response.status !== 200) {
        // errorCallback();
        return;
    }
    let json = await response.json();
    let data = json.data.map((item:any)=>{
        return new Warehouse(item)
    })
    setWarehouseData(data);
}