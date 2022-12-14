import FilledButton from 'components/Buttons/FilledButton';
import { useStyles } from './style';
import { toast } from "react-toastify";
import { useWeb3React } from '@web3-react/core';
import { useContext, useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import UploadFile from '../../components/Forms/UploadFile';
import ErrorAlert from '../../components/Widgets/ErrorAlert';
import TextInput from 'components/Forms/TextInput';
import CheckBox from 'components/Forms/CheckBox';
import Modal from 'components/modal';
import axios from 'axios';
import { arrayify, hashMessage } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { useAuthState } from 'context/authContext';

const EditProfile = () => {

  const { loginStatus, account, library } = useContext(Web3WalletContext)
  const { user } = useAuthState();
  const classes = useStyles();

  const [telegramChecked, setTelegramChecked] = useState(false);
  const [twitterChecked, setTwitterChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const [formSubmit, setFormSubmit] = useState(false);
  const [nftAsset, setNFTAsset] = useState(undefined);
  const [nftAssetType, setNFTAssetType] = useState('image');
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setNFTDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");

  const [signModal, setSignModal] = useState(false);

  function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

  function getAssetType(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'png':
      case 'heif':
      case 'heic':
      case 'tiff':
      case 'raw':
        return 'Image';
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
        return 'Video';
      case 'mp3':
        return 'Audio';
    }
    return '';
  }

  const onChangeNFTAsset = async asset => {
    setNFTAsset(asset);
    setNFTAssetType(getAssetType(asset.name));
  };
  const [isSigned, setSigned] = useState(false);
  const [signMsg, setSignMsg] = useState("");
  const [curTimestamp, setTimestamp] = useState(0);
  const onSubmit = async () => {
    setFormSubmit(true);
    if (!account || !library) {
      toast.error('Please connect your wallet correctly!');
      return;
    }
    if (userName === '' && user?.username == '')return;
    if (!twitterChecked && !telegramChecked && !emailChecked)return;
    setSignModal(true)
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const msg = await library.getSigner().signMessage(arrayify(hashMessage(account?.toLowerCase() + "-" + timestamp)));
    setSigned(msg && msg !== "")
    setSignMsg(msg);
    setTimestamp(timestamp);
  };

  const closeProfile = async () => {
    setSignModal(false);
    setSigned(false);
    setSignMsg("")
    setTimestamp(0);
  }

  const updateProfile = async () => {
    if (!signMsg && !curTimestamp) return;

    const notifyIds = [];
    if (twitterChecked)notifyIds.push(1);
    if (telegramChecked)notifyIds.push(2);
    if (emailChecked)notifyIds.push(3);
    console.log(notifyIds);

    let formData = new FormData();
    if (nftAsset !== undefined)formData.append('file', nftAsset);
    else formData.append('logo_url', user?.logo_url);
    formData.append("address", account?.toLowerCase());
    formData.append("timestamp", curTimestamp.toString());
    formData.append("message", signMsg);
    formData.append("name", name);
    formData.append("username", userName === "" ? user?.username : userName);
    formData.append("description", description);
    formData.append("twitter", twitter);
    formData.append("telegram", telegram);
    formData.append("email", email);
    formData.append("notifyIds", JSON.stringify(notifyIds));
    axios.post("/api/user/update", formData, {
      headers: {
        "Content-Type" : "multipart/form-data",
      }
    })
      .then((res) => {
        closeProfile();
        if (res.data.message === "success"){
          toast.success("Saved Successfully.")
          window.location.href = "/";
        }
      }).catch((err) => {
        console.log(err);
        closeProfile();
        toast.error(err.message);

      })
  }

  const [isAvailable, setAvailable] = useState(true);
  const [isNameLoading, setNameLoading] = useState(false);
  function checkUserName() {
    if (!loginStatus)return;
    setNameLoading(true);
    axios.get("/api/user/checkname", { params: { username: userName, address: account?.toLowerCase() } })
      .then((res) => {
        setAvailable(res.data.status);
        setNameLoading(false);
      }).catch((err) => {
        console.log(err);
        setAvailable(true);
        setNameLoading(false);
      })
  }
  
  useEffect(() => {
    if (isNameLoading) return;
    if (userName === "") return;
    let _delay = setTimeout(() => {
      checkUserName();
    }, 2000);
    return () => clearTimeout(_delay);
  }, [userName])

  return (
    <>
      <div className={classes.root}>
        <div className={`${classes.content} mainContainer`}>
          <div className={classes.top}>
            <h1>Edit Profile</h1>
          </div>
          {/* <form noValidate onSubmit={onSubmit} > */}
          <div className={`${classes.panel} panel`}>
            <Grid container justifyContent="space-between" spacing={4} >
              <Grid item md={4} xs={12} >
                <h2>Enter your details.</h2>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextInput
                  name="name"
                  disabled={!loginStatus}
                  className={classes.myInput}
                  error={formSubmit && !name}
                  wrapperClass={classes.formWrapper}
                  label={<>Name <span>Optional</span></>}
                  placeholder={'Name'}
                  value={user?.name}
                  onChangeData={val => {
                    setName(val);
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container justifyContent="space-between" spacing={4}>
              <Grid item md={4} xs={12}>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextInput
                  name="username"
                  disabled={!loginStatus}
                  className={classes.myInput}
                  error={formSubmit && !userName}
                  wrapperClass={classes.formWrapper}
                  startIcon={"@"}
                  endIcon={isNameLoading && <><img src="/assets/icons/2.png" alt="" className={classes.loadingImg} /></>}
                  label={'Username'}
                  placeholder={'Username'}
                  value={user?.username}
                  onChangeData={val => { if (val !== user?.username)setUserName(val); }}
                />
                <ErrorAlert title="A username is required !" show={userName === "" && user?.username === ""} />
                <ErrorAlert title={`Username ${userName} is available.`} show={!isNameLoading && userName !== "" && isAvailable} alertType='success' />
                <ErrorAlert title={`Username ${userName} is already taken.`} show={!isNameLoading && userName !== "" && !isAvailable} alertType='warning' />
              </Grid>
            </Grid>
          </div>

          <div className={`${classes.panel} panel`}>
            <Grid container justifyContent="space-between" spacing={4}>
              <Grid item md={4} xs={12}>
                <h2>Add a short bio.</h2>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextInput
                  name="bio"
                  disabled={!loginStatus}
                  className={classes.myInput}
                  error={formSubmit && !description}
                  wrapperClass={classes.formWrapper}
                  label={<>Enter a short bio <span>Optional</span></>}
                  isMulti
                  footer={<span>0/200</span>}
                  placeholder={'Enter a short bio'}
                  value={user?.bio}
                  onChangeData={val => {
                    setNFTDescription(val);
                  }}
                />
              </Grid>
            </Grid>

          </div>

          <div className={`${classes.panel} panel`}>
            <Grid container justifyContent="space-between" spacing={4}>
              <Grid item md={4} xs={12}>
                <h2>Upload a profile image.</h2>
                <p>Recommended size:</p>
                <p>1000x1000px.</p>
                <p>JPG, PNG, or GIF.</p>
                <p>10MB max size.</p>
              </Grid>
              <Grid item md={8} xs={12}>
                <h3 className={classes.label}>Profile image <span>Optional</span></h3>
                <UploadFile
                  label="Upload"
                  dispalyAsset
                  defaultAsset={user?.logo_url}
                  defaultAssetType="Image"
                  fileName={nftAsset?.name}
                  fileSize={nftAsset?.size}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      onChangeNFTAsset(e.target.files[0]);
                    }
                  }}
                />
              </Grid>
            </Grid>

          </div>

          <div className={`${classes.panel} panel`}>
            <Grid container justifyContent="space-between" spacing={4}>
              <Grid item md={4} xs={12}>
                <h2>Verify your profile.</h2>
                <p>Show the Bored memes community that your profile is authentic.</p>
              </Grid>
              <Grid item md={8} xs={12}>
                <TextInput
                  name="twitter"
                  disabled={!loginStatus}
                  className={classes.myInput}
                  error={formSubmit && !twitter}
                  wrapperClass={classes.formWrapper}
                  startIcon={"@"}
                  endIcon={<i className="fab fa-twitter"></i>}
                  label={<> <span></span> <span>Recommended</span></>}
                  placeholder={'Twitter'}
                  value={user?.social_twitter_id}
                  onChangeData={val => {
                    setTwitter(val);
                  }}
                />
                <TextInput
                  name="telegram"
                  disabled={!loginStatus}
                  className={classes.myInput}
                  error={formSubmit && !telegram}
                  wrapperClass={classes.formWrapper}
                  startIcon={"@"}
                  endIcon={<i className="fab fa-telegram"></i>}
                  placeholder={'Telegram'}
                  value={user?.social_telegram_id}
                  onChangeData={val => {
                    setTelegram(val);
                  }}
                />
                <TextInput
                  name="email"
                  disabled={!loginStatus}
                  className={classes.myInput}
                  error={formSubmit && !email}
                  wrapperClass={classes.formWrapper}
                  
                  endIcon={<i className="fa fa-envelope"></i>}
                  placeholder={'Email'}
                  value={user?.social_email}
                  onChangeData={val => {
                    setEmail(val);
                  }}
                />
              </Grid>
            </Grid>

          </div>

          <div className={`${classes.panel} panel`}>
            <Grid container justifyContent="space-between" spacing={4}>
              <Grid item md={4} xs={12}>
                <h2>Art creation Notifications.</h2>
                <p>Receive twitter and/or telegram notifications when your custom art are ready.</p>
              </Grid>
              <Grid item md={8} xs={12}>
                <h3 className={classes.label}><span></span> <span>Recommended</span></h3>
                <div className={`${classes.myCheck} myCheck`}>
                  <CheckBox value={user?.notifyIds.includes(1)} onChange={(checked) => {
                    setTwitterChecked(checked);
                  }} />
                  <h3>Twitter Notification</h3>
                  <i className="fab fa-twitter"></i>
                </div>
                <div className={`${classes.myCheck} myCheck`}>
                  <CheckBox value={user?.notifyIds.includes(2)} onChange={(checked) => {
                    setTelegramChecked(checked);
                  }} />
                  <h3>Telegram Notification</h3>
                  <i className="fab fa-telegram"></i>
                </div>
                <div className={`${classes.myCheck} myCheck`}>
                  <CheckBox value={user?.notifyIds.includes(3)} onChange={(checked) => {
                    setEmailChecked(checked);
                  }} />
                  <h3>Email Notification</h3>
                  <i className="fa fa-envelope"></i>
                </div>
                {/* <ErrorAlert title="One of 3 is recommanded." show={((twitterChecked ? 1 : 0) + (telegramChecked ? 1 : 0) + (emailChecked ? 1 :0)) > 1 } alertType='warning' /> */}
              </Grid>
            </Grid>

          </div>
          <FilledButton label={'Save Changes'} className={classes.saveButton} handleClick={() => onSubmit()} />


        </div>
        <div className={`${classes.right} mainContainer`}>
          <div className={classes.top}>
            <h1>Highlights</h1>
          </div>
          {/* <div className={`${classes.rewardCard} rewardCard`}>
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

          </div> */}
          <div className={classes.buyPanel}>
            <ul>
              <li>
                <div className="balance" style={{ backgroundImage: `url('/assets/imgs/Rectangle 29.png')` }}>
                  <h2>$BoredM </h2> <img src="/assets/icons/eth_icon_01.svg" alt="" /> <h2>0.0???7036 ETH</h2>
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
        </div>
      </div>


      <Modal
        show={signModal}
        maxWidth='sm'
        children={<>
          <div className={classes.modal}>
            <div className={classes.modalTop}>
              <span>
                <img src="/assets/logo.png" alt="" />
                <h4>Sign the message in your wallet to continue</h4>
              </span>
              <button className="closeBtn" onClick={() => setSignModal(false)}><img src="/assets/icons/close_icon.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              {
                !isSigned && <span>
                  <img src="/assets/icons/2.png" alt="" />
                </span>
              }

              <div className="warning">
                <img src="/assets/icons/warning_icon.svg" alt="" />
                <p>Bored Memes uses this signature to verify that you???re the owner of this Ethereum address.</p>
              </div>
            </div>
            <div className={classes.modalBtns}>
              <FilledButton label={'Disconnect'} color='secondary' handleClick={(e) => {closeProfile();}}/>
              <FilledButton label={'Continue'} disabled={!isSigned} handleClick={(e) => { updateProfile(); }} />
            </div>
          </div>

        </>}
      />
    </>
  );
};

export default EditProfile;
