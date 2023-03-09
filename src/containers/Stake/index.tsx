import FilledButton from 'components/Buttons/FilledButton';
import { MaterialUISwitch, useStyles } from './style';
import { useContext, useEffect, useState } from 'react';
import Expand from 'react-expand-animated';
import Modal from 'components/modal';
import CheckLock from 'components/Forms/CheckLock';
import { getBalanceOfBoredM, getBNBStakingInfo, getStakingInfo, onRewardClaim, onBoredMStake, onBoredMUnStake } from 'utils/contracts';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { toast } from 'react-toastify';
import { NFTStakingInfo } from 'utils/types';
import axios from 'axios';
import ThemeContext from "theme/ThemeContext"

import MyTooltip from 'components/Widgets/MyTooltip';
import moment from 'moment';
const Stake = () => {
  const classes = useStyles();
  const { loginStatus, chainId, account, library } = useContext(Web3WalletContext)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    getPrices();
    onStakingInfo();
  }, [loginStatus, chainId, account, library])

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

  const [nftStakingInfo, setNftStakingInfo] = useState<NFTStakingInfo>({
    tDividETH: 0,
    tStakedBoredM: 0,
    mStakedBoredM: 0,
    mEarnedETH: 0,
    mClaimedETH: 0,
    mClaimableETH: 0,
    tDividETHLock: 0,
    tStakedBoredMLock: 0,
    mStakedBoredMLock: 0,
    mEarnedETHLock: 0,
    mClaimedETHLock: 0,
    mClaimableETHLock: 0,
    mTimestampLock: 0,
    mPercentFree: 10,
    mPercentLock: 90
  });
  const onStakingInfo = async () => {
    // const _info = await getStakingInfo(account);
    // if (_info) setNftStakingInfo(_info);
  }

  const [minerList, setMinerList] = useState<number[]>([0]);
  const onAddMiner = () => {
    let alink = document.createElement('a');
    alink.href = "https://forms.gle/AajAubbTCXCxbRvZ8";
    alink.setAttribute('target', '_blank');
    alink.click();
    //setMinerList(oldArray => [...oldArray, 0]);
  }

  const [boredMExpand, setBoredMExpand] = useState(false);
  const [minerExpand, setMinerExpand] = useState(true);

  const styles = {
    open: { width: '100%' },
    close: { width: '100%' },
  };
  const transitions = ['width', 'height', 'opacity', 'background'];

  const [isHarvestFree, setHarvestFree] = useState(true);
  //--------------------Stake Part-----------------//
  const [isFree, setFree] = useState(false);
  const [stakeModal, setStakeModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [amountStak, setAmountStak] = useState(0);
  const [progressStak, setProgressStak] = useState(50);
  const onStake = async () => {
    if (loginStatus) {
      const toast_load_id = toast.loading("Staking...");
      const isStaked = await onBoredMStake(account, amountStak, chainId, library.getSigner(), isFree);
      toast.dismiss(toast_load_id);
      if (isStaked) {
        toast.success("Staked " + amountStak + " $BoredM Successfully.")
        onCancelStake();
        onStakingInfo();
      }
    }
  }
  const onCancelStake = () => {
    setProgressStak(50);
    setStakeModal(false);
  }
  useEffect(() => {
    if (loginStatus && (stakeModal || withdrawModal)) {
      getBalance()
    }
  }, [loginStatus, stakeModal, withdrawModal])
  const getBalance = async () => {
    const _balance = await getBalanceOfBoredM(chainId, library.getSigner(), account);
    setBalance(_balance);
  }
  const onChangeValStake = async (e: any) => {
    if (e.target.value === null || e.target.value === '') {
      setAmountStak(0);
    } else {
      setAmountStak(parseFloat(e.target.value));
    }
  }
  useEffect(() => {
    if (progressStak >= 0 && stakeModal) {
      setAmountStak(balance * progressStak / 100);
    }
  }, [progressStak, stakeModal, balance])
  const onMaxStak = async () => {
    //setAmountStak(balance)
    setProgressStak(100);
  }

  //-----------------------Withdraw Part-------------------//
  const [isWithdrawFree, setIsWithdrawFree] = useState(true);

  const [amountWithdraw, setAmountWithdraw] = useState(0);
  const [progressWithdraw, setProgressWithdraw] = useState(50);
  const onWithdraw = async () => {
    if (loginStatus) {
      const toast_load_id = toast.loading("UnStaking...");
      const isUnStaked = await onBoredMUnStake(account, amountWithdraw, chainId, library.getSigner(), isWithdrawFree);
      toast.dismiss(toast_load_id);
      if (isUnStaked) {
        toast.success("Withrawn " + amountWithdraw + " $BoredM Successfully.")
        onCancelWithdraw();
        onStakingInfo();
      }
    }
  }
  const onCancelWithdraw = () => {
    setProgressWithdraw(50);
    setWithdrawModal(false);
  }
  const onWithdrawModal = async (_isFree) => {
    setIsWithdrawFree(_isFree);
    setWithdrawModal(true);
  }
  const onChangeValWithdraw = async (e: any) => {
    if (e.target.value === null || e.target.value === '') {
      setAmountWithdraw(0);
    } else {
      setAmountWithdraw(parseFloat(e.target.value));
    }
  }
  const onMaxWithdraw = async () => {
    setProgressWithdraw(100)
    //setAmountWithdraw(isWithdrawFree ? nftStakingInfo?.mStakedBoredM : nftStakingInfo?.mStakedBoredMLock)
  }
  useEffect(() => {
    if (progressWithdraw >= 0 && withdrawModal) {
      setAmountWithdraw((isWithdrawFree ? nftStakingInfo.mStakedBoredM : nftStakingInfo.mStakedBoredMLock) * progressWithdraw / 100);
    }
  }, [progressWithdraw, withdrawModal, nftStakingInfo, isWithdrawFree])

  //---------------------Harvest-------------------------//
  const onHarvest = async (_isFree) => {
    if (loginStatus) {
      const toast_load_id = toast.loading("Harvesting...");
      const isClaimed = await onRewardClaim(chainId, library.getSigner(), _isFree);
      toast.dismiss(toast_load_id);
      if (isClaimed) {
        toast.success("Harvested Successfully.")
        onCancelWithdraw();
        onStakingInfo();
      }
    }
  }
  return (
    <>
      <div className={classes.root}>
        <div className={`${classes.content} mainContainer`}>
          <div className={classes.top}>
            <h1>Manage Subscription</h1>
          </div>

          <div className={classes.manage_sub_body}>

            <div className='plan_card'>
              <div className='card_header'>
                <div>
                  <h4>Your Plan</h4>
                  <p>Relock your $PIXIA before 16 november 2023, 13:07 to continue using PIXIA.</p>
                </div>
                <div style={{ width: '100%', textAlign: 'right' }}>
                  <button style={{
                    padding: '5px', width: '108px',
                    height: '40px', borderRadius: '15px', paddingLeft: 10, paddingRight: 10, textAlign: 'center', border: 'dashed 1px #ff589d', alignSelf: 'center'
                  }} className='gradient-color'>Renew Plan</button>
                  <button style={{
                    background: '#2B614C', paddingLeft: 60, paddingRight: 60, border: 'none', color: 'white', height: '40px', marginLeft: 8,
                    borderRadius: '15px'
                  }}>Active Plan</button>
                </div>
              </div>

              <div className='card_body'>
                <div className='card'>
                  <h3>Hours Detail</h3>
                  <div>
                    <p>Plan hours</p>
                    <span>96h 35m / 120h</span>
                  </div>
                  <div>
                    <p>Additional</p>
                    <span>4h</span>
                  </div>
                  <div>
                    <p>Bonus</p>
                    <span>0h</span>
                  </div>
                  <div>
                  </div>
                </div>
                <div className='card'>
                  <h3>Get More Hours</h3>
                  <div className="card_wrapper">
                    <div className='card_com'>
                      <h5>1 Hour</h5>
                      <h6>8 USD</h6>
                      <button className={theme}><span>- ETH</span></button>
                    </div>
                    <div className='card_com'>
                      <h5>1 Hour</h5>
                      <h6>8 USD</h6>
                      <button className={theme}><span>- ETH</span></button>
                    </div>
                    <div className='card_com'>
                      <h5>1 Hour</h5>
                      <h6>8 USD</h6>
                      <button className={theme}><span>- ETH</span></button>
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
              </div>

            </div>
            <div className={classes.how_card}>
              <div >
                <div className='plan_question' style={{ display: 'block' }}>
                  <strong>How To Get A Plan?</strong>
                  <p>Stake lock $PIXIA for 30 days to get a plan.To renew your plan, relock your $PIXIA.</p>
                  <div>
                    <button style={{
                      padding: '5px',
                      height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }} className='relock-btn'>Relock $PIXIA</button>
                    <button style={{
                      padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)',
                      height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center'
                    }}>Stake $PIXIA</button>
                  </div>
                </div>
                <div className='sub_cards'>

                  <div className={theme} style={{ border: '1.3px solid transparent', background: 'transparent', backgroundImage: theme == 'light'? 'linear-gradient(90deg, white, white),linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 40%, #FFB332 100%)' : 'linear-gradient(90deg, #030316, #030316),linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 40%, #FFB332 100%)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'border-box' }}>
                    <h4>Basic</h4>
                    <p>200 minutes/m</p>
                    <span>Stake lock</span>
                    <span>27 USD worth</span>
                    <span>of $PIXIA</span>
                  </div>
                  <div className={theme}>
                    <h4>Standard</h4>
                    <p>15 hours/m</p>
                    <span>Stake lock</span>
                    <span>120 USD worth</span>
                    <span>of $PIXIA</span>
                  </div>
                  <div className={theme}>
                    <h4>Pro</h4>
                    <p>300 minutes/m</p>
                    <span>Stake lock</span>
                    <span>240 USD worth</span>
                    <span>of $PIXIA</span>
                    <span>Private Mode</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'block' }}>
                <h3>Frequently Asked Questions</h3>
                <p>Can't find the answer you're looking for? Read the <a href='' style={{ color: 'white' }}><u>Quick Start Guide</u></a> or visit the <a href='' style={{ color: 'white' }}><u>Telegram Group</u></a> to ask for help.</p>
              </div>
            </div>
          </div>

          {/* <div className={`${classes.stakeCard} stakeCard`}>
            <div className="top">
              <ul>
                <li>
                  <img src="/assets/logo.png" alt="" />
                  <span>
                    <h5>Total Dividend $ETH</h5>
                    <p>
                      {(nftStakingInfo?.tDividETH + nftStakingInfo?.tDividETHLock).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </p>
                    <p><small>≈ ${(ethPrice * (nftStakingInfo?.tDividETH + nftStakingInfo?.tDividETHLock)).toLocaleString(undefined, { maximumFractionDigits: 4 })}</small></p>
                  </span>
                </li>
                <li>
                  <span>
                    
                    <div className='val'>
                      <h5>APR</h5>
                      <MyTooltip text="APR/APY is approximated and varies with token volume and NFT art volume."/>
                    </div>
                    <p>12% / <img src="assets/icons/lock_icon.svg" style={{ width: '14px', height: '19px', marginRight: '0px' }} alt="" /> 44%</p>
                  </span>
                </li>
                <li>
                  <span>
                    <h5>Total Staked $BoredM</h5>
                    <div className='val'>{
                      (nftStakingInfo?.tStakedBoredM + nftStakingInfo?.tStakedBoredMLock).toLocaleString(undefined, { maximumFractionDigits: 4 })
                    }
                      <MyTooltip
                        text={
                          <>
                            <p>{nftStakingInfo?.tStakedBoredM.toLocaleString(undefined, { maximumFractionDigits: 4 })} $BoredM - Free</p>
                            <p>{nftStakingInfo?.tStakedBoredMLock.toLocaleString(undefined, { maximumFractionDigits: 4 })} $BoredM - Lock</p>
                          </>}
                      />
                    </div>
                    <p><small>≈ ${(boredmPrice * (nftStakingInfo?.tStakedBoredM + nftStakingInfo?.tStakedBoredMLock)).toLocaleString(undefined, { maximumFractionDigits: 4 })}</small></p>
                  </span>
                </li>

                <li>
                  <span>
                    <h5>My Staked $BoredM</h5>
                    <div className='val'>
                      {(nftStakingInfo?.mStakedBoredM + nftStakingInfo?.mStakedBoredMLock).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      <MyTooltip
                        text={
                          <>
                            <p>{nftStakingInfo?.mStakedBoredM.toLocaleString(undefined, { maximumFractionDigits: 4 })} $BoredM - Unlockable now</p>
                            <p>{nftStakingInfo?.mStakedBoredMLock.toLocaleString(undefined, { maximumFractionDigits: 4 })} $BoredM - Unlocks the {moment((nftStakingInfo.mTimestampLock + 30 * 24 * 3600) * 1000).format("MMM DD YYYY")} at {moment(nftStakingInfo.mTimestampLock * 1000).format("h:mmA")}</p>
                          </>}
                      />
                    </div>
                    <p><small>≈ ${(boredmPrice * (nftStakingInfo?.mStakedBoredM + nftStakingInfo?.mStakedBoredMLock)).toLocaleString(undefined, { maximumFractionDigits: 4 })}</small></p>
                  </span>
                </li>
                <li>
                  <span>
                    <h5>My Earned $ETH</h5>
                    <div className='val'>
                      {(nftStakingInfo?.mEarnedETH + nftStakingInfo?.mEarnedETHLock).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      <MyTooltip
                        text={
                          <>
                            <p>{nftStakingInfo?.mEarnedETH.toLocaleString(undefined, { maximumFractionDigits: 4 })} $ETH - Free</p>
                            <p>{nftStakingInfo?.mEarnedETHLock.toLocaleString(undefined, { maximumFractionDigits: 4 })} $ETH - Lock</p>
                          </>}
                      />
                    </div>
                    <p><small>≈ ${(ethPrice * (nftStakingInfo?.mEarnedETH + nftStakingInfo?.mEarnedETHLock)).toLocaleString(undefined, { maximumFractionDigits: 4 })}</small></p>
                  </span>
                </li>
                <li>
                  <FilledButton label={'Stake'} handleClick={() => setStakeModal(true)} />
                </li>
              </ul>
              <div className="downBtn" onClick={() => setBoredMExpand(!boredMExpand)}>
                <img src="/assets/icons/arrow_down_icon.svg" alt="" style={{ transform: boredMExpand ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </div>
            </div>
            <Expand open={boredMExpand && (nftStakingInfo?.tStakedBoredM + nftStakingInfo?.tStakedBoredMLock) > 0} duration={300} styles={styles} transitions={transitions}>
              <div className="state" >
                <ul>

                  <li>
                    <span>
                      <h5>Claimed $ETH</h5>
                      <p style={{display:'flex'}}>
                        {(nftStakingInfo?.mClaimedETH + nftStakingInfo?.mClaimedETHLock).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                        <MyTooltip
                          text={
                            <>
                              <p>{nftStakingInfo?.mClaimedETH.toLocaleString(undefined, { maximumFractionDigits: 4 })} $ETH - Free</p>
                              <p>{nftStakingInfo?.mClaimedETHLock.toLocaleString(undefined, { maximumFractionDigits: 4 })} $ETH - Lock</p>
                            </>}
                        />
                      </p>
                      <p><small>≈ ${(ethPrice * (nftStakingInfo?.mClaimedETH + nftStakingInfo?.mClaimedETHLock)).toLocaleString(undefined, { maximumFractionDigits: 4 })}</small></p>
                    </span>
                  </li>
                  <li>
                    <span>
                      <h5>Claimable $ETH ({isHarvestFree ? "Free" : "Lock"})</h5>
                      <p style={{display:'flex'}}>
                        {(isHarvestFree ? nftStakingInfo?.mClaimableETH : nftStakingInfo?.mClaimableETHLock).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                        <MyTooltip
                          text={
                            isHarvestFree ?
                              <p>{nftStakingInfo?.mClaimableETH.toLocaleString(undefined, { maximumFractionDigits: 4 })} $ETH - Free</p> :
                              <p>{nftStakingInfo?.mClaimableETHLock.toLocaleString(undefined, { maximumFractionDigits: 4 })} $ETH - Lock</p>
                          }
                        />
                      </p>
                      <p><small>≈ ${(ethPrice * (isHarvestFree ? nftStakingInfo?.mClaimableETH : nftStakingInfo?.mClaimableETHLock)).toLocaleString(undefined, { maximumFractionDigits: 4 })}</small></p>
                    </span>
                  </li>
                  <li>
                    <MaterialUISwitch onChange={e => setHarvestFree(!e.target.checked)} />
                  </li>
                  <li>
                    {
                      isHarvestFree ? nftStakingInfo?.mClaimableETH > 0 && <FilledButton label={'Harvest'} color='secondary' handleClick={() => onHarvest(true)} /> :
                        nftStakingInfo?.mClaimableETHLock > 0 && <FilledButton label={'Harvest'} color='secondary' handleClick={() => onHarvest(false)} />
                    }
                    <FilledButton label={'Withdraw'} handleClick={() => onWithdrawModal(true)} />
                  </li>
                </ul>

              </div>

            </Expand>
            {boredMExpand && (nftStakingInfo?.tStakedBoredM + nftStakingInfo?.tStakedBoredMLock) == 0 && <p className='bottomTxt'>Stake $Other to earn.</p>}
          </div>
          <div className={classes.top}>
            <h1>Other Farms (coming soon)</h1>
            <FilledButton label={'Add your custom farm'} color='grey' handleClick={onAddMiner} />
          </div> */}
        </div>
      </div>

      <Modal
        show={stakeModal}
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span>
                <img src="/assets/logo.png" alt="" />
                <div>
                  <h4>Total Staked $BoredM in Farm</h4>
                  <p>{isFree ? nftStakingInfo?.tStakedBoredM : nftStakingInfo?.tStakedBoredMLock} $BoredM staked</p>
                </div>
              </span>
              <button className="closeBtn" onClick={() => onCancelStake()}><img src="/assets/icons/close_icon.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <div className={`${classes.amount} input-span`}>
                <input type="number" onChange={e => onChangeValStake(e)} placeholder={"Amount"} value={amountStak.toFixed(2)} />
                <button onClick={onMaxStak}>Max</button>
              </div>
              <h5>Balance : {balance.toLocaleString(undefined, { maximumFractionDigits: 4 })} $BoredM</h5>
              <div className={classes.progress}>
                <div className="line">
                  <div style={{ background: '#9B51E0', width: `${progressStak}%`, height: '100%' }}></div>
                </div>
                <div className="node" onClick={() => setProgressStak(0)} style={{ background: progressStak < 0 ? '#fff' : '#9B51E0' }}>
                  {progressStak > 0 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progressStak === 0 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgressStak(25)} style={{ background: progressStak < 25 ? '#fff' : '#9B51E0' }}>
                  {progressStak > 25 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progressStak === 25 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgressStak(50)} style={{ background: progressStak < 50 ? '#fff' : '#9B51E0' }}>
                  {progressStak > 50 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progressStak === 50 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgressStak(75)} style={{ background: progressStak < 75 ? '#fff' : '#9B51E0' }}>
                  {progressStak > 75 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progressStak === 75 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgressStak(100)} style={{ background: progressStak < 100 ? '#fff' : '#9B51E0' }}>
                  {progressStak > 100 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progressStak === 100 ? '#fff' : '#E0E0E7' }}></div>}
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
              {

              }
              <div className={classes.lock}>
                <CheckLock disabled={false} value={!isFree} onChange={(checked) => setFree(!checked)} />
                <img src="/assets/icons/lock_icon.svg" alt="" />
                <p>Lock $BoredM for access to</p>
                <h6 style={{ color: '#A8D2B8', background: '#A8D2B833' }}>{nftStakingInfo?.mPercentLock}%</h6>
                vs
                <h6 style={{ color: '#D39533', background: '#A8D2B833' }}>{nftStakingInfo?.mPercentFree}%</h6>
                {/* <img src="/assets/icons/warning_icon_01.svg" alt="" /> */}
                <MyTooltip
                  text={
                    <>
                      <p>The lock is applied for 30 days and gives you access to 90% of the total rewards. If you choose not to lock, your tokens are free to withdraw anytime and you get access to 10% of total rewards.</p>
                    </>}
                />
              </div>

              <div className="warning">
                <img src="/assets/icons/warning_icon.svg" alt="" />
                <p>1% fee for withdrawing in the next 48h -72h. Depositing resets the time. Normal token tax are applied. A second locked deposit resets the lock period.</p>
              </div>
            </div>
            <div className={classes.modalBtns}>
              <FilledButton label={'Cancel'} color='secondary' handleClick={() => onCancelStake()} />
              <FilledButton label={'Stake'} handleClick={onStake} />
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
                <img src="/assets/logo.png" alt="" />
                <div>
                  <h4>Withdraw from $BoredM in Farm</h4>
                  <p>{isWithdrawFree ? nftStakingInfo?.mStakedBoredM.toLocaleString(undefined, { maximumFractionDigits: 4 }) : nftStakingInfo?.mStakedBoredMLock.toLocaleString(undefined, { maximumFractionDigits: 4 })} $BoredM staked</p>
                </div>
              </span>
              <MaterialUISwitch onChange={e => setIsWithdrawFree(!e.target.checked)} />
              <button className="closeBtn" onClick={() => onCancelWithdraw()}><img src="/assets/icons/close_icon.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <div className={`${classes.amount} input-span`}>
                <input type="number" onChange={e => onChangeValStake(e)} placeholder={"Amount"} value={amountStak.toFixed(2)} />
                <button onClick={onMaxStak}>Max</button>
              </div>
              <h5>Balance : {balance.toLocaleString(undefined, { maximumFractionDigits: 4 })} $BoredM</h5>
              <div className={classes.progress}>
                <div className="line">
                  <div style={{ background: '#9B51E0', width: `${progressStak}%`, height: '100%' }}></div>
                </div>
                <div className="node" onClick={() => setProgressStak(0)} style={{ background: progressStak < 0 ? '#fff' : '#9B51E0' }}>
                  {progressStak > 0 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progressStak === 0 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgressStak(25)} style={{ background: progressStak < 25 ? '#fff' : '#9B51E0' }}>
                  {progressStak > 25 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progressStak === 25 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgressStak(50)} style={{ background: progressStak < 50 ? '#fff' : '#9B51E0' }}>
                  {progressStak > 50 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progressStak === 50 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgressStak(75)} style={{ background: progressStak < 75 ? '#fff' : '#9B51E0' }}>
                  {progressStak > 75 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progressStak === 75 ? '#fff' : '#E0E0E7' }}></div>}
                </div>
                <div className="node" onClick={() => setProgressStak(100)} style={{ background: progressStak < 100 ? '#fff' : '#9B51E0' }}>
                  {progressStak > 100 ?
                    <img src="/assets/icons/check_icon.svg" alt="" /> :
                    <div className="circle" style={{ background: progressStak === 100 ? '#fff' : '#E0E0E7' }}></div>}
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
              <FilledButton label={'Cancel'} color='secondary' handleClick={() => onCancelWithdraw()} />
              <FilledButton label={'Withdraw'} handleClick={onWithdraw} />
            </div>
          </div>

        </>}
      />
    </>
  );
};

export default Stake;
