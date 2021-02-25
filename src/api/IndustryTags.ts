import * as base from "api/base";

export class IndustryTags {
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
      errors.push("IndustryTags Name cannot be empty");

    return errors;
  }
}

export const getIndustryTags = async (
  setIndustryTags: (AmenityData: IndustryTags[]) => void,
  setPageData: (ManagerPageData: base.pageData) => void,
  errorCallback: () => void
) => {
  const response = await base.getApi("vendor/industry_tag")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();
  let industryTags = json.data.map((item: any) => {
    return new IndustryTags(item);
  });
  setIndustryTags(industryTags);
}
