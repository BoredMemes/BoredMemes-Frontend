import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';
import { toast } from 'react-toastify';
import { getContractObj } from '.';
import { NFTStakingInfo } from './types';

export function isAddress(address) {
  try {
    ethers.utils.getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
}

export function toEth(amount) {
  return ethers.utils.formatEther(String(amount));
}

export function toWei(amount) {
  return ethers.utils.parseEther(String(amount));
}

export async function getBalanceOfBoredM(chainId, provider, account) {
  const BoredMContract = getContractObj('BoredMToken', chainId, provider);
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

export async function onMintArtItem(provider, reqId, packId) {
  const nftContract = getContractObj("BoredMNFT", process.env.REACT_APP_NETWORK_ID, provider);
  try {
    const packPrices = await Promise.all([
      nftContract.SILVER_PACK_PRICE(),
      nftContract.GOLD_PACK_PRICE(),
      nftContract.PREMIUM_PACK_PRICE()
    ]);
    const tx =
      packId == 0 ? await nftContract.mintSilverPack(reqId, { value: packPrices[packId] }) :
        packId == 1 ? await nftContract.mintGoldPack(reqId, { value: packPrices[packId] }) :
          await nftContract.mintPremiumPack(reqId, { value: packPrices[packId] });
    await tx.wait(1);
    return true;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg)toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function isTokenApprovedForStaking(account, amount, chainId, provider) {
  const stakingContract = getContractObj('BoredMStaking', chainId, provider);
  const tokenContract = getContractObj('BoredMToken', chainId, provider);

  const allowance = await tokenContract.allowance(account, stakingContract.address);
  if (BigNumber.from(toWei(amount)).gt(allowance)) {
    return false;
  }
  return true;
}

export async function approveTokenForStaking(chainId, signer) {
  const stakingContract = getContractObj('BoredMStaking', chainId, signer);
  const tokenContract = getContractObj('BoredMToken', chainId, signer);

  const approveAmount = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
  try {
    const approve_tx = await tokenContract.approve(stakingContract.address, approveAmount);
    await approve_tx.wait(1);
    return true;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg)toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function getStakingInfo(account, chainId, provider) {
  try {
    const BoredMContract = getContractObj('BoredMToken', chainId, provider);
    const BoredMDecimals = await BoredMContract.decimals();
    const stakingContract = getContractObj("BoredMStaking", process.env.REACT_APP_NETWORK_ID, provider);
    const [tDividETH, tStakedBoredM, myStakingInfo, tDividETHLock, tStakedBoredMLock, mPercentFree, mPercentLock] = await Promise.all([
      stakingContract.totalDividendsFree(),
      stakingContract.totalSharesFree(),
      stakingContract.shares(account),
      stakingContract.totalDividendsLock(),
      stakingContract.totalSharesLock(),
      stakingContract.dividendsPercentFree(),
      stakingContract.dividendsPercentLock()
    ]);
    const nftStakingInfo: NFTStakingInfo = {
      tDividETH: parseFloat(ethers.utils.formatEther(tDividETH)),
      tStakedBoredM: parseFloat(ethers.utils.formatUnits(tStakedBoredM, BoredMDecimals)),
      mStakedBoredM: parseFloat(ethers.utils.formatUnits(myStakingInfo.amountFree, BoredMDecimals)),
      mEarnedETH: parseFloat(ethers.utils.formatEther(myStakingInfo.excludedFree)),
      mClaimedETH: parseFloat(ethers.utils.formatEther(myStakingInfo.rewardConfirmedFree)),
      mClaimableETH: parseFloat(ethers.utils.formatEther(myStakingInfo.rewardClaimedFree)),
      tDividETHLock: parseFloat(ethers.utils.formatEther(tDividETHLock)),
      tStakedBoredMLock: parseFloat(ethers.utils.formatUnits(tStakedBoredMLock, BoredMDecimals)),
      mStakedBoredMLock: parseFloat(ethers.utils.formatUnits(myStakingInfo.amountLock, BoredMDecimals)),
      mEarnedETHLock: parseFloat(ethers.utils.formatEther(myStakingInfo.excludedLock)),
      mClaimedETHLock: parseFloat(ethers.utils.formatEther(myStakingInfo.rewardConfirmedLock)),
      mClaimableETHLock: parseFloat(ethers.utils.formatEther(myStakingInfo.rewardClaimedLock)),
      mPercentFree: mPercentFree.toNumber(),
      mPercentLock: mPercentLock.toNumber()
    }
    console.log(nftStakingInfo);
    return nftStakingInfo;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg)toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onBoredMStake(account, amount, chainId, provider, isFree) {
  try {
    let isApproved = await isTokenApprovedForStaking(account, amount, chainId, provider);
    if (!isApproved) isApproved = await approveTokenForStaking(chainId, provider);
    if (isApproved) {
      const stakingContract = getContractObj('BoredMStaking', chainId, provider);
      const BoredMContract = getContractObj('BoredMToken', chainId, provider);
      const BoredMDecimals = await BoredMContract.decimals();
      const _parsedAmount = ethers.utils.parseUnits(amount.toString(), BoredMDecimals)
      const tx = isFree ? await stakingContract.stakeFree(_parsedAmount) : await stakingContract.stakeLock(_parsedAmount);
      await tx.wait(1)
      return true;
    }
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg)toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onBoredMUnStake(account, amount, chainId, provider, isFree) {
  try {
    let isApproved = await isTokenApprovedForStaking(account, amount, chainId, provider);
    if (!isApproved) isApproved = await approveTokenForStaking(chainId, provider);
    if (isApproved) {
      const stakingContract = getContractObj('BoredMStaking', chainId, provider);
      console.log(isFree);
      const tx = isFree ? await stakingContract.unstakeFree(amount) : await stakingContract.unstakeLock(amount);
      await tx.wait(1)
      return true;
    }
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg)toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onBoredMClaim(chainId, provider, isFree) {
  try {
    const stakingContract = getContractObj('BoredMStaking', chainId, provider);
    const tx = isFree ? await stakingContract.claimRewardsFree() : await stakingContract.claimRewardsLock();
    await tx.wait(1)
    return true;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg)toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onMyBuyShares(refAddress, chainId, provider) {
  try {
    const stakingContract = getContractObj('BNBStaking', chainId, provider);
    console.log(stakingContract.address);
    const tx = await stakingContract.buyShares(refAddress, {
      value: ethers.utils.parseEther("0.005")
    });
    await tx.wait(1)
    return true;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg)toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onSellShares(chainId, provider) {
  try {
    const stakingContract = getContractObj('BNBStaking', chainId, provider);
    const tx = await stakingContract.sellShares();
    await tx.wait(1)
    return true;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg)toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onInvest(refAddress, chainId, provider) {
  try {
    const stakingContract = getContractObj('BNBStaking', chainId, provider);
    const tx = await stakingContract.Invest(refAddress);
    await tx.wait(1)
    return true;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg)toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

