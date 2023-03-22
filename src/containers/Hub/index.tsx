import FilledButton from 'components/Buttons/FilledButton';
import { MaterialUISwitch, useStyles } from './style';
import { useContext, useEffect, useState } from 'react';
import Expand from 'react-expand-animated';
import Modal from 'components/modal';
import CheckLock from 'components/Forms/CheckLock';
import { getBalanceOfBoredM, getBNBStakingInfo, getStakingInfo, onRewardClaim, onBoredMStake, onBoredMUnStake, onMoreHours } from 'utils/contracts';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { toast } from 'react-toastify';
import { NFTStakingInfo } from 'utils/types';
import axios from 'axios';
import ThemeContext from "theme/ThemeContext"

import MyTooltip from 'components/Widgets/MyTooltip';
import moment from 'moment';
import { useAuthState } from 'context/authContext';
import Faqs from './faqs';
const Hub = () => {
  const classes = useStyles();
  const { loginStatus, chainId, account, library } = useContext(Web3WalletContext)
  const { theme } = useContext(ThemeContext)
  const { user } = useAuthState();

  useEffect(() => {
    if (account){
      getPlans();
    }
    fetchRates();
    
  }, [loginStatus, chainId, account, library])

  const [plans, setPlans] = useState([]);
  const [ moreHours, setMoreHours ] = useState(1)
  const getPlans = async () => {
    axios.get("/api/plans")
      .then((res) => {
        setPlans(res.data.plans);
      }).catch((err) => {
        console.log(err);
      })
  }

  const [ ethPrice, setEthPrice ] = useState(0);
  const [ pixiaPrice, setPixiaPrice ] = useState(0);
  const fetchRates = async () => {
    axios.get("/api/getrates", { params: {}})
      .then((res) => {
        setEthPrice(res.data.eth);
        setPixiaPrice(res.data.boredm);
      }).catch((e) => {
        console.log(e);
        toast.error("The error is occured from the server.")
      })
  }

  const getMoreHours = async () => {
    try{
      if (!loginStatus || !account){
        return toast.error("Connect your wallet");
      }
      const load_toast_id = toast.loading("Buying More Hours");
      const isBought = await onMoreHours(moreHours, chainId, library.getSigner());
      if (isBought){
        toast.success("Bought Hours Successfully");
      }else toast.error("Failed");
      toast.dismiss(load_toast_id);

    }catch(e){
      console.log(e)
    }
  }

  const getHours = (credit_) => {
    try{
      if (!credit_)return "0h";
      const _hour = Math.floor(credit_ / 60);
      const _second = credit_ % 60;
      return _second <= 0 ? `${_hour}h` : `${_hour}h ${_second}m`;
    }catch(e){
      console.log(e);
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
                  {/* <button style={{
                    background: '#2B614C', paddingLeft: 60, paddingRight: 60, border: 'none', color: 'white', height: '40px', marginLeft: 8,
                    borderRadius: '15px'
                  }}>Active Plan</button> */}
                  <button style={{
                    background: '#CE4E63', paddingLeft: 60, paddingRight: 60, border: 'none', color: 'white', height: '40px', marginLeft: 8,
                    borderRadius: '15px'
                  }}>Inactive Plan</button>
                </div>
              </div>

              <div className='card_body'>
                <div className='card'>
                  <h3>Hours Detail</h3>
                  <div>
                    <p>Plan hours</p>
                    <span>{getHours(user?.plan_credits) || "0h"} / {plans.length > 0 && user?.planId !== 0 ? plans[user?.planId - 1]?.hours : 0}h</span>
                  </div>
                  <div>
                    <p>Additional</p>
                    <span>{getHours(user?.additional_credits) || "0h"}</span>
                  </div>
                  <div>
                    <p>Bonus</p>
                    <span>{getHours(user?.bonus_credits) || "0h"}</span>
                  </div>
                  <div>
                  </div>
                </div>
                <div className='card'>
                  <h3>Get More Hours</h3>
                  <div className="card_wrapper">
                    <div className='left-card'>
                      <input type="number" onChange={e => setMoreHours(parseInt(e.target.value))} placeholder={"Amount"}
                        value={moreHours}
                      />
                      <span>
                        Hours
                      </span>
                    </div>
                    <div className='right-card'>
                      <span>
                        0.005 ETH
                      </span>
                      <span>
                        ≈ {(ethPrice * 0.005).toLocaleString(undefined, {maximumFractionDigits: 2})} USD
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className='card_com'>
                      <button className={theme} onClick={getMoreHours}><span>Buy More Hours</span></button>
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
                  {
                    plans.map((plan, idx) => {
                      return <>
                        <div className={theme}
                          style={user?.planId && user?.planId === plan?.id ? { border: '1.3px solid transparent', background: 'transparent', backgroundImage: theme == 'light' ? 'linear-gradient(90deg, white, white),linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 40%, #FFB332 100%)' : 'linear-gradient(90deg, #030316, #030316),linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 40%, #FFB332 100%)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'border-box' } : {}}
                        >
                          <h4>{plan.name}</h4>
                          <p>{plan.hours} hours/month</p>
                          <span>Stake lock</span>
                          <span>{plan.amount} USD worth</span>
                          <span>of $PIXIA</span>
                          {plan?.isMode && <span>Private Mode</span>}
                        </div>
                      </>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          
          <Faqs/>
        </div>
      </div>
    </>
  );
};

export default Hub;
