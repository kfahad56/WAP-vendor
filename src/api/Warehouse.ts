import * as base from "api/base";
import { getDate, toDate } from "api/util";

export class Warehouse implements base.serverFunctions {
    id: number = 0;
    warehouseVersionId: number = 0;
    isApproved: boolean = false
    isVerified: boolean = false
    isDisabled: boolean = false
    name: string = "";
    licenseNo: string = "";
    changesRecommended: boolean = false;
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
    availableArea: number = 0;
    areaRate: string = "";
    desc: string = "";
    locality: ([] | [Object]) = [];
    amenities: ([] | [number]) = [];
    addonServices: ([] | [number]) = [];
    industryTags: ([] | [number]) = [];
    certificates: ([] | [File]) = [];
    images: ([] | [File]) = [];
    image?: File = undefined;
    gstin: string = "";
    areaUtilization: number = 0;
    palletsUtilization: number = 0;
    storage_cost_per_sqft_per_week: number = 0;
    premium_storage_cost_per_sqft_per_week: number = 0;
    handling_in_charge_per_carton: number = 0;
    handling_in_charge_per_pallet: number = 0;
    handling_out_charge_per_carton: number = 0;
    handling_out_charge_per_pallet: number = 0;
    vas_copacking_per_unit: number = 0;
    premium_handling_in_charge_per_carton: number = 0;
    premium_handling_in_charge_per_pallet: number = 0;
    premium_handling_out_charge_per_carton: number = 0;
    premium_handling_out_charge_per_pallet: number = 0;
    delivery_charge_per_drop: number = 0;
    premium_delivery_charge_per_drop: number = 0;
    other_charges_per_week: number = 0;
    SLA_inbound_perf_trucks_unloaded_percent: number = 0;
    SLA_inbound_perf_put_away_percent: number = 0;
    SLA_outbound_perf_orders_picked_percent: number = 0;
    SLA_outbound_perf_orders_packed_dispatched_percent: number = 0;
    SLA_stock_mgmt_percent: number = 0;
    SLA_returns_mgmt_percent: number = 0;
    SLA_complaint_perf_percent: number = 0;
    SLA_otif_delivery_percent: number = 0;
    kpi_inbound_perf_trucks_unloaded_hours: number = 0;
    kpi_inbound_perf_put_away_hours: number = 0;
    kpi_outbound_perf_orders_picked_hours: number = 0;
    kpi_outbound_perf_orders_packed_dispatched_hours: number = 0;
    kpi_returns_mgmt_days: number = 0;
    kpi_complaint_perf_days: number = 0;
    allocated_space_per_week: number = 0;
    allocated_handled_in_cartons_per_day: number = 0;
    allocated_handled_in_pallet_per_day: number = 0;
    allocated_handled_out_cartons_per_day: number = 0;
    allocated_handled_out_pallet_per_day: number = 0;
    allocated_no_of_deliveries: number = 0;
    allocated_delivery_kms_per_drop: number = 0;
    partner_remarks_observations: string = "";
    allocated_delivery_Kgs_per_drop: number = 0;
    allocated_delivery_Cub_m__per_drop: number = 0;
    rented_out_area?: number = 0;

