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
import MyTooltip from 'components/Widgets/MyTooltip';
import CheckLock from 'components/Forms/CheckLock';


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

  const [minerList, setMinerList] = useState<number[]>([0]);
  const [isFree, setFree] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [createCustomModal, setCreateCustomModal] = useState(false);
  const [boostModal, setBoostModal] = useState(false);

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
  const [progress, setProgress] = useState(50);

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
    setProgress(50);
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
    if (progress >= 0 && stakeModal) {
      setAmount(bnbBalance * progress / 100);
    }
  }, [progress, stakeModal, bnbBalance])
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

          <div className='stake_withdraw_body'>
            <div className={`${classes.stake_card} stake_card`}>
              <img src='assets/imgs/farm-stake-avatar1.png' />
              <div>
                <h4>$PIXIA</h4>
                <p>7,836,923.44</p>
                <span>≈ $150,09</span>
              </div>

              <div style={{ padding: 6 }}>
                <h5>APR</h5>
                <p>12%/ 44%</p>
              </div>

              <div>
                <h5>My staked $PIXIA</h5>
                <p>7,836,923.44 <img src='assets/icons/warning_icon_01.svg' width={10} /></p>
                <span>≈ $150,09</span>
              </div>

              <div style={{ padding: 6 }}>
                <h5>My NFT Boosters</h5>
                <h3>4x <img src='assets/icons/warning_icon_01.svg' width={10} /></h3>
              </div>

              <div>
                <h5>My Earned $ETH</h5>
                <p>0.15<img src='assets/icons/warning_icon_01.svg' width={10} /></p>
                <span>≈ $150,09</span>
              </div>

              <div style={{ paddingTop: 16 }}>
                <button style={{
                  marginLeft: 5, fontWeight: 600, background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  padding: '5px', width: '108px',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', alignSelf: 'center'
                }} onClick={() => setBoostModal(true)} >Boost</button>
                <button style={{
                  marginLeft: 5, fontWeight: 600,
                  padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '108px',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center'
                }} onClick={() => setStakeModal(true)}>Stake</button>
                <img src='assets/icons/arrow_down_icon.svg' width={20} style={{ marginLeft: 5 }} />
              </div>
            </div>

            <div className={classes.withdraw_card}>
              <div>
                <h5>My staked $PIXIA</h5>
                <p>7,836,923.44<img src='assets/icons/warning_icon_01.svg' width={10} /></p>
                <span>≈ $150,09</span>
              </div>

              <div>
                <h5>My Earned $ETH</h5>
                <h6>0.15<img src='assets/icons/warning_icon_01.svg' width={10} /></h6>
                <span>≈ $150,09</span>
              </div>

              <div>
                <FormControlLabel
                  control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={true} />}
                  label={''}
                />
                <span style={{ display: 'block' }}>Unlock/Lock</span>
              </div>

              <div>
                <h5>My NFT Boosters</h5>
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
              <div style={{ paddingTop: 16 }}>
                <button style={{
                  marginLeft: 5, fontWeight: 600, background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  padding: '5px', width: '108px',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center'
                }}>Compound</button>
                <button style={{
                  marginLeft: 5, fontWeight: 600, backgroundImage: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  padding: '5px', width: '108px',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center'
                }}>Cash Out</button>
                <button style={{
                  marginLeft: 5, fontWeight: 600,
                  padding: '5px', background: '#4905FB', width: '108px',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center'
                }} onClick={() => setWithdrawModal(true)}>Withdraw</button>
              </div>
            </div>
          </div>

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
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span>
                <img src='assets/imgs/farm-stake-avatar1.png' />
                <h4>Stake $PIXIA in Farm</h4>
              </span>
              {/* <button className="closeBtn" onClick={() => setStakeModal(false)}><img src="/assets/icons/close_icon.svg" alt="" /></button> */}
            </div>
            <div className={classes.modalContent}>
              <span className='input-span'>
                <input type="number" onChange={e => onChangeVal(e)} placeholder={"Amount"} value={amount === 0 ? "Amount" : amount} />
                <button onClick={onMax}>Max</button>
              </span>
              <h5>Balance : {bnbBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} $BNB</h5>
              <div className={classes.progress}>
                <div className="line">
                  <div style={{ background: '#ef1ce3', width: `${progress}%`, height: '100%' }}></div>
                </div>
                <div className="node" onClick={() => setProgress(0)} style={{ background: progress < 0 ? '#fff' : '#ef1ce3' }}>
                  {progress > 0 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress === 0 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress(25)} style={{ background: progress < 25 ? '#fff' : '#ef1ce3' }}>
                  {progress > 25 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress === 25 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress(50)} style={{ background: progress < 50 ? '#fff' : '#ef1ce3' }}>
                  {progress > 50 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress === 50 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress(75)} style={{ background: progress < 75 ? '#fff' : '#ef1ce3' }}>
                  {progress > 75 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress === 75 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress(100)} style={{ background: progress < 100 ? '#fff' : '#ef1ce3' }}>
                  {progress > 100 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress === 100 ? '#fff' : '#E0E0E7' }}></div>}
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

              <div>
                <div className={classes.lock}>
                  {/* <Checkbox {...label} defaultChecked style={{width:'30px'}}/> */}
                  <CheckLock disabled={false} value={!isFree} onChange={(checked) => setFree(!checked)} />
                  <img src="/assets/icons/lock_icon.svg" alt="" />
                  <p>Lock $BoredM for access to</p>
                  <h6 style={{ color: '#ef1ce3', background: '#ffd8f1' }} className='prog-1'>80%</h6>
                  <span className='vs'>vs</span>
                  <h6 style={{ color: '#4905fb', background: '#d2c4f5' }} className='prog-2'>20%</h6>
                  {/* <img src="/assets/icons/warning_icon_01.svg" alt="" /> */}
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
              </div>
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
        show={withdrawModal}
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span className='topTitle'>
                <img src='assets/imgs/farm-stake-avatar1.png' />
                <div>
                  <h4>Withdraw from $BoredM in Farm</h4>
                  <p>7,836,923.44 $PIXIA staked</p>
                </div>
              </span>
              <MaterialUISwitch />
            </div>
            <div className={classes.modalContent}>
              <span className='input-span'>
                <input type="number" onChange={e => onChangeVal(e)} placeholder={"Amount"} value={amount === 0 ? "Amount" : amount} />
                <button onClick={onMax}>Max</button>
              </span>
              <h5>Balance : {bnbBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })} $BNB</h5>
              <div className={classes.progress}>
                <div className="line">
                  <div style={{ background: '#ef1ce3', width: `${progress}%`, height: '100%' }}></div>
                </div>
                <div className="node" onClick={() => setProgress(0)} style={{ background: progress < 0 ? '#fff' : '#ef1ce3' }}>
                  {progress > 0 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress === 0 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress(25)} style={{ background: progress < 25 ? '#fff' : '#ef1ce3' }}>
                  {progress > 25 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress === 25 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress(50)} style={{ background: progress < 50 ? '#fff' : '#ef1ce3' }}>
                  {progress > 50 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress === 50 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress(75)} style={{ background: progress < 75 ? '#fff' : '#ef1ce3' }}>
                  {progress > 75 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress === 75 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgress(100)} style={{ background: progress < 100 ? '#fff' : '#ef1ce3' }}>
                  {progress > 100 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progress === 100 ? '#fff' : '#E0E0E7' }}></div>}
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
              }} onClick={() => setWithdrawModal(false)} className="cancel-btn">Cancel</button>
              <button style={{
                padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center'
              }}>Withdraw</button>
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
                <p>Token Ticker (Distributed)</p>
                <input type="text" placeholder='PIXIA' />
              </div>
              <div>
                <p>NFT Collection Smart Contract (Booster)</p>
                <input type="text" placeholder='0x0000dead' />
              </div>
              <h5 style={{ color: '#eee !important', textAlign: 'left', width: '100%', marginTop: '15px' }}>Choose you pool details.
              </h5>
              <h5 style={{ color: '#eee !important', textAlign: 'left', width: '100%', marginTop: '3px' }}>
                Sum of % allocation should be 100%.</h5>
              <div style={{ display: 'flex' }}>
                <div>
                  <p>Lock Period (Days)</p>
                  <input type="text" placeholder='0' />
                </div>
                <div>
                  <p>Allocated Pool (%)</p>
                  <input type="text" placeholder='10' />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div>
                  <p>Lock Period (Days)</p>
                  <input type="text" placeholder='30' />
                </div>
                <div>
                  <p>Allocated Pool (%)</p>
                  <input type="text" placeholder='90' />
                </div>
              </div>
              <div>
                <button style={{
                  padding: '5px', width: '100%', background: 'transparent',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center',
                }} onClick={() => setStakeModal(false)} className="cancel-btn">Add A Pool
                </button>
              </div>
              <div className='btn-wrapper'>
                <button style={{
                  padding: '5px', width: '46%', background: 'transparent',
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center', marginLeft: 10,
                }} onClick={() => setStakeModal(false)} className="cancel-btn">1 ETH Staking Pool
                  <span style={{ color: '#be16d2 !important', fontSize: 10, display: 'block' }}>No fees</span></button>
                <button style={{
                  padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '46%', marginLeft: 10,
                  height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center',
                }}>1 ETH Staking Pool <p style={{ color: 'white', fontSize: 10 }}>No fees</p>
                </button>
              </div>
            </div>
          </div>
        </>}
      />

      <Modal
        show={boostModal}
        maxWidth='sm'
        children={<>
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
