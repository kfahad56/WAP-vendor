import * as base from "./base";

export class AddonService {

  id: number = 0;
  name: string = "";

  constructor(json: any) {
    if (json) {
      this.id = json.id
      this.name = json.name;
    }
  }

  setProperties(json: any): void {
    this.id = json.id
    this.name = json.name;
  }

  validate(): string[] {
    let errors: string[] = [];

    if (this.name.length === 0)
      errors.push("AddonService Name cannot be empty");

    return errors;
  }
}

export const getAddonService = async (
  setAddonServiceData: (AmenityData: AddonService[]) => void,
  setPageData: (ManagerPageData: base.pageData) => void,
  errorCallback: () => void
) => {
  const response = await base.getApi("anonymous/addon_service")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();
  let addonService = json.data.map((item: any) => {
    return new AddonService(item);
  });
  setAddonServiceData(addonService);
}
