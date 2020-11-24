import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { removeTrailingSlashIfExists } from './utils';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import * as serviceWorker from './serviceWorker';
import { GlobalStyles } from './styles/theme';
import { notification } from 'antd';

import fetch from 'isomorphic-unfetch';
import { SWRConfig } from 'swr';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
  ? removeTrailingSlashIfExists(process.env.REACT_APP_API_URL)
  : '';

const FETCH_DELAY_TIME = 1000;
const fetcher = async function <JSON = any>(
  url: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(REACT_APP_API_URL + url, init);
  return await new Promise(async (resolve, reject) => {
    setTimeout(async () => resolve(await res.json()), FETCH_DELAY_TIME);
  });
};

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

ReactDOM.render(
  <React.Fragment>
    <GlobalStyles />
    <SWRConfig
      value={{
        fetcher: fetcher,
        shouldRetryOnError: false,
        onError: error => {
          notification.error({
            message: `API error encountered while connecting to ${REACT_APP_API_URL}`,
            description: error.message,
            placement: 'topLeft',
          });
        },
      }}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </SWRConfig>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
