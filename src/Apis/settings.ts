import * as base from "./base";

export class Settings {
  password: string = "";
  old_password: string = "";

  constructor(json: any) {
    if (json) {
      
      this.password = json.password;
      this.old_password = json.old_password;
    }
  }

  setProperties() {
    return JSON.stringify({
      "password": this.password,
      "old_password": this.old_password
    })
  }
}


export const updateSettings = async (
  manager: Settings,
  successCallback: () => void,
  errorCallback: (msg: string[]) => void
) => {
  console.log(manager)
  const response = await base.postAPI(`customer/change_password`, manager.setProperties());
  if (!response.ok || response.status !== 200) {
    if (response.status === 422 || response.status === 409) {
      errorCallback(["Some Error Occured Try Again"]);
      return;
    }
    if (response.status === 403) {
      errorCallback(["Current Password Doesn't Match"])
      return;
    }
  }
  successCallback();
}