import FilledButton from 'components/Buttons/FilledButton';
import { useStyles } from './style';
import { useContext, useEffect, useState } from 'react';
import Expand from 'react-expand-animated';
import Modal from 'components/modal';
import Checkbox from '@mui/material/Checkbox';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { toast } from 'react-toastify';
import ThemeContext from "theme/ThemeContext"
import { ethers } from 'ethers';
import { getBalanceOfBNB, getBNBStakingInfo, onInvest, onMyBuyShares, onSellShares } from 'utils/contracts';
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
    background: '#030316 !important',
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
    background: 'rgba(102, 104, 131, 1)',
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
  return (
    <>
      <div className={classes.root}>
        <div className={`${classes.content} mainContainer`}>
          <div className={classes.top}>
            <h1>Farms with NFT boosters</h1>
            <div className={classes.custom_pool_btn} role='button' onClick={() => setCreateCustomModal(true)}>
              <img src='assets/imgs/create-farm-icon.png' width={20} />
              <span>Create Your Custom Pool</span>
            </div>
          </div>
          {minerList.map((val, ind) => {
            return (
              <div className='stake_withdraw_body'>
                <div className={`${classes.stake_card} stake_card`}>
                  <div style={{ display: 'flex' }}>
                    <img src='assets/imgs/farm-stake-avatar1.png' height={60} />
                    <div style={{ marginLeft: 10 }}>
                      <h4>$PIXIA</h4>
                      <p>{val.pixie['val']}</p>
                      <span>{`≈ $${val.pixie['price']}`}</span>
                    </div>
                  </div>

                  <div style={{ padding: 6 }}>
                    <div style={{ display: 'flex' }}>
                      <h5>APR</h5>
                      <MyTooltip
                        text={
                          <>
                            <p>First value is the average APR you get from your several lock periods.</p>
                            <p>Second Value is the max APR value the pool offers to stakers.</p>
                          </>}
                      />
                    </div>
                    <p> {`${val.apr['data1']}%/ ${val.apr['data2']}%`}</p>
                  </div>
                  <div>
                    <h5>Total NFT Staked</h5>
                    <h3>{`${val.totalNftStaked}`} </h3>
                  </div>
                  <div>
                    <h5>Total Earned $USDT</h5>
                    <strong>{`${val.my_nft_booster}`} </strong>
                    <span>{`≈ $${val.my_staked_pixie['price']}`}</span>
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
                    <button className='boost' onClick={() => setBoostModal(true)} >Boost</button>
                    <button className='stake' onClick={() => setStakeModal(true)}>Stake</button>
                    <div onClick={() => setPanel(ind)} className='panelBtn'>
                      {val.panel ? <i className='fas fa-angle-up' /> : <i className='fas fa-angle-down' />}
                    </div>
                  </div>
                </div>

                <div className={val.panel ? `${classes.withdraw_card} accordion_panel_block` : `${classes.withdraw_card} accordion_panel_none`}>
                  <div>
                    <h5>My staked $PIXIA</h5>
                    <p style={{ display: 'flex' }}>{val.my_staked_pixie['val']}
                      <MyTooltip
                        text={
                          <>
                            <p>836,923.44 $PIXIA - Unlockable now</p>
                            <p>14,356.38 $PIXIA - Unlocks Dec 11, 2022 at 7:30 am</p>
                          </>}
                      />
                    </p>
                    <span>{`≈ $${val.my_staked_pixie['price']}`}</span>
                  </div>

                  <div>
                    <h5>My Earned $ETH</h5>
                    <h6>0.15</h6>
                    <span style={{ display: 'flex' }}>≈ $150,09
                      <MyTooltip
                        text={
                          <>
                            <p>836,923.44 $PIXIA - 138.0 $USDT</p>
                            <p>14,356.38 $PIXIA - 12.09 $USDT</p>
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
                      <span>3</span>
                      <div className={classes.img_list}>
                        <img src='assets/imgs/img-list-item1.png' />
                        <img src='assets/imgs/img-list-item2.png' />
                        <img src='assets/imgs/img-list-item3.png' />
                        <img src='assets/imgs/img-list-item1.png' />
                        <img src='assets/imgs/img-list-item2.png' />
                        <img src='assets/imgs/img-list-item3.png' />
                      </div>
                    </div>
                  </div>
                  <div className='miner-stake-btns'>
                    <button className='boost'>Compound</button>
                    <button className='boost'>Cash Out</button>
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
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center'
              }} onClick={() => setStakeModal(false)} className="cancel-btn">Cancel</button>
              <button style={{
                padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center'
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
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center'
              }} onClick={() => setWithdrawModal(0)} className="cancel-btn">Cancel</button>
              <button style={{
                padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center'
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
                  <h4>Create Your Custom Pool</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setCreateCustomModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={`${classes.createModalAddContent}`}>
              <div>
                <p>Token Smart Contract (Used To Stake)</p>
                <input type="text" placeholder='0x0000dead' />
              </div>
              <div>
                <p>Token Ticker (Used To Stake)</p>
                <input type="text" placeholder='PIXIA' />
              </div>
              <div style={{ position: 'relative' }}>
                <img src='assets/imgs/farm-stake-avatar1.png' width={50} style={{ position: 'absolute', top: 38, left: 8 }} />
                <p>Token image (Used To Stake)</p>
                <input type="text" placeholder='Token-picture.jpg 131KB' style={{ paddingLeft: 60 }} />
              </div>
              <div>
                <p>Reward Token Smart Contract (Distributed)</p>
                <input type="text" placeholder='0x0000dead' />
              </div>
              <div>
                <p>Reward Token Ticker</p>
                <input type="text" placeholder='PIXIA' />
              </div>
              <div>
                <p>Reward Token Decimals</p>
                <input type="text" placeholder='PIXIA' />
              </div>
              <div>
                <p>NFT Collection Smart Contract (Booster)</p>
                <input type="text" placeholder='0x0000dead' />
              </div>
                  <div>
                <p style={{ display: 'flex' }}>NFT Booster Max Multiplier
                  <MyTooltip
                    text={
                      <>
                        <p>Multiplier effect value that applies for the max lock period. </p>
                        <p>The multiplier value is calculated proportionally to the max multiplier and lock period.</p>
                        <p>Multiplier values are added for staking multiple NFTs on one lock period.</p>
                      </>}
                  />
                </p>
                <input type="text" placeholder='3' />
              </div>
            <h3 style={{ color: '#eee !important', textAlign: 'left', width: '100%', marginTop: '15px' , display:'flex'}}>Staking Options
            <MyTooltip
              text={
                <>
                           <p>Set a Max Lock Period and a Max corresponding APY. Then APY will be calculated proportionally to chosen lock period by the user, and, max lock period.</p>
                  <p>To get 1% APY, input must be 10. To get 12% APY, input must be 120.</p>
                </>}
            />
            </h3>
              <div style={{ display: 'flex',textAlign:'center' }}>
            <div>
              <p>Max Lock Period</p>
              <p>(Days)</p>
                  <input type="text" placeholder='0' style={{textAlign:'center' }}/>
            </div>
            <div>
              <p>Max APY</p>
              <p>(‰)</p>
                  <input type="text" placeholder='10' style={{textAlign:'center' }}/>
            </div>
            </div>
              {/* <div>
                <button style={{
                  padding: '5px', width: '100%', background: 'transparent',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center',
                }} onClick={() => setStakeModal(false)} className="cancel-btn">Add A Pool
                </button>
          </div> */}
          <div className='btn-wrapper' style={{ display: 'flex' }}>
            <button style={{
              padding: '5px', width: '46%',
              height: '65px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', alignSelf: 'center', marginLeft: 10,
              background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 16%, #FFB332 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: 18,
              backgroundClip: 'text',
            }} onClick={() => setStakeModal(false)} className="cancel-btn">- 1 ETH Staking Pool
              <span style={{ color: '#be16d2 !important', fontSize: 10, display: 'block' }}>No fees</span></button>
            <button style={{
              padding: '5px', fontSize: 18, background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '46%', marginLeft: 10,
              height: '65px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center',
                }}>Free Staking Pool <p style={{ color: 'white', fontSize: 10 }}>- % Fee on Rewards</p>
          </button>
        </div>
            </div >
          </div >
        </>}
/>

  < Modal
show = { boostModal }
maxWidth = 'sm'
children = {<>
  <div className={classes.boostModal}>
    <div className={classes.modalTop}>
      <span className='topTitle'>
        <img src="/assets/imgs/farm-stake-avatar1.png" alt="" />
        <div>
          <h4>Withdraw from $BoredM in Farm</h4>
          <span style={{ color: '#aaa', fontSize: 14 }}>NFT Balance: 9</span>
        </div>
        <div className="customSwitchText">
          <span>Stake</span>
          <span>Unstake</span>
        </div>
        <FormControlLabel
          control={<CustomSwitch defaultChecked />}
          label=""
        />
      </span>
    </div>
    <div className={`${classes.modalContent} boostModalContent`}>
      <div className='img-group'>
        <img src='assets/imgs/boost-img-1.png' />
        <img src='assets/imgs/boost-img-2.png' />
        <img src='assets/imgs/boost-img-3.png' />
        <img src='assets/imgs/boost-img-4.png' />
        <img src='assets/imgs/boost-img-5.png' />
        <img src='assets/imgs/boost-img-6.png' />
        <img src='assets/imgs/boost-img-7.png' />
        <img src='assets/imgs/boost-img-8.png' />
        <img src='assets/imgs/boost-img-9.png' />
      </div>
      <p style={{ textAlign: 'left', width: '100%', marginTop: 30, marginBottom: 30 }}>Select your NFTs to stake.</p>
    </div>
    <div className={classes.modalBtns}>
      <button style={{
        padding: '5px', width: '50%',
        background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center'
      }} onClick={() => setBoostModal(false)} className="cancel-btn">Cancel</button>
      <button style={{
        padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
        height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center'
      }}>Stake</button>
    </div>
  </div>

        </>}
/>
    </>
  );
};

export default Miner;
