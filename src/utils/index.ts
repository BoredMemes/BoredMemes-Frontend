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
      address: '0x67675239Fa58c84e75f947c14f566842Dccb69Ae',
      abi: PixiaAiABI
    },
    PixiaNFT: {
      address: '0x4F195071AC30Bfb02Ec516a8848ae46999a56cA6',
      abi: PixiaNFTABI,
    },
    PixiaNFTFactory: {
      address: '0x95DB74Ed1170845d08DDCbD10DD386dBC769d34A',
      abi: PixiaNFTFactoryABI
    },
    PixiaAiPool: {
      address: '0xa69Ad7f1Aab326026D7cC06679E7D3CF92De7F1b',
      abi: PixiaAiPoolABI
    },
    PixiaAiPoolFactory: {
      address: '0xB8050b78A589c91E4de7CA79B5bf0fC21a673f5A',
      abi: PixiaAiPoolFactoryABI
    },
    PixiaAiDistributor: {
      address: '0x3ECBA2Ecb5b42Db4701B5a80a70B3e44180671CB',
      abi: PixiaAiDistributorABI
    }
  },
  [Networks.ETH_TestNet]: {
    PixiaAi: {
      address: '0x4f8f53E17Ce053C5877eb17A2DAC2BA3d786b70c',
      abi: PixiaAiABI
    },
    PixiaNFT: {
      address: '0x180aFE538f6D5f5B5db88F821506ECFEd195DC18',
      abi: PixiaNFTABI,
    },
    PixiaNFTFactory: {
      address: '0xdf0a6dACF4F4c2d2B4282DF3804256c3F5524f94',
      abi: PixiaNFTFactoryABI
    },
    PixiaAiPool: {
      address: '0xFe5c4142b536a04382B7D44aa5b8337d9C78d495',
      abi: PixiaAiPoolABI
    },
    PixiaAiPoolFactory: {
      address: '0x80ff253688665EcC5C885888E4D3d2771AE50466',
      abi: PixiaAiPoolFactoryABI
    },
    PixiaAiDistributor: {
      address: '0xfC656cf14A973b5732E4276843e4572d626B4090',
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
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_spender",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
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
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_from",
              "type": "address"
          },
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
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
      "name": "symbol",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          },
          {
              "name": "_spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
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

export function getNFTContract(address, provider) {
  return new Contract(address, PixiaNFTABI, provider);
}

export function getContract(address, provider){
  return new Contract(address, PixiaAiPoolABI, provider);
}

export function getERC20ContractObj(token_address, provider){
  return new Contract(token_address, ERC20_ABI, provider);
}


export const shorter = str => (str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str);