import * as Cookie from 'js-cookie'

export const environment = process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : 'development'

export const settings: any = {
    "production": {
        cookie: {
            domain: 'hubshub.in',
            expires: 1920,
        },
        _url: "https://api.hubshub.in/",
        public_url: "https://www.hubshub.in",
        dashboard: {
            admin: "https://admin.hubshub.in/",
            vendor: "https://vendor.hubshub.in/",
            customer: "https://customer.hubshub.in/",
        }
    },
    "development": {
        cookie: {
            expires: 1920
        },
        _url: "https://staging-api.hubshub.in/",
        public_url: "http://localhost:3000/",
        dashboard: {
            // Change the port while development
            admin: "http://localhost:3001/",
            vendor: "http://localhost:3002/",
            customer: "http://localhost:3003/",
        }
    },
    "staging": {
        cookie: {
            expires: 1920,
            domain: 'hubshub.in',
        },
        _url: "https://staging-api.hubshub.in/",
        public_url: "https://staging.hubshub.in/",
        dashboard: {
            admin: "https://staging-admin.hubshub.in/",
            vendor: "https://staging-vendor.hubshub.in/",
            customer: "https://staging-customer.hubshub.in/",
        }
    }
}
export let cookieSettings: any = settings[environment].cookie;
let _url = settings[environment]._url;
export let public_url = settings[environment].public_url

const _token: string = "token_";
export const access_token: string = _token + "5d41402abc4b2a76b9719d911017c592";

const _refresh: string = "refresh_";
export const refresh: string = _refresh + "29585c700c8d0be16c6b0a24d8c9d0bc"

const _customerName: string = "name_";
export const customerName: string = _customerName + "3aad3506aa11f05f265ea8304b8152b3";

const _userType: string = 'type_';
export const userType: string = _userType + "599dcce2998a6b40b1e38e8c6006cb0a";

let customFetch: any = null;

customFetch = async (url: string, options: any): Promise<Response> => {
    return new Promise(async resolve => {
        let response = await fetch(url, options);
        if (response.status === 401) {
            let refresh_token = Cookie.get(refresh)
            let newTokenResponse = await fetch(_url + "auth/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh_token: refresh_token
                })
            });

            if (newTokenResponse.status === 200) {
                let newTokenData = await newTokenResponse.json();
                // Use this for production
                Cookie.set(access_token, newTokenData.access_token, cookieSettings)

                // Use this for local machine
                // Cookie.set(access_token, newTokenData.access_token)

                let newOptions = options
                newOptions.headers['Authorization'] = 'Bearer ' + newTokenData.access_token
                response = await fetch(url, newOptions)

                // If the request fails even after the refresh is a success
                // For eg in case of vendor token being used in customer request, the refresh token will work but the token that
                // is returned will not work with the cutomer request.
                if (response.status === 401) {
                    window.location.href = `${public_url}login`
                }
                resolve(response);
            } else {
                window.location.href = `${public_url}login`
            }
        } else resolve(response);
    });
}

// customFetch = fetch;

export const postAPI = (url: string, params: string | FormData) => {
    const token = Cookie.get(access_token)
    return customFetch(_url + url, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token
        },
        body: params,
    });
}

export const getApi = (url: string) => {
    const token = Cookie.get(access_token)
    return customFetch(_url + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
    });
}

export const deleteApi = (url: string, params: string) => {
    const token = Cookie.get(access_token)
    return customFetch(_url + url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: params
    });
}

export const putAPI = (url: string, params: FormData) => {
    const token = Cookie.get(access_token)
    return customFetch(_url + url, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token
        },
        body: params
    });
}

export interface pageData {
    totalData: number,
    perPage: number,
    currentPage: number
}

export interface serverFunctions {
    getCreateObject: () => string;
    getEditObject: () => string;
}