import { useWeb3React } from '@web3-react/core';
import ConnectModal from 'components/modal/connectModal/ConnectModal';
import { useContext, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { getBalanceOfBoredM } from 'utils/contracts';
import { truncateWalletString } from 'utils';
import './topbar.scss';
import FormatMoneyOptionLabel from '../../selectOptionFormat/FormatMoneyOptionLabel';
import Select from "react-select";
import AccountModal from 'components/modal/accountModal/AccountModal';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { useAuthState } from 'context/authContext';
type MenuType = {
  menuOpen?: boolean;
  setMenuOpen?(flag: boolean): void;
};
const customStyles = {
  control: base => ({
    ...base,
    // fontSize: 'min(0.8vw, 13px)',
    fontSize: '0.8vw',
    fontWeight: '500 !important',
    borderRadius: '50px',
    border: '1px solid #ddd !important',
    boxShadow: 'none',
    background: '#72727233',
    // height : 40,
    minWidth: '10vw',
    '@media screen and (min-width: 1980px) ': {
      fontSize: 18,
    },
    '&:focus': {
      border: '0 !important',
    },
    '@media screen and (max-width: 768px) and (orientation: portrait)': {
      fontSize: 14,
    },
  }),

  menu: (provided, state) => ({
    ...provided,
    border: '1px solid #ffffff13',
    // color: '#fff',
    color: '#93989A',
    padding: 0,
    background: '#fff',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #aaa',
    padding: 3,
    // color: '#93989A',
    cursor: 'pointer',
    fontSize: '0.8vw',
    // fontSize: 'min(0.8vw, 13px)',
    '@media screen and (min-width: 1980px) ': {
      fontSize: 18,
    },
    color: state.isSelected ? 'white' : '#93989A !important',
    background: state.isSelected ? '#a9e3ff' : '#00000000 !important',
    '@media screen and (max-width: 768px) and (orientation: portrait)': {
      fontSize: 14,
    },
    ':hover': {
      background: '#00000022 !important',
      color: '#93989A !important',
    },
    ':active': {
      color: '#fff !important',
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export default function Topbar({ menuOpen, setMenuOpen }: MenuType) {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showAcountModal, setShowAcountModal] = useState(false);

  const { loginStatus, account, library, chainId } = useContext(Web3WalletContext)
  const { user } = useAuthState();

  const [networkOption, setNetworkOption] = useState(null);

  useEffect(() => {
    if (loginStatus && chainId) {
      //console.log("Chain ID : ", chainId);
      setNetworkOption(chainId !== 56 ? options[0] : options[1])
    }
  }, [loginStatus, chainId]);

  const options = [
    { value: "eth", label: "ETHEREUM", customAbbreviation: "eth", chainId: 1 },
    { value: "bin", label: "BINANCE", customAbbreviation: "bin", chainId: 56 },
  ];
  const onChange = (e) => {
  }
  return (
    <div className="nav-background">
      <div className="topbar">
        <div className="logo">
          <HashLink to="/">
            <img src="/assets/logo.png" alt="" />
            <img src="/assets/BoredMemes_FontLogo 1.png" alt="" className='textLogo' />
          </HashLink>
        </div>
        <div className="btns">
          <Select
            value={networkOption}
            defaultValue={networkOption}
            formatOptionLabel={FormatMoneyOptionLabel}
            options={options}
            instanceId='chainSelect'
            className={`select-gray`}
            onChange={(e) => onChange(e)}
            isSearchable={false}
            isClearable={false}
            styles={customStyles}
          />
          <div className="connectBtn" onClick={() => !loginStatus ? setShowConnectModal(true) : setShowAcountModal(true)}>
            {loginStatus ? truncateWalletString(account) : 'Connect Wallet'}
          </div>
          {loginStatus &&
            <HashLink to="/">
              <img src={user?.logo_url} alt="" className='avatar' />
            </HashLink>
          }

        </div>
        <div className={menuOpen ? 'hamburger active' : 'hamburger'} onClick={() => setMenuOpen(!menuOpen)}>
          <span className="line1"></span>
          <span className="line2"></span>
          <span className="line3"></span>
        </div>
        <ConnectModal showConnectModal={showConnectModal} setShowConnectModal={setShowConnectModal} />
        <AccountModal showAccountModal={showAcountModal} setShowAccountModal={setShowAcountModal} />
      </div>
    </div>
  );
}
