import * as base from "./base";
import { access_token } from "./base";
import * as Cookie from 'js-cookie'

export const isLoggedin = (): boolean => {
    let token = Cookie.get(access_token)
    if (token === null || token === undefined || token?.length === 0) return false;
    // if (token.length === 0) return false;
    return true;
};