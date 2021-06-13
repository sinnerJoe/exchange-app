import axios from "axios";

function request<R, T>(path: string, params?: T) {
  return axios.get<T, R>(path, { params });
}

export default function get<R, T>(path: string, params: T) {
  console.log(path, params);
  return request<R, T>(`https://openexchangerates.org/api/${path}`, params);
}
