import FilledButton from 'components/Buttons/FilledButton';
import { useStyles } from './style';
import { useState } from 'react';
import Expand from 'react-expand-animated';
import Modal from 'components/modal';
import CheckLock from 'components/Forms/CheckLock';
const Stake = () => {
  const classes = useStyles();

  const [minerList, setMinerList] = useState<number[]>([0]);
  const onAddMiner = () => {
    setMinerList(oldArray => [...oldArray, 0]);
  }

  const [boredMExpand, setBoredMExpand] = useState(true);
  const [minerExpand, setMinerExpand] = useState(false);

  const styles = {
    open: { width: '100%'},
    close: { width: '100%'},
  };
  const transitions = ['width', 'height', 'opacity', 'background'];

  // modal Functions
  const [amountStak, setAmountStak] = useState(0);
  
  const [progressStak, setProgressStak] = useState(50);

  const onChangeValStake = async (e : any) => {
    console.log(e.target.value)
    if(e.target.value === null || e.target.value ==='' ){
      setAmountStak(0);
    }else{
      setAmountStak(parseFloat(e.target.value));
    }
  }

  const onMaxStak = async () => {
    setAmountStak(10)
  }

  const [amountWithdraw, setAmountWithdraw] = useState(0);
  
  const [progressWithdraw, setProgressWithdraw] = useState(50);

  const onChangeValWithdraw = async (e : any) => {
    console.log(e.target.value)
    if(e.target.value === null || e.target.value ==='' ){
      setAmountWithdraw(0);
    }else{
      setAmountWithdraw(parseFloat(e.target.value));
    }
  }

  const onMaxWithdraw = async () => {
    setAmountWithdraw(10)
  }

  const [stakModal, setStakModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const onStake = async () => {
    setStakModal(false)
  }

  const onWithdraw = async () => {
    setWithdrawModal(false)
  }


  
  return (
    <>
      <div className={classes.root}>
        <div className={`${classes.content} mainContainer`}>
          <div className={classes.top}>
            <h1>BoredM Farm</h1>
          </div>
          <div className={`${classes.stakeCard} stakeCard`}>
            <div className="top">
              <ul>
                <li>
                  <img src="/assets/logo.png" alt="" />
                  <span>
                    <h4>Stake $BoredM</h4>
                    <p>$280,000</p>
                  </span>
                </li>

                <li>
                  <span>
                    <h5>APR</h5>
                    <p>12% / <img src="assets/icons/lock_icon.svg" alt="" /> 44%</p>
                  </span>
                </li>

                <li>
                  <span>
                    <h5>My staked $BoredM</h5>
                    <p>7,836,923.44</p>
                    <p><small>≈ $150,09</small></p>
                  </span>
                </li>
                <li>
                  <span>
                  <h5>My Earned $ETH</h5>
                    <p>0.15</p>
                    <p><small>≈ $150,09</small></p>
                  </span>
                </li>
                <li>
                  <FilledButton label={'Stake'} handleClick = {()=>setStakModal(true)}/>
                </li>
              </ul>
              <div className="downBtn" onClick={()=>setBoredMExpand(!boredMExpand)}>
                <img src="/assets/icons/arrow_down_icon.svg" alt="" style={{ transform: boredMExpand ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
              </div>
            </div>
            <Expand open={boredMExpand} duration={300} styles={styles} transitions={transitions}>
              <div className="state" >
                <ul>
                 
                  <li>
                    <span>
                      <h5>My staked $BoredM</h5>
                      <p>7,836,923.44</p>
                      <p><small>≈ $150,09</small></p>
                    </span>
                  </li>
                  <li>
                    <span>
                    <h5>My Earned $ETH</h5>
                      <p>0.15</p>
                      <p><small>≈ $150,09</small></p>
                    </span>
                  </li>
                  <li>
                    <FilledButton label={'Reinvest'} color = 'success'/>
                    <FilledButton label={'Harvest'} color = 'secondary'/>
                    <FilledButton label={'Withdraw'} handleClick = {()=>setWithdrawModal(true)}/>
                  </li>
                </ul>
                
              </div>
              
            </Expand>
            {!boredMExpand && <p className='bottomTxt'>Stake $Other to earn.</p>}
          </div>
          <div className={classes.top}>
            <h1>Other Farms</h1>
            <FilledButton label={'Add your custom farm'} color = 'grey' handleClick={onAddMiner}/>
          </div>
          {minerList.map((d, k)=>(
            <div className={`${classes.stakeCard} stakeCard`}  key = {k}>
              <div className="top">
                <ul>
                  <li>
                    <img src="/assets/logo.png" alt="" />
                    <span>
                      <h4>Stake $Other</h4>
                      <p>$280,000</p>
                    </span>
                  </li>
                  <li>
                    <span>
                      <h5>APR</h5>
                      <p>12% / <img src="assets/icons/lock_icon.svg" alt="" /> 44%</p>
                    </span>
                  </li>
                  <li>
                      <span>
                        <h5>My staked $other</h5>
                        <p>0</p>
                        <p><small>≈ $0</small></p>
                      </span>
                    </li>
                    <li>
                      <span>
                      <h5>My Earned </h5>
                        <p>0</p>
                        <p><small>≈ $0</small></p>
                      </span>
                    </li>
                  <li>
                    <FilledButton label={'Stake'} handleClick = {()=>setStakModal(true)}/>
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
                      <FilledButton label={'Withdraw'} handleClick = {()=>setWithdrawModal(true)}/>
                    </li>
                  </ul>
                  
                </div>
                
              </Expand>
              {!minerExpand && <p className='bottomTxt'>Stake $Other to earn.</p>}
            </div>
          ))}
          
        </div>
        <div className={`${classes.right} mainContainer`}>
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
                <h5>1.3 <span>BNB</span></h5>
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
                <div className="balance" style={{backgroundImage : `url('/assets/imgs/Rectangle 29.png')`}}>
                  <h2>$BoredM </h2> <img src="/assets/icons/eth_icon_01.svg" alt="" /> <h2>0.0₉7036 ETH</h2>
                </div>
                
              </li>
              <li>
                <a href="https://dextools.com/" className = "Dextools" target="_blank"rel="noreferrer"  style={{background : `#05A3C9`}}>
                  Buy on Dextools
                  <img src="/assets/icons/dxtool_icon.svg" alt="" />
                </a> 
              </li>
              <li>
                <a href="https://uniswap.comm/" className = "Uniswap" target="_blank"rel="noreferrer" style={{background : `#D63371`}}>
                  Buy on Uniswap
                  <img src="/assets/icons/uniswap_icon.svg" alt="" />
                </a> 
              </li>
              <li>
                <a href="https://1inch.comm/" className = "1inch" target="_blank"rel="noreferrer" style={{background : `#101A2E`}}>
                  Buy on 1inch
                  <img src="/assets/icons/linch_icon.svg" alt="" />
                </a> 
              </li>
            </ul>

          </div>
        </div>
      </div>

      <Modal 
        show={stakModal} 
        maxWidth = 'sm'
        children={<>
        <div className={classes.modal}>
          <div className={classes.modalTop}>
            <span>
              <img src="/assets/logo.png" alt="" />
              <div>
              <h4>Stake $BoredM in Farm</h4>
              <p>7,836,923.44 $BoredM staked</p>
              </div>
            </span>
            <button className="closeBtn" onClick={()=>setStakModal(false)}><img src="/assets/icons/close_icon.svg" alt="" /></button>
          </div>
          <div className={classes.modalContent}>
            <div className={`${classes.amount} input-span`}>
              <input type="number" onChange={e=>onChangeValStake(e)} placeholder = {"Amount"} value={amountStak === 0 ? "Amount": amountStak}/>
              <button onClick={onMaxStak}>Max</button>
              </div>
            <h5>Balance : </h5>
            <div className={classes.progress}>
              <div className="line">
                <div style = {{background : '#9B51E0', width : `${progressStak}%`, height : '100%'}}></div>
              </div>
              <div className="node" onClick={()=>setProgressStak(0)} style = {{background : progressStak < 0? '#fff':'#9B51E0'}}>
                {progressStak > 0? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progressStak === 0? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgressStak(25)} style = {{background : progressStak < 25? '#fff':'#9B51E0'}}>
              {progressStak > 25? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progressStak === 25? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgressStak(50)} style = {{background : progressStak < 50? '#fff':'#9B51E0'}}>
              {progressStak > 50? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progressStak === 50? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgressStak(75)} style = {{background : progressStak < 75? '#fff':'#9B51E0'}}>
              {progressStak > 75? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progressStak === 75? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgressStak(100)} style = {{background : progressStak < 100? '#fff':'#9B51E0'}}>
              {progressStak > 100? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progressStak === 100? '#fff':'#E0E0E7'}}></div>}
              </div>
            </div>

            <div className={classes.progress}>
              <div className="label">0%</div>
              <div className="label ml-10">25%</div>
              <div className="label ml-5">50%</div>
              <div className="label ml-5">75%</div>
              <div className="label">100%</div>
            </div>
            <br/>
            
            <div className={classes.lock}>
              <CheckLock/>
              <img src="/assets/icons/lock_icon.svg" alt="" />
              <p>Lock $BoredM for access to</p>
              <h6 style={{color : '#A8D2B8', background : '#A8D2B833'}}>80%</h6>
              vs
              <h6 style={{color : '#D39533', background : '#A8D2B833'}}>20%</h6>
              <img src="/assets/icons/warning_icon_01.svg" alt="" />
            </div>

            <div className="warning">
              <img src="/assets/icons/warning_icon.svg" alt="" />
              <p>1% fee for withdrawing in the next 48h -72h. Depositing or reinvesting resets the time. 7% tax is applied for staking/unstaking. </p>
            </div>
          </div>
          <div className={classes.modalBtns}>
            <FilledButton label={'Cancel'} color = 'secondary'handleClick={()=>setStakModal(false)}/>
            <FilledButton label={'Stake'}handleClick={onStake}/>
          </div>
        </div>
        </>}        
      />

      <Modal 
        show={withdrawModal} 
        maxWidth = 'sm'
        children={<>
        <div className={classes.modal}>
          <div className={classes.modalTop}>
            <span>
              <img src="/assets/logo.png" alt="" />
              <div>
              <h4>Withdraw from $BoredM in Farm</h4>
              <p>7,836,923.44 $BoredM staked</p>
              </div>
            </span>
            <button className="closeBtn" onClick={()=>setWithdrawModal(false)}><img src="/assets/icons/close_icon.svg" alt="" /></button>
          </div>
          <div className={classes.modalContent}>
            <div className={`${classes.amount} input-span`}>
              <input type="number" onChange={e=>onChangeValWithdraw(e)} placeholder = {"Amount"} value={amountWithdraw === 0 ? "Amount": amountWithdraw}/>
              <button onClick={onMaxWithdraw}>Max</button>
              </div>
            <h5>Balance : </h5>
            <div className={classes.progress}>
              <div className="line">
                <div style = {{background : '#9B51E0', width : `${progressWithdraw}%`, height : '100%'}}></div>
              </div>
              <div className="node" onClick={()=>setProgressWithdraw(0)} style = {{background : progressWithdraw < 0? '#fff':'#9B51E0'}}>
                {progressWithdraw > 0? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progressWithdraw === 0? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgressWithdraw(25)} style = {{background : progressWithdraw < 25? '#fff':'#9B51E0'}}>
              {progressWithdraw > 25? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progressWithdraw === 25? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgressWithdraw(50)} style = {{background : progressWithdraw < 50? '#fff':'#9B51E0'}}>
              {progressWithdraw > 50? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progressWithdraw === 50? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgressWithdraw(75)} style = {{background : progressWithdraw < 75? '#fff':'#9B51E0'}}>
              {progressWithdraw > 75? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progressWithdraw === 75? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgressWithdraw(100)} style = {{background : progressWithdraw < 100? '#fff':'#9B51E0'}}>
              {progressWithdraw > 100? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progressWithdraw === 100? '#fff':'#E0E0E7'}}></div>}
              </div>
            </div>

            <div className={classes.progress}>
              <div className="label">0%</div>
              <div className="label ml-10">25%</div>
              <div className="label ml-5">50%</div>
              <div className="label ml-5">75%</div>
              <div className="label">100%</div>
            </div>
            <br/>
          </div>
          <div className={classes.modalBtns}>
            <FilledButton label={'Cancel'} color = 'secondary'handleClick={()=>setWithdrawModal(false)}/>
            <FilledButton label={'Withdraw'}handleClick={onWithdraw}/>
          </div>
        </div>

        </>}        
      />
    </>
  );
};

export default Stake;
