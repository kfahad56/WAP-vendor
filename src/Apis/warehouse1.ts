import * as base from "./base";
import { getDate, toDate } from "./util";

export class Warehouse implements base.serverFunctions {
    id: number = 0;
    warehouseVersionId: number = 0;
    isApproved: boolean = false
    isVerified: boolean = false
    name: string = "";
    licenseNo: string = "";
    areaSqFt: string = "";
    country: string = "India";
    state: number = 0;
    city: number = 0;
    address: string = "";
    pincode: string = "";
    latitude: number = 0;
    longitude: number = 0;
    availableFrom?: Date = undefined;
    availableTo?: Date = undefined;
    areaRate: string = "";
    desc: string = "";
    locality: ([] | [Object]) = [];
    amenities: ([] | [number]) = [];
    addonServices: ([] | [number]) = [];
    industryTags: ([] | [number]) = [];
    certificates: ([] | [File]) = [];
    images: ([] | [File]) = [];
    image?: File = undefined;
    areaUtilization: number = 0;
    palletsUtilization: number = 0;

    constructor(json: any) {
        if (json) {
            this.id = json.id
            this.warehouseVersionId = json.warehouse_version_id;
            this.isApproved = json.is_approved
            this.isVerified = json.is_verified
            this.name = json.name;
            this.licenseNo = json.license_no;
            this.areaSqFt = json.area;
            this.country = json.location.country;
            this.state = json.location.state;
            this.city = json.location.city;
            this.address = json.location.address;
            this.pincode = json.location.pincode;
            this.latitude = json.location.latitude;
            this.longitude = json.location.longitude;
            this.availableFrom = toDate(json.available_from);
            this.availableTo = toDate(json.available_to);
            this.areaRate = json.area_rate;
            this.desc = json.description;
            this.locality = json.locality;
            this.amenities = json.amenity ? json.amenity.map((item: any, index: number) => item.id) : [];
            this.addonServices = json.addon_service ? json.addon_service.map((item: any, index: number) => item.id) : [];
            this.industryTags = json.industry_tag ? json.industry_tag.map((item: any, index: number) => item.id) : [];
            this.certificates = json.certificate;
            this.images = json.images;
            this.image = json.image;
            this.areaUtilization = json.area_utilization;
            this.palletsUtilization = json.pallets_utilization;
        }
    }

    setProperties(json: any): void {
        this.id = json.id
        this.warehouseVersionId = json.warehouseVersionId
        this.name = json.name;
        this.licenseNo = json.licenseNo;
        this.areaSqFt = json.areaSqFt;
        this.country = json.country;
        this.state = json.state;
        this.city = json.city;
        this.address = json.address;
        this.pincode = json.pincode;
        this.latitude = json.latitude;
        this.longitude = json.longitude;
        this.availableFrom = json.availableFrom;
        this.availableTo = json.availableTo;
        this.areaRate = json.areaRate;
        this.desc = json.desc;
        this.locality = json.locality;
        this.amenities = json.amenities;
        this.addonServices = json.addonServices;
        this.industryTags = json.industryTags; 
        this.certificates = json.certificates;
        this.images = json.images;
    }

    // getPutObject(): FormData {
    //     let formdata = new FormData();
    //     (this.images as any[]).map((item: any, index: number) => formdata.append('images', item));
    //     (this.certificates as any[]).map((item: any, index: number) => formdata.append('certificates', item));
    //     return formdata;
    // }

    getEditObject(): string {
        return JSON.stringify({
            "name": this.name,
            "license_no": this.licenseNo,
            "area": this.areaSqFt,
            "area_rate": this.areaSqFt,
            "pallets": 0,
            "pallets_rate": 0,
            "available_from": this.availableFrom ? getDate(this.availableFrom) : null,
            "available_to": this.availableTo ? getDate(this.availableTo) : null,
            "location": {
                "country": this.country,
                "state": this.state,
                "city": this.city,
                "pincode": this.pincode,
                "address": this.address,
                "latitude": this.latitude,
                "longitude": this.longitude
            },
            "description": this.desc,
            "locality": (this.locality as any[]).map((item, index) => [
                {
                    "id": item.id,
                    "distance": item.distance
                }
            ]),
            "amenity": (this.amenities as any[]).map((item, index) => parseInt(item.id)),
            "addon_service": (this.addonServices as any[]).map((item, index) => parseInt(item.id)),
            "industry_tag": (this.industryTags as any[]).map((item, index) => parseInt(item.id))
        });
    }

