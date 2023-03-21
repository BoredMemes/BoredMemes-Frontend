
import ConnectModal from 'components/modal/connectModal/ConnectModal';
import useAuth from 'hooks/useAuth';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { useContext, useState } from 'react';
import { useStyles } from './style';

const Login = () => {
  const classes = useStyles();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const { loginStatus, account, library, chainId } = useContext(Web3WalletContext)
  const { switchNetwork } = useAuth();

  return (
    <>
      <div className={`${classes.container}`} >
        <img src='assets/imgs/ai-logo.png' className={classes.logo} />
        <div className={classes.text_body}>
          <p className={classes.text_1}> Unleash your </p>
          <p className={classes.text_2} style={{WebkitTextFillColor: 'text'}}>Potential </p>
        </div>
        <p className={classes.pixia_text}>To start using Pixia</p>
        <button className={classes.connect_btn_wallet}
          onClick={() => setShowConnectModal(true)}
        >Connect Wallet</button>
        <p className={classes.pixia_text_mobile}>To start using Pixia</p>
      </div>
      <ConnectModal showConnectModal={showConnectModal} setShowConnectModal={setShowConnectModal} />
    </>
  );
};

export default Login;
