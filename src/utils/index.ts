import { Contract } from '@ethersproject/contracts';
import BoredMNFTABI from 'contracts/BoredMNFT.json';
import BoredMABI from 'contracts/BoredM.json';

export const Networks = {
  MainNet: 56,
  TestNet: 97,
};

export const CONTRACTS_BY_NETWORK = {
  [Networks.MainNet]: {
    BoredMNFT: {
      address: '0x3307028F79422CA0517368807A78f3111b294403',
      abi: BoredMNFTABI,
    },
    BoredM: {
      address: '0x64619f611248256F7F4b72fE83872F89d5d60d64',
      abi: BoredMABI,
    },
  },
  [Networks.TestNet]: {
    BoredMNFT: {
      address: '0xD1e75A04aA1F380Ed7aC4f30D20E1c5c4876b05C',
      abi: BoredMNFTABI,
    },
    BoredM: {
      address: '0x06E5F340E11c3771a3f172bFeE1152535e6366B8',
      abi: BoredMABI,
    },
  },
};

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const baseApiUrl = process.env.REACT_APP_API_URL;

export function getContractInfo(name, chainId = null) {
  //if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId ? chainId : currentNetwork];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + '...' + endStr;
}

export function numberToString(n1) {
  if (n1) {
    // const cn1 = n1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    const cn1 = n1.toLocaleString('en-US');
    return cn1;
  } else {
    return '';
  }
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + '...' + endStr;
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export const shorter = str => (str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str);
