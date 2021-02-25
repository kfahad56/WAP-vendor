import * as base from "./base";

export class OTP implements base.serverFunctions {
  token: string = "";
  fingerprint: string = "";
  otp: string = "";

  constructor(json: any) {
    if (json) {
      this.token = json.token;
      this.fingerprint = json.fingerprint;
      this.otp = json.otp
    }
  }

  getCreateObject = () => {
    return JSON.stringify({
      "token": this.token,
      "fingerprint": this.fingerprint,
    })
  }

  getEditObject = () => {
    return JSON.stringify({
      "token": this.token,
      "otp": this.otp,
    })
  }

  getResendObject = () => {
    return JSON.stringify({
      "token": this.token,
    })
  }

  validate(): string[] {
    let errors: string[] = [];

    if (this.fingerprint.length === 0)
      errors.push("Fingerprint cannot be empty");
    if (this.token.length === 0)
      errors.push("Token cannot be empty");
    if (this.otp.length === 0)
      errors.push("Token cannot be empty");

    return errors;
  }
}

export const sendOtp = async (
  manager: OTP,
  successCallback: (status: number, json: string) => void,
  errorCallback: (msg: string[]) => void
) => {

  const response = await base.postAPI(`auth/otp/send`, manager.getCreateObject());
  let json = await response.json()
  if (!response.ok || response.status !== 200) {
    errorCallback(json)
    return
  }
  successCallback(response.status, json);
}

export const verifyOtp = async (
  manager: OTP,
  successCallback: (status: number, json: string) => void,
  errorCallback: (msg: string[]) => void
) => {
  const response = await base.postAPI(`anonymous/otp/verify`, manager.getEditObject());
  let json = await response.json()
  if (!response.ok || response.status !== 200) {
    errorCallback(json.detail)
    return
  }
  successCallback(response.status, json);
}

export const resendOtp = async (
  manager: OTP,
  successCallback: (status: number, json: string) => void,
  errorCallback: (msg: string[]) => void
) => {
  const response = await base.postAPI(`anonymous/otp/resend`, manager.getResendObject());
  let json = await response.json()
  if (!response.ok || response.status !== 200) {
    errorCallback(json.detail)
    return
  }
  successCallback(response.status, json);
}