    getCreateObject(): string {
        return JSON.stringify({
            "name": this.name,
            "license_no": this.licenseNo,
            "area": this.areaSqFt,
            "area_rate": this.areaSqFt,
            "pallets": 0,
            "pallets_rate": 0,
            "available_from": this.availableFrom ? getDate(this.availableFrom) : null,
            "available_to": this.availableTo ? getDate(this.availableTo) : null,
            "location": {
                "country": this.country,
                "state": this.state,
                "city": this.city,
                "pincode": this.pincode,
                "address": this.address,
                "latitude": this.latitude,
                "longitude": this.longitude
            },
            "description": this.desc,
            "locality": (this.locality as any[]).map((item, index) => {
                return {
                    "id": item.id,
                    "distance": item.distance
                }
            }
            ),
            "amenity": (this.amenities as any[]).map((item, index) => item.id),
            "addon_service": (this.addonServices as any[]).map((item, index) => item.id),
            "industry_tag": (this.industryTags as any[]).map((item, index) => item.id)
        });
    }

    validate(): string[] {
        let errors: string[] = [];

        if (this.name.length === 0)
            errors.push("Warehouse Name cannot be empty");
        if (this.licenseNo.length === 0)
            errors.push("License Number cannot be empty");
        // if (this.areaSqFt === 0 || isNaN(this.areaSqFt))
        //     errors.push("Enter a valid area");
        // if (this.areaRate === 0 || isNaN(this.areaSqFt))
        //     errors.push("Enter a valid area rate")
        // if (this.availableFrom === 0)
        //     errors.push("Enter a valid area");
        // if (this.availableTo. === 0)
        //     errors.push("Enter a valid area rate")
        if (this.country.length === 0)
            errors.push("Country cannot be empty");
        if (this.state === 0)
            errors.push("State cannot be empty");
        if (this.city === 0)
            errors.push("City cannot be empty");
        if (this.pincode.length === 0)
            errors.push("Pincode cannot be empty");
        if (this.address.length === 0)
            errors.push("Address cannot be empty");
        if (this.latitude === 0 || this.longitude === 0)
            errors.push("Select a location on the map");
        if (this.desc.length === 0)
            errors.push("Description cannot be empty");

        return errors;
    }
}

export const getWarehouse = async (
    setWarehouseData: (WarehouseData: Warehouse[]) => void,
    setPageData: (PageData: base.pageData) => void,
    errorCallback: () => void,
    params: string = "",
) => {
    const response = await base.getApi("customer/warehouse?" + params)
    if (response.ok === false || response.status !== 200) {
        errorCallback();
        return;
    }
    let json = await response.json();
    let warehouses = json.data.map((item: any) => {
        return new Warehouse(item);
    });
    setWarehouseData(warehouses);
}

export const getWarehouseById = async (
    id: number,
    setWarehouseData: (WarehouseData: Warehouse) => void,
    setPageData: (PageData: base.pageData) => void,
    errorCallback: () => void
) => {
    const response = await base.getApi(`customer/warehouse/${id}`)
    if (response.ok === false || response.status !== 200) {
        errorCallback();
        return;
    }
    let json = await response.json();
    let data = new Warehouse(json)
    setWarehouseData(data);
}

// export const putWarehouse = async (
//     manager: Warehouse,
//     successCallback: () => void,
//     errorCallback: (msg: string[]) => void
// ) => {
//     // let errors = manager.validate();
//     // if (errors.length > 0) {
//     //     errorCallback(errors);
//     //     return;
//     // }
//     const response = await base.putAPI(`customer/warehouse/${manager.warehouseVersionId}`, manager.getPutObject());
//     if (!response.ok || response.status !== 200) {
//         if (response.status === 404) {
//             errorCallback(["Manager with this ID doesn't exist"]);
//         }
//     }
//     successCallback();
// }

// export const updateWarehouse = async (
//     manager: Warehouse,
//     successCallback: () => void,
//     errorCallback: (msg: string[]) => void
// ) => {
//     let errors = manager.validate();
//     if (errors.length > 0) {
//         errorCallback(errors);
//         return;
//     }
//     const response = await base.postAPI(`customer/warehouse/${manager.warehouseVersionId}`, manager.getEditObject());
//     if (!response.ok || response.status !== 200) {
//         if (response.status === 404) {
//             errorCallback(["Warehouse with this ID doesn't exist"]);
//         }
//     }

//     const json = await response.json()

//     manager.id = json.id
//     manager.warehouseVersionId = json.warehouse_version_id
//     // putWarehouse(manager, () => { }, () => { })
//     successCallback();
// }

// export const addWarehouse = async (
//     manager: Warehouse,
//     successCallback: () => void,
//     errorCallback: (msg: string[]) => void
// ) => {
//     // let errors = manager.validate();
//     // if (errors.length > 0) {
//     //     errorCallback(errors);
//     //     return;
//     // }
//     const response = await base.postAPI(`customer/warehouse`, manager.getCreateObject());
//     if (!response.ok || response.status !== 200) {
//         if (response.status === 422) {
//             errorCallback(["Phone number or email already used"]);
//             return;
//         }
//     }

//     let json = await response.json()
//     manager.id = json.id
//     manager.warehouseVersionId = json.warehouse_version_id

//     // putWarehouse(manager, () => { }, () => { })
//     successCallback();
// }