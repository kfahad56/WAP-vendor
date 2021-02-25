import * as base from "./base";
import * as Cookie from 'js-cookie'
import { access_token } from './base'

export class FingerPrint implements base.serverFunctions {
    fingerprint: string;
    device: string;
    campaign_source: string;
    campaign_medium: string;
    campaign_name: string;

    constructor(json: any) {
        this.fingerprint = json.fingerprint
        this.device = json.device
        this.campaign_source = json.campaign_source
        this.campaign_medium = json.campaign_medium
        this.campaign_name = json.campaign_name

    }

    getEditObject(): string {
        return JSON.stringify({
            "fingerprint": this.fingerprint,
            "device": this.device,
            "campaign_source": this.campaign_source,
            "campaign_medium": this.campaign_medium,
            "campaign_name": this.campaign_name,
        });
    }
    getCreateObject(): string {
        return JSON.stringify({
            "fingerprint": this.fingerprint,
            "device": this.device,
            "campaign": {
                "campaign_source": this.campaign_source,
                "campaign_medium": this.campaign_medium,
                "campaign_name": this.campaign_name,
            }
        });
    }

    validate(): string[] {
        let errors: string[] = [];
        if (this.campaign_source.length === 0)
            errors.push("campaign_source cannot be empty");
        if (this.campaign_medium.length === 0)
            errors.push("campaign_medium cannot be empty");
        if (this.campaign_name.length === 0)
            errors.push("campaign_name cannot be empty");
        if (this.fingerprint.length === 0)
            errors.push("fingerprint cannot be empty");

        return errors;
    }
}

export const createFingerPrint = async (
    manager: FingerPrint,
    successCallback: () => void,
    errorCallback: (msg: string[]) => void
) => {
    let errors = manager.validate();
    if (errors.length > 0) {
        errorCallback(errors);
        return;
    }

    let user = ""
    if (Cookie.get(access_token))
        user = 'customer'
    else
        user = 'anonymous'

    const response = await base.postAPI(`${user}/system_log`, manager.getCreateObject());
    if (!response.ok || response.status !== 200) {
        if (response.status === 404) {
            errorCallback(["error"]);
            return;
        }

    }
    successCallback();
}