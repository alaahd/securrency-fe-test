import React from 'react';
import { removeTrailingSlashIfExists } from '../utils/';

const baseURL = process.env.REACT_APP_API_CONVERT_URL
  ? removeTrailingSlashIfExists(process.env.REACT_APP_API_CONVERT_URL)
  : '';

export const baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const baseOptions = {
  headers: new Headers(baseHeaders),
};

const useFetch = () => {
  const get = async (path: string, options?: any) => {
    const res = await fetch(baseURL + path, {
      method: 'get',
      ...baseOptions,
      ...options,
    });
    return {
      response: res,
      data: await res.json(),
    };
  };

  const post = async (path: string, body?: any, options?: any) => {
    const res = await fetch(baseURL + path, {
      method: 'post',
      body: body ? JSON.stringify(body) : '',
      ...baseOptions,
      ...options,
    });
    return {
      response: res,
      data: await res.json(),
    };
  };

  const put = async (url: string, body?: any, options?: any) => {
    const res = await fetch(baseURL + url, {
      method: 'put',
      body: body ? JSON.stringify(body) : '',
      ...baseOptions,
      ...options,
    });
    return {
      response: res,
      data: await res.json(),
    };
  };

  return {
    get,
    post,
    put,
  };
};

export default useFetch;
