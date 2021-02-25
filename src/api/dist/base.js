"use strict";
exports.__esModule = true;
exports.putAPI = exports.deleteApi = exports.getApi = exports.postAPI = void 0;
var _url = "https://api.hubshub.in/";
// const _url = "http://localhost:8000/";
exports.postAPI = function (url, params) {
  var token = localStorage.getItem("token");
  return fetch(_url + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: params,
  });
};
exports.getApi = function (url) {
  var token = localStorage.getItem("token");
  return fetch(_url + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
exports.deleteApi = function (url, params) {
  var token = localStorage.getItem("token");
  return fetch(_url + url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: params,
  });
};
exports.putAPI = function (url, params) {
  var token = localStorage.getItem("token");
  return fetch(_url + url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: params,
  });
};
