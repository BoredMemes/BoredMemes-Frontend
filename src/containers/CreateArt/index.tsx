import { useStyles } from './style';
import { useContext, useEffect, useState } from 'react';
import InputField from 'components/Forms/InputField';
import Expand from 'react-expand-animated';
import CheckBox from 'components/Forms/CheckBox';
import ErrorAlert from '../../components/Widgets/ErrorAlert';
import FilledButton from 'components/Buttons/FilledButton';
import Modal from 'components/modal';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { toast } from 'react-toastify';
import axios from 'axios';
import { arrayify, hashMessage } from 'ethers/lib/utils';
import { getMintInfo, onMintArtItem } from 'utils/contracts';
import { useAuthState } from 'context/authContext';
const myData = [
  {
    a: 1,
    b: 1,
    a1: 9,
    b1: 21,
  },
  {
    a: 5,
    b: 4,
    a1: 1,
    b1: 2,
  },
  {
    a: 4,
    b: 3,
    a1: 9,
    b1: 16,
  },
  {
    a: 7,
    b: 5,
    a1: 3,
    b1: 5,
  },
  {
    a: 3,
    b: 2,
    a1: 10,
    b1: 16,
  },
  {
    a: 16,
    b: 10,
    a1: 2,
    b1: 3,
  },
  {
    a: 5,
    b: 3,
    a1: 5,
    b1: 7,
  },
  {
    a: 16,
    b: 9,
    a1: 3,
    b1: 4,
  },
  {
    a: 2,
    b: 1,
    a1: 4,
    b1: 5,
  },
  {
    a: 21,
    b: 9,
    a1: 1,
    b1: 1,
  },
];

