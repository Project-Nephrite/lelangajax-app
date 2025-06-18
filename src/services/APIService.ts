// services/BaseService.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class APIService {
  public http: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.http = axios.create({
      baseURL,
      headers: {
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin",

        "Content-Type": "multipart/form-data",
      },
      ...config,
    });
    this.http.interceptors.request.use((config) => {
      const token = sessionStorage.getItem("auth_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.http.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.http.post<T>(url, data, config);
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.http.put<T>(url, data, config);
  }

  public patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.http.patch<T>(url, data, config);
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.http.delete<T>(url, config);
  }
}
