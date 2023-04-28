import axios from "axios";
import Cookies from "universal-cookie";

const { REACT_APP_BASE_URL } = process.env;

export const sendRequest = (
  endpoint,
  data,
  method = "GET",
  withToken = false
) => {
  let headers = { "Content-type": "application/json" };
  if (withToken) {
    const cookie = new Cookies();
    const token = cookie.get("x-access-token");
    headers = { ...headers, "x-access-token": token };
  }
  if (method === "GET") {
    return axios(`${REACT_APP_BASE_URL}/${endpoint}`, {
      withCredentials: true,
      headers,
    });
  } else {
    return axios({
      baseURL: REACT_APP_BASE_URL,
      url: endpoint,
      method,
      withCredentials: true,
      headers,
      data: data,
    });
  }
};

export const sendmultipartRequest = (endpoint, formData) => {
  const cookie = new Cookies();
  const token = cookie.get("x-access-token");
  const headers = {
    "Content-type": "multipart/form-data",
    "x-access-token": token,
  };
  return axios({
    baseURL: REACT_APP_BASE_URL,
    url: endpoint,
    method: "POST",
    withCredentials: true,
    headers,
    data: formData,
  });
};