    constructor(json: any) {
        if (json) {
            this.id = json.id
            this.warehouseVersionId = json.warehouse_version_id;
            this.isApproved = json.is_approved
            this.isVerified = json.is_verified
            this.isDisabled = json.is_disabled
            this.name = json.name;
            this.rented_out_area = json.rented_out_area ? json.rented_out_area : 0
            this.licenseNo = json.license_no;
            this.areaSqFt = json.area;
            this.country = json.location.country;
            this.changesRecommended = json.changes_recommended
            this.state = json.location.state;
            this.city = json.location.city;
            this.availableArea = json.available_area;
            this.address = json.location.address;
            this.pincode = json.location.pincode;
            this.latitude = json.location.latitude;
            this.longitude = json.location.longitude;
            this.availableFrom = toDate(json.available_from);
            this.availableTo = toDate(json.available_to);
            this.areaRate = json.area_rate;
            this.desc = json.description;
            this.locality = json.locality;
            this.gstin = json.gstin;
            this.amenities = json.amenity ? json.amenity.map((item: any, index: number) => item) : [];
            this.addonServices = json.addon_service ? json.addon_service.map((item: any, index: number) => item) : [];
            this.industryTags = json.industry_tag ? json.industry_tag.map((item: any, index: number) => item) : [];
            this.certificates = json.certificate;
            this.images = json.images;
            this.image = json.image;
            this.areaUtilization = json.area_utilization;
            this.palletsUtilization = json.pallets_utilization;
            /* Warehouse Rates */
            this.storage_cost_per_sqft_per_week = json.warehouse_rates?.storage_cost_per_sqft_per_week;
            this.premium_storage_cost_per_sqft_per_week = json.warehouse_rates?.premium_storage_cost_per_sqft_per_week;
            this.handling_in_charge_per_carton = json.warehouse_rates?.handling_in_charge_per_carton;
            this.handling_in_charge_per_pallet = json.warehouse_rates?.handling_in_charge_per_pallet;
            this.handling_out_charge_per_carton = json.warehouse_rates?.handling_out_charge_per_carton;
            this.handling_out_charge_per_pallet = json.warehouse_rates?.handling_out_charge_per_pallet;
            this.vas_copacking_per_unit = json.warehouse_rates?.vas_copacking_per_unit;
            this.premium_handling_in_charge_per_carton = json.warehouse_rates?.premium_handling_in_charge_per_carton;
            this.premium_handling_in_charge_per_pallet = json.warehouse_rates?.premium_handling_in_charge_per_pallet;
            this.premium_handling_out_charge_per_carton = json.warehouse_rates?.premium_handling_out_charge_per_carton;
            this.premium_handling_out_charge_per_pallet = json.warehouse_rates?.premium_handling_out_charge_per_pallet;
            this.delivery_charge_per_drop = json.warehouse_rates?.delivery_charge_per_drop;
            this.premium_delivery_charge_per_drop = json.warehouse_rates?.premium_delivery_charge_per_drop;
            this.other_charges_per_week = json.warehouse_rates?.other_charges_per_week;
            this.SLA_inbound_perf_trucks_unloaded_percent = json.warehouse_rates?.SLA_inbound_perf_trucks_unloaded_percent;
            this.SLA_inbound_perf_put_away_percent = json.warehouse_rates?.SLA_inbound_perf_put_away_percent;
            this.SLA_outbound_perf_orders_picked_percent = json.warehouse_rates?.SLA_outbound_perf_orders_picked_percent;
            this.SLA_outbound_perf_orders_packed_dispatched_percent = json.warehouse_rates?.SLA_outbound_perf_orders_packed_dispatched_percent;
            this.SLA_stock_mgmt_percent = json.warehouse_rates?.SLA_stock_mgmt_percent;
            this.SLA_returns_mgmt_percent = json.warehouse_rates?.SLA_returns_mgmt_percent;
            this.SLA_complaint_perf_percent = json.warehouse_rates?.SLA_complaint_perf_percent;
            this.SLA_otif_delivery_percent = json.warehouse_rates?.SLA_otif_delivery_percent;
            this.kpi_inbound_perf_trucks_unloaded_hours = json.warehouse_rates?.kpi_inbound_perf_trucks_unloaded_hours;
            this.kpi_inbound_perf_put_away_hours = json.warehouse_rates?.kpi_inbound_perf_put_away_hours;
            this.kpi_outbound_perf_orders_picked_hours = json.warehouse_rates?.kpi_outbound_perf_orders_picked_hours;
            this.kpi_outbound_perf_orders_packed_dispatched_hours = json.warehouse_rates?.kpi_outbound_perf_orders_packed_dispatched_hours;
            this.kpi_returns_mgmt_days = json.warehouse_rates?.kpi_returns_mgmt_days;
            this.kpi_complaint_perf_days = json.warehouse_rates?.kpi_complaint_perf_days;
            this.allocated_space_per_week = json.warehouse_rates?.allocated_space_per_week;
            this.allocated_handled_in_cartons_per_day = json.warehouse_rates?.allocated_handled_in_cartons_per_day;
            this.allocated_handled_in_pallet_per_day = json.warehouse_rates?.allocated_handled_in_pallet_per_day;
            this.allocated_handled_out_cartons_per_day = json.warehouse_rates?.allocated_handled_out_cartons_per_day;
            this.allocated_handled_out_pallet_per_day = json.warehouse_rates?.allocated_handled_out_pallet_per_day;
            this.allocated_no_of_deliveries = json.warehouse_rates?.allocated_no_of_deliveries;
            this.allocated_delivery_kms_per_drop = json.warehouse_rates?.allocated_delivery_kms_per_drop;
            this.partner_remarks_observations = json.warehouse_rates?.partner_remarks_observations;
            this.allocated_delivery_Kgs_per_drop = json.warehouse_rates?.allocated_delivery_Kgs_per_drop;
            this.allocated_delivery_Cub_m__per_drop = json.warehouse_rates?.allocated_delivery_Cub_m__per_drop;
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
        this.availableArea = json.availableArea;
        this.availableTo = json.availableTo;
        this.areaRate = json.areaRate;
        this.gstin = json.gstin;
        this.desc = json.desc;
        this.locality = json.locality;
        this.amenities = json.amenities;
        this.addonServices = json.addonServices;
        this.industryTags = json.industryTags;
        this.certificates = json.certificates;
        this.images = json.images;
        /* Warehouse Rates */
        this.storage_cost_per_sqft_per_week = json.storage_cost_per_sqft_per_week
        this.premium_storage_cost_per_sqft_per_week = json.premium_storage_cost_per_sqft_per_week
        this.handling_in_charge_per_carton = json.handling_in_charge_per_carton
        this.handling_in_charge_per_pallet = json.handling_in_charge_per_pallet
        this.handling_out_charge_per_carton = json.handling_out_charge_per_carton
        this.handling_out_charge_per_pallet = json.handling_out_charge_per_pallet
        this.vas_copacking_per_unit = json.vas_copacking_per_unit
        this.premium_handling_in_charge_per_carton = json.premium_handling_in_charge_per_carton
        this.premium_handling_in_charge_per_pallet = json.premium_handling_in_charge_per_pallet
        this.premium_handling_out_charge_per_carton = json.premium_handling_out_charge_per_carton
        this.premium_handling_out_charge_per_pallet = json.premium_handling_out_charge_per_pallet
        this.delivery_charge_per_drop = json.delivery_charge_per_drop
        this.premium_delivery_charge_per_drop = json.premium_delivery_charge_per_drop
        this.other_charges_per_week = json.other_charges_per_week
        this.SLA_inbound_perf_trucks_unloaded_percent = json.SLA_inbound_perf_trucks_unloaded_percent
        this.SLA_inbound_perf_put_away_percent = json.SLA_inbound_perf_put_away_percent
        this.SLA_outbound_perf_orders_picked_percent = json.SLA_outbound_perf_orders_picked_percent
        this.SLA_outbound_perf_orders_packed_dispatched_percent = json.SLA_outbound_perf_orders_packed_dispatched_percent
        this.SLA_stock_mgmt_percent = json.SLA_stock_mgmt_percent
        this.SLA_returns_mgmt_percent = json.SLA_returns_mgmt_percent
        this.SLA_complaint_perf_percent = json.SLA_complaint_perf_percent
        this.SLA_otif_delivery_percent = json.SLA_otif_delivery_percent
        this.kpi_inbound_perf_trucks_unloaded_hours = json.kpi_inbound_perf_trucks_unloaded_hours
        this.kpi_inbound_perf_put_away_hours = json.kpi_inbound_perf_put_away_hours
        this.kpi_outbound_perf_orders_picked_hours = json.kpi_outbound_perf_orders_picked_hours
        this.kpi_outbound_perf_orders_packed_dispatched_hours = json.kpi_outbound_perf_orders_packed_dispatched_hours
        this.kpi_returns_mgmt_days = json.kpi_returns_mgmt_days
        this.kpi_complaint_perf_days = json.kpi_complaint_perf_days
        this.allocated_space_per_week = json.allocated_space_per_week
        this.allocated_handled_in_cartons_per_day = json.allocated_handled_in_cartons_per_day
        this.allocated_handled_in_pallet_per_day = json.allocated_handled_in_pallet_per_day
        this.allocated_handled_out_cartons_per_day = json.allocated_handled_out_cartons_per_day
        this.allocated_handled_out_pallet_per_day = json.allocated_handled_out_pallet_per_day
        this.allocated_no_of_deliveries = json.allocated_no_of_deliveries
        this.allocated_delivery_kms_per_drop = json.allocated_delivery_kms_per_drop
        this.partner_remarks_observations = json.partner_remarks_observations
        this.allocated_delivery_Kgs_per_drop = json.allocated_delivery_Kgs_per_drop
        this.allocated_delivery_Cub_m__per_drop = json.allocated_delivery_Cub_m__per_drop
    }

    getPutObject(): FormData {
        let formdata = new FormData();
        (this.images as any[]).map((item: any, index: number) => formdata.append('images', item));
        (this.certificates as any[]).map((item: any, index: number) => formdata.append('certificates', new File([item.file], item.description + '.pdf', { type: item.file.type })));
        return formdata;
    }

    getEditObject(): string {
        return JSON.stringify({
            "name": this.name,
            "license_no": this.licenseNo,
            "area": this.areaSqFt,
            "area_rate": this.areaRate,
            "pallets": 0,
            "gstin": this.gstin,
            "pallets_rate": 0,
            "available_area": this.availableArea,
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
            }),
            "amenity": (this.amenities as any[]).map((item, index) => parseInt(item.id)),
            "addon_service": (this.addonServices as any[]).map((item, index) => parseInt(item.id)),
            "industry_tag": (this.industryTags as any[]).map((item, index) => parseInt(item.id)),
            "warehouse_rates": {
                "storage_cost_per_sqft_per_week": this.storage_cost_per_sqft_per_week,
                "premium_storage_cost_per_sqft_per_week": this.premium_storage_cost_per_sqft_per_week,
                "handling_in_charge_per_carton": this.handling_in_charge_per_carton,
                "handling_in_charge_per_pallet": this.handling_in_charge_per_pallet,
                "handling_out_charge_per_carton": this.handling_out_charge_per_carton,
                "handling_out_charge_per_pallet": this.handling_out_charge_per_pallet,
                "vas_copacking_per_unit": this.vas_copacking_per_unit,
                "premium_handling_in_charge_per_carton": this.premium_handling_in_charge_per_carton,
                "premium_handling_in_charge_per_pallet": this.premium_handling_in_charge_per_pallet,
                "premium_handling_out_charge_per_carton": this.premium_handling_out_charge_per_carton,
                "premium_handling_out_charge_per_pallet": this.premium_handling_out_charge_per_pallet,
                "delivery_charge_per_drop": this.delivery_charge_per_drop,
                "premium_delivery_charge_per_drop": this.premium_delivery_charge_per_drop,
                "other_charges_per_week": this.other_charges_per_week,
                "SLA_inbound_perf_trucks_unloaded_percent": this.SLA_inbound_perf_trucks_unloaded_percent,
                "SLA_inbound_perf_put_away_percent": this.SLA_inbound_perf_put_away_percent,
                "SLA_outbound_perf_orders_picked_percent": this.SLA_outbound_perf_orders_picked_percent,
                "SLA_outbound_perf_orders_packed_dispatched_percent": this.SLA_outbound_perf_orders_packed_dispatched_percent,
                "SLA_stock_mgmt_percent": this.SLA_stock_mgmt_percent,
                "SLA_returns_mgmt_percent": this.SLA_returns_mgmt_percent,
                "SLA_complaint_perf_percent": this.SLA_complaint_perf_percent,
                "SLA_otif_delivery_percent": this.SLA_otif_delivery_percent,
                "kpi_inbound_perf_trucks_unloaded_hours": this.kpi_inbound_perf_trucks_unloaded_hours,
                "kpi_inbound_perf_put_away_hours": this.kpi_inbound_perf_put_away_hours,
                "kpi_outbound_perf_orders_picked_hours": this.kpi_outbound_perf_orders_picked_hours,
                "kpi_outbound_perf_orders_packed_dispatched_hours": this.kpi_outbound_perf_orders_packed_dispatched_hours,
                "kpi_returns_mgmt_days": this.kpi_returns_mgmt_days,
                "kpi_complaint_perf_days": this.kpi_complaint_perf_days,
                "allocated_space_per_week": this.allocated_space_per_week,
                "allocated_handled_in_cartons_per_day": this.allocated_handled_in_cartons_per_day,
                "allocated_handled_in_pallet_per_day": this.allocated_handled_in_pallet_per_day,
                "allocated_handled_out_cartons_per_day": this.allocated_handled_out_cartons_per_day,
                "allocated_handled_out_pallet_per_day": this.allocated_handled_out_pallet_per_day,
                "allocated_no_of_deliveries": this.allocated_no_of_deliveries,
                "allocated_delivery_kms_per_drop": this.allocated_delivery_kms_per_drop,
                "partner_remarks_observations": this.partner_remarks_observations,
                "allocated_delivery_Kgs_per_drop": this.allocated_delivery_Kgs_per_drop,
                "allocated_delivery_Cub_m__per_drop": this.allocated_delivery_Cub_m__per_drop,
            }
        });
    }

    getCreateObject(): string {
        return JSON.stringify({
            "name": this.name,
            "license_no": this.licenseNo,
            "area": this.areaSqFt,
            "area_rate": this.areaSqFt,
            "gstin": this.gstin,
            "pallets": 0,
            "pallets_rate": 0,
            "available_area": this.availableArea,
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
            "industry_tag": (this.industryTags as any[]).map((item, index) => item.id),
            "warehouse_rates": {
                "storage_cost_per_sqft_per_week": this.storage_cost_per_sqft_per_week,
                "premium_storage_cost_per_sqft_per_week": this.premium_storage_cost_per_sqft_per_week,
                "handling_in_charge_per_carton": this.handling_in_charge_per_carton,
                "handling_in_charge_per_pallet": this.handling_in_charge_per_pallet,
                "handling_out_charge_per_carton": this.handling_out_charge_per_carton,
                "handling_out_charge_per_pallet": this.handling_out_charge_per_pallet,
                "vas_copacking_per_unit": this.vas_copacking_per_unit,
                "premium_handling_in_charge_per_carton": this.premium_handling_in_charge_per_carton,
                "premium_handling_in_charge_per_pallet": this.premium_handling_in_charge_per_pallet,
                "premium_handling_out_charge_per_carton": this.premium_handling_out_charge_per_carton,
                "premium_handling_out_charge_per_pallet": this.premium_handling_out_charge_per_pallet,
                "delivery_charge_per_drop": this.delivery_charge_per_drop,
                "premium_delivery_charge_per_drop": this.premium_delivery_charge_per_drop,
                "other_charges_per_week": this.other_charges_per_week,
                "SLA_inbound_perf_trucks_unloaded_percent": this.SLA_inbound_perf_trucks_unloaded_percent,
                "SLA_inbound_perf_put_away_percent": this.SLA_inbound_perf_put_away_percent,
                "SLA_outbound_perf_orders_picked_percent": this.SLA_outbound_perf_orders_picked_percent,
                "SLA_outbound_perf_orders_packed_dispatched_percent": this.SLA_outbound_perf_orders_packed_dispatched_percent,
                "SLA_stock_mgmt_percent": this.SLA_stock_mgmt_percent,
                "SLA_returns_mgmt_percent": this.SLA_returns_mgmt_percent,
                "SLA_complaint_perf_percent": this.SLA_complaint_perf_percent,
                "SLA_otif_delivery_percent": this.SLA_otif_delivery_percent,
                "kpi_inbound_perf_trucks_unloaded_hours": this.kpi_inbound_perf_trucks_unloaded_hours,
                "kpi_inbound_perf_put_away_hours": this.kpi_inbound_perf_put_away_hours,
                "kpi_outbound_perf_orders_picked_hours": this.kpi_outbound_perf_orders_picked_hours,
                "kpi_outbound_perf_orders_packed_dispatched_hours": this.kpi_outbound_perf_orders_packed_dispatched_hours,
                "kpi_returns_mgmt_days": this.kpi_returns_mgmt_days,
                "kpi_complaint_perf_days": this.kpi_complaint_perf_days,
                "allocated_space_per_week": this.allocated_space_per_week,
                "allocated_handled_in_cartons_per_day": this.allocated_handled_in_cartons_per_day,
                "allocated_handled_in_pallet_per_day": this.allocated_handled_in_pallet_per_day,
                "allocated_handled_out_cartons_per_day": this.allocated_handled_out_cartons_per_day,
                "allocated_handled_out_pallet_per_day": this.allocated_handled_out_pallet_per_day,
                "allocated_no_of_deliveries": this.allocated_no_of_deliveries,
                "allocated_delivery_kms_per_drop": this.allocated_delivery_kms_per_drop,
                "partner_remarks_observations": this.partner_remarks_observations,
                "allocated_delivery_Kgs_per_drop": this.allocated_delivery_Kgs_per_drop,
                "allocated_delivery_Cub_m__per_drop": this.allocated_delivery_Cub_m__per_drop,
            }
        });
    }

    getDisableObject(): string {
        return JSON.stringify({
            "disable": this.isDisabled,
        });
    }

    validate(): string[] {
        let errors: string[] = [];

        if (this.name.length === 0)
            errors.push("Warehouse Name cannot be empty");
        // if (this.licenseNo.length === 0)
        //     errors.push("License Number cannot be empty");
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
        if (this.pincode.toString().length !== 6)
            errors.push("Please enter a valid pincode");
        if (this.address.length === 0)
            errors.push("Address cannot be empty");
        if (this.latitude === 0 || this.longitude === 0)
            errors.push("Select a location on the map");
        if (this.desc.length === 0)
            errors.push("Description cannot be empty");
        if (this.gstin.length === 0)
            errors.push("GSTIN cannot be empty");

        return errors;
    }
}

