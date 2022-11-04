import '@ethersproject/shims';
import { ethers } from 'ethers';
import { getContractObj } from '.';

export async function getBalanceOfBoredM(chainId, provider, account) {
  const BoredMContract = getContractObj('BoredM', chainId, provider);
  try {
    const BoredMDecimals = await BoredMContract.decimals();
    const balanceBoredM = await BoredMContract.balanceOf(account);
    return parseFloat(ethers.utils.formatUnits(balanceBoredM, BoredMDecimals));
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function getBalanceOfBNB(library, account) {
  try {
    const balanceBNB = await library.getBalance(account);
    return parseFloat(ethers.utils.formatEther(balanceBNB));
  } catch (e) {
    console.log(e);
    return 0;
  }
}
