import * as base from "api/base";

export class AddonService {
  id: number = 0;
  value: string = "";

  constructor(json: any) {
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
      errors.push("AddonService Name cannot be empty");

    return errors;
  }
}

export const getAddonService = async (
  setAddonService: (AmenityData: AddonService[]) => void,
  setPageData: (ManagerPageData: base.pageData) => void,
  errorCallback: () => void
) => {
  const response = await base.getApi("vendor/addon_service")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();
  let addonService = json.data.map((item: any) => {
    return new AddonService(item);
  });
  setAddonService(addonService);
}