export const getWarehouse = async (
    setWarehouseData: (AccountManagerData: Warehouse[]) => void,
    setPageData: (ManagerPageData: base.pageData) => void,
    errorCallback: () => void,
    params: string = "",
) => {
    const response = await base.getApi("vendor/warehouse?" + params)
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
    setWarehouseData: (AccountManagerData: Warehouse) => void,
    setPageData: (ManagerPageData: base.pageData) => void,
    errorCallback: () => void
) => {
    const response = await base.getApi(`vendor/warehouse/${id}`)
    if (response.ok === false || response.status !== 200) {
        errorCallback();
        return;
    }
    let json = await response.json();
    let data = new Warehouse(json)
    setWarehouseData(data);
}

export const putWarehouse = async (
    manager: Warehouse,
    successCallback: () => void,
    errorCallback: (msg: string[]) => void
) => {
    // let errors = manager.validate();
    // if (errors.length > 0) {
    //     errorCallback(errors);
    //     return;
    // }
    const response = await base.putAPI(`vendor/warehouse/${manager.warehouseVersionId}`, manager.getPutObject());
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

    const json = await response.json()
    if (!response.ok || response.status !== 200) {
        if (response.status === 404) {
            errorCallback(["Warehouse with this ID doesn't exist"]);
            return
        } else if (response.status === 400) {
            errorCallback([json.detail])
            return
        }
    }

    manager.id = json.id
    manager.warehouseVersionId = json.warehouse_version_id
    await putWarehouse(manager, () => { }, () => { })
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
    let json = await response.json()

    if (!response.ok || response.status !== 200) {
        if (response.status === 422) {
            errorCallback(["Phone number or email already used"]);
            return;
        } else if (response.status === 400) {
            errorCallback([json.detail])
            return;
        }
    }

    manager.id = json.id
    manager.warehouseVersionId = json.warehouse_version_id

    await putWarehouse(manager, () => { }, () => { })
    successCallback();
}

