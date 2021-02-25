import * as base from "../Apis/base";

export const activateAccount = async (
  t_c: boolean,
  successCallback: () => void,
  errorCallback: (msg: string[]) => void
) => {
  const response = await base.getApi(`customer/activate_vendor?t_and_c=${t_c}`);
  if (!response.ok || response.status !== 200) {
    if (response.status === 422 || response.status === 409) {
      errorCallback(["Some Error Occured Try Again"]);
      return;
    }
    if (response.status === 403) {
      errorCallback(["Not authenticated"])
      return;
    }
  }
  successCallback();
}