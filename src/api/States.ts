import * as base from "api/base";

export class States {
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
      errors.push("States Name cannot be empty");

    return errors;
  }
}

export const getStates = async (
  setStateData: (StateData: States[]) => void,
  setPageData: (ManagerPageData: base.pageData) => void,
  errorCallback: () => void
) => {
  const response = await base.getApi("vendor/state")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();
  let states = json.data.map((item: any) => {
    return new States(item);
  });
  setStateData(states);
}
