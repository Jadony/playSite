import axios, { AxiosRequestConfig } from "axios";

export type ResponseResult<T> = {
  code: number;
  msg: string;
  data: T;
  requestId: string;
  date: string;
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

function request<T>(config: AxiosRequestConfig<T>) {
  const { method, params, url = "" } = config;
  if (method === "get") {
    return axios.get<ResponseResult<T>>(url, { params });
  }
  return axios<ResponseResult<T>>({
    method,
    url,
    data: params,
  });
}

export default request;
