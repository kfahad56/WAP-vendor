import * as base from "./base";
export class City implements base.serverFunctions {
    id: number = 0;
    name: string = "";
    constructor(json: any) {
        if (json) {
            this.id = json.id
            this.name = json.name
        }
    }
    getCreateObject(): string {
        return JSON.stringify({
            "id": this.id,
            "name": this.name
        })
    }
    getEditObject(): string {
        return ""
    }
    validate(): string[] {
        let errors = []
        if (this.name.length === 0)
            errors.push("Name cannot be empty");
        return errors
    }
}
export const getCity = async (
    name: string,
    setCityData: (AccountManagerData: City[]) => void,
    errorCallback: () => void
) => {
    const response = await base.getApi(`anonymous/city?name=${name}`)
    if (response.ok === false || response.status !== 200) {
        errorCallback();
        return;
    }
    let json = await response.json();
    let data = json.data.map((item: any) => {
        return new City(item)
    })
    setCityData(data);
}