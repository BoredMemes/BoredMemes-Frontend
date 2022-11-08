import { Contract } from '@ethersproject/contracts';
import BoredMNFTABI from 'contracts/BoredMNFT.json';
import BoredMMarketABI from 'contracts/BoredMMarket.json';
import BoredMTokenABI from 'contracts/BoredMToken.json';
import BoredMStakingABI from 'contracts/BoredMStaking.json';

export const Networks = {
  MainNet: 56,
  TestNet: 5,
};

export const CONTRACTS_BY_NETWORK = {
  [Networks.MainNet]: {
    BoredMNFT: {
      address: '0x3307028F79422CA0517368807A78f3111b294403',
      abi: BoredMNFTABI,
    },
    BoredMMarket: {
      address: '0x64619f611248256F7F4b72fE83872F89d5d60d64',
      abi: BoredMMarketABI,
    },
    BoredMToken: {
      address: '',
      abi: BoredMTokenABI
    },
    BoredMStaking: {
      address: '',
      abi: BoredMStakingABI
    }
  },
  [Networks.TestNet]: {
    BoredMNFT: {
      address: '0x5D9c49a55492F2b6e71EEdDC9F49460B8c4Aa6d8',
      abi: BoredMNFTABI,
    },
    BoredMMarket: {
      address: '0x07279B444a022D0547336992076243c9d86d206a',
      abi: BoredMMarketABI,
    },
    BoredMToken: {
      address: '0x6b55A11fe85920aD8174e1d4FE701ecf4b1E482A',
      abi: BoredMTokenABI
    },
    BoredMStaking: {
      address: '0x8b4196629F23A0dA3A4976b01b261bFB8360e600',
      abi: BoredMStakingABI
    }
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
