/* eslint-disable */
import * as base from "./base";
import { getDate, toDate } from "./util";
import { userType } from './base'
import * as Cookie from 'js-cookie'

// import { AddonService } from "./AddonService";
// import { Amenities } from "./Amenities";
// import { IndustryTags } from "./IndustryTags";
// import { States } from "./States";
// import { Cities } from "./Cities";
// import { Localities } from "./Localities";

interface localityObj {
    name: string
    distance: number
}
interface ImageObj {
    file: string,
    description: string
}
export class Warehouse implements base.serverFunctions {
    id: number = 0;
    warehouseVersionId: number = 0;
    name: string = "";
    licenseNo: string = "";
    areaSqFt: string = "";
    country: string = "";
    state: string = "";
    city: string = "";
    address: string = "";
    pincode: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    availableFrom?: Date = undefined;
    availableTo?: Date = undefined;
    areaRate: string = "";
    desc: string = "";
    locality: ([] | [localityObj]) = [];
    amenities: ([] | [number]) = [];
    addonService: ([] | [number]) = [];
    industryTags: ([] | [number]) = [];
    certificates: ([] | [File]) = [];
    image?: ImageObj = undefined;
    images: ([] | [File]) = [];

    constructor(json: any) {
        if (json) {
            this.id = json.id
            this.warehouseVersionId = json.warehouse_version_id;
            this.name = json.name;
            this.licenseNo = json.license_no;
            this.areaSqFt = json.area;
            this.country = json.location.country;
            this.state = json.location.state.name;
            this.city = json.location.city.name;
            this.address = json.location.address;
            this.pincode = json.location.pincode;
            this.latitude = json.location.latitude;
            this.longitude = json.location.longitude;
            this.availableFrom = toDate(json.available_from);
            this.availableTo = toDate(json.available_to);
            this.areaRate = json.area_rate;
            this.desc = json.description;
            this.locality = json.locality;
            this.amenities = json.amenity;
            this.addonService = json.addon_service;
            this.industryTags = json.industry_tag;
            this.certificates = json.certificate;
            this.images = json.images;
            this.image = json.image
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
        this.addonService = json.addonService;
        this.industryTags = json.industryTags;
        this.certificates = json.certificates;
        this.images = json.images;
    }

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
            "addon_service": (this.addonService as any[]).map((item, index) => parseInt(item.id)),
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
            "addon_service": (this.addonService as any[]).map((item, index) => item.id),
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
        if (this.state.length === 0)
            errors.push("State cannot be empty");
        if (this.city.length === 0)
            errors.push("City cannot be empty");
        if (this.pincode === 0)
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
    state: string,
    duration: number,
    area: number,
    setWarehouseData: (AccountManagerData: Warehouse[]) => void,
    setPageData: (ManagerPageData: base.pageData) => void,
    errorCallback: () => void
) => {
    const response = await base.getApi(`anonymous/warehouse?state=${state}&duration=${duration}&area=${area}`)
    if (response.ok === false || response.status !== 200) {
        errorCallback();
        return;
    }
    let json = await response.json();
    let warehouse = json.data.map((item: any) => {
        return new Warehouse(item);
    });
    setWarehouseData(warehouse);
    setPageData(json)
}
export interface warehouseSearchParams {
    area?: string,
    pallets?: string,
    duration?: string,
    price?: string,
    city?: string,
    amenity?: string[],
    services?: string[],
}



export const getWarehouseByParams = async (
    queryParams: any | warehouseSearchParams,
    dataHandler: (data: Warehouse) => void,
    setPageDataHandler: (data: base.pageData) => void,
    errorHandler: (err: string[]) => void
) => {
    let queryString = "";
    if (queryParams) {
        Object.keys(queryParams).map((keys: string) => {
            queryString += `${keys}=${queryParams[keys]?.toString()}&`;
        });
        queryString = queryString.slice(0, -1);
        console.log(queryString);
    }
    const response = await base.getApi(`${Cookie.get(userType) === null ? "anonymous" : Cookie.get(userType)}/warehouse?` + queryString);
    if (response.ok === false || response.status !== 200) {
        let data = await response.json();
        errorHandler([""]);
        return;
    }
    let json = await response.json();
    let warehouse = json.data.map((item: any) => {
        return new Warehouse(item);
    });
    dataHandler(warehouse);
    setPageDataHandler(json);
}
export const getWarehouseById = async (
    id: number,
    setWarehouseData: (AccountManagerData: Warehouse) => void,
    setPageData: (ManagerPageData: base.pageData) => void,
    errorCallback: () => void
) => {
    const response = await base.getApi(`anonymous/warehouse/${id}`)
    if (response.ok === false || response.status !== 200) {
        errorCallback();
        return;
    }
    let json = await response.json();
    let data = new Warehouse(json)
    setWarehouseData(data);
}

export const putWarehouse = async (
    id: number,
    manager: Warehouse,
    successCallback: () => void,
    errorCallback: (msg: string[]) => void
) => {
    // let errors = manager.validate();
    // if (errors.length > 0) {
    //     errorCallback(errors);
    //     return;
    // }
    const response = await base.postAPI(`anonymous/warehouse/${id}/enquiry`, manager.getEditObject());
    if (!response.ok || response.status !== 200) {
        if (response.status === 404) {
            errorCallback(["Manager with this ID doesn't exist"]);
        }
    }
    successCallback();
}

export const updateWarehouse = async (
    manager: Warehouse,
    successCallback: () => void,
    errorCallback: (msg: string[]) => void
) => {
    let errors = manager.validate();
    if (errors.length > 0) {
        errorCallback(errors);
        return;
    }
    const response = await base.postAPI(`vendor/warehouse/${manager.warehouseVersionId}`, manager.getEditObject());
    if (!response.ok || response.status !== 200) {
        if (response.status === 404) {
            errorCallback(["Warehouse with this ID doesn't exist"]);
        }
    }

    const json = await response.json()

    manager.id = json.id
    manager.warehouseVersionId = json.warehouse_version_id
    // putWarehouse(id, manager, () => { }, () => { })
    successCallback();
}

export const addWarehouse = async (
    manager: Warehouse,
    successCallback: () => void,
    errorCallback: (msg: string[]) => void
) => {
    // let errors = manager.validate();
    // if (errors.length > 0) {
    //     errorCallback(errors);
    //     return;
    // }
    const response = await base.postAPI(`vendor/warehouse`, manager.getCreateObject());
    if (!response.ok || response.status !== 200) {
        if (response.status === 422) {
            errorCallback(["Phone number or email already used"]);
            return;
        }
    }

    let json = await response.json()
    manager.id = json.id
    manager.warehouseVersionId = json.warehouse_version_id

    // putWarehouse(manager, () => { }, () => { })
    successCallback();
}

export const getContracts = async (
    getData: (data: any) => void,
    onError: () => void
) => {
    const response = await base.getApi('customer/contracts');
    if (!response.ok || response.status !== 200) {
        onError();
    }

    let json = await response.json();
    getData(json);
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