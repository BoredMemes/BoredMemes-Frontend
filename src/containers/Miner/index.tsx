import FilledButton from 'components/Buttons/FilledButton';
import { useStyles } from './style';
import { useState } from 'react';
import Expand from 'react-expand-animated';
import Modal from 'components/modal';
const Miner = () => {
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

  const [buyModal, setBuyModal] = useState(false);
  const onBuy = async () => {
    setBuyModal(false)
  }

  const [amount, setAmount] = useState(0);
  const [progress, setProgress] = useState(50);

  const onChangeVal = async (e : any) => {
    console.log(e.target.value)
    if(e.target.value === null || e.target.value ==='' ){
      setAmount(0);
    }else{
      setAmount(parseFloat(e.target.value));
    }
  }

  const onMax = async () => {
    setAmount(10)
  }
  return (
    <>
      <div className={classes.root}>
        <div className={`${classes.content} mainContainer`}>
          <div className={classes.top}>
            <h1>BoredM Miner</h1>
          </div>
          <div className={`${classes.stakeCard} stakeCard`}>
            <div className="top">
              <ul>
                <li>
                  <img src="/assets/logo.png" alt="" />
                  <span>
                    <h4>BoredM Shares</h4>
                    <p>$BNB 30</p>
                  </span>
                </li>
                <li>
                  <span>
                    <h5>My shares</h5>
                    <p>7,836,923.44</p>
                  </span>
                </li>
                <li>
                  <span>
                  <h5>My Earned $BNB</h5>
                    <p>0.5</p>
                    <p><small>≈ $150,09</small></p>
                  </span>
                </li>
                <li>
                  <FilledButton label={'Buy Shares'} handleClick = {()=>setBuyModal(true)}/>
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
                      <h5>My shares</h5>
                      <p>284,783</p>
                    </span>
                  </li>
                  <li>
                    <span>
                    <h5>My Earned $BNB</h5>
                      <p>0.5</p>
                      <p><small>≈ $150,09</small></p>
                    </span>
                  </li>
                  <li>
                    <FilledButton label={'Reinvest'} color = 'success'/>
                    <FilledButton label={'Harvest'} color = 'secondary'/>
                    <FilledButton label={'Buy Shares'} handleClick = {()=>setBuyModal(true)}/>
                  </li>
                </ul>
                
              </div>
              
            </Expand>
            {!boredMExpand && <p className='bottomTxt'>Buy Other shares to earn.</p>}
          </div>
          <div className={classes.top}>
            <h1>Other Miner</h1>
            <FilledButton label={'Add your custom Miner'} color = 'grey' handleClick={onAddMiner} className='addBtn'/>
          </div>
          {minerList.map((d, k)=>(
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
                    <FilledButton label={'Buy Shares'} handleClick = {()=>setBuyModal(true)}/>
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
                      <FilledButton label={'Buy Shares'} handleClick = {()=>setBuyModal(true)}/>
                    </li>
                  </ul>
                  
                </div>
                
              </Expand>
              {!minerExpand && <p className='bottomTxt'>Buy Other shares to earn.</p>}
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
        show={buyModal} 
        maxWidth = 'sm'
        children={<>
        <div className={classes.modal}>
          <div className={classes.modalTop}>
            <span>
              <img src="/assets/logo.png" alt="" />
              <h4>Buy miner shares with BNB</h4>
            </span>
            <button className="closeBtn" onClick={()=>setBuyModal(false)}><img src="/assets/icons/close_icon.svg" alt="" /></button>
          </div>
          <div className={classes.modalContent}>
            <span className='input-span'>
              <input type="number" onChange={e=>onChangeVal(e)} placeholder = {"Amount"} value={amount === 0 ? "Amount": amount}/>
              <button onClick={onMax}>Max</button>
            </span>
            <h5>Balance : </h5>
            <div className={classes.progress}>
              <div className="line">
                <div style = {{background : '#9B51E0', width : `${progress}%`, height : '100%'}}></div>
              </div>
              <div className="node" onClick={()=>setProgress(0)} style = {{background : progress < 0? '#fff':'#9B51E0'}}>
                {progress > 0? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progress === 0? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgress(25)} style = {{background : progress < 25? '#fff':'#9B51E0'}}>
              {progress > 25? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progress === 25? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgress(50)} style = {{background : progress < 50? '#fff':'#9B51E0'}}>
              {progress > 50? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progress === 50? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgress(75)} style = {{background : progress < 75? '#fff':'#9B51E0'}}>
              {progress > 75? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progress === 75? '#fff':'#E0E0E7'}}></div>}
              </div>
              <div className="node" onClick={()=>setProgress(100)} style = {{background : progress < 100? '#fff':'#9B51E0'}}>
              {progress > 100? 
                <img src="/assets/icons/check_icon.svg" alt="" />:
                <div className="circle" style = {{background : progress === 100? '#fff':'#E0E0E7'}}></div>}
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

            <div className="warning">
              <img src="/assets/icons/warning_icon.svg" alt="" />
              <p>Buying shares are non refundable. Number of shares are fixed in the pool, new entrance are buying shares from previous shareholders. Your number of shares varies with new entries, reinvesting rewards or harvesting rewards. Number of shares updates when you interact with the contract.</p>
            </div>
          </div>
          <div className={classes.modalBtns}>
            <FilledButton label={'Cancel'} color = 'secondary'handleClick={()=>setBuyModal(false)}/>
            <FilledButton label={'Buy shares'}handleClick={onBuy}/>
          </div>
        </div>

        </>}        
      />
    </>
  );
};

export default Miner;