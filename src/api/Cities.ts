import * as base from "api/base";

export class Cities {
  id: number = 0;
  value: string = "";

  constructor(json?: any) {
    if (json) {
      this.id = json.id
      this.value = json.name;
    }
  }

  setProperties(json: any): void {
    this.id = json.id
    this.value = json.name;
  }

  validate(): string[] {
    let errors: string[] = [];

    if (this.value.length === 0)
      errors.push("Cities Name cannot be empty");

    return errors;
  }
}

export const getCities = async (
  stateId: number,
  setCityData: (CityData: Cities[]) => void,
  setPageData: (ManagerPageData: base.pageData) => void,
  errorCallback: () => void
) => {
  const params = stateId ? "state=" + stateId : ""
  const response = await base.getApi(`vendor/city?${params}`)
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();
  let cities = json.data.map((item: any) => {
    return new Cities(item);
  });
  setCityData(cities);
}
