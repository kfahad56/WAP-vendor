import * as base from "api/base";

export class Localities {
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
      errors.push("Localities Name cannot be empty");

    return errors;
  }
}

export const getLocalities = async (
  setLocalityData: (LocalityData: Localities[]) => void,
  setPageData: (ManagerPageData: base.pageData) => void,
  errorCallback: () => void
) => {
  const response = await base.getApi("vendor/locality")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();
  let localities = json.data.map((item: any) => {
    return new Localities(item);
  });
  setLocalityData(localities);
}
