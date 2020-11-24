import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

import { IWallet } from '../types/wallet';

export const shortenEthereumAddress = (address: String) =>
  address.slice(0, 6) + '...' + address.slice(-4);

export const getActiveWallet = (listOfSupportedWallets: IWallet[]) =>
  listOfSupportedWallets.find(w => w.selected);

export const getNetworkNameFromChainId: { [chainId: number]: string } = {
  1: 'Mainnet Ethereum Network' as string,
  3: 'Ropsten Test Network' as string,
  4: 'Rinkeby Test Network' as string,
  5: 'Goerli Test Network' as string,
  42: 'Kovan Test Network' as string,
};

export const removeTrailingSlashIfExists = (url: string) => {
  return url.replace(/\/$/, '');
};

export const addLeadingSlashIfNotExists = (url: string) => {
  return url.slice(0, 1) === '/' ? url : `/${url}`;
};

type INumberOrStringOrUndefined = number | string | undefined;

export const numberFormat = (
  num: INumberOrStringOrUndefined,
  precision: number = 2
) => {
  if (typeof num === 'undefined') {
    return '';
  }

  const value = typeof num === 'string' ? parseFloat(num) : num;
  return value
    .toFixed(precision)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const currencyFormat = numberFormat;

export const currencyFormatWithSymbol = (
  num: INumberOrStringOrUndefined,
  precision?: number
) => {
  return '$' + currencyFormat(num, precision);
};

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is mandatory
export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}
