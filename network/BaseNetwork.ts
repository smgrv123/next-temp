import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';
import Logger from '@/lib/Logger';

  
  export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
  }
  
  export type RequestInfoType<T> = {
    url: string;
    data?: T;
    method?: HTTPMethod;
    config?: AxiosRequestConfig;
    pathParams?: { [key: string]: string | number | boolean };
    queryParams?: { [key: string]: string | number | boolean };
    customHeaders?: { [key: string]: string | number | boolean };
  };
  
  abstract class HttpClient {
    protected readonly instance: AxiosInstance;
  
    public constructor(baseURL: string, withCredentials: boolean = true) {
      const headers: Readonly<Record<string, string | boolean>> = {
        'Content-Type': 'application/json; charset=utf-8',
      };
      this.instance = axios.create({
        baseURL,
        withCredentials,
        headers,
      });
      this._initializeResponseInterceptor();
    }
  
    private _initializeResponseInterceptor = () => {
      this.instance.interceptors.response.use(this._handleResponse, this._handleError);
    };
  
    private _handleResponse = ({ data }: AxiosResponse) => data;
  
    protected _handleError = async (error: AxiosError) => {
        Logger.error(error);
        Logger.error('Network Error-----', error.response);
      const { response } = error;
      // @ts-ignore
      let message = response?.data?.message;
      if (message && response?.status !== 401) {
        // !show error
      }
  
      if (response?.status && response?.status === 401) {
        // ! refresh token logic
      }
      if (response?.status && response?.status === 403) {
        // !log out logic
      }
  
      return Promise.reject(response);
    }; // TODO: handle different error codes here
  
    private getURLWithPathParams = (
      url: string,
      pathParams: { [key: string]: string | number | boolean }
    ): string => {
      return Object.keys(pathParams).reduce(
        (partialURL, key) => partialURL.replace(`{${key}}`, `${pathParams[key]}`),
        url
      );
    };
  
    handleRequest<T = any, R = AxiosResponse<T>>(requestInfo: RequestInfoType<T>): Promise<R> {
      const { method, config = {}, data = {}, url = '' } = requestInfo;
      let finalURL = url;
      let finalConfig = config;
      if (requestInfo.queryParams || requestInfo.customHeaders) {
        const { queryParams = {}, customHeaders = {} } = requestInfo;
        finalConfig = Object.assign({}, config, {
          params: queryParams,
          headers: { ...config.headers, ...customHeaders },
        });
      }
  
      if (requestInfo.pathParams) {
        finalURL = this.getURLWithPathParams(url, requestInfo.pathParams);
      }
      switch (method) {
        case HTTPMethod.GET: {
          return this.instance.get<T, R>(finalURL, finalConfig);
        }
        case HTTPMethod.POST: {
          return this.instance.post<T, R>(finalURL, data, config);
        }
        case HTTPMethod.PUT: {
          return this.instance.put<T, R>(finalURL, data, config);
        }
        case HTTPMethod.DELETE: {
          return this.instance.delete<T, R>(finalURL, config);
        }
        case HTTPMethod.PATCH: {
          return this.instance.patch<T, R>(finalURL, data, config);
        }
        default: {
          return this.instance.request(config);
        }
      }
    }
    processRequest<T = any, R = AxiosResponse<T>>(requestInfo: RequestInfoType<T>): Promise<R> {
      return this.handleRequest<T, R>(requestInfo);
    }
  }
  
  export type NetworkClient = HttpClient;
  
  export class AuthlessHttpClient extends HttpClient {
    private baseUrl: string;
    constructor(baseUrl: string) {
      super(baseUrl, false);
      this.baseUrl = baseUrl;
      this._initializeRequestInterceptor();
    }
  
    private injectToken = async (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      try {
        config.headers = Object.assign({}, config.headers ?? {}, {});
        return config;
      } catch (error) {
        throw new Error(error as any);
      }
    };
  
    private _initializeRequestInterceptor = () => {
      this.instance.interceptors.request.use(this.injectToken, (error) => Promise.reject(error));
    };
  }
  
  export class AuthHttpClient extends HttpClient {
    private baseUrl: string;
    constructor(baseUrl: string) {
      super(baseUrl);
      this.baseUrl = baseUrl;
      this._initializeRequestInterceptor();
    }
  
    private injectToken = async (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      try {
        const token = '';
        const sessionToken = '';
        if (token !== null) {
          config.headers = Object.assign({}, config.headers ?? {}, {
            Authorization: `Bearer ${token}`,
            sid: sessionToken,
          });
        }
        return config;
      } catch (error) {
        throw new Error(error as any);
      }
    };
  
    private _initializeRequestInterceptor = () => {
      this.instance.interceptors.request.use(this.injectToken, (error) => Promise.reject(error));
    };
  }