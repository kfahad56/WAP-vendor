/* eslint-disable */
import * as base from "api/base";
import * as Cookie from 'js-cookie'

import { token } from 'api/base'

interface error {
  mesage: string;
  code: Number;
}

export const login = async (
  username: string,
  password: string,
  type: string,
  successCallback: () => void,
  errorCallBack: (message: error) => void
) => {
  const response = await base.postAPI("auth/vendor/" + type, JSON.stringify({
    login_id: username,
    password: password,
  }));
  if (response.ok && response.status === 200) {
    let data = await response.json();
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("refresh", data.refresh_token);
    successCallback();
  } else {
    errorCallBack({
      mesage: "Error message",
      code: 0,
    });
  }
};

export const isLoggedin = (): boolean => {
  // let token = localStorage.getItem("token");
  let access_token = Cookie.get(token)
  if (access_token === null || access_token === undefined) return false;
  else if (access_token.length === 0) return false;
  return true;
};

export const refresh = async (
  token: string,
  successCallback: () => void,
  errorCallback: () => void
) => {
  const response = await base.postAPI("auth/refresh/", JSON.stringify({
    refresh_token: token
  }));
  if (!response.ok || response.status !== 200) {
    errorCallback();
    return;
  }
  let data = await response.json();
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("refresh", token);
  successCallback();
}