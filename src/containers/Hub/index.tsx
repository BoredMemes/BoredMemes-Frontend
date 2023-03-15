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
const Hub = () => {
  const classes = useStyles();
  const { loginStatus, chainId, account, library } = useContext(Web3WalletContext)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    getPlans();
  }, [loginStatus, chainId, account, library])

  const [plans, setPlans] = useState([]);
  const [ selectedPlan, setSelectedPlan ] = useState(null);
  const getPlans = async () => {
    axios.get("/api/plans")
      .then((res) => {
        setPlans(res.data.plans);
        setSelectedPlan(res.data.plans[0]);
      }).catch((err) => {
        console.log(err);
      })
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
                  {
                    plans.map((plan, idx) => {
                      return <>
                        <div className={theme} onClick={() => setSelectedPlan(plan)} 
                          style={selectedPlan && plan.id === selectedPlan?.id ? { border: '1.3px solid transparent', background: 'transparent', backgroundImage: theme == 'light' ? 'linear-gradient(90deg, white, white),linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 40%, #FFB332 100%)' : 'linear-gradient(90deg, #030316, #030316),linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 40%, #FFB332 100%)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'border-box' } : {}}
                          >
                          <h4>{plan.name}</h4>
                          <p>{plan.hours} hours/m</p>
                          <span>Stake lock</span>
                          <span>{plan.amount} USD worth</span>
                          <span>of $PIXIA</span>
                          { plan?.isMode && <span>Private Mode</span> }
                        </div>
                      </>
                    })
                  }
                </div>
              </div>
              <div style={{ display: 'block' }}>
                <h3>Frequently Asked Questions</h3>
                <p>Can't find the answer you're looking for? Read the <a href='' style={{ color: 'white' }}><u>Quick Start Guide</u></a> or visit the <a href='' style={{ color: 'white' }}><u>Telegram Group</u></a> to ask for help.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hub;
