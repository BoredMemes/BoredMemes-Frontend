import './accountModal.scss'
import Bounce  from 'react-reveal/Bounce';
import { useEffect, useRef, useState } from 'react';
import { toast } from "react-toastify";
import useAuth from 'hooks/useAuth';
import { truncateWalletString } from 'utils';
import { useWeb3React } from '@web3-react/core';
interface Props {
    showAccountModal: boolean,
    setShowAccountModal?: any

}
const AccountModal: React.FC<Props> = ({
    showAccountModal,
    setShowAccountModal
}) => {
    const [isStart, setIsStart] = useState(false)
    useEffect(() => {
        if(showAccountModal)
        {
            setTimeout(() => {
                setIsStart(true)
            }, 100)
        }
        
    }, [setIsStart,  showAccountModal]);
    const onClose = ()=>{
        setIsStart(false)
        setTimeout(() => {
            setShowAccountModal(false);
        }, 800)
    }

    const { account } = useWeb3React();
    const inputEl = useRef<HTMLInputElement>(null);
    const clickHandle = () => {
        if (inputEl && inputEl.current) {
            inputEl.current.select();
            document.execCommand('copy');
            toast.success("Copied Address!");
        }
    }

    const { logout } = useAuth();
    const onDisconnect = ()=>{
        setIsStart(false)
        setTimeout(() => {
            setShowAccountModal(false);
            logout();
        }, 800)
    }
    return (
        <div className={showAccountModal === true ? "accountModal active" : "accountModal"}>
            <Bounce opposite when={isStart}>
            <div className="modelContent">
                <div className="connectWalletHeader">
                    <h1 className="connectWalletTitle">Account</h1>
                    <button className="connectModalCloseButton" onClick={onClose}><i className="fas fa-times"></i></button>
                </div>
                <div className="modalWraper">
                    <span className=''>
                        <img src="assets/avatar.png" alt="" className="avatar" />
                        <input className="addressInput " 
                            ref={inputEl} 
                            type="text" 
                            value={truncateWalletString(account) || ''}
                            onChange={() => { }} 
                        />
                        <button className="coppyAddressButton" onClick={clickHandle}>
                            <i className="fas fa-copy"></i>
                            <p> Copy Address</p>
                        </button>
                    </span>
                    <div className="modalBtns">
                        <a href="/" target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt"></i> View on explorer</a>
                    
                        <button className="disconnect" onClick= {onDisconnect}>Disconnect</button>
                    </div>
                </div>
            </div>
            </Bounce>

        </div>
    )
}
export default AccountModal;