import FilledButton from 'components/Buttons/FilledButton';
import "../../custom.d.ts"
import { useStyles } from './style';
import { useContext, useEffect, useState } from 'react';
import Expand from 'react-expand-animated';
import Modal from 'components/modal';
import Checkbox from '@mui/material/Checkbox';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { toast } from 'react-toastify';
import ThemeContext from "theme/ThemeContext"
import { BigNumber, ethers } from 'ethers';
import { createNewPool, getBalanceOfBNB, getBNBStakingInfo, getPoolInfo, isAddress, onInvest, onMyBuyShares, onSellShares, stakeBoostNFT, stakeToken } from 'utils/contracts';
import { BNBStakingInfo } from 'utils/types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import MyTooltip from 'components/Widgets/MyTooltip';
import CheckLock from 'components/Forms/CheckLock';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  width: 135,
  marginLeft: -15,
  height: 54,
  borderRadius: '20px !important',
  '& .MuiSwitch-switchBase': {
    marginTop: 10,
    padding: 0,
    transform: 'translateX(10px)',
    '&.Mui-checked': {
      value: 'sg',
      color: '#fff',
      transform: 'translateX(66px)',
      // '& .MuiSwitch-thumb:before': {
      //   background: `url('assets/icons/lock_icon.svg')`,
      //   backgroundRepeat: 'no-repeat'
      // },
      // '& + .MuiSwitch-track': {
      //   opacity: 1,
      //   backgroundColor: theme.palette.mode === 'dark' ? '#eee' : '#000',
      //   border: 'solid 1px #ef1ce3'
      // },
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 22,
    background: 'transparent !important',
    border: 'solid 1px #aaa',
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 21,
      height: 21,
    },
    // '&:before': {
    //   backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
    //     theme.palette.getContrastText(theme.palette.primary.main),
    //   )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
    //   left: 12,
    // },
    // '&:after': {
    //   backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
    //     theme.palette.getContrastText(theme.palette.primary.main),
    //   )}" d="M19,13H5V11H19V13Z" /></svg>')`,
    //   right: 12,
    // },
  },
  '& .MuiSwitch-thumb': {
    background: '#030316',
    border: 'solid 1px grey',
    boxShadow: 'none',
    width: 56,
    height: 31,
    margin: 2,
    borderRadius: '15px !important'
  },
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 37,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(8px)',
    '&.Mui-checked': {
      value: 'sg',
      color: '#fff',
      transform: 'translateX(32px)',
      '& .MuiSwitch-thumb:before': {
        background: `url('assets/icons/lock_icon.svg')`,
        backgroundRepeat: 'no-repeat'
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#eee' : '#000',
        border: 'solid 1px #ef1ce3'
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : 'transparent',
    width: 22,
    height: 14,
    marginTop: 8,
    boxShadow: 'none',
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 8,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      background: `url('assets/icons/unlock-icon.png')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#eee' : '#000',
    border: 'solid 1px #ef1ce3',
    borderRadius: 20 / 2,
  },
}));
const Miner = () => {
  const classes = useStyles();
  const { loginStatus, chainId, account, library } = useContext(Web3WalletContext)

  // Variables that are used for this farm.
  const [items, setItems] = useState([]);
  const [ stakedItems, setStakedItems] = useState([]);
  const [ unstakedItems, setUnStakedItems] = useState([]);
  const [pools, setPools] = useState([]);
  const [ selectedPool, setSelectedPool ] = useState(null);
  const [ switchStake, setSwitchStake ] = useState(0);
  //

  // const [minerList, setMinerList] = useState<number[]>([0]);
  const [minerList, setMinerList] = useState([{
    pixie: { val: 7836923.44, price: 15009 },
    apr: { data1: 12, data2: 44 },
    my_staked_pixie: { val: 7836923.44, price: 15009 },
    my_nft_booster: 150.09,
    my_earned_eth: { val: 0.15, price: 15009 },
    lock_state: false,
    totalNftStaked: 147,
    panel: false,
    my_nft_boosterimgs: ['img-list-item1.png', 'img-list-item2.png', 'img-list-item3.png', 'img-list-item1.png', 'img-list-item2.png'],
  },
  {
    pixie: { val: 7836923.44, price: 15009 },
    apr: { data1: 12, data2: 44 },
    my_staked_pixie: { val: 7836923.44, price: 15009 },
    my_nft_booster: 150.09,
    my_earned_eth: { val: 0.15, price: 15009 },
    lock_state: false,
    totalNftStaked: 147,
    panel: false,
    my_nft_boosterimgs: ['img-list-item1.png', 'img-list-item2.png', 'img-list-item3.png', 'img-list-item1.png', 'img-list-item2.png'],
  }
  ]);
  const [lock, onSelectChange] = useState('Select Lock');

  const handleSelectChange = (event) => {
    onSelectChange(event.target.value);
  };

  const [isFree, setFree] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(0);
  const [createCustomModal, setCreateCustomModal] = useState(false);
  const [boostModal, setBoostModal] = useState(false);

  const setPanel = (id) => {
    let ary = minerList
    ary[id].panel = !ary[id].panel
    setMinerList([...ary]);
  }
  const onAddMiner = () => {
    let alink = document.createElement('a');
    alink.href = "https://forms.gle/85zYBQ8dxiJyNq2D6";
    alink.setAttribute('target', '_blank');
    alink.click();
    //setMinerList(oldArray => [...oldArray, 0]);
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [boredMExpand, setBoredMExpand] = useState(false);
  const [minerExpand, setMinerExpand] = useState(false);

  const styles = {
    open: { width: '100%' },
    close: { width: '100%' },
  };
  const transitions = ['width', 'height', 'opacity', 'background'];

  const [stakeModal, setStakeModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [progress1, setProgress1] = useState(50);
  const [progress2, setProgress2] = useState(50);
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [bnbStakingInfo, setBNBStakingInfo] = useState<BNBStakingInfo>({
    balance: 0,
    myShares: 0,
    myEarnedBNB: 0,
  })
  const [bnbBalance, setBNBBalance] = useState(0);
  useEffect(() => {
    getPrices();
    onBNBStakingInfo();
  }, [loginStatus, account, chainId, library])

  const [ethPrice, setEthPrice] = useState(0);
  const [boredmPrice, setBoredMPrice] = useState(0);
  const getPrices = async () => {
    axios.get("/api/getrates")
      .then((res) => {
        setEthPrice(res.data.eth);
        setBoredMPrice(res.data.boredm)
      }).catch((err) => {
        console.log(err);
      })
  }

  const onBNBStakingInfo = async () => {
    const _info = await getBNBStakingInfo(account);
    if (_info) setBNBStakingInfo(_info);
  }

  const getBNBBalance = async () => {
    const bnbBalance = await getBalanceOfBNB(library, account);
    setBNBBalance(bnbBalance);
  }

  const onHarvest = async () => {
    if (loginStatus) {
      const toast_load_id = toast.loading("Claiming...");
      const isStaked = await onSellShares(chainId, library.getSigner());
      toast.dismiss(toast_load_id);
      if (isStaked) {
        toast.success("Bought " + amount + " Successfully.")
        onCancelBuyShares();
        onBNBStakingInfo();
      }
    }
  }

  const onTokenInvest = async () => {
    if (loginStatus) {
      const toast_load_id = toast.loading("Investing...");
      const isStaked = await onInvest(ethers.constants.AddressZero, chainId, library.getSigner());
      toast.dismiss(toast_load_id);
      if (isStaked) {
        toast.success("Bought " + amount + " Successfully.")
        onCancelBuyShares();
        onBNBStakingInfo();
      }
    }
  }

  const onBuyShares = async () => {
    if (loginStatus) {
      const toast_load_id = toast.loading("Staking...");
      const isStaked = await onMyBuyShares(ethers.constants.AddressZero, amount, chainId, library.getSigner());
      //const isStaked = await onMyBuyShares(account.toLowerCase(), chainId, library.getSigner());
      toast.dismiss(toast_load_id);
      if (isStaked) {
        toast.success("Bought " + amount + " BNB Successfully.")
        onCancelBuyShares();
        onBNBStakingInfo();
      }
    }
  }
  const onCancelBuyShares = () => {
    setProgress1(50);
    setStakeModal(false);
  }

  useEffect(() => {
    if (loginStatus && stakeModal) {
      getBNBBalance();
    }
  }, [loginStatus, stakeModal])

  const onChangeVal = async (e: any) => {
    if (e.target.value === null || e.target.value === '') {
      setAmount(0);
    } else {
      setAmount(parseFloat(e.target.value));
    }
  }
  useEffect(() => {
    if (progress1 >= 0 && stakeModal) {
      setAmount(bnbBalance * progress1 / 100);
    }
  }, [progress1, stakeModal, bnbBalance])
  const onMax = async () => {
    setAmount(bnbBalance)
  }

  //--------------------Stake Part-----------------//

  

  useEffect(() => {
    if (loginStatus && account) {
      fetchPools();
      fetchItems();
    }
  }, [loginStatus, account])

  const fetchItems = async () => {
    let paramsData = {
      owner : account.toLowerCase()
    }
    axios.get("/api/item", { params : paramsData })
      .then((res) => {
        if (res.data.status){
          setItems(res.data.items);
        }
      }).catch((e) => {
        console.log(e);
        toast.error("The error is occured from the server.")
      })
  }

  useEffect(() => {
    if (loginStatus && account && items.length > 0 && pools.length > 0){
      for (const pool of pools){
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
          setPools(res.data.pools);
          getPoolInfos(res.data.pools);
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
      _pool.isUp = true;
      if (_pool) _pools.push(_pool);
    }
    setPools([..._pools]);
  }

  //-------------NFT Boost Part-----------------------// By God Crypto

  const onStakeBoostNFT = async (isStake, stakingId, nftIds) => {
    try{
      const isBoosted = await stakeBoostNFT(isStake, selectedPool?.address, stakingId, nftIds, library.getSigner());
      if (isBoosted){
        toast.success("Boosted Successfully");
      }
    }catch(e){
      console.log(e);
      toast.error("Boosting is failed");
    }
  }
  //-------------NFT Boost Part End-----------------------// By God Crypto

  //-------------Token Staking Part-----------------------// By God Crypto

  const onStakeToken = async () => {
    try{
      const amount = 1; //The Token Amount to stake
      const isBoosted = await stakeToken(selectedPool?.address, amount, selectedPool?.s_, library.getSigner());
      if (isBoosted){
        toast.success("Boosted Successfully");
      }
    }catch(e){
      console.log(e);
      toast.error("Boosting is failed");
    }
  }
  //-------------Token Staking Part End-----------------------// By God Crypto

  //-------------Create Pool-----------------------// By God Crypto
  const onCreatePool = async (creationPlan) => {
    //Validation Handling
    // handle "isAddress(address)" for contract address
    //Validation Handling End

    try {
      const startTime = Math.floor(Date.now() / 1000) + 3000;
      const endTime = startTime + 10 * 365 * 24 * 60 * 60; //startTime + 10 years
      //Keep above startTime and endTime, these 2 values are not got from frontend.
      const maxLockTime = 360; //Max Lock Period(Days)
      const nftMultiplier = 100; //NFT Booster Max Multiplier 1 = 100 / 100
      const maxLockMultiplier = 120000;//Max Lock Multiplier 12 = 120000 / 10000
      const earlyWithdrawFee = 300; // Cooldown Fee 3 = 300 / 100
      const numbers = (BigInt(startTime) << BigInt(192)) |
        (BigInt(endTime) << BigInt(128)) |
        (BigInt(maxLockTime) << BigInt(64)) |
        (BigInt(nftMultiplier) << BigInt(48)) |
        (BigInt(maxLockMultiplier) << BigInt(16)) |
        BigInt(earlyWithdrawFee);
      console.log(numbers);
      const early_period = 3 * 24 * 3600; //3 days
      const stakingToken = "0x60d4db9b534ef9260a88b0bed6c486fe13e604fc"; //Deposit Token Smart Contract
      const rewardToken = "0x60d4db9b534ef9260a88b0bed6c486fe13e604fc"; // Reward Token Smart Contract
      const boostingNft = "0x74841159b1721E9EBd3d822254c1Fb56dd5cc091"; //NFT Collection Smart Contract
      const dexRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; //Don't change this address;
      const commissionToken = ethers.constants.AddressZero; //Don't change this address
      const treasury = account; // Treasury Address
      const admin = account; //Pool Address
      const addresses = ethers.utils.solidityPack(
        ["address", "address", "address", "address", "address", "address", "address"],
        [stakingToken, rewardToken, boostingNft, dexRouter, commissionToken, treasury, admin])
      console.log(addresses);
      const emission = "0.01"; //Emission 0.01 ether
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
      //const poolAddress = await createNewPool(creationPlan, numbers, early_period, ethers.utils.parseEther(emission), addresses, chainId, library.getSigner())
      const poolAddress = "0xb117330d04a008f5dec5e195124f70590eb9d737";
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
              toast.success("New Pool is created successfully.")
              setPools(res.data.pools);
            }
          }).catch((err) => {
            console.log(err);
            toast.error(err.message);
          })
      } else {
        toast.error("Pool Creation Failed");
      }

    } catch (e) {
      console.log(e);
      toast.error("Pool Creation Failed");
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
                  <div style={{ display: 'flex' }}>
                    <img src={pool.s_image} height={60} />
                    <div style={{ marginLeft: 10 }}>
                      <h4>${pool.s_symbol}</h4>
                      <p>{pool?.tStakedSupply ? pool?.tStakedSupply : 0}</p>
                      <span>{`≈ $${pool?.tStakedSupply ? pool?.tStakedSupply * pool.s_price : 0}`}</span>
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
                    <p> {`${pool?.apr ? pool?.apr : 0}%`}</p>
                  </div>
                  <div>
                    <h5>Total NFT Staked</h5>
                    <h3>{`${pool?.tBoostedSupply ? pool?.tBoostedSupply : 0}`} </h3>
                  </div>
                  <div>
                    <h5>Total Earned ${pool.r_symbol}</h5>
                    <strong>{`${pool?.rewardSupply ? pool?.rewardSupply : 0}`} </strong>
                    <span>{`≈ $${pool?.rewardSupply ? pool?.rewardSupply * pool.r_price : 0}`}</span>
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
                    <button className='stake' onClick={() => setStakeModal(true)}>Stake</button>
                    <div onClick={() => pool.isUp = !pool.isUp} className='panelBtn'>
                      {pool.isUp ? <i className='fas fa-angle-up' /> : <i className='fas fa-angle-down' />}
                    </div>
                  </div>
                </div>

                <div className={pool.isUp ? `${classes.withdraw_card} accordion_panel_block` : `${classes.withdraw_card} accordion_panel_none`}>
                  <div>
                    <h5>My staked ${pool.s_symbol}</h5>
                    <p style={{ display: 'flex' }}>{pool?.myStakedAmount}
                      <MyTooltip
                        text={
                          <>
                            {pool?.stakingInfos && pool?.stakingInfos.map((stakingInfo, idx) => {
                              return (
                                <p>
                                  {stakingInfo.tokenAmount} ${pool.s_symbol} - {stakingInfo.isLock ? `Unlocks ${moment(pool?.lockTime * 1000).format("MMM DD YYYY HH:mm")}` : "Unlockable now"}
                                </p>
                              )
                            })}
                          </>}
                      />
                    </p>
                    <span>{`≈ $${pool?.myStakedAmount * pool.s_price}`}</span>
                  </div>

                  <div>
                    <h5>My Earned ${pool.r_symbol}</h5>
                    <h6>{pool?.myReward}</h6>
                    <span style={{ display: 'flex' }}>≈ ${pool?.myReward ? pool?.myReward * pool.r_price : 0}
                      <MyTooltip
                        text={
                          <>
                            {pool?.stakingInfos && pool?.stakingInfos.map((stakingInfo, idx) => {
                              return (
                                <p>
                                  {`${stakingInfo.rewardAmount} $${pool.r_symbol} - ${stakingInfo.rewardAmount * pool.r_price}`}
                                </p>
                              )
                            })}
                          </>}
                      />
                    </span>
                  </div>

                  {/* <div>
                    <FormControlLabel
                      control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={true} />}
                      label={''}
                    />
                    <span style={{ display: 'block' }}>Unlock/Lock</span>
                  </div> */}

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
                          pool.tokenIds && stakedItems.map((item, idx) => {
                            return (
                              <img src={item.assetUrl} />
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                  <div className='miner-stake-btns'>
                    <button className='boost'>Cash Out</button>
                    <button className='boost'>Relock</button>
                    <button className='withdraw' onClick={() => setWithdrawModal(1)}>Withdraw</button>
                  </div>
                </div>
              </div>
            )
          })}


          <div className={classes.custom_create_btn}>
            <img src='assets/imgs/create-farm-icon.png' />
            <span>Create Your Custom Farm</span>
          </div>



          {/* <div className={`${classes.stakeCard} stakeCard`}>
            <div className="top">
              <ul>
                <li>
                  <img src="/assets/logo.png" alt="" />
                  <span>
                    <h4>BoredM Shares</h4>
                    <p>{bnbStakingInfo?.balance.toLocaleString()}$BNB</p>
                    total balance
                  </span>
                </li>
                <li>
                  <span>
                    <h5>My Shares</h5>
                    <p>{bnbStakingInfo?.myShares.toLocaleString()}</p>
                    <p><small>≈ $150,09</small></p>
                  </span>
                </li>
                <li>
                  <span>
                    <h5>My Earned $BNB</h5>
                    <p>{bnbStakingInfo?.myEarnedBNB.toLocaleString()} $BNB</p>
                    <p><small>≈ $150,09</small></p>
                  </span>
                </li>
                <li>
                  <FilledButton label={'Buy Shares'} handleClick={() => setStakeModal(true)} />
                </li>
              </ul>
              <div className="downBtn" onClick={() => setBoredMExpand(!boredMExpand)}>
                <img src="/assets/icons/arrow_down_icon.svg" alt="" style={{ transform: boredMExpand ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </div>
            </div>
            <Expand open={boredMExpand && bnbStakingInfo?.myShares > 0} duration={300} styles={styles} transitions={transitions}>
              <div className="state" >
                <ul>
                  <li>
                    <span>
                      <h5>My Shares</h5>
                      <p>{bnbStakingInfo?.myShares.toLocaleString()} $BNB</p>
                      <p><small>≈ $150,09</small></p>
                    </span>
                  </li>
                  <li>
                    <span>
                      <h5>My Earned $BNB</h5>
                      <p>{bnbStakingInfo?.myEarnedBNB.toLocaleString()} $BNB</p>
                      <p><small>≈ $150,09</small></p>
                    </span>
                  </li>
                  <li>
                    <FilledButton label={'Reinvest'} color='success' handleClick={() => onTokenInvest()} />
                    <FilledButton label={'Harvest'} color='secondary' handleClick={() => onHarvest()} />
                    <FilledButton label={'Buy Shares'} handleClick={() => setStakeModal(true)} />
                  </li>
                </ul>

              </div>

            </Expand>
            {boredMExpand && bnbStakingInfo?.myShares == 0 && <p className='bottomTxt'>Buy Other shares to earn.</p>}
          </div> */}
          {/* <div className={classes.top}>
            <h1>Other Miner</h1>
            <FilledButton label={'Add your custom Miner'} color='grey' handleClick={onAddMiner} className='addBtn' />
          </div> */}
          {/* {minerList.map((d, k)=>(
            <div className={`${classes.stakeCard} stakeCard`} key = {k}>
              <div className="top">
                <ul>
                  <li>
                    <img src="/assets/logo.png" alt="" />
                    <span>
                      <h4>Other Miner</h4>
                      <p>$BNB 10</p>
                    </span>
                  </li>
                  <li>
                      <span>
                        <h5>My shares</h5>
                        <p>0</p>
                      </span>
                    </li>
                    <li>
                      <span>
                      <h5>My Earned $BNB</h5>
                        <p>0</p>
                        <p><small>≈ $0</small></p>
                      </span>
                    </li>
                  <li>
                    <FilledButton label={'Buy Shares'} handleClick = {()=>setStakeModal(true)}/>
                  </li>
                </ul>
                <div className="downBtn" onClick={()=>setMinerExpand(!minerExpand)}>
                  <img src="/assets/icons/arrow_down_icon.svg" alt="" style={{ transform: minerExpand ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
                </div>
              </div>
              <Expand open={minerExpand} duration={300} styles={styles} transitions={transitions}>
                <div className="state" >
                  <ul>
                  
                    <li>
                      <span>
                        <h5>My shares</h5>
                        <p>0</p>
                      </span>
                    </li>
                    <li>
                      <span>
                      <h5>My Earned $BNB</h5>
                        <p>0</p>
                        <p><small>≈ $0</small></p>
                      </span>
                    </li>
                    <li>
                      <FilledButton label={'Reinvest'} color = 'success'/>
                      <FilledButton label={'Harvest'} color = 'secondary'/>
                      <FilledButton label={'Buy Shares'} handleClick = {()=>setStakeModal(true)}/>
                    </li>
                  </ul>
                  
                </div>
                
              </Expand>
              {!minerExpand && <p className='bottomTxt'>Buy Other shares to earn.</p>}
            </div>
          ))} */}

        </div>
        {/* <div className={`${classes.right} mainContainer`}>
          <div className={classes.top}>
            <h1>Highlights</h1>
          </div>
          <div className={`${classes.rewardCard} rewardCard`}>
            <ul>
              <li>
              </li>
              <li>
                <p>@ Binance Smart Chain</p>
                <h4>BoredM Miner</h4>
              </li>
            </ul>

            <ul>
              <li>
                <p><small>Your total rewards</small></p>
              </li>
              <li>
                <h5>{bnbStakingInfo?.myEarnedBNB.toLocaleString()} <span>BNB</span></h5>
              </li>
            </ul>

          </div>

          <div className={`${classes.rewardCard} rewardCard`}>
            <ul>
              <li>

              </li>
              <li>
                <p>@ Ethereum Network</p>
                <h4>BoredM Stake</h4>
              </li>
            </ul>

            <ul>
              <li>
                <p><small>Your total rewards</small></p>
              </li>
              <li>
                <h5>1.3 <span>ETH</span></h5>
              </li>
            </ul>

          </div>
          <div className={classes.buyPanel}>
            <ul>
              <li>
                <div className="balance" style={{ backgroundImage: `url('/assets/imgs/Rectangle 29.png')` }}>
                  <h2>$BoredM </h2> <img src="/assets/icons/eth_icon_01.svg" alt="" /> <h2>{boredmPrice} ETH</h2>
                </div>

              </li>
              <li>
                <a href="https://www.dextools.io/app/en/ether/pair-explorer/0x1ee2a47ec688a1b56afc9c0b134d9c555851cb4a" className="Dextools" target="_blank" rel="noreferrer" style={{ background: `#05A3C9` }}>
                  Buy on Dextools
                  <img src="/assets/icons/dxtool_icon.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="https://app.uniswap.org/#/swap?outputCurrency=0x445d711C8974d80643745A4666803D255a589390" className="Uniswap" target="_blank" rel="noreferrer" style={{ background: `#D63371` }}>
                  Buy on Uniswap
                  <img src="/assets/icons/uniswap_icon.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="https://app.1inch.io/#/1/unified/swap/ETH/BoredM" className="1inch" target="_blank" rel="noreferrer" style={{ background: `#101A2E` }}>
                  Buy on 1inch
                  <img src="/assets/icons/linch_icon.svg" alt="" />
                </a>
              </li>
            </ul>

          </div>
        </div> */}
      </div>

      <Modal
        show={stakeModal}
        maxWidth='md'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span>
                <img src='assets/imgs/farm-stake-avatar1.png' />
                <h2>Stake $PIXIA in Farm</h2>
              </span>
              {/* <button className="closeBtn" onClick={() => setStakeModal(false)}><img src="/assets/icons/close_icon.svg" alt="" /></button> */}
            </div>
            <div className={classes.modalContent}>
              <h3 className='w-100 mt-2'>Enter $PIXA Amount to stake</h3>
              <span className='input-span'>
                <input type="number" onChange={e => onChangeVal(e)} placeholder={"Amount"} value={amount === 0 ? "Amount" : amount} />
                <button onClick={onMax}>Max</button>
              </span>
              <h5>Balance : {bnbBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} $BNB</h5>
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


              <h3 className='w-100 mt-2'>Select your Lock Period</h3>
              <span className='input-span'>
                <input type="number" onChange={e => onChangeVal(e)} placeholder={"Lock Period"} value={amount === 0 ? "Amount" : amount} />
                <button onClick={onMax}>Max</button>
              </span>
              <h5>Balance : {bnbBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} $BNB</h5>
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
                <div className="label">
                  <p>- days</p>
                  <p>- APR</p>
                </div>
                <div className="label ml-10">
                  <p>- days</p>
                  <p>- APR</p>
                </div>
                <div className="label ml-5">
                  <p>- days</p>
                  <p>- APR</p>
                </div>
                <div className="label ml-5">
                  <p>- days</p>
                  <p>- APR</p>
                </div>
                <div className="label">
                  <p>- days</p>
                  <p>- APR</p>
                </div>
              </div>
              <br />
              {/* <div>
                <div className={classes.lock}>
                  <CheckLock disabled={false} value={!isFree} onChange={(checked) => setFree(!checked)} />
                  <img src="/assets/icons/lock_icon.svg" alt="" />
                  <p>Lock $BoredM for access to</p>
                  <h6 style={{ color: '#ef1ce3', background: '#ffd8f1' }} className='prog-1'>80%</h6>
                  <span className='vs'>vs</span>
                  <h6 style={{ color: '#4905fb', background: '#d2c4f5' }} className='prog-2'>20%</h6>
                  <MyTooltip
                    text={
                      <>
                        <p>The lock is applied for 30 days and gives you access to 90% of the total rewards. If you choose not to lock, your tokens are free to withdraw anytime and you get access to 10% of total rewards.</p>
                      </>}
                  />
                </div>
              </div>
              <div className="warning">
                <img src="/assets/icons/warning_icon.png" alt="" />
                <p>1% fee for withdrawing in the next 48h -72h. Depositing or reinvesting resets the time.</p>
              </div> */}
            </div>
            <div className={classes.modalBtns}>
              {/* <FilledButton label={'Cancel'} color='secondary' handleClick={() => setStakeModal(false)} />
              <FilledButton label={'Buy shares'} handleClick={onBuyShares} /> */}
              <button style={{
                padding: '5px', width: '50%', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center', cursor:'pointer'
              }} onClick={() => setStakeModal(false)} className="cancel-btn">Cancel</button>
              <button style={{
                padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center', cursor:'pointer'
              }}>Stake</button>
            </div>
          </div>

        </>}
      />
      <Modal
        show={withdrawModal === 1}
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span className='topTitle'>
                <img src='assets/imgs/farm-stake-avatar1.png' />
                <div>
                  <h3>Withdraw from $BoredM in Farm</h3>
                  <p>7,836,923.44 $PIXIA staked</p>
                </div>
              </span>
              <MaterialUISwitch />
            </div>
            <div className={classes.modalContent}>
              <h3 className='w-100 mt-2'>Select lock</h3>
              {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lock}
                label="Age"
                className={classes.lockSelect}
                onChange={handleSelectChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select> */}
              <select className={classes.lockSelect} value={lock} onChange={handleSelectChange}>
                <option value={10}>Lock1</option>
                <option value={20}>Lock2</option>
                <option value={30}>Lock3</option>
              </select>
              <h3 className='w-100 mt-2'>Enter $PIXA Amount to stake</h3>
              <span className='input-span'>
                <input type="number" onChange={e => onChangeVal(e)} placeholder={"Amount"} value={amount === 0 ? "Amount" : amount} />
                <button onClick={onMax}>Max</button>
              </span>
              <h5>Balance : {bnbBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} $BNB</h5>
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
            </div>
            <div className={classes.modalBtns}>
              <button style={{
                padding: '5px', width: '50%', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center',cursor:'pointer'
              }} onClick={() => setWithdrawModal(0)} className="cancel-btn">Cancel</button>
              <button style={{
                padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center',cursor:'pointer'
              }}>Withdraw</button>
            </div>
          </div>

        </>}
      />

      <Modal
        show={withdrawModal === 2}
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span className='topTitle'>
                <img src='assets/imgs/farm-stake-avatar1.png' />
                <div>
                  <h3>Relock or Release Lock </h3>
                  <h3>For $PIXIA in Farm</h3>
                </div>
              </span>
              <MaterialUISwitch />
            </div>
            <div className={classes.modalContent}>
              <h3 className='w-100 mt-2'>Select lock</h3>
              {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lock}
                label="Age"
                className={classes.lockSelect}
                onChange={handleSelectChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select> */}
              <select className={classes.lockSelect} value={lock} onChange={handleSelectChange}>
                <option value={10}>Lock1</option>
                <option value={20}>Lock2</option>
                <option value={30}>Lock3</option>
              </select>
              <div className="warning">
                <img src="/assets/icons/warning_icon.png" alt="" />
                <p>When lock period has ended, no more rewards are credited. Relock or Release Lock to keep getting rewards. Releasing lock corresponds to no lock state.</p>
              </div>
            </div>
            <div className={classes.modalBtns}>
              <button style={{
                padding: '5px', width: '50%', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center'
              }} onClick={() => setWithdrawModal(0)} className="cancel-btn">Cancel</button>
              <button style={{
                padding: '5px', width: '50%', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center'
              }} className="cancel-btn">Release Lock</button>
              <button style={{
                padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center'
              }}>ReLock</button>
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
                <p style={{display:'flex'}}>Deposit Token Smart Contract
                <MyTooltip
                    text={
                      <>
                        <p>Token Smart Contract to be used for staking.</p>
                      </>}
                  />
                </p>
                <input type="text" placeholder='0x0000dead' />
              </div>
              {/* <div style={{ position: 'relative' }}>
                <img src='assets/imgs/farm-stake-avatar1.png' width={50} style={{ position: 'absolute', top: 38, left: 8 }} />
                <p>Token image (Used To Stake)</p>
                <input type="text" placeholder='Token-picture.jpg 131KB' style={{ paddingLeft: 60 }} />
              </div> */}
              <div>
                <p style={{display:'flex'}}>Reward Token Smart Contract
                <MyTooltip
                    text={
                      <>
                        <p>Token Smart Contract to be distributed as rewards.</p>
                      </>}
                  />
                </p>
                <input type="text" placeholder='0x0000dead' />
              </div>
              <div>
                <p style={{display:'flex'}}>Reward Amount per second (in ETH)
                <MyTooltip
                    text={
                      <>
                        <p>Rewards to be allocated each second. Set a value in ETH.</p>
                      </>}
                  />
                </p>
                <input type="text" placeholder='0.001' />
              </div>
              <div>
                <p style={{display:'flex'}}>Max Lock Period (Days)
                <MyTooltip
                    text={
                      <>
                        <p>Stakers are able to choose a lock period from 0 days to Max days implemented here.</p>
                      </>}
                  />
                </p>
                <input type="text" placeholder='365' />
              </div>
              <div>
                <p style={{display:'flex'}}>Max Lock Multiplier
                <MyTooltip
                    text={
                      <>
                        <p>Lock Multiplier value  applies for the max lock period.</p>
                        <p>If the staker select a lesser period, the Lock Multiplier is calculated proportionally.</p>
                      </>}
                  />
                </p>
                <input type="text" placeholder='1.2' />
              </div>
              <h3 style={{ color: '#eee !important', textAlign: 'left', width: '100%', marginTop: '15px' , display:'flex'}}>Cooldown
                <MyTooltip
                  text={
                    <>
                      <p>Cooldown is applied to Unlocked Staking Only. The fees are sent to the Cooldown wallet.</p>
                    </>}
                />
              </h3>
              <div style={{ display: 'flex',textAlign:'center', justifyContent:'between' }}>
                <div style={{width:'47.5%'}}>
                  <p>Early Withdraw Period (Days)</p>
                  <input type="text" placeholder='3' style={{textAlign:'center' }}/>
                </div>
                <div style={{width:'47.5%'}}>
                  <p>Early Withdraw Fee (%)</p>
                  <input type="text" placeholder='120' style={{textAlign:'center' }}/>
                </div>
              </div>
              <div>
                <p style={{textAlign:'center', maxWidth:'100%' }}>Cooldown wallet receiver
                </p>
                <input type="text" placeholder='0x0000dead' style={{textAlign:'center'}} />
              </div>
              <div>
                <p style={{ display: 'flex', }}>NFT Collection Smart Contract
                  <MyTooltip
                    text={
                      <>
                        <p>NFTs part of this collection  will be eligible for booster/multiplier to your pool.</p>
                      </>}
                  />
                </p >
                <input type="text" placeholder='0x0000dead' />
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
                <input type="text" placeholder='0.3' />
              </div>
              <div className = 'btn-wrapper' style = {{ display: 'flex' }}>
                <button style={{
                  padding: '5px', width: '46%',
                  height: '65px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', alignSelf: 'center', marginLeft: 10,
                  background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 16%, #FFB332 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  fontSize: 18,
                  backgroundClip: 'text',cursor:'pointer'
                }} onClick={() => onCreatePool(1)} className="cancel-btn">- 3 ETH Staking Pool
                  <span style={{ color: '#be16d2 !important', fontSize: 10, display: 'block' }}>No fees</span></button>
                <button style={{
                  padding: '5px', fontSize: 18, background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '46%', marginLeft: 10,
                  height: '65px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center',cursor:'pointer'
                }}
                  onClick={() => onCreatePool(0)}
                >Free Staking Pool <p style={{ color: 'white', fontSize: 10 }}>- 3% Fee on Rewards</p>
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
                  <span style={{ color: '#aaa', fontSize: 14 }}>NFT Balance: 9</span>
            </div>
            <div className="customSwitchText">
              <div onClick={()=>setSwitchStake(1)} className={`${switchStake === 1 && 'actived'}`}>
                Stake
              </div>
              <div onClick={()=>setSwitchStake(0)} className={`${switchStake === 0 && 'deactived'}`}>
                Unstake
              </div>
            </div>
            </span>
            </div>
            <div className={`${classes.modalContent} boostModalContent`}>
              {switchStake === 1 && <div className="warning">
                <img src="/assets/icons/warning_icon.png" alt="" />
                <p>NFTs boosting effect applies to one lock.
First select the lock to associate your NFT with, then, 
select the NFTs you want to stake/Unstake.</p>
              </div>}
              <h5 className='w-100 mt-2' style={{textAlign:'left'}}>Select lock</h5>
              <select className={classes.lockSelect} value={lock} onChange={handleSelectChange}>
                <option value={10}>Lock1</option>
                <option value={20}>Lock2</option>
                <option value={30}>Lock3</option>
              </select>
              <h5 className='w-100 mt-2' style={{textAlign:'left'}}>Select your NFTs</h5>
              <div className='img-group'>
                {
                  selectedPool?.stakedItems && selectedPool?.stakedItems.map((item, idx) => {
                    return (
                      <img src={item?.assetUrl} />
                    )
                  })
                }
              </div>
              <h5 className='w-100 mt-2' style={{textAlign:'left'}}>Updated Multiplier and APR</h5>
              <div className={`w-100 flex justify-between updated-multiplier`}>
                <div className='w-1/2'>
                  <p>New Multiplier</p>
                  <h6>- x</h6>
                </div>
                <div className='w-1/2'>
                  <p>New APR</p>
                  <h6>- %</h6>
                </div>
              </div>
              </div>
              <div className={classes.modalBtns}>
                <button style={{
                  padding: '5px', width: '50%',
                  background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center',cursor:'pointer'
                }} onClick={() => setBoostModal(false)} className="cancel-btn">Cancel</button>
                <button style={{
                  padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center',cursor:'pointer'
                }}> Stake</button>
              </div>
            </div>
            </>}
          />
        </>
  );
};

export default Miner;
