import { getAccessToken } from '../store/storage'
import { message } from 'antd';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

// 定义相应式数据类型
interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

// 创建Aioxs实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 获取环境变量
  timeout: 5000, // 超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这里可以添加请求头、token等
    const userToken = getAccessToken()
    if (userToken) {
      config.headers!['Authorization'] = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data as ResponseData;
    if (res.code !== 200) {
      // 处理错误
      return Promise.reject(res.message || 'Error');
    }
    return res.data;
  },
  (error) => {
    // 处理响应错误
    const status = error.response?.status;
    switch (status) {
      case 401:
        // token失效，跳转到登录页
        message.error('登录已过期，请重新登录');
        window.location.href = '/login';
        break;
      case 403:
        // 没有权限，跳转到403页面
        window.location.href = '/403';
        break;
      case 404:
        // 页面不存在，跳转到404页面
        window.location.href = '/404';
        break;
      case 500:
        // 服务器错误，提示错误信息
        message.error(error.response?.data?.message || '服务器错误，请稍后重试');
        break;
      default:
        // 其他错误，提示错误信息
        message.error('网络错误，请稍后重试');
        break;
    }
    return Promise.reject(error);
  },
);

// 封装通用请求方法
const request = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },
  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
  },
  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  },
};

export default request;
