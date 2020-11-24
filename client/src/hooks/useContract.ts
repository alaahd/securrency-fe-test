import React, { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';
import { ERC20_ABI } from '../abis/erc20';
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../utils/index';

export function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