export const getContractByID = async (
    id: number,
    setData: (data: any) => void,
    onError: () => {}
) => {
    const response = await base.getApi(`vendor/contractual_agreement/${id}`);
    if (!response.ok || response.status !== 200) {
        onError();
        return;
    }
    let json = await response.json();
    setData(json);
}

export const getDocuments = async (
    token: string,
    setDocuments: (data: any) => void,
    onError: () => {}
) => {
    const response = await base.getApi(`document/${token}`);
    if (!response.ok || response.status !== 200) {
        onError();
        return;
    }
    let json = await response.json();
    setDocuments(json);
}

export const verifyDocument = async (
    id: number,
    body: string,
    onSuccess: () => void,
    onError: () => {}
) => {

    const response = await base.postAPI(`vendor/contractual_agreement/${id}/reject`, JSON.stringify({ body: body }));
    if (!response.ok || response.status !== 200) {
        onError();
        return;
    }

    onSuccess();
}

export const uploadContract = async (
    id: number,
    json: any,
    onSuccess: () => void,
    onError: (message?: string) => void
) => {
    const response = await base.postAPI(`vendor/contractual_agreement/${id}`, JSON.stringify(json));
    const responseBody: any = await response.json()
    if (!response.ok || response.status !== 200) {
        if (response.status === 400) {
            onError(responseBody.detail)
            return;
        }
        onError();
        return
    }

    onSuccess();
}


export const disableWarehouse = async (
    manager: Warehouse,
    successCallback: () => void,
    errorCallback: (msg: string[]) => void
) => {
    const response = await base.patchAPI(`vendor/warehouse/${manager.warehouseVersionId}/active`, manager.getDisableObject());
    const json = await response.json()
    if (!response.ok || response.status !== 200) {
        errorCallback(json.detail)
    }

    successCallback();
}