const cardData = [
  {
    name: 'Silver Pack',
    price: 25,
    img: '/assets/icons/silver.png',
    count: 1,
  },
  {
    name: 'Gold Pack',
    price: 45,
    img: '/assets/icons/gold.png',
    count: 3,
  },
  {
    name: 'Premium Pack',
    price: 85,
    img: '/assets/icons/premium.png',
    count: 5,
  },
];
const CreateArt = () => {
  const { loginStatus, chainId, account, library } = useContext(Web3WalletContext)
  const { user } = useAuthState();
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: 'screen and (max-width: 640px) and (orientation:portrait)' })

  const [expand, setExpand] = useState(false);
  const styles = {
    open: { width: isTabletOrMobile ? '100%' : 'calc(100% - 180px)', overflow: 'hidden', overflowX: 'scroll', },
    close: { width: '0%', height: '0px' },
  };
  const transitions = ['width', 'height', 'opacity', 'background'];

  const [description, setDescription] = useState(null);
  const [artRatio, setArtRatio] = useState("1:1");
  const [ratio, setRatio] = useState(0);
  const [ratioCard, setRatioCard] = useState('up');
  const [packID, setPackID] = useState(0);
  const [telegramChecked, setTelegramChecked] = useState(false);
  const [twitterChecked, setTwitterChecked] = useState(false);

  const [processingModal, setProcessingModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);

  const [ packPrices, setPackPrices ] = useState([]);
  useEffect(() => {
    if (loginStatus)getMintingInfo();
  }, [loginStatus])

  const getMintingInfo = async () => {
    const _packPrices = await getMintInfo(chainId, library.getSigner());
    setPackPrices(_packPrices);
  }

  const onGetArt = async () => {
    if (!loginStatus) {
      toast.error("Please connect your wallet correctly!");
      return;
    }

    if (!description || artRatio === "") {
      toast.error("The more detailed information is needed.")
      return;
    }

    if (twitterChecked && telegramChecked) {
      return toast.error("One of both is recommended.");
    }
    setProcessingModal(true)
    try{
      const timestamp = Math.floor(new Date().getTime() / 1000);
      const msg = await library.getSigner().signMessage(arrayify(hashMessage(account?.toLowerCase() + "-" + timestamp)));
      let paramsData = {
        address : account?.toLowerCase(),
        timestamp : timestamp,
        message: msg,
        description : description,
        ratio : artRatio,
        packId : packID,
        isTwitterNotify : twitterChecked,
        isTelegramNotify: telegramChecked
      }
      axios.post("/api/addart", paramsData)
        .then(async (res) => {          
          if (res.data.message === "success"){
            console.log("Request ID : ", res.data.reqId);
            const isMinted = await onMintArtItem(chainId, library.getSigner(), res.data.reqId, packID, packPrices[packID]);
            if (isMinted){
              setResultModal(true)
              toast.success("Your Art is requested successfully");
            }
            setProcessingModal(false);
          }else toast.error("Failed");
        }).catch((e) => {
          setProcessingModal(false);
          toast.error(e.message);
        })
    }catch(e){
      console.log("Sign Message Error : " , e);
      setProcessingModal(false);
    }
    
    // setSigned(msg && msg !== "")
    // setSignMsg(msg);
    // setTimestamp(timestamp);


    // setProcessingModal(true)
    // setTimeout(() => {
    //   setProcessingModal(false)
    //   setResultModal(true)
    // }, 1000);
  }

  const history = useHistory()

  const onGotoMyArt = () => {
    setResultModal(false)
    history.push('/')
  }

  const onGotoCommunityFeed = () => {
    setResultModal(false)
    history.push('/community_feed')
  }

  const onClickRatioCard = (id: number, _ratio: string, card: string) => {
    setArtRatio(_ratio);
    setRatio(id)
    setRatioCard(card)
  }
  return (
    <>
      <div className={`${classes.root} mainContainer`}>
        <div className={classes.top}>
          <h1>BoredM Miner</h1>
        </div>
        <div className={classes.content}>
          <div className={`${classes.step} step`}>
            <div className={classes.stepLeft}>
              <div className="circle" style={{ background: description ? '#F8B4E4' : '#d4d4d4' }}>1</div>
              <div className="leftLine" style={{ background: description ? '#F8B4E4' : '#d4d4d4' }}></div>
              <h3>Image description</h3>
              <p>Add your image description. The more detailed, the more accurate the ai will be.</p>
            </div>
            <div className={classes.stepContent}>
              <InputField isMulti label="Image description" onChangeData={(e) => setDescription(e)} />
            </div>
          </div>

          <div className={`${classes.step} step`}>
            <div className={classes.stepLeft}>
              <div className="circle" style={{ background: ratio !== -1 ? '#F8B4E4' : '#d4d4d4' }}>2</div>
              <div className="leftLine" style={{ background: ratio !== -1 ? '#F8B4E4' : '#d4d4d4' }}></div>
              <h3>Aspect ratio</h3>
              <p>Image dimension.</p>
            </div>
            <div className={classes.stepContent}>
              <div className="ratioContent" style={{ width: expand ? '100%' : 'auto' }}>
                {!isTabletOrMobile ?
                  <>
                    {ratioCard === 'up' ?
                      <div className="ratioMain" style={{ height: `${(64 * myData[ratio]?.b) / myData[ratio]?.a}px` }}>
                        <div className="heart"><img src="/assets/icons/crown_icon.svg" alt="" /></div> {myData[ratio]?.a}:{myData[ratio]?.b}
                      </div> :
                      <div className="ratioMain" style={{ height: `${(64 * myData[ratio]?.b1) / myData[ratio]?.a1}px` }}>
                        <div className="heart"><img src="/assets/icons/crown_icon.svg" alt="" /></div> {myData[ratio]?.a1}:{myData[ratio]?.b1}
                      </div>}
                    <Expand open={expand} duration={300} styles={styles} transitions={transitions}>
                      <div className="ratioList" style={{ width: expand ? '100%' : '0px' }}>
                        {myData.map((d, k) => (
                          <div className="col" key={k}>
                            <div className="ratio" onClick={() => onClickRatioCard(k, d.a + ":" + d.b, 'up')} style={{ height: `${(45 * d.b) / d.a}px`, background: ratio === k && ratioCard === 'up' ? "#E4CCFD" : "#D4D4D4" }}>
                              {ratio === k && ratioCard === 'up' && <div className="heart"><img src="/assets/icons/heart_icon_01.svg" alt="" /></div>}
                              {d.a}:{d.b}
                            </div>
                            <div className="ratio" onClick={() => onClickRatioCard(k, d.a1 + ":" + d.b1, 'down')} style={{ height: `${(45 * d.b1) / d.a1}px`, background: ratio === k && ratioCard === 'down' ? "#E4CCFD" : "#D4D4D4" }}>
                              {ratio === k && ratioCard === 'down' && <div className="heart"><img src="/assets/icons/heart_icon_01.svg" alt="" /></div>}
                              {d.a1}:{d.b1}
                            </div>
                          </div>
                        ))}

                      </div>
                    </Expand>
                    <div className="showBtn" onClick={() => setExpand(!expand)}>
                      <img src="/assets/icons/arrow_down_icon.svg" alt="" style={{ transform: expand ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </div>
                  </> :
                  <>
                    {ratioCard === 'up' ?
                      <div className="ratioMain" style={{ height: `${(50 * myData[ratio]?.b) / myData[ratio]?.a}px` }}>
                        <div className="heart"><img src="/assets/icons/crown_icon.svg" alt="" /></div> {myData[ratio]?.a}:{myData[ratio]?.b}
                      </div> :
                      <div className="ratioMain" style={{ height: `${(50 * myData[ratio]?.b1) / myData[ratio]?.a1}px` }}>
                        <div className="heart"><img src="/assets/icons/crown_icon.svg" alt="" /></div> {myData[ratio]?.a1}:{myData[ratio]?.b1}
                      </div>}
                    <div className="showBtn" onClick={() => setExpand(!expand)}>
                      <img src="/assets/icons/arrow_down_icon.svg" alt="" style={{ transform: expand ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </div>
                    <Expand open={expand} duration={300} styles={styles} transitions={transitions}>
                      <div className="ratioList" style={{ width: expand ? '100%' : '0px' }}>
                        {myData.map((d, k) => (
                          <div className="col" >
                            <div className="ratio" onClick={() => onClickRatioCard(k, d.a + ":" + d.b, 'up')} style={{ height: `${(35 * d.b) / d.a}px`, background: ratio === k && ratioCard === 'up' ? "#E4CCFD" : "#D4D4D4" }}>
                              {ratio === k && ratioCard === 'up' && <div className="heart"><img src="/assets/icons/heart_icon_01.svg" alt="" /></div>}
                              {d.a}:{d.b}
                            </div>
                            <div className="ratio" onClick={() => onClickRatioCard(k, d.a1 + ":" + d.b1, 'down')} style={{ height: `${(35 * d.b1) / d.a1}px`, background: ratio === k && ratioCard === 'down' ? "#E4CCFD" : "#D4D4D4" }}>
                              {ratio === k && ratioCard === 'down' && <div className="heart"><img src="/assets/icons/heart_icon_01.svg" alt="" /></div>}
                              {d.a1}:{d.b1}</div>
                          </div>
                        ))}

                      </div>
                    </Expand>

                  </>
                }
              </div>
            </div>
          </div>

          <div className={`${classes.step} step`}>
            <div className={classes.stepLeft}>
              <div className="circle" style={{ background: packID !== -1 ? '#F8B4E4' : '#d4d4d4' }}>3</div>
              <div className="leftLine" style={{ background: packID !== -1 ? '#F8B4E4' : '#d4d4d4' }}></div>
              <h3>Package</h3>
              <p>1, 3 or 5 iterations.</p>
            </div>
            <div className={classes.stepContent}>
              <div className="cards">
                {cardData.map((d, k) => (
                  <div className="card" onClick={() => setPackID(k)} key={k}>
                    {packID === k && <div className="heart"><img src="/assets/icons/crown_icon.svg" alt="" /></div>}
                    <span><h3>{d.name}</h3> <h3>{packPrices[k]}ETH</h3></span>
                    <span><h4>Paid in ETH</h4> <button style={{ background: k === packID ? "#E4CCFD" : "#D4D4D4" }}><img src={d.img} alt="" /> {d.count} image</button></span>
                  </div>
                ))}

              </div>
            </div>
          </div>

          <div className={`${classes.step} step`}>
            <div className={classes.stepLeft}>
              <div className="circle" style={{ background: (twitterChecked || telegramChecked) ? '#F8B4E4' : '#d4d4d4' }}>4</div>
              <h3>Your details</h3>
              <p>Notification will be sent to your twitter or telegram.</p>
            </div>
            <div className={classes.stepContent}>
              <div className="row">
                <div className="input-div">
                  <div className={`${classes.myCheck} myCheck`}>
                    <CheckBox value={user?.is_twitter_notify} onChange={setTwitterChecked} />
                    <h3>Twitter Notification</h3>
                    <i className="fab fa-twitter"></i>
                  </div>
                  <div className={`${classes.myCheck} myCheck`}>
                    <CheckBox value={user?.is_telegram_notify} onChange={setTelegramChecked} />
                    <h3>Telegram Notification</h3>
                    <i className="fab fa-telegram"></i>
                  </div>
                  <ErrorAlert title="One of both is recommended. Add username in user settings." show={twitterChecked && telegramChecked} alertType='warning' />
                </div>
                <FilledButton disabled={processingModal} label={'Get Art'} handleClick={onGetArt} />
              </div>
            </div>
          </div>
          <p className={classes.footText}>All Image Descriptions Are Verified By An Experienced Artist To Provide Best Result Possible.</p>

        </div>
      </div>

      <Modal
        show={processingModal}
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span>
                <img src="/assets/logo.png" alt="" />
                <h4>Your transaction is beeing processed</h4>
              </span>
              <button className="closeBtn" onClick={() => setProcessingModal(false)}><img src="/assets/icons/close_icon.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <span>
                <img src="/assets/icons/2.png" alt="" />
              </span>
              <div className="warning">
                <img src="/assets/icons/warning_icon.svg" alt="" />
                <p>Validate your transaction to continue.</p>
              </div>
            </div>

          </div>

        </>}
      />

      <Modal
        show={resultModal}
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span>
                <img src="/assets/logo.png" alt="" />
                <h4>Congratulation, Your art is coming your way!</h4>
              </span>
              <button className="closeBtn" onClick={() => setResultModal(false)}><img src="/assets/icons/close_icon.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <span>
                <p>An experienced ai artist is reviewing your image description, you’ll get notified once your art is ready.</p>
              </span>
            </div>
            <div className={classes.modalBtns}>
              <FilledButton label={'My Art'} color='secondary' handleClick={onGotoMyArt} />
              <FilledButton label={'Community Feed'} handleClick={onGotoCommunityFeed} />
            </div>
          </div>

        </>}
      />
    </>
  );
};

export default CreateArt;
