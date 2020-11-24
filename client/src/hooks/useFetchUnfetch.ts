import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

const useFetch = (baseURL: string, options?: any) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const abortController = new AbortController();
  const signal = abortController.signal;
  // const doFetch = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(url, options);

  //     if (res.ok) {
  //       const json = await res.json();
  //       if (!signal.aborted) {
  //         setResponse(json);
  //       }
  //     } else {
  //       throw new Error(
  //         `${res.status} - ${
  //           res.statusText ? res.statusText : 'Something went wrong !'
  //         }`
  //       );
  //     }
  //   } catch (e) {
  //     if (!signal.aborted) {
  //       setError(e);
  //     }
  //   } finally {
  //     if (!signal.aborted) {
  //       setLoading(false);
  //     }
  //   }
  // };

  const get = async (url: string) => {
    const res = await fetch(baseURL + url, { method: 'get', ...options });
    return {
      response: res,
      data: await res.json(),
    };
  };

  const post = async (url: string, body?: any) => {
    const res = await fetch(baseURL + url, {
      method: 'post',
      body: body ? JSON.stringify(body) : '',
      ...options,
    });
    return {
      response: res,
      data: await res.json(),
    };
  };

  const put = async (url: string, body?: any) => {
    const res = await fetch(baseURL + url, {
      method: 'put',
      body: body ? JSON.stringify(body) : '',
      ...options,
    });
    return {
      response: res,
      data: await res.json(),
    };
  };

  // useEffect(() => {
  //   return () => {
  //     abortController.abort();
  //   };
  //   // eslint-disable-next-line
  // }, []);

  return { response, error, loading, get, post, put };
};

export default useFetch;
