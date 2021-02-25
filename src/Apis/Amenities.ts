import * as base from "./base";

export class Amenities {
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
      errors.push("Amenities Name cannot be empty");

    return errors;
  }
}

export const getAmenities = async (
  setAmenityData: (AmenityData: Amenities[]) => void,
  setPageData: (ManagerPageData: base.pageData) => void,
  errorCallback: () => void
) => {
  const response = await base.getApi("anonymous/amenity")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();
  let amenities = json.data.map((item: any) => {
    return new Amenities(item);
  });
  setAmenityData(amenities);
}
