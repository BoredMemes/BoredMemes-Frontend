import FilledButton from 'components/Buttons/FilledButton';
import { useStyles } from './style';
import toast from 'react-hot-toast';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import UploadFile from '../../components/Forms/UploadFile';
import ErrorAlert from '../../components/Widgets/ErrorAlert';
import TextInput from 'components/Forms/TextInput';
import CheckBox from 'components/Forms/CheckBox';
import Modal from 'components/modal';

const EditProfile = () => {
  const classes = useStyles();

  const [telegramChecked, setTelegramChecked] = useState(false);
  const [twitterChecked, setTwitterChecked] = useState(false);

  const [formSubmit, setFormSubmit] = useState(false);
  const [nftAsset, setNFTAsset] = useState(null);
  const [nftAssetType, setNFTAssetType] = useState('');
  const [name, setName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [description, setNFTDescription] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const [telegram, setTelegram] = useState(null);

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
    console.log(asset)
    setNFTAsset(asset);
    setNFTAssetType(getAssetType(asset.name));
  };

  const onSubmit = async data => {
    setFormSubmit(true);
    if (!account || !library) {
      toast.error('Please connect your wallet correctly!');
      return;
    }

    if (!name || !telegram || !description || !twitter) {
      return;
    }

    if (nftAssetType === '') {
      toast.error('Not Supported Content!');
      return;
    }
  };

  const [loginStatus, setLoginStatus] = useState(false);
  const { connector, library, chainId, account, active } = useWeb3React();
  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  function updatePreview(item) {}

  const [signModal, setSignModal] = useState(false);

  return (
    <>
      <div className={classes.root}>
        <div className={`${classes.content} mainContainer`}>
          <div className={classes.top}>
            <h1>Edit Profile</h1>
          </div>
          <form noValidate onSubmit={onSubmit} >
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
                    onChangeData={val => {
                      setName(val);
                      updatePreview({ name: val });
                    }}
                  />
                  <ErrorAlert title="A Name is required !" show={formSubmit && !name} />
                  <ErrorAlert title={`Name ${name} is available.`} show={name} alertType = 'success' />
                  <ErrorAlert title={`Name ${name} is already taken.`} show={false} alertType = 'warning'/>
                </Grid>
              </Grid>
              <br/>
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
                    endIcon={<><img src="/assets/icons/2.png" alt="" className={classes.loadingImg}/></>}
                    label={'Username'}
                    placeholder={'Username'}
                    onChangeData={val => {
                      setUserName(val);
                      updatePreview({ userName: val });
                    }}
                  />
                  {/* <ErrorAlert title="A username is required !" show={formSubmit && !userName} />
                  <ErrorAlert title={`Username ${name} is available.`} show={false} alertType = 'success' />
                  <ErrorAlert title={`Username ${name} is already taken.`} show={false} alertType = 'warning'/> */}
                  <ErrorAlert title="A username is required !" show={true} />
                  <ErrorAlert title={`Username ${name} is available.`} show={true} alertType = 'success' />
                  <ErrorAlert title={`Username ${name} is already taken.`} show={true} alertType = 'warning'/>
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
                    onChangeData={val => {
                      setNFTDescription(val);
                      updatePreview({ name: val });
                    }}
                  />
                  <ErrorAlert title="Bio is required !" show={formSubmit && !description} />
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
                    fileName={nftAsset?.name}
                    fileSize = {nftAsset?.size}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files[0]) {
                        onChangeNFTAsset(e.target.files[0]);
                        updatePreview({
                          assetType: getAssetType(e.target.files[0].name),
                          assetUrl: URL.createObjectURL(e.target.files[0]),
                        });
                      }
                    }}
                  />
                   <ErrorAlert title="Please select the Profile Image!" show={formSubmit && !nftAsset} />
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
                    endIcon = {<i className="fab fa-twitter"></i>}
                    label={<> <span></span> <span>Recommended</span></>}
                    placeholder={'@Username'}
                    onChangeData={val => {
                      setTwitter(val);
                      updatePreview({ name: val });
                    }}
                  />
                  <ErrorAlert title="User name is required !" show={formSubmit && !twitter} />
                  <ErrorAlert title={`User name ${twitter} is available.`} show={false} alertType = 'success' />
                  <ErrorAlert title={`User name ${twitter} is already taken.`} show={false} alertType = 'warning'/>


                  <TextInput
                    name="telegram"
                    disabled={!loginStatus}
                    className={classes.myInput}
                    error={formSubmit && !telegram}
                    wrapperClass={classes.formWrapper}
                    startIcon={"@"}
                    endIcon = {<i className="fab fa-telegram"></i>}
                    placeholder={'@Username'}
                    onChangeData={val => {
                      setTelegram(val);
                      updatePreview({ name: val });
                    }}
                  />
                  <ErrorAlert title="User name is required !" show={formSubmit && !telegram} />
                  <ErrorAlert title={`User name ${telegram} is available.`} show={false} alertType = 'success' />
                  <ErrorAlert title={`User name ${telegram} is already taken.`} show={false} alertType = 'warning'/>
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
                    <CheckBox onChange={setTwitterChecked}/>
                    <h3>Twitter Notification</h3>
                    <i className="fab fa-twitter"></i>
                  </div>
                  <div className={`${classes.myCheck} myCheck`}>
                    <CheckBox onChange={setTelegramChecked}/>
                    <h3>Telegram Notification</h3>
                    <i className="fab fa-telegram"></i>
                  </div>
                  <ErrorAlert title="One of both is recommanded." show={ twitterChecked && telegramChecked} alertType = 'warning' />
                </Grid>
              </Grid>
              
            </div>
            
          </form>
          <FilledButton label={'Save Changes'} className={classes.saveButton} handleClick = {()=>setSignModal(true)}/>
          
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
        show={signModal} 
        maxWidth = 'sm'
        children={<>
        <div className={classes.modal}>
          <div className={classes.modalTop}>
            <span>
              <img src="/assets/logo.png" alt="" />
              <h4>Sign the message in your wallet to continue</h4>
            </span>
            <button className="closeBtn" onClick={()=>setSignModal(false)}><img src="/assets/icons/close_icon.svg" alt="" /></button>
          </div>
          <div className={classes.modalContent}>
            <span>
              <img src="/assets/icons/2.png" alt="" />
            </span>
            <div className="warning">
              <img src="/assets/icons/warning_icon.svg" alt="" />
              <p>Bored Memes uses this signature to verify that you’re the owner of this Ethereum address.</p>
            </div>
          </div>
          <div className={classes.modalBtns}>
            <FilledButton label={'Disconnect'} color = 'secondary'/>
            <FilledButton label={'Continue'}/>
          </div>
        </div>

        </>}        
      />
    </>
  );
};

export default EditProfile;
