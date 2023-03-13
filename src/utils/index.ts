import { Contract } from '@ethersproject/contracts';
import PixiaAiABI from 'contracts/PixiaAiABI.json';
import PixiaNFTABI from 'contracts/PixiaNFTABI.json';
import PixiaNFTFactoryABI from 'contracts/PixiaNFTFactoryABI.json';
import PixiaAiPoolABI from 'contracts/PixiaAiPoolABI.json';
import PixiaAiPoolFactoryABI from 'contracts/PixiaAiPoolFactoryABI.json';
import PixiaAiDistributorABI from 'contracts/PixiaAiDistributorABI.json';
import { chainIdLocalStorageKey } from 'hooks';

export const Networks = {
  ETH_MainNet: 1,
  ETH_TestNet: 5,
  BSC_Mainnet: 56,
  BSC_Testnet: 97
};

export const CONTRACTS_BY_NETWORK = {
  [Networks.ETH_MainNet]: {
    PixiaAi: {
      address: '0x4f8f53E17Ce053C5877eb17A2DAC2BA3d786b70c',
      abi: PixiaAiABI
    },
    PixiaNFT: {
      address: '0x0a871ace85e1B3fbAe54B742BCA9624fB9250eD5',
      abi: PixiaNFTABI,
    },
    PixiaNFTFactory: {
      address: '0x75a00d8b1Aa32B04E33E6FDDBa65010CA95a58a9',
      abi: PixiaNFTFactoryABI
    },
    PixiaAiPool: {
      address: '',
      abi: PixiaAiPoolABI
    },
    PixiaAiPoolFactory: {
      address: '',
      abi: PixiaAiPoolFactoryABI
    },
    PixiaAiDistributor: {
      address: '',
      abi: PixiaAiDistributorABI
    }
  },
  [Networks.ETH_TestNet]: {
    PixiaAi: {
      address: '0x4f8f53E17Ce053C5877eb17A2DAC2BA3d786b70c',
      abi: PixiaAiABI
    },
    PixiaNFT: {
      address: '0x74841159b1721E9EBd3d822254c1Fb56dd5cc091',
      abi: PixiaNFTABI,
    },
    PixiaNFTFactory: {
      address: '0x75a00d8b1aa32b04e33e6fddba65010ca95a58a9',
      abi: PixiaNFTFactoryABI
    },
    PixiaAiPool: {
      address: '0xFe5c4142b536a04382B7D44aa5b8337d9C78d495',
      abi: PixiaAiPoolABI
    },
    PixiaAiPoolFactory: {
      address: '0xe2142FBbCCdf7Aaf9F62D75b983044027B26E9F8',
      abi: PixiaAiPoolFactoryABI
    },
    PixiaAiDistributor: {
      address: '0xA68A0FA353474F9839F6d7bb3baB452FDB6a6CBf',
      abi: PixiaAiDistributorABI
    }
  },
  [Networks.BSC_Mainnet]: {
    
  }
};


export const networks = {
  [1]: {
    NETWORK_ID: process.env.REACT_APP_ETH_NETWORK_ID,
    CURRENCY: process.env.REACT_APP_ETH_CURRENCY,
    NETWORK: process.env.REACT_APP_ETH_NETWORK,
    BLOCK_EXPLORER: process.env.REACT_APP_ETH_BLOCK_EXPLORER,
    NODES: process.env.REACT_APP_ETH_NODE_1,
  },
  [5]: {
    NETWORK_ID: process.env.REACT_APP_ETH_NETWORK_ID,
    CURRENCY: process.env.REACT_APP_ETH_CURRENCY,
    NETWORK: process.env.REACT_APP_ETH_NETWORK,
    BLOCK_EXPLORER: process.env.REACT_APP_ETH_BLOCK_EXPLORER,
    NODES: process.env.REACT_APP_ETH_NODE_1,
  },
  [56]: {
    NETWORK_ID: process.env.REACT_APP_BSC_NETWORK_ID,
    CURRENCY: process.env.REACT_APP_BSC_CURRENCY,
    NETWORK: process.env.REACT_APP_BSC_NETWORK,
    BLOCK_EXPLORER: process.env.REACT_APP_BSC_BLOCK_EXPLORER,
    NODES: process.env.REACT_APP_BSC_NODE_1,
  },
  [97]: {
    NETWORK_ID: process.env.REACT_APP_BSC_NETWORK_ID,
    CURRENCY: process.env.REACT_APP_BSC_CURRENCY,
    NETWORK: process.env.REACT_APP_BSC_NETWORK,
    BLOCK_EXPLORER: process.env.REACT_APP_BSC_BLOCK_EXPLORER,
    NODES: process.env.REACT_APP_BSC_NODE_1,
  }
}
export function getCurrentNetwork() {
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

export const ERC20_ABI = [
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

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

export function getContract(address, provider){
  return new Contract(address, PixiaAiPoolABI, provider);
}

export function getERC20ContractObj(token_address, provider){
  return new Contract(token_address, ERC20_ABI, provider);
}


export const shorter = str => (str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str);
