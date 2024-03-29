import '@ethersproject/shims';
import axios from 'axios';
import { BigNumber, ethers } from 'ethers';
import { toast } from 'react-toastify';
import { getBlindNFTContract, getContract, getContractInfo, getContractObj, getERC20ContractObj, getNFTContract, Networks, networks } from '.';
import { BNBStakingInfo, NFTStakingInfo } from './types';

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

export async function getDistributorInfo(chainId) {
  const jsonProvider = new ethers.providers.JsonRpcProvider(networks[chainId].NODES);
  const _contract = getContractObj("PixiaAiDistributor", chainId, jsonProvider);
  try {
    const [LPBurn, StakingCaller, totalForLP, totalETH] = await Promise.all([
      _contract.getAvailableEthAutoLPandBuyBackBurn(),
      _contract.getAvailableEthtPerWallet(),
      _contract.getTotalEthForAutoLPandBuyback(),
      _contract.getTotalEthSentToWallets()
    ]);
    const totalEvenue =
      parseFloat(ethers.utils.formatEther(totalForLP[0])) +
      parseFloat(ethers.utils.formatEther(totalForLP[1])) +
      parseFloat(ethers.utils.formatEther(totalETH[0])) +
      parseFloat(ethers.utils.formatEther(totalETH[1])) +
      parseFloat(ethers.utils.formatEther(totalETH[2])) +
      parseFloat(ethers.utils.formatEther(totalETH[3]))
    return [
      parseFloat(ethers.utils.formatEther(LPBurn[0])),
      parseFloat(ethers.utils.formatEther(LPBurn[1])),
      parseFloat(ethers.utils.formatEther(StakingCaller[1])),
      parseFloat(ethers.utils.formatEther(StakingCaller[3])),
      totalEvenue
    ];
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return ["0", "0", "0", "0", "0"];
  }
}

