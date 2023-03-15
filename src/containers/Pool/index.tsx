import "../../custom.d.ts"
import { useStyles } from './style';
import { useContext, useEffect, useState } from 'react';
import Modal from 'components/modal';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { toast } from 'react-toastify';
import ThemeContext from "theme/ThemeContext"
import { ethers } from 'ethers';
import { addReward, createNewPool, getBalanceOf, getPoolInfo, harvest, isAddress, stakeBoostNFT, stakeToken, unlockToken, unstakeToken } from 'utils/contracts';
import axios from 'axios';
import MyTooltip from 'components/Widgets/MyTooltip';
import moment from 'moment';
import { useHistory } from "react-router-dom";

const Miner = () => {
  const classes = useStyles();
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const { loginStatus, chainId, account, library } = useContext(Web3WalletContext)

  // Variables that are used for this farm.
  const [items, setItems] = useState([]);
  const [pools, setPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [switchStake, setSwitchStake] = useState(0);
  const [selectedStakingInfo, setSelectedStakingInfo] = useState(undefined);
  const [wooAddress, setWooAddress] = useState("");

  const handleSelectChange = (event) => {
    if (selectedPool && event.target.value.length !== 0) {
      const _stakingInfo = selectedPool.stakingInfos.filter((info) => info.stakingId === event.target.value);
      setSelectedStakingInfo(_stakingInfo[0]);
    }
  };

  const [createCustomModal, setCreateCustomModal] = useState(false);
  const [wooModal, setWooModal] = useState(false);
  const [boostModal, setBoostModal] = useState(false);
  const [processingModal, setProcessingModal] = useState(false);
  const [successTrans, setSuccessTrans] = useState(false);

  const [stakeModal, setStakeModal] = useState(false);//Staking
  const [amount, setAmount] = useState(0); //Staking
  const [progress1, setProgress1] = useState(50); //Staking

  const [withdrawModal, setWithdrawModal] = useState(0);//Withdraw
  const [amountWithdraw, setAmountWithdraw] = useState(0); //Withdraw
  const [progress2, setProgress2] = useState(50); //Withdraw

  const [rewardModal, setRewardModal] = useState(false);//Add Reward
  const [amountReward, setAmountReward] = useState(0); //Add Reward
  const [progress3, setProgress3] = useState(50); //Add Reward


  useEffect(() => {
    if (loginStatus && account) {
      fetchPools();
      fetchItems();
    }
  }, [loginStatus, account])


  //Stake Progress
  const [balanceOfToken, setBalanceOfToken] = useState(0);
  const [balanceOfRToken, setBalanceOfRToken] = useState(0);
  const getBalanceOfToken = async () => {
    if (selectedPool) {
      const sBalance = await getBalanceOf(selectedPool.s_address, chainId, account);
      setBalanceOfToken(sBalance);
      const rBalance = await getBalanceOf(selectedPool.r_address, chainId, account);
      setBalanceOfRToken(rBalance);
    }
  }

  useEffect(() => {
    if (loginStatus && account && selectedPool) {
      getBalanceOfToken();
    }
  }, [loginStatus, account, selectedPool])

  const onChangeVal = async (e: any) => {
    if (e.target.value === null || e.target.value === '') {
      setAmount(0);
    } else {
      setAmount(parseFloat(e.target.value));
    }
  }
  useEffect(() => {
    if (progress1 >= 0 && stakeModal) {
      setAmount(balanceOfToken * progress1 / 100);
    }
  }, [progress1, stakeModal, balanceOfToken])
  const onMax = async () => {
    setProgress1(100);
  }

  //Withdraw Progress
  const onChangeWithdrawVal = async (e: any) => {
    if (e.target.value === null || e.target.value === '') {
      setAmountWithdraw(0);
    } else {
      setAmountWithdraw(parseFloat(e.target.value));
    }
  }
  useEffect(() => {
    if (progress2 >= 0 && withdrawModal === 1 && selectedStakingInfo) {
      setAmountWithdraw(selectedStakingInfo.tokenAmount * progress2 / 100);
    }
  }, [progress2, withdrawModal, selectedStakingInfo])
  const onMaxWithDraw = async () => {
    setProgress2(100);
  }

  //Add Reward Progress
  const onChangeReward = async (e: any) => {
    if (e.target.value === null || e.target.value === '') {
      setAmountReward(0);
    } else {
      setAmountReward(parseFloat(e.target.value));
    }
  }
  useEffect(() => {
    if (progress3 >= 0 && rewardModal) {
      setAmountReward(balanceOfRToken * progress3 / 100);
    }
  }, [progress3, rewardModal, balanceOfRToken])
  const onMaxReward = async () => {
    setProgress3(100);
  }

  const [lockDays, setLockDays] = useState(0);

  const fetchItems = async () => {
    let paramsData = {
      owner: account.toLowerCase()
    }
    axios.get("/api/item", { params: paramsData })
      .then((res) => {
        if (res.data.status) {
          setItems(res.data.items);
        }
      }).catch((e) => {
        console.log(e);
        toast.error("The error is occured from the server.")
      })
  }


  useEffect(() => {
    if (loginStatus && account && items.length > 0 && pools.length > 0) {
      for (const pool of pools) {
        pool.stakedItems = items.filter((item) => pool.tokenIds.include(item.tokenId))
        pool.unstakedItems = items.filter((item) => !pool.tokenIds.include(item.tokenId))
      }
    }
  }, [loginStatus, account, items, pools])

  const fetchPools = async () => {
    let paramsData = {

    };
    axios.get('/api/pool', { params: paramsData })
      .then((res) => {
        if (res.data.status) {
          const _pools = [];
          for (const pool of res.data.pools) {
            pool.isUp = false;
            _pools.push(pool);
          }
          setPools(_pools);
          getPoolInfos(_pools);
        }
      }).catch((e) => {
        console.log(e);
        toast.error("The error is occured from the server.")
      })
  }

  const getPoolInfos = async (pools_) => {
    const _pools = [];
    for (const pool of pools_) {
      const _pool = await getPoolInfo(pool, account, chainId);
      if (_pool) _pools.push(_pool);
    }
    setPools([..._pools]);
  }

  const onSyncPool = async (pool_) => {
    const _pools = [];
    for (const pool of pools) {
      if (pool.address === pool_.address) {
        const _pool = await getPoolInfo(pool, account, chainId);
        if (_pool) _pools.push(_pool);
      } else _pools.push(pool);
    }
    setPools([..._pools]);
    setSelectedPool(undefined);
    setSelectedStakingInfo(undefined);
    setAmount(0);
    setLockDays(0);
  }

  const onUpdatePoolExpand = async (pool_) => {
    const _pools = [];
    for (const pool of pools) {
      if (pool.address === pool_.address) _pools.push(pool_);
      else _pools.push(pool);
    }
    setPools([..._pools]);
  }

  //-------------NFT Boost Part-----------------------// By God Crypto

  const onStakeBoostNFT = async (isStake, stakingId, nftIds) => {
    try {
      if (nftIds.length <= 0) return;
      setProcessingModal(true);
      const isBoosted = await stakeBoostNFT(isStake, selectedPool?.address, stakingId, nftIds, library.getSigner());
      if (isBoosted) {
        toast.success("Boosted Successfully");
        onSyncPool(selectedPool);
        setSuccessTrans(true);
      } else {
        toast.error("NFT Boosting is failed")
        setProcessingModal(false)
      }

    } catch (e) {
      console.log(e);
      toast.error("Boosting is failed");
      setProcessingModal(false)
    }
  }
  //-------------NFT Boost Part End-----------------------// By God Crypto

  //-------------Token Staking Part-----------------------// By God Crypto

  const onStakeToken = async () => {
    try {
      if (lockDays < 0) return toast.error("The lock date could not be 0.")
      if (amount <= 0) return toast.error("The amount could not be 0 or less.")

      setProcessingModal(true)
      const isStaked = await stakeToken(selectedPool?.address, selectedPool?.s_address, amount, lockDays, account, library.getSigner());
      if (isStaked) {
        toast.success("Staked Successfully");
        setStakeModal(false);
        onSyncPool(selectedPool);
        setSuccessTrans(true);
      } else {
        toast.error("Staking Token is failed")
        setProcessingModal(false)
      }
    } catch (e) {
      console.log(e);
      toast.error("Staking is failed");
      setProcessingModal(false)
    }
  }
  //-------------Token Staking Part End-----------------------// By God Crypto

  const onHarvest = async (pool) => {
    try {
      if (!loginStatus || !account) {
        return toast.error("Connect your wallet.");
      }
      setProcessingModal(true)
      const isHarvested = await harvest(pool.address, library.getSigner())
      if (isHarvested) {
        toast.success("Cashed out successfully.")
        onSyncPool(pool)
        setSuccessTrans(true);
      } else {
        toast.error("Harvesting is failed.");
        setProcessingModal(false)
      }
    } catch (e) {
      console.log(e);
      toast.error("Cash Out is failed")
      setProcessingModal(false)
    }
  }

  const onUnLockToken = async (withdrawMode) => { // 0: withdraw, 1: release, 2: relock
    try {
      if (selectedStakingInfo && selectedPool) {
        setProcessingModal(true)
        const isUnlocked = selectedStakingInfo.lockTime > 0 ? await unlockToken(
          selectedPool.address,
          selectedStakingInfo.stakingId,
          withdrawMode === 2 ? selectedStakingInfo.lockTime : 0,
          withdrawMode === 1,
          library.getSigner()
        ) : await unstakeToken(
          amountWithdraw,
          selectedPool.address,
          selectedPool.s_address,
          library.getSigner()
        );
        if (isUnlocked) {
          toast.success("Success");
          onSyncPool(selectedPool);
          setSuccessTrans(true);
        } else {
          toast.error("Your transaction is failed");
          setProcessingModal(false)
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("The action is failed");
      setProcessingModal(false)
    }
  }

  const onAddReward = async () => {
    try {
      if (selectedPool) {
        setProcessingModal(true)
        const isAdded = await addReward(selectedPool.address, selectedPool.r_address, amountReward, library.getSigner());
        if (isAdded) {
          toast.success("Added The Reward Successfully");
          setSuccessTrans(true);
        } else {
          toast.error("Not added the reward for some reasons.")
          setProcessingModal(false);
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Adding Reward is failed");
      setProcessingModal(false);
    }
  }

  //-------------Create Pool-----------------------// By God Crypto

  const [stakingToken, setStakingToken] = useState("0x60d4db9b534ef9260a88b0bed6c486fe13e604fc")
  const [rewardToken, setRewardToken] = useState("0x60d4db9b534ef9260a88b0bed6c486fe13e604fc")
  const [emission, setEmission] = useState(0.001)
  const [maxLockTime, setMaxLockTime] = useState(360);
  const [maxLockMultiplier, setMaxLockMultiplier] = useState(12);
  const [earlyWithdrawFee, setEarlyWithdrawFee] = useState(3)
  const [early_period, setEarlyPeriod] = useState(3)
  const [boostingNft, setBoostingNft] = useState("0x74841159b1721E9EBd3d822254c1Fb56dd5cc091")
  const [nftMultiplier, setNftMultiplier] = useState(1)

  const onCreatePool = async (creationPlan) => {
    if (!stakingToken || !rewardToken || !emission || !maxLockTime || !maxLockMultiplier || !earlyWithdrawFee || !early_period || !boostingNft || !nftMultiplier)
      return toast.error("Fill out all fields");
    if (stakingToken.length === 0 || rewardToken.length === 0 || boostingNft.length === 0) {
      return toast.error("Contract Address should not be empty.")
    }
    if (emission <= 0 || maxLockTime <= 0 || maxLockMultiplier <= 0 || earlyWithdrawFee <= 0 || early_period <= 0 || nftMultiplier <= 0) {
      return toast.error("The constants should not be more than 0.")
    }

    try {
      setProcessingModal(true)
      const startTime = Math.floor(Date.now() / 1000) + 3000;
      const endTime = startTime + 10 * 365 * 24 * 60 * 60; //startTime + 10 years
      //Keep above startTime and endTime, these 2 values are not got from frontend.
      const _maxLockTime = Math.floor(maxLockTime * 24 * 3600); //Max Lock Period(Days)
      const _nftMultiplier = nftMultiplier * 100; //NFT Booster Max Multiplier 1 = 100 / 100
      const _maxLockMultiplier = maxLockMultiplier * 10000;//Max Lock Multiplier 12 = 120000 / 10000
      const _earlyWithdrawFee = earlyWithdrawFee * 100; // Cooldown Fee 3 = 300 / 100
      const numbers = (BigInt(startTime) << BigInt(192)) |
        (BigInt(endTime) << BigInt(128)) |
        (BigInt(_maxLockTime) << BigInt(64)) |
        (BigInt(_nftMultiplier) << BigInt(48)) |
        (BigInt(_maxLockMultiplier) << BigInt(16)) |
        BigInt(_earlyWithdrawFee);
      console.log(numbers);
      const _early_period = early_period * 24 * 3600; //3 days
      // const stakingToken = "0x60d4db9b534ef9260a88b0bed6c486fe13e604fc"; //Deposit Token Smart Contract
      // const rewardToken = "0x60d4db9b534ef9260a88b0bed6c486fe13e604fc"; // Reward Token Smart Contract
      // const boostingNft = "0x74841159b1721E9EBd3d822254c1Fb56dd5cc091"; //NFT Collection Smart Contract
      const dexRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; //Don't change this address;
      const commissionToken = ethers.constants.AddressZero; //Don't change this address
      const treasury = account; // Treasury Address
      const admin = account; //Pool Address
      const addresses = ethers.utils.solidityPack(
        ["address", "address", "address", "address", "address", "address", "address"],
        [stakingToken, rewardToken, boostingNft, dexRouter, commissionToken, treasury, admin])
      console.log(addresses);
      const _emission = emission + ""; //Emission 0.01 ether
      const tokenAddresses = [stakingToken, rewardToken];
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&contract_addresses=${tokenAddresses.join(",")}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

      const tokenResponse = await axios.get(url);
      const tokenInfos = tokenResponse.data;
      if (tokenInfos.length <= 0) {
        toast.error("Your Staking Token has not marketed on CoinGecKo MarketCap");
        return;
      }
      console.log(tokenInfos);
      const sSymbol = tokenInfos[0].symbol.toUpperCase();
      const sPrice = tokenInfos[0].current_price;
      const sImage = tokenInfos[0].image;
      let rSymbol = "", rPrice = 0, rImage = "";
      if (stakingToken.toLowerCase() !== rewardToken.toLowerCase() && tokenInfos.length === 2) {
        rSymbol = tokenInfos[1].symbol.toUpperCase();
        rPrice = tokenInfos[1].current_price;
        rImage = tokenInfos[1].image;
      } else if (stakingToken.toLowerCase() === rewardToken.toLowerCase() && tokenInfos.length === 1) {
        rSymbol = sSymbol;
        rPrice = sPrice;
        rImage = sImage;
      } else {
        toast.error("Your Reward Token has not marketed on CoinGecko MarketCap");
        return;
      }
      console.log(sSymbol, sPrice, sImage, rSymbol, rPrice, rImage);

      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const nftResult = await provider.getCode(boostingNft);
      if (nftResult === '0x') {
        toast.error("Contract does not exist");
        return;
      }
      const poolAddress = await createNewPool(creationPlan, numbers, _early_period, ethers.utils.parseEther(_emission), addresses, chainId, library.getSigner())
      //const poolAddress = "0xb117330d04a008f5dec5e195124f70590eb9d737";
      console.log(poolAddress);
      if (poolAddress) {
        let paramsData = {
          address: poolAddress.toLowerCase(),
          owner: account.toLowerCase(),
          s_address: stakingToken.toLowerCase(),
          s_symbol: sSymbol,
          s_price: sPrice,
          s_image: sImage,
          r_address: rewardToken.toLowerCase(),
          r_symbol: sSymbol,
          r_price: rPrice,
          r_image: sImage,
          nft_address: boostingNft.toLowerCase(),
          start_time: startTime.toString(),
          end_time: endTime.toString()
        }
        axios.post("/api/pool/update", paramsData)
          .then((res) => {
            if (res.data.status) {
              const _pools = [];
              for (const pool of res.data.pools) {
                pool.isUp = false;
                _pools.push(pool);
              }
              setPools(_pools);
              setWooAddress(poolAddress);
              setSuccessTrans(true);
            }
          }).catch((err) => {
            console.log(err);

            setProcessingModal(false)
            toast.error(err.message);
          })
      } else {
        setProcessingModal(false)
        toast.error("Pool Creation Failed");
      }
    } catch (e) {
      console.log(e);
      toast.error("Pool Creation Failed");
      setProcessingModal(false)
    }
  }
  //-------------Create Pool End-----------------------// By God Crypto

  return (
    <>
      <div className={classes.root}>
        <div className={`${classes.content} mainContainer`}>
          <div className={classes.top}>
            <h1>Farms with NFT boosters</h1>
            <div className={classes.custom_pool_btn} role='button' onClick={() => setCreateCustomModal(true)}>
              <img src='assets/imgs/create-farm-icon.png' width={20} />
              <span>Create Your Custom Farm</span>
            </div>
          </div>
          {pools.map((pool, ind) => {
            return (
              <div className='stake_withdraw_body'>
                <div className={`${classes.stake_card} stake_card`}>
                  <div style={{ display: 'flex', cursor: 'pointer' }} onClick={() => { setRewardModal(true); setSelectedPool(pool) }}>
                    <img src={pool.s_image} height={60} />
                    <div style={{ marginLeft: 10 }}>
                      <h4>${pool.s_symbol}</h4>
                      <p>{pool?.tStakedSupply ? pool?.tStakedSupply.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}</p>
                      <span>{`≈ $${pool?.tStakedSupply ? (pool?.tStakedSupply * pool.s_price).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}`}</span>
                    </div>
                  </div>

                  <div style={{ padding: 6 }}>
                    <div style={{ display: 'flex' }}>
                      <h5>APR</h5>
                      {/* <MyTooltip
                        text={
                          <>
                            <p>First value is the average APR you get from your several lock periods.</p>
                            <p>Second Value is the max APR value the pool offers to stakers.</p>
                          </>}
                      /> */}
                    </div>
                    <p> {`${pool?.apr ? pool?.apr.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}%`}</p>
                  </div>
                  {/* <div>
                    <h5>Total NFT Staked</h5>
                    <h3>{`${pool?.tBoostedSupply ? pool?.tBoostedSupply : 0}`} </h3>
                  </div> */}
                  <div>
                    <h5>Total Earned ${pool.r_symbol}</h5>
                    <strong>{`${pool?.rewardSupply ? pool?.rewardSupply.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}`} </strong>
                    <span>{`≈ $${pool?.rewardSupply ? (pool?.rewardSupply * pool.r_price).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}`}</span>
                  </div>

                  {/* <div style={{ padding: 6 }}>
                    <h5>My NFT Boosters</h5>
                    <h3>{`${val.my_nft_booster}x`} </h3>
                  </div>

                  <div>
                    <h5>My Earned $ETH</h5>
                    <p>{val.my_earned_eth['val']}</p>
                    <span>{`≈ $${val.my_earned_eth['price']}`}</span>
                  </div> */}

                  <div style={{ paddingTop: 16 }} className='miner-stake-btns'>
                    <button className='boost' onClick={() => (setBoostModal(true), setSelectedPool(pool))}>Boost</button>
                    <button className='stake' onClick={() => (setStakeModal(true), setSelectedPool(pool))}>Stake</button>
                    <div onClick={() => { pool.isUp = !pool.isUp; onUpdatePoolExpand(pool) }} className='panelBtn'>
                      {pool.isUp ? <i className='fas fa-angle-up' /> : <i className='fas fa-angle-down' />}
                    </div>
                  </div>
                </div>

                <div className={pool.isUp ? `${classes.withdraw_card} accordion_panel_block` : `${classes.withdraw_card} accordion_panel_none`}>
                  <div>
                    <h5>My staked ${pool.s_symbol}</h5>
                    <p style={{ display: 'flex' }}>{!pool?.myStakedAmount ? 0 : pool?.myStakedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      <MyTooltip
                        text={
                          <>
                            {pool?.stakingInfos && pool?.stakingInfos.map((stakingInfo, idx) => {
                              return (
                                <p>
                                  {stakingInfo.tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  ${pool.s_symbol} -
                                  {stakingInfo.isLocked ? `Unlocks ${moment((stakingInfo?.lastDepositAt + stakingInfo?.lockTime) * 1000).format("MMM DD, YYYY")}` : "Unlockable now"}
                                </p>
                              )
                            })}
                          </>}
                      />
                    </p>
                    <span>{`≈ $${(pool?.myStakedAmount * pool.s_price).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}</span>
                  </div>

                  <div>
                    <h5>My Earned ${pool.r_symbol}</h5>
                    <h6>{!pool?.myReward ? 0 : pool?.myReward.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h6>
                    <span style={{ display: 'flex' }}>≈ ${pool?.myReward ? (pool?.myReward * pool.r_price).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}
                      <MyTooltip
                        text={
                          <>
                            {pool?.stakingInfos && pool?.stakingInfos.map((stakingInfo, idx) => {
                              return (
                                <p>
                                  {`${stakingInfo.rewardAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} 
                                  $${pool.r_symbol} - ${(stakingInfo.rewardAmount * pool.r_price).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                                </p>
                              )
                            })}
                          </>}
                      />
                    </span>
                  </div>
                  <div>
                    <h5 style={{ display: 'flex' }}>My NFT Boosters
                      <MyTooltip
                        text={
                          <>
                            <p>The max Multiplier effect for this pool is - x for the max lock period of - days.</p>
                            <p>The multiplier value is calculated proportionally to the max multiplier and lock period.</p>
                            <p>Multiplier values is multiplied for staking multiple NFTs on one lock period 2 NFTs -&gt; 2x Multiplier value, 3 NFTs -&gt; 3x Multiplier value, etc...</p>
                          </>}
                      />
                    </h5>
                    <div>
                      <span>{pool.tokenIds ? pool.tokenIds.length : 0}</span>
                      <div className={classes.img_list}>
                        {
                          pool?.tokenIds && pool?.stakedItems && pool?.stakedItems.map((item, idx) => {
                            return (
                              <img src={item.assetUrl} />
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                  <div className='miner-stake-btns'>
                    <button className='boost'
                      onClick={() => onHarvest(pool)}
                    >
                      Cash Out
                    </button>
                    {pool?.stakingInfos && pool?.stakingInfos.length > 0 && <button className='boost' onClick={() => { setWithdrawModal(2); setSelectedPool(pool) }}>Relock</button>}
                    {pool?.stakingInfos && pool?.stakingInfos.length > 0 && <button className='withdraw' onClick={() => { setWithdrawModal(1); setSelectedPool(pool); }}>Withdraw</button>}
                  </div>
                </div>
              </div>
            )
          })}
          <div className={classes.custom_create_btn} onClick={() => setCreateCustomModal(true)}>
            <img src='assets/imgs/create-farm-icon.png' />
            <span>Create Your Custom Farm</span>
          </div>
        </div>
      </div>

      <Modal
        show={stakeModal && selectedPool}
        maxWidth='md'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span>
                <img src='assets/imgs/farm-stake-avatar1.png' />
                <h2>Stake ${selectedPool?.s_symbol} in Farm</h2>
              </span>
            </div>
            <div className={classes.modalContent}>
              <h3 className='w-100 mt-2'>Enter ${selectedPool?.s_symbol} Amount to stake</h3>
              <span className='input-span'>
                <input type="number" onChange={e => onChangeVal(e)} placeholder={"Amount"}
                  value={amount === 0 ? "Amount" : amount}
                />
                <button onClick={onMax}>Max</button>
              </span>
              <h5>Balance : {balanceOfToken.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${selectedPool?.s_symbol}</h5>
              <div className={classes.progress}>
                <div className="line">
                  <div style={{ background: '#ef1ce3', width: `${progress1}%`, height: '100%' }}></div>
                </div>
                <div className="node" onClick={() => setProgress1(0)} style={{ background: progress1 < 0 ? '#fff' : '#ef1ce3' }}>
                  {progress1 > 0 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress1 === 0 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress1(25)} style={{ background: progress1 < 25 ? '#fff' : '#ef1ce3' }}>
                  {progress1 > 25 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress1 === 25 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress1(50)} style={{ background: progress1 < 50 ? '#fff' : '#ef1ce3' }}>
                  {progress1 > 50 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress1 === 50 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress1(75)} style={{ background: progress1 < 75 ? '#fff' : '#ef1ce3' }}>
                  {progress1 > 75 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress1 === 75 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress1(100)} style={{ background: progress1 < 100 ? '#fff' : '#ef1ce3' }}>
                  {progress1 > 100 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress1 === 100 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
              </div>

              <div className={classes.progress}>
                <div className="label">0%</div>
                <div className="label ml-10">25%</div>
                <div className="label ml-5">50%</div>
                <div className="label ml-5">75%</div>
                <div className="label">100%</div>
              </div>
              <br />


              <h3 className='w-100 mt-2'>Select your Lock Period (Days)</h3>
              <span className='input-span'>
                <input type="number" onChange={e => setLockDays(parseInt(e.target.value))} placeholder={"Lock Period (Days)"} value={lockDays} />
                <button onClick={() => setLockDays(selectedPool?.maxLockTime ? selectedPool.maxLockTime : 0)}>Max</button>
              </span>
              <h5>Max : {selectedPool?.maxLockTime ? selectedPool?.maxLockTime : 0} days</h5>
              {/* <div className={classes.progress}>
                <div className="line">
                  <div style={{ background: '#ef1ce3', width: `${progress2}%`, height: '100%' }}></div>
                </div>
                <div className="node" onClick={() => setProgress2(0)} style={{ background: progress2 < 0 ? '#fff' : '#ef1ce3' }}>
                  {progress2 > 0 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress2 === 0 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress2(25)} style={{ background: progress2 < 25 ? '#fff' : '#ef1ce3' }}>
                  {progress2 > 25 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress2 === 25 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress2(50)} style={{ background: progress2 < 50 ? '#fff' : '#ef1ce3' }}>
                  {progress2 > 50 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress2 === 50 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress2(75)} style={{ background: progress2 < 75 ? '#fff' : '#ef1ce3' }}>
                  {progress2 > 75 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress2 === 75 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress2(100)} style={{ background: progress2 < 100 ? '#fff' : '#ef1ce3' }}>
                  {progress2 > 100 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress2 === 100 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
              </div>

              <div className={classes.progress}>
                <div className="label">
                  <p>- 0 day</p>
                </div>
                <div className="label ml-10">
                  <p>- {} day</p>
                </div>
                <div className="label ml-5">
                  <p>- days</p>
                </div>
                <div className="label ml-5">
                  <p>- days</p>
                </div>
                <div className="label">
                  <p>- days</p>
                </div>
              </div> */}
              <br />
            </div>
            <div className={classes.modalBtns}>
              {/* <FilledButton label={'Cancel'} color='secondary' handleClick={() => setStakeModal(false)} />
              <FilledButton label={'Buy shares'} handleClick={onBuyShares} /> */}
              <button style={{
                padding: '5px', width: '50%', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center', cursor: 'pointer'
              }} onClick={() => {
                setStakeModal(false);
                setSelectedPool(undefined);
                setAmount(0);
                setLockDays(0);
              }} className="cancel-btn">Cancel</button>
              <button style={{
                padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center', cursor: 'pointer'
              }}
                onClick={() => onStakeToken()}
              >Stake</button>
            </div>
          </div>

        </>}
      />
      <Modal
        show={rewardModal && selectedPool}
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span className='topTitle'>
                <img src='assets/imgs/farm-stake-avatar1.png' />
                <div>
                  <h3>Add Rewards to ${selectedPool?.r_symbol} Pool</h3>
                </div>
              </span>
            </div>
            <div className={classes.modalContent}>
              <h3 className='w-100 mt-2'>Enter ${selectedPool?.r_symbol} Amount to withdraw</h3>
              <span className='input-span'>
                <input type="number" onChange={e => onChangeReward(e)} placeholder={"Amount"} value={amountReward === 0 ? "Amount" : amountReward} />
                <button onClick={onMaxReward}>Max</button>
              </span>
              <h5>Balance : {balanceOfRToken.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${selectedPool?.r_symbol}</h5>
              <div className={classes.progress}>
                <div className="line">
                  <div style={{ background: '#ef1ce3', width: `${progress3}%`, height: '100%' }}></div>
                </div>
                <div className="node" onClick={() => setProgress3(0)} style={{ background: progress3 < 0 ? '#fff' : '#ef1ce3' }}>
                  {progress3 > 0 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress3 === 0 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress3(25)} style={{ background: progress3 < 25 ? '#fff' : '#ef1ce3' }}>
                  {progress3 > 25 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress3 === 25 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress3(50)} style={{ background: progress3 < 50 ? '#fff' : '#ef1ce3' }}>
                  {progress3 > 50 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress3 === 50 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress3(75)} style={{ background: progress3 < 75 ? '#fff' : '#ef1ce3' }}>
                  {progress3 > 75 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress3 === 75 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress3(100)} style={{ background: progress3 < 100 ? '#fff' : '#ef1ce3' }}>
                  {progress3 > 100 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress3 === 100 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
              </div>

              <div className={classes.progress}>
                <div className="label">0%</div>
                <div className="label ml-10">25%</div>
                <div className="label ml-5">50%</div>
                <div className="label ml-5">75%</div>
                <div className="label">100%</div>
              </div>
              <br />
            </div>
            <div className={classes.modalBtns}>
              <button style={{
                padding: '5px', width: '50%', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center', cursor: 'pointer'
              }} onClick={() => {
                setRewardModal(false);
                setSelectedPool(undefined);
              }} className="cancel-btn">Cancel</button>
              <button style={{
                padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center', cursor: 'pointer'
              }}
                onClick={() => onAddReward()}
              >Add Rewards</button>
            </div>
          </div>

        </>}
      />
      <Modal
        show={withdrawModal === 1 && selectedPool}
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span className='topTitle'>
                <img src='assets/imgs/farm-stake-avatar1.png' />
                <div>
                  <h3>Withdraw from ${selectedPool?.s_symbol} in Pool</h3>
                  <p>{!selectedPool?.myStakedAmount ? 0 : selectedPool?.myStakedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${selectedPool?.s_symbol} Staked</p>
                </div>
              </span>
            </div>
            <div className={classes.modalContent}>
              <h3 className='w-100 mt-2'>Select lock</h3>
              <select className={classes.lockSelect} value={selectedStakingInfo?.stakingId} onChange={handleSelectChange}>
                <option value="">Select One Option</option>
                {
                  selectedPool?.stakingInfos && selectedPool?.stakingInfos
                    .filter((stakingInfo) => !stakingInfo.isLocked || stakingInfo.lockTime === 0)
                    .map((stakingInfo, idx) => {
                      return (
                        <option value={stakingInfo.stakingId}>{
                          `${stakingInfo.tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} $${selectedPool?.s_symbol} - 
                        ${!stakingInfo.isLocked ? "Unlockable now" : "Unlocks " + moment((stakingInfo?.lastDepositAt + stakingInfo?.lockTime) * 1000).format("MMM DD, YYYY")}`
                        }</option>
                      )
                    })
                }
              </select>
              {
                selectedStakingInfo && selectedStakingInfo?.lockTime === 0 && <>

                  <h3 className='w-100 mt-2'>Enter ${selectedPool?.s_symbol} Amount to withdraw</h3>
                  <span className='input-span'>
                    <input type="number" onChange={e => onChangeWithdrawVal(e)} placeholder={"Amount"} value={amountWithdraw === 0 ? "Amount" : amountWithdraw} />
                    <button onClick={onMaxWithDraw}>Max</button>
                  </span>
                  <h5>Available : {selectedStakingInfo?.tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${selectedPool?.s_symbol}</h5>
                  <div className={classes.progress}>
                    <div className="line">
                      <div style={{ background: '#ef1ce3', width: `${progress2}%`, height: '100%' }}></div>
                    </div>
                    <div className="node" onClick={() => setProgress2(0)} style={{ background: progress2 < 0 ? '#fff' : '#ef1ce3' }}>
                      {progress2 > 0 ?
                        <img src="/assets/icons/check_icon.svg" alt="" /> :
                        <div className="circle" style={{ background: progress2 === 0 ? '#fff' : '#E0E0E7' }}></div>}
                    </div>
                    <div className="node" onClick={() => setProgress2(25)} style={{ background: progress2 < 25 ? '#fff' : '#ef1ce3' }}>
                      {progress2 > 25 ?
                        <img src="/assets/icons/check_icon.svg" alt="" /> :
                        <div className="circle" style={{ background: progress2 === 25 ? '#fff' : '#E0E0E7' }}></div>}
                    </div>
                    <div className="node" onClick={() => setProgress2(50)} style={{ background: progress2 < 50 ? '#fff' : '#ef1ce3' }}>
                      {progress2 > 50 ?
                        <img src="/assets/icons/check_icon.svg" alt="" /> :
                        <div className="circle" style={{ background: progress2 === 50 ? '#fff' : '#E0E0E7' }}></div>}
                    </div>
                    <div className="node" onClick={() => setProgress2(75)} style={{ background: progress2 < 75 ? '#fff' : '#ef1ce3' }}>
                      {progress2 > 75 ?
                        <img src="/assets/icons/check_icon.svg" alt="" /> :
                        <div className="circle" style={{ background: progress2 === 75 ? '#fff' : '#E0E0E7' }}></div>}
                    </div>
                    <div className="node" onClick={() => setProgress2(100)} style={{ background: progress2 < 100 ? '#fff' : '#ef1ce3' }}>
                      {progress2 > 100 ?
                        <img src="/assets/icons/check_icon.svg" alt="" /> :
                        <div className="circle" style={{ background: progress2 === 100 ? '#fff' : '#E0E0E7' }}></div>}
                    </div>
                  </div>

                  <div className={classes.progress}>
                    <div className="label">0%</div>
                    <div className="label ml-10">25%</div>
                    <div className="label ml-5">50%</div>
                    <div className="label ml-5">75%</div>
                    <div className="label">100%</div>
                  </div>
                </>
              }
              <br />
            </div>
            <div className={classes.modalBtns}>
              <button style={{
                padding: '5px', width: '50%', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center', cursor: 'pointer'
              }} onClick={() => {
                setWithdrawModal(0);
                setSelectedPool(undefined);
                setSelectedStakingInfo(undefined);
              }} className="cancel-btn">Cancel</button>
              <button style={{
                padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center', cursor: 'pointer'
              }}
                onClick={() => onUnLockToken(1)} //Withdraw Mode : 1
              >Withdraw</button>
            </div>
          </div>

        </>}
      />

      <Modal
        show={withdrawModal === 2 && selectedPool}
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span className='topTitle'>
                <img src='assets/imgs/farm-stake-avatar1.png' />
                <div>
                  <h3>Relock or Unlock </h3>
                  <h3>For ${selectedPool?.r_symbol} in Farm</h3>
                </div>
              </span>
            </div>
            <div className={classes.modalContent}>
              <h3 className='w-100 mt-2'>Select lock</h3>
              <select className={classes.lockSelect} value={selectedStakingInfo?.stakingId} onChange={handleSelectChange}>
                <option value="">Select One Option</option>
                {
                  selectedPool?.stakingInfos && selectedPool?.stakingInfos
                    .filter((stakingInfo) => stakingInfo.lockTime > 0)
                    .map((stakingInfo, idx) => {
                      return (
                        <option value={stakingInfo.stakingId}>{
                          `${stakingInfo.tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} $${selectedPool?.s_symbol} - 
                          ${!stakingInfo.isLocked ? "Unlockable now" : "Unlocks " + moment((stakingInfo?.lastDepositAt + stakingInfo?.lockTime) * 1000).format("MMM DD, YYYY")}`
                        }</option>
                      )
                    })
                }
              </select>
              <div className="warning">
                <img src="/assets/icons/warning_icon.png" alt="" />
                <p>When the lock period has ended, no more rewards are credited. Relock or Unlock to keep rewards flowing. Unlock corresponds to staking with no lock.</p>
              </div>
            </div>
            <div className={classes.modalBtns}>
              <button style={{
                padding: '5px', width: '50%', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center'
              }} onClick={() => {
                setWithdrawModal(0);
                setSelectedPool(undefined);
                setSelectedStakingInfo(undefined);
              }} className="cancel-btn">Cancel</button>
              {
                selectedStakingInfo && !selectedStakingInfo?.isLocked && selectedStakingInfo?.lockTime > 0 &&
                <button style={{
                  padding: '5px', width: '50%', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center'
                }} className="cancel-btn"
                  onClick={() => onUnLockToken(0)}
                >
                  Unlock
                </button>
              }
              {
                selectedStakingInfo && !selectedStakingInfo?.isLocked && selectedStakingInfo?.lockTime > 0 &&
                <button style={{
                  padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center'
                }}
                  onClick={() => onUnLockToken(2)}
                >
                  ReLock
                </button>
              }

            </div>
          </div>

        </>}
      />

      <Modal
        show={createCustomModal}
        maxWidth='sm'
        contentClass={classes.createModalRootContent}
        children={<>
          <div className={classes.createModal}>
            <div className={`${classes.createModalTop}`}>
              <span className='topTitle'>
                <div>
                  <h4>Create Your Custom Farm</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setCreateCustomModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={`${classes.createModalAddContent}`}>
              <div>
                <p style={{ display: 'flex' }}>Deposit Token Smart Contract
                  <MyTooltip
                    text={
                      <>
                        <p>Token Smart Contract to be used for staking.</p>
                      </>}
                  />
                </p>
                <input type="text" placeholder='0x0000dead' value={stakingToken} onChange={(e) => setStakingToken(e.target.value)} />
              </div>
              {/* <div style={{ position: 'relative' }}>
                <img src='assets/imgs/farm-stake-avatar1.png' width={50} style={{ position: 'absolute', top: 38, left: 8 }} />
                <p>Token image (Used To Stake)</p>
                <input type="text" placeholder='Token-picture.jpg 131KB' style={{ paddingLeft: 60 }} />
              </div> */}
              <div>
                <p style={{ display: 'flex' }}>Reward Token Smart Contract
                  <MyTooltip
                    text={
                      <>
                        <p>Token Smart Contract to be distributed as rewards.</p>
                      </>}
                  />
                </p>
                <input type="text" placeholder='0x0000dead' value={rewardToken} onChange={(e) => setRewardToken(e.target.value)} />
              </div>
              <div>
                <p style={{ display: 'flex' }}>Reward Amount per second (in ETH)
                  <MyTooltip
                    text={
                      <>
                        <p>Rewards to be allocated each second. Set a value in ETH.</p>
                      </>}
                  />
                </p>
                <input type="number" placeholder='0.001' value={emission} onChange={(e) => setEmission(parseFloat(e.target.value))} />
              </div>
              <div>
                <p style={{ display: 'flex' }}>Max Lock Period (Days)
                  <MyTooltip
                    text={
                      <>
                        <p>Stakers are able to choose a lock period from 0 days to Max days implemented here.</p>
                      </>}
                  />
                </p>
                <input type="number" placeholder='365' value={maxLockTime} onChange={(e) => setMaxLockTime(parseFloat(e.target.value))} />
              </div>
              <div>
                <p style={{ display: 'flex' }}>Max Lock Multiplier
                  <MyTooltip
                    text={
                      <>
                        <p>Lock Multiplier value  applies for the max lock period.</p>
                        <p>If the staker select a lesser period, the Lock Multiplier is calculated proportionally.</p>
                      </>}
                  />
                </p>
                <input type="number" placeholder='365' value={maxLockMultiplier} onChange={(e) => setMaxLockMultiplier(parseFloat(e.target.value))} />
              </div>
              <h3 style={{ color: '#eee !important', textAlign: 'left', width: '100%', marginTop: '15px', display: 'flex' }}>Cooldown
                <MyTooltip
                  text={
                    <>
                      <p>Cooldown is applied to Unlocked Staking Only. The fees are sent to the Cooldown wallet.</p>
                    </>}
                />
              </h3>
              <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'between' }}>
                <div style={{ width: '47.5%' }}>
                  <p>Early Withdraw Period (Days)</p>
                  <input type="number" placeholder='3' style={{ textAlign: 'center' }}
                    value={early_period} onChange={(e) => setEarlyPeriod(parseFloat(e.target.value))}
                  />
                </div>
                <div style={{ width: '47.5%' }}>
                  <p>Early Withdraw Fee (%)</p>
                  <input type="text" placeholder='120' style={{ textAlign: 'center' }}
                    value={earlyWithdrawFee} onChange={(e) => setEarlyWithdrawFee(parseFloat(e.target.value))}
                  />
                </div>
              </div>
              {/* <div>
                <p style={{ textAlign: 'center', maxWidth: '100%' }}>Cooldown wallet receiver
                </p>
                <input type="text" placeholder='0x0000dead' style={{ textAlign: 'center' }} />
              </div> */}
              <div>
                <p style={{ display: 'flex', }}>NFT Collection Smart Contract
                  <MyTooltip
                    text={
                      <>
                        <p>NFTs part of this collection  will be eligible for booster/multiplier to your pool.</p>
                      </>}
                  />
                </p >
                <input type="text" placeholder='0x0000dead' value={boostingNft} onChange={(e) => setBoostingNft(e.target.value)} />
              </div>
              <div>
                <p style={{ display: 'flex' }}>NFT Booster Max Multiplier
                  <MyTooltip
                    text={
                      <>
                        <p>NFT Multiplier value applies for staking an NFT.</p>
                        <p>NFT multiplier Formula:1 + ( Number of NFTs x NFT Multiplier)</p>
                        <p>Multiplier value includes one decimal, examples 0.2, 0.5, 1.3, etc...</p>
                      </>}
                  />
                </p >
                <input type="number" placeholder='365' value={nftMultiplier} onChange={(e) => setNftMultiplier(parseFloat(e.target.value))} />
              </div>
              <div className='btn-wrapper' style={{ display: 'flex' }}>
                <button onClick={() => onCreatePool(1)} className="cancel-btn">- 3 ETH Staking Pool
                  <span style={{ color: '#be16d2 !important', fontSize: 10, display: 'block' }}>No fees</span></button>
                <button className="stake-btn"
                  onClick={() => onCreatePool(0)}
                >Free Staking Pool <p style={{ color: 'white', fontSize: 10 }}>- 3% Fee on Rewards</p>
                </button>
              </div>
            </div >
          </div >
        </>}
      />

      <Modal
        show={wooModal}
        maxWidth='sm'
        contentClass={classes.wooModalRoot}
        children={<>
          <div className={classes.wooModal}>
            <div className={`${classes.wooModalTop}`}>
              <span className='topTitle'>
                <div>
                  <h4>Wooohoooo!</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setWooModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={`${classes.wooModalAddContent}`}>
              <div>
                <p style={{ display: 'flex' }}>Congrats, you just created your custom Staking Pool successfully!</p>
                <p style={{ display: 'flex' }}>Add reward tokens to the staking pool to start distributing rewards by clicking your logo on the farm page.</p>
                <p style={{ display: 'flex' }}>Make sure to exclude the staking smart contract from your custom token tax, max transaction and max wallet limits.</p>
              </div>
              {
                wooAddress && isAddress(wooAddress) &&
                <div className="address" onClick={() => navigator.clipboard.writeText(wooAddress)}>
                  <p>{wooAddress} <img src="/assets/icons/copy-icon.png" alt="" /></p>
                </div>
              }
              <div className='btn-wrapper' style={{ display: 'flex' }}>
                <button className="staking-btn" onClick={() => setWooModal(false)}>
                  Start Staking
                </button>
              </div>
            </div >
          </div >
        </>}
      />

      < Modal
        show={boostModal && selectedPool}
        maxWidth='sm'
        children={<>
          <div className={classes.boostModal}>
            <div className={classes.modalTop}>
              <span className='topTitle'>
                <img src="/assets/imgs/farm-stake-avatar1.png" alt="" />
                <div>
                  <h4>Withdraw from ${selectedPool?.r_symbol} in Farm</h4>
                  <span style={{ color: '#aaa', fontSize: 14 }}>
                    NFT Balance: {switchStake === 0 ?
                      (selectedPool?.stakedItems ? selectedPool?.stakedItems.length : 0) :
                      (selectedPool?.unstakedItems ? selectedPool?.unstakedItems.length : 0)
                    }
                  </span>
                </div>
                <div className="customSwitchText">
                  <div onClick={() => setSwitchStake(1)} className={`${switchStake === 1 && 'actived'}`}>
                    Stake
                  </div>
                  <div onClick={() => setSwitchStake(0)} className={`${switchStake === 0 && 'deactived'}`}>
                    Unstake
                  </div>
                </div>
              </span>
            </div>
            <div className={`${classes.modalContent} boostModalContent`}>
              {switchStake === 1 && <div className="warning">
                <img src="/assets/icons/warning_icon.png" alt="" />
                <p>
                  NFTs boosting effect applies to one lock.
                  First select the lock to associate your NFT with, then,
                  select the NFTs you want to stake/Unstake.
                </p>
              </div>}
              <h5 className='w-100 mt-2' style={{ textAlign: 'left' }}>Select lock</h5>
              <select className={classes.lockSelect} value={selectedStakingInfo?.stakingId} onChange={handleSelectChange}>
                <option value="">Select One Option</option>
                {
                  selectedPool?.stakingInfos && selectedPool?.stakingInfos.map((stakingInfo, idx) => {
                    return (
                      <option value={stakingInfo.stakingId}>{
                        `${stakingInfo.tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} $${selectedPool?.s_symbol} - 
                        ${!stakingInfo.isLocked ? "Unlockable now" : "Unlocks " + moment((stakingInfo?.lastDepositAt + stakingInfo?.lockTime) * 1000).format("MMM DD, YYYY")}`
                      }</option>
                    )
                  })
                }
              </select>
              <h5 className='w-100 mt-2' style={{ textAlign: 'left' }}>Select your NFTs</h5>
              <div className='img-group'>
                {
                  switchStake === 1 ? selectedPool?.unstakedItems && selectedPool?.unstakedItems
                    .map((item, idx) => {
                      return (
                        <img src={item?.assetUrl} />
                      )
                    }) : selectedPool?.stakedItems && selectedPool?.stakedItems
                      .filter((item) => item.tokenId)
                      .map((item, idx) => {
                        return (
                          <img src={item?.assetUrl} />
                        )
                      })
                }
              </div>
              <h5 className='w-100 mt-2' style={{ textAlign: 'left' }}>Updated Multiplier and APR</h5>
              <div className={`w-100 flex justify-between updated-multiplier`}>
                <div className='w-1/2'>
                  <p>New Multiplier</p>
                  <h6>{selectedPool?.nftMultiplier} x</h6>
                </div>
                <div className='w-1/2'>
                  <p>New APR</p>
                  <h6>{selectedPool?.apr} %</h6>
                </div>
              </div>
            </div>
            <div className={classes.modalBtns}>
              <button style={{
                padding: '5px', width: '50%',
                background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center', cursor: 'pointer'
              }} onClick={() => {
                setWithdrawModal(0);
                setBoostModal(false);
                setSelectedPool(undefined);
                setSelectedStakingInfo(undefined);
              }}
                className="cancel-btn">
                Cancel
              </button>
              <button style={{
                padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center', cursor: 'pointer'
              }}
                onClick={() => onStakeBoostNFT(switchStake === 1, selectedStakingInfo?.stakingId, [])}
              > {switchStake === 1 ? "Stake" : "Unstake"}</button>
            </div>
          </div>
        </>}
      />

      <Modal
        show={processingModal}
        contentClass={classes.processModalRoot}
        maxWidth='sm'
        children={<>
          <div className={classes.processModal}>
            {!successTrans
              ?
              <>
                <div className={classes.processModalTop}>
                  <span>
                    {theme === 'dark' ? <img src="/assets/imgs/logo.png" alt="" /> : <img src="/assets/logo.png" alt="" />}
                    <h4>Your transaction is beeing processed</h4>
                  </span>
                </div>
                <div className={classes.processModalContent}>
                  <span>
                    <img src="/assets/icons/2.png" alt="" />
                  </span>
                  <div className="warning">
                    <img src="/assets/icons/warning_icon.png" alt="" />
                    <p>Validate your transaction to continue.</p>
                  </div>
                </div>
              </>
              :
              <>
                <div className={classes.processModalTop}>
                  <span className='topTitle'>
                    <img src='assets/imgs/farm-stake-avatar1.png' />
                    <div>
                      <h3>Wooohoooo! </h3>
                    </div>
                  </span>
                  <button className="closeBtn" onClick={() => setProcessingModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
                </div>
                <p className="success-transaction">Your transaction was successful</p>
                <div className={classes.processModalContent}>
                  <div className={classes.modalBtns}>
                    <button style={{
                      padding: '5px', width: '50%',
                      background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center', cursor: 'pointer'
                    }} onClick={() => {
                      setSuccessTrans(false);
                      setProcessingModal(false);
                      history.push("/my_art");
                    }}
                      className="cancel-btn">
                      My Art
                    </button>
                    <button style={{
                      padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                      height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center', cursor: 'pointer'
                    }}
                      onClick={() => {
                        setSuccessTrans(false);
                        setProcessingModal(false);
                      }}
                    > Staking Pools </button>
                  </div>
                </div>
              </>
            }
          </div>
        </>}
      />
    </>
  );
};

export default Miner;
