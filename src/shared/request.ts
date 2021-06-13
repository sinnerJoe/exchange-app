import axios from "axios";

const hostApiPrefix = "https://openexchangerates.org/api/";

function request<T>(
  path: string,
  method: "POST" | "PUT" | "DELETE" | "GET" | "PATCH",
  params?: T
) {
  return axios.request({
    method,
    params,
    baseURL: "/api/",
    url: path,
    withCredentials: true,
    responseType: "json",
  });
}

export default function get<T>(path: string, params: T) {
  return request<T>(`${hostApiPrefix}${path}`, "GET", params);
}