export async function onFuelUp(chainId, provider) {
  const _contract = getContractObj("PixiaAiDistributor", chainId, provider);
  try {
    const tx = await _contract.triggerDistribution();
    await tx.wait(1);
    return true;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function getMintInfo() {
  const jsonProvider = new ethers.providers.JsonRpcProvider(networks[Networks.ETH_MainNet].NODES);
  const nftContract = getContractObj("BoredMNFT", Networks.ETH_MainNet, jsonProvider);
  try {
    const packPrices = await Promise.all([
      nftContract.SILVER_PACK_PRICE(),
      nftContract.GOLD_PACK_PRICE(),
      nftContract.PREMIUM_PACK_PRICE()
    ]);
    const _packPrices = [
      ethers.utils.formatEther(packPrices[0]),
      ethers.utils.formatEther(packPrices[1]),
      ethers.utils.formatEther(packPrices[2]),
    ]
    return _packPrices;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return ["0", "0", "0"];
  }
}

export async function onMintArtItem(chainId, provider, reqId, packId, packPrice) {
  const nftContract = getContractObj("BoredMNFT", chainId, provider);
  try {
    const tx = await nftContract.mintPremiumPack(reqId, { value: ethers.utils.parseEther(packPrice) });
    await tx.wait(1);
    return true;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
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
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function getStakingInfo(chainId, account) {
  try {
    const jsonProvider = new ethers.providers.JsonRpcProvider(networks[chainId].NODES);
    const tokenContract = getContractObj('PixiaAi', chainId, jsonProvider);
    const _decimals = await tokenContract.decimals();
    const stakingContract = getContractObj("PixiaStaking", chainId, jsonProvider);
    const [lockedPool, unLockedPool, lockedUser, unLockedUser, lockedPayout, unLockedPayout, tStakedBoredMLock, mClaimedETHLock, mClaimableETHLock, mPercentFree] = await Promise.all([
      stakingContract.totalDividendsFree(),
      stakingContract.totalSharesFree(),
      account ? stakingContract.shares(account) : null,
      account ? stakingContract.getClaimedRewardsFree(account) : BigNumber.from(0),
      account ? stakingContract.getUnclaimedRewardsFree(account) : BigNumber.from(0),
      stakingContract.totalDividendsLock(),
      stakingContract.totalSharesLock(),
      account ? stakingContract.getClaimedRewardsLock(account) : BigNumber.from(0),
      account ? stakingContract.getUnclaimedRewardsLock(account) : BigNumber.from(0),
      stakingContract.dividendsPercentFree(),
      stakingContract.dividendsPercentLock()
    ]);
    // const nftStakingInfo: NFTStakingInfo = {
    //   tDividETH: parseFloat(ethers.utils.formatEther(tDividETH)),
    //   tStakedBoredM: parseFloat(ethers.utils.formatUnits(tStakedBoredM, BoredMDecimals)),
    //   mStakedBoredM: myStakingInfo ? parseFloat(ethers.utils.formatUnits(myStakingInfo.amountFree, BoredMDecimals)) : 0,
    //   mEarnedETH: parseFloat(ethers.utils.formatEther(mClaimedETH.add(mClaimableETH))),
    //   mClaimedETH: parseFloat(ethers.utils.formatEther(mClaimedETH)),
    //   mClaimableETH: parseFloat(ethers.utils.formatEther(mClaimableETH)),
    //   tDividETHLock: parseFloat(ethers.utils.formatEther(tDividETHLock)),
    //   tStakedBoredMLock: parseFloat(ethers.utils.formatUnits(tStakedBoredMLock, BoredMDecimals)),
    //   mStakedBoredMLock: myStakingInfo ? parseFloat(ethers.utils.formatUnits(myStakingInfo.amountLock, BoredMDecimals)) : 0,
    //   mEarnedETHLock: parseFloat(ethers.utils.formatEther(mClaimedETHLock.add(mClaimableETHLock))),
    //   mClaimedETHLock: parseFloat(ethers.utils.formatEther(mClaimedETHLock)),
    //   mClaimableETHLock: parseFloat(ethers.utils.formatEther(mClaimableETHLock)),
    //   mTimestampLock: myStakingInfo ? myStakingInfo.stakeTimestampLock.toNumber() : 0,
    //   mPercentFree: mPercentFree.toNumber(),
    //   mPercentLock: mPercentLock.toNumber()
    // }

    // return nftStakingInfo;
    return null;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
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
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onBoredMUnStake(account, amount, chainId, provider, isFree) {
  try {
    let isApproved = await isTokenApprovedForStaking(account, amount, chainId, provider);
    if (!isApproved) isApproved = await approveTokenForStaking(chainId, provider);
    if (isApproved) {
      const stakingContract = getContractObj('BoredMStaking', chainId, provider);
      const BoredMContract = getContractObj('BoredMToken', chainId, provider);
      const BoredMDecimals = await BoredMContract.decimals();
      const _parsedAmount = ethers.utils.parseUnits(amount.toString(), BoredMDecimals)
      const tx = isFree ? await stakingContract.unstakeFree(_parsedAmount) : await stakingContract.unstakeLock(_parsedAmount);
      await tx.wait(1)
      return true;
    }
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onRewardClaim(chainId, provider, isFree) {
  try {
    const stakingContract = getContractObj('BoredMStaking', chainId, provider);
    const tx = isFree ? await stakingContract.claimRewardsFree() : await stakingContract.claimRewardsLock();
    await tx.wait(1)
    return true;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function getBNBStakingInfo(account) {
  try {
    const jsonProvider = new ethers.providers.JsonRpcProvider(networks[Networks.BSC_Mainnet].NODES);
    const stakingContract = getContractObj("BNBStaking", Networks.BSC_Mainnet, jsonProvider);
    const [balance, myShares, myEarnedBNB] = await Promise.all([
      stakingContract.getBalance(),
      account ? stakingContract.getMyShares(account) : BigNumber.from(0),
      account ? stakingContract.shareRewards(account) : BigNumber.from(0)
      // stakingContract.getMyShares("0x13320f40470880fb994379c75A00F963803a85E2"),
      // stakingContract.shareRewards("0x13320f40470880fb994379c75A00F963803a85E2"),
    ]);
    const bnbStakingInfo: BNBStakingInfo = {
      balance: parseFloat(ethers.utils.formatEther(balance)),
      myShares: myShares.toNumber(),
      myEarnedBNB: parseFloat(ethers.utils.formatEther(myEarnedBNB)),
    }
    console.log(bnbStakingInfo);
    return bnbStakingInfo;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onMyBuyShares(refAddress, amount, chainId, provider) {
  try {
    const stakingContract = getContractObj('BNBStaking', chainId, provider);
    const tx = await stakingContract.buyShares(refAddress, {
      value: ethers.utils.parseEther(amount.toString())
    });
    await tx.wait(1)
    return true;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
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
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
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
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function createNewCollection(plan, isBlind, mint_price, token_addr, totalSupply, mintCntWallet, revealUri, revealTime, colId, chainId, provider) {
  const factoryContract = getContractObj(isBlind ? "PixiaBlindNFTFactory" : "PixiaNFTFactory", chainId, provider);
  const factoryContractInfo = getContractInfo(isBlind ? "PixiaBlindNFTFactory" : "PixiaNFTFactory", chainId);
  try {
    const price = isBlind ? token_addr === ethers.constants.AddressZero ? ethers.utils.parseEther(mint_price + "") : ethers.utils.parseUnits(mint_price + "", await getDecimal(token_addr, chainId)) : 0;
    const tx = isBlind ? await factoryContract.createCollection(plan, price, revealUri, Math.floor(revealTime / 1000), totalSupply, mintCntWallet, colId, {
      value: ethers.utils.parseEther(plan === 0 ? "0" : chainId === Networks.BSC_Testnet || chainId === Networks.ETH_TestNet ? "0.001" :
        chainId === Networks.BSC_Mainnet ? "15" : "10")
    }) : await factoryContract.createCollection(plan, colId, {
      value: ethers.utils.parseEther(plan === 0 ? "0" : chainId === Networks.BSC_Testnet || chainId === Networks.ETH_TestNet ? "0.001" :
        chainId === Networks.BSC_Mainnet ? "15" : "3")
    });
    const receipt = await tx.wait(2);
    if (receipt.confirmations) {
      const interf = new ethers.utils.Interface(factoryContractInfo.abi);
      const logs = receipt.logs;
      let collectionAddress = "";
      for (let index = 0; index < logs.length; index++) {
        const log = logs[index];
        if (factoryContractInfo.address?.toLowerCase() === log.address?.toLowerCase()) {
          collectionAddress = interf.parseLog(log).args.collection_address?.toLowerCase();
          return collectionAddress;
        }
      }
    }
    return false;
  } catch (e) {
    toast.error(JSON.parse(JSON.stringify(e))["reason"]);
    return false;
  }
}

// ERC20 Token Management

export async function getDecimal(tokenAddress, chainId) {
  try {
    const jsonProvider = new ethers.providers.JsonRpcProvider(networks[chainId].NODES);
    const tokenContract = getERC20ContractObj(tokenAddress, jsonProvider);
    if (tokenContract) {
      const decimals = await tokenContract.decimals();
      return decimals;
    }
    return
  } catch (e) {
    console.log(e);
    return 0;
  }
}

//NFT Management

export async function getNFTInfo(nftAddress, chainId) {
  const jsonProvider = new ethers.providers.JsonRpcProvider(networks[chainId].NODES);
  const nftContract = getNFTContract(nftAddress, jsonProvider);
  try {
    const packPrice = await nftContract._PRICE();
    return ethers.utils.formatEther(packPrice);
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return ["0", "0", "0"];
  }
}

export async function onAirDrop(nftAddress, ids, provider) {
  const nftContract = getBlindNFTContract(nftAddress, provider);
  try {
    const tx = await nftContract.airdrop(ids);
    await tx.wait(1);
    return true;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onRevealDate(nftAddress, provider) {
  const nftContract = getBlindNFTContract(nftAddress, provider);
  try {
    const tx = await nftContract.setRevealTime(Date.now());
    await tx.wait(1);
    return true;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onMintArt(isBlind, nftAddress, ids, provider) {
  const nftContract = isBlind ? getBlindNFTContract(nftAddress, provider) : getNFTContract(nftAddress, provider);
  const packPrice = await nftContract._PRICE();
  try {
    const tx = await nftContract.mintPack(ids, { value: BigNumber.from(String(packPrice * ids.length)) });
    await tx.wait(1);
    return true;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

//Pool Management
export async function getBalanceOf(tokenAddress, chainId, account) {
  const jsonProvider = new ethers.providers.JsonRpcProvider(networks[chainId].NODES);
  const tokenContract = getERC20ContractObj(tokenAddress, jsonProvider);
  try {
    const decimals = await tokenContract.decimals();
    const balance = await tokenContract.balanceOf(account);
    return parseFloat(ethers.utils.formatUnits(balance, decimals));
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function isTokenApprovedForPool(poolAddress, tokenAddress, account, amount, provider) {
  const poolContract = getContract(poolAddress, provider);
  const tokenContract = getERC20ContractObj(tokenAddress, provider);
  const allowance = await tokenContract.allowance(account, poolContract.address);
  const decimals = await tokenContract.decimals()
  if (amount > parseFloat(ethers.utils.formatUnits(allowance, decimals))) {
    return false;
  }
  return true;
}

export async function approveTokenForPool(poolAddress, tokenAddress, provider) {
  const poolContract = getContract(poolAddress, provider);
  const tokenContract = getERC20ContractObj(tokenAddress, provider);

  const approveAmount = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
  try {
    const approve_tx = await tokenContract.approve(poolContract.address, approveAmount);
    await approve_tx.wait(1);
    return true;
  } catch (e) {
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function isNFTApprovedForPool(poolAddress, collection, account, provider) {
  const poolContract = getContract(poolAddress, provider);
  const nftToken = getNFTContract(collection, provider);

  return await nftToken.isApprovedForAll(account, poolContract.address);
}

export async function setNFTApprovalForPool(poolAddress, collection, approved, provider) {
  const poolContract = getContract(poolAddress, provider);
  const nftToken = getNFTContract(collection, provider);
  try {
    const tx = await nftToken.setApprovalForAll(
      poolContract.address,
      approved
    );
    await tx.wait(1);
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function stakeBoostNFT(isStake, poolAddress, stakingId, collection, nftTokenIds, account, provider) {
  try {
    let isApproved = await isNFTApprovedForPool(poolAddress, collection, account, provider);
    if (!isApproved) isApproved = await setNFTApprovalForPool(poolAddress, collection, true, provider);
    if (isApproved) {
      const poolContract = getContract(poolAddress, provider);
      const tx = isStake ? await poolContract.stakeBoostNft(stakingId, nftTokenIds) :
        await poolContract.unstakeBoostNft(stakingId, nftTokenIds);
      const receipt = await tx.wait(1);
      if (receipt.confirmations) {
        return true;
      }
    }

    return false;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}
export async function stakeToken(poolAddress, s_address, amount, lockDays, account, provider) {
  try {
    console.log(poolAddress, s_address, amount, lockDays, provider);
    const poolContract = getContract(poolAddress, provider);
    const sTokenContract = getERC20ContractObj(s_address, provider);
    const _sDecimals = await sTokenContract.decimals();
    let isApproved = await isTokenApprovedForPool(poolAddress, s_address, account, amount, provider);
    if (!isApproved) isApproved = await approveTokenForPool(poolAddress, s_address, provider);
    if (isApproved) {
      const tx = lockDays === 0 ? await poolContract.stakeToken(ethers.utils.parseUnits(amount.toString(), _sDecimals))
        : await poolContract.lockToken(ethers.utils.parseUnits(amount.toString(), _sDecimals), lockDays * 24 * 3600);
      const receipt = await tx.wait(1);
      if (receipt.confirmations) {
        return true;
      }
    }
    return false;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function harvest(poolAddress, provider) {
  try {
    const poolContract = getContract(poolAddress, provider);
    const tx = await poolContract.harvest();
    const receipt = await tx.wait(1);
    if (receipt.confirmations) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function unstakeToken(amount, poolAddress, s_address, provider) {
  try {
    const poolContract = getContract(poolAddress, provider);
    const sTokenContract = getERC20ContractObj(s_address, provider);
    const _sDecimals = await sTokenContract.decimals();
    console.log(ethers.utils.parseUnits(amount.toString(), _sDecimals))
    const tx = await poolContract.unstakeToken(ethers.utils.parseUnits(amount.toString(), _sDecimals));
    const receipt = await tx.wait(1);
    if (receipt.confirmations) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function lockToken(amount, poolAddress, s_address, lockTime, provider) {
  try {
    const poolContract = getContract(poolAddress, provider);
    const sTokenContract = getERC20ContractObj(s_address, provider);
    const _sDecimals = await sTokenContract.decimals();
    const tx = await poolContract.lockToken(ethers.utils.parseUnits(amount.toString(), _sDecimals), lockTime);
    const receipt = await tx.wait(1);
    if (receipt.confirmations) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function unlockToken(poolAddress, stakingId, newLockTime, isWithdrawing, provider) {
  try {
    const poolContract = getContract(poolAddress, provider);
    const tx = await poolContract.unlockToken(stakingId, newLockTime, isWithdrawing);
    const receipt = await tx.wait(1);
    if (receipt.confirmations) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function addReward(poolAddress, r_address, account, amount, provider) {
  try {
    const poolContract = getContract(poolAddress, provider);
    const rTokenContract = getERC20ContractObj(r_address, provider);
    const _rDecimals = await rTokenContract.decimals();
    let isApproved = await isTokenApprovedForPool(poolAddress, r_address, account, amount, provider);
    if (!isApproved) isApproved = await approveTokenForPool(poolAddress, r_address, provider);
    if (isApproved) {
      const tx = await poolContract.addReward(ethers.utils.parseUnits(amount.toString(), _rDecimals));
      const receipt = await tx.wait(1);
      if (receipt.confirmations) {
        return true;
      }
    }
    
    return false;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function onMoreHours(hours_, chainId, provider) {
  const factoryContract = getContractObj("PixiaAiPoolFactory", chainId, provider);
  try {
    const tx = await factoryContract.buyCredits(hours_, {
      value: ethers.utils.parseEther((chainId === Networks.BSC_Testnet || chainId === Networks.BSC_Mainnet) ? (hours_ * 0.005).toString()
        : (hours_ * 0.005).toString())
    });
    const receipt = await tx.wait(1);
    if (receipt.confirmations) {
      return true;
    }
    return false;
  } catch (e) {
    toast.error(JSON.parse(JSON.stringify(e))["reason"]);
    return false;
  }
}

export async function getPoolInfo(pool, account, chainId) {
  try {
    //account = "0xe9bAc2c7d0cbcA263690C5d3FcFEb3f63c7946C5";
    const jsonProvider = new ethers.providers.JsonRpcProvider(networks[chainId].NODES);
    const sTokenContract = getERC20ContractObj(pool.s_address, jsonProvider);
    const _sDecimals = await sTokenContract.decimals();
    const rTokenContract = getERC20ContractObj(pool.r_address, jsonProvider);
    const _rDecimals = await rTokenContract.decimals();
    const poolContract = getContract(pool.address, jsonProvider);
    const [tStakedSupply, startAt, nftMultiplier, maxLockTime, stakingIds, _emission] = await Promise.all([
      poolContract.stakedSupply(),
      poolContract.startAt(),
      poolContract.nftMultiplier(),
      poolContract.maxLockTime(),
      poolContract.viewUserInfo(account),
      poolContract.emission()
    ]);
    const stakingInfos = [];
    let mStakedAmount = 0;
    let myReward = 0;
    for (const stakingId of stakingIds) {
      const _stakingInfo = await poolContract.viewStakingInfo(stakingId);
      const stakingInfo = { ..._stakingInfo }
      stakingInfo.stakingId = stakingId;
      stakingInfo.tokenAmount = parseFloat(ethers.utils.formatUnits(_stakingInfo.tokenAmount.toString(), _sDecimals));
      mStakedAmount += stakingInfo.tokenAmount;
      stakingInfo.lastDepositAt = _stakingInfo.lastDepositAt.toNumber();
      stakingInfo.lockTime = _stakingInfo.lockTime.toNumber();
      stakingInfo.rewardAmount = await poolContract['pendingReward(bytes32)'](stakingId);
      stakingInfo.rewardAmount = parseFloat(ethers.utils.formatUnits(stakingInfo.rewardAmount.toString(), _rDecimals));;
      myReward += stakingInfo.rewardAmount;
      stakingInfos.push(stakingInfo);
    }
    const emission = parseFloat(ethers.utils.formatUnits(_emission, _rDecimals));
    console.log(emission);
    pool.tStakedSupply = parseFloat(ethers.utils.formatUnits(tStakedSupply, _sDecimals));
    pool.rewardSupply = (emission * (Date.now() / 1000 - startAt));
    //pool.rewardSupply = 0;
    pool.nftMultiplier = nftMultiplier / 100;
    pool.maxLockTime = maxLockTime.toNumber() / 24 / 3600;
    pool.stakingInfos = stakingInfos;
    pool.myReward = myReward;
    pool.myStakedAmount = mStakedAmount;
    pool.apr = pool.tStakedSupply === 0 ? 0 : emission * (365 * 24 * 3600) * pool.r_price / (pool.tStakedSupply * pool.s_price);
    pool.myapr = pool.myStakedAmount === 0 ? 0 : emission * (365 * 24 * 3600) * pool.r_price / (pool.myStakedAmount * pool.s_price);
    console.log(pool);
    //pool.apr = emission * seconds_per_year * reward token price / (total staked token amount * staking token price)
    return pool;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}

export async function getPixiaPoolInfo(pool, account, chainId) {
  try {
    const jsonProvider = new ethers.providers.JsonRpcProvider(networks[chainId].NODES);
    const sTokenContract = getERC20ContractObj(pool.s_address, jsonProvider);
    const _sDecimals = await sTokenContract.decimals();
    const rTokenContract = getERC20ContractObj(pool.r_address, jsonProvider);
    const _rDecimals = await rTokenContract.decimals();
    const poolContract = getContract(pool.address, jsonProvider);
    const stakingIds = await poolContract.viewUserInfo(account);
    let stakingInfo: any;
    if (stakingIds && stakingIds.length > 0) {
      const lastStakingId = stakingIds[stakingIds.length - 1];
      const _stakingInfo = await poolContract.viewStakingInfo(lastStakingId);
      stakingInfo = { ..._stakingInfo }
      stakingInfo.stakingId = lastStakingId;
      stakingInfo.tokenAmount = parseFloat(ethers.utils.formatUnits(_stakingInfo.tokenAmount.toString(), _sDecimals));
      stakingInfo.boostedAmount = parseFloat(ethers.utils.formatUnits(_stakingInfo.boostedAmount.toString(), _sDecimals));;
      stakingInfo.lastDepositAt = _stakingInfo.lastDepositAt.toNumber();
      stakingInfo.lockTime = _stakingInfo.lockTime.toNumber();
      stakingInfo.rewardAmount = await poolContract['pendingReward(bytes32)'](lastStakingId);
      stakingInfo.rewardAmount = parseFloat(ethers.utils.formatUnits(stakingInfo.rewardAmount.toString(), _rDecimals));;
    }
    pool.stakingInfo = stakingInfo;
    console.log(pool);
    return pool;
  } catch (e) {
    console.log(e);
    const revertMsg = JSON.parse(JSON.stringify(e))["reason"];
    if (revertMsg) toast.error(revertMsg.replace("execution reverted: ", ""));
    return false;
  }
}
//Pool Factory Management

/**
 * createNewPool(plan, numbers, emission, addresses, chainId, provider)
 * plan: 0-> Free, 1-> Paid
 * numbers: Packed value of startTime, endTime, maxLockTime, nftMultiplier and maxLockMultiplier
    /// startTime_ Pool reward distribution start time (reward is calculated from this time)
    /// endTime_ Pool reward distribution end time
    /// nftMultiplier_ Nft boost multiplier
    /// maxLockTime_ Max lock timeline
    /// maxLockMultiplier_ Max lock boost multiplier
    /// earlyWithdrawFee - Early Withdraw Fee
    const numbers = (startAt << 192) |
            (endAt << 128) |
            (maxLockTime << 64) |
            (nftMultiplier << 48) |
            (maxLockMultiplier << 16) |
            earlyWithdrawFee;
 * early_period_ Early Withdraw Time
 * addresses encodePacked bytes of stakingToken, rewardToken, boostingNft and admin account
    /// stakingToken_: Staking token address (ETH is supported, address(0) means ETH)
    /// rewardToken_: Reward token address (ETH is supported, address(0) means ETH)
    /// boostingNft_: Boosting Nft collection address
    /// dexRouter_: Dex router address for the commission fee swap
    /// commissionToken_: Commission token to get paid
    /// treasury_: Pool treasury address
    /// admin_: Pool admin address
    ethers.utils.solidityPack(
      ["address", "address", "address", "address", "address", "address", "address"], 
      [stakingToken, rewardToken, boostingNFT, dexRouter, commissionToken, treasury, admin])
  * emission Reward amount per second
*/
export async function createNewPool(plan, numbers, early_period, emission, addresses, chainId, provider) {
  const factoryContract = getContractObj("PixiaAiPoolFactory", chainId, provider);
  const factoryContractInfo = getContractInfo("PixiaAiPoolFactory", chainId);
  try {
    console.log(plan, numbers, early_period, emission, addresses);
    const tx = await factoryContract.deployPool(plan, numbers, early_period, emission, addresses, {
      value: ethers.utils.parseEther(plan === 0 ? "0" : (chainId === Networks.BSC_Testnet || chainId === Networks.ETH_TestNet) ? "0.01" :
        chainId === Networks.BSC_Mainnet ? "15" : "3")
    });
    const receipt = await tx.wait(2);
    if (receipt.confirmations) {
      const interf = new ethers.utils.Interface(factoryContractInfo.abi);
      const logs = receipt.logs;
      let poolAddress = "";
      for (let index = 0; index < logs.length; index++) {
        const log = logs[index];
        if (factoryContractInfo.address?.toLowerCase() === log.address?.toLowerCase()) {
          console.log(log);
          poolAddress = interf.parseLog(log).args.pool?.toLowerCase();
          return poolAddress;
        }
      }
    }
    return false;
  } catch (e) {
    toast.error(JSON.parse(JSON.stringify(e))["reason"]);
    return false;
  }
}