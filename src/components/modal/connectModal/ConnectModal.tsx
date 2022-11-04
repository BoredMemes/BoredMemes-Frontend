import useAuth from 'hooks/useAuth';
import './connectModal.scss';
import Bounce from 'react-reveal/Bounce';
import { useEffect, useState } from 'react';
interface Props {
  showConnectModal: boolean;
  setShowConnectModal?: any;
}
const ConnectModal: React.FC<Props> = ({ showConnectModal, setShowConnectModal }) => {
  const { login } = useAuth();

  const connectMetamask = () => {
    login(1);
    setShowConnectModal(false);
  };
  const connectWalletConnector = () => {
    login(2);
    setShowConnectModal(false);
  };
  const connectCoinbase = () => {
    login(3);
    setShowConnectModal(false);
  };

  const [isStart, setIsStart] = useState(false);
  useEffect(() => {
    if (showConnectModal) {
      setTimeout(() => {
        setIsStart(true);
      }, 100);
    }
  }, [setIsStart, showConnectModal]);
  const onClose = () => {
    setIsStart(false);
    setTimeout(() => {
      setShowConnectModal(false);
    }, 800);
  };

  return (
    <div className={showConnectModal === true ? 'connectModal active' : 'connectModal'}>
      <Bounce opposite when={isStart}>
        <div className="modelContent">
          <div className="connectWalletHeader">
            <h1 className="connectWalletTitle">Connect Wallet</h1>
            <button className="connectModalCloseButton" onClick={onClose}>
              <i className="fas fa-angle-double-right"></i>
            </button>
          </div>
          <div className="connectWalletWrapper">
            <div className="connectModalBtn metaMask" onClick={connectMetamask}>
              <div className="left">
                <div className="icon">
                  <img src="/assets/imgs/metamask.png" alt="" />
                </div>
              </div>
              <div className="middle">
                <h2>Metamask</h2>
                <p>Connect using browser wallet</p>
              </div>
            </div>
            <div className="connectModalBtn coinbase" onClick={connectCoinbase}>
              <div className="left">
                <div className="icon">
                  <img src="/assets/imgs/coinbase.png" alt="" />
                </div>
              </div>
              <div className="middle">
                <h2>Coinbase</h2>
                <p>Connect using coinbase</p>
              </div>
            </div>

            <div className="connectModalBtn wallet" onClick={connectWalletConnector}>
              <div className="left">
                <div className="icon">
                  <img src="/assets/imgs/wallet-connect.png" alt="" />
                </div>
              </div>
              <div className="middle">
                <h2>Wallet Connect</h2>
                <p>Connect using mobile wallet</p>
              </div>
            </div>
          </div>
        </div>
      </Bounce>
    </div>
  );
};
export default ConnectModal;
