import { InjectedConnector } from '@web3-react/injected-connector';
// import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
  1: 'https://mainnet.infura.io/v3/5b5e6d65fb1741fe8d63fa4783b16b2c' as string,
  3: 'https://ropsten.infura.io/v3/5b5e6d65fb1741fe8d63fa4783b16b2c' as string,
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

// export const network = new NetworkConnector({
//   urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
//   defaultChainId: 1,
// });

// The infuraId will support the following chainId's: Mainnet (1), Ropsten (3), Rinkeby(4), Goerli (5) and Kovan (42)
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'Securrency Blockchain Test Assignment',
});

export enum ConnectorTypes {
  Injected = 'Injected',
  // Network = 'Network',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink',
}

export const connectors: { [connectorName in ConnectorTypes]: any } = {
  [ConnectorTypes.Injected]: injected,
  // [ConnectorNames.Network]: network,
  [ConnectorTypes.WalletConnect]: walletconnect,
  [ConnectorTypes.WalletLink]: walletlink,
};
