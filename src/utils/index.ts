import { Contract } from '@ethersproject/contracts';
import BoredMNFTABI from 'contracts/BoredMNFT.json';
import BoredMMarketABI from 'contracts/BoredMMarket.json';
import BoredMTokenABI from 'contracts/BoredMToken.json';
import BoredMStakingABI from 'contracts/BoredMStaking.json';
import BNBStakingABI from 'contracts/BNBStaking.json';
import { chainIdLocalStorageKey } from 'hooks';

export const Networks = {
  ETH_MainNet: 1,
  ETH_TestNet: 5,
  BSC_Mainnet: 56
};

export const CONTRACTS_BY_NETWORK = {
  [Networks.ETH_MainNet]: {
    BoredMNFT: {
      address: '0xc8Ce162eF2B15092Cf6eAfC22459CD2637207E7f',
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
  [Networks.ETH_TestNet]: {
    BoredMNFT: {
      address: '0xc8Ce162eF2B15092Cf6eAfC22459CD2637207E7f',
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
  [Networks.BSC_Mainnet]: {
    BNBStaking: {
      address: '0x103d252e285f7Cfb198a555B82D0314F815A71E9',
      abi: BNBStakingABI
    }
  }
};


export const networks = {
  [1] : {
    NETWORK_ID : process.env.REACT_APP_ETH_NETWORK_ID,
    CURRENCY : process.env.REACT_APP_ETH_CURRENCY,
    NETWORK : process.env.REACT_APP_ETH_NETWORK,
    BLOCK_EXPLORER : process.env.REACT_APP_ETH_BLOCK_EXPLORER,
    NODES : process.env.REACT_APP_ETH_NODE_1,
  },
  [5] : {
    NETWORK_ID : process.env.REACT_APP_ETH_NETWORK_ID,
    CURRENCY : process.env.REACT_APP_ETH_CURRENCY,
    NETWORK : process.env.REACT_APP_ETH_NETWORK,
    BLOCK_EXPLORER : process.env.REACT_APP_ETH_BLOCK_EXPLORER,
    NODES : process.env.REACT_APP_ETH_NODE_1,
  },
  [56] : {
    NETWORK_ID : process.env.REACT_APP_BSC_NETWORK_ID,
    CURRENCY : process.env.REACT_APP_BSC_CURRENCY,
    NETWORK : process.env.REACT_APP_BSC_NETWORK,
    BLOCK_EXPLORER : process.env.REACT_APP_BSC_BLOCK_EXPLORER,
    NODES : process.env.REACT_APP_BSC_NODE_1,
  }
}

//export const currentNetwork = process.env.REACT_APP_BSC_NETWORK_ID : process.env.REACT_APP_ETH_NETWORK_ID;
export function getCurrentNetwork(){
  return window.localStorage.getItem(chainIdLocalStorageKey) || process.env.REACT_APP_ETH_NETWORK_ID;
}

export const baseApiUrl = process.env.REACT_APP_API_URL;

export function getContractInfo(name, chainId = null) {
  //if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId ? chainId : getCurrentNetwork()];
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
