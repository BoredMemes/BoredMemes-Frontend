import { useWeb3React } from '@web3-react/core';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './style.scss';
import ThemeContext from "theme/ThemeContext"
import Web3WalletContext from 'hooks/Web3ReactManager';
import { chainIdLocalStorageKey} from 'hooks';
import useAuth from 'hooks/useAuth';
import { getCurrentNetwork } from 'utils';
type MenuType = {
  menuOpen?: boolean;
  setMenuOpen?(flag: boolean): void;
};
export default function SideBar({ menuOpen, setMenuOpen }: MenuType) {

  const { loginStatus, account, library } = useContext(Web3WalletContext)
  const { switchNetwork } = useAuth();

  const search = useLocation();
  const path = search.pathname.replace('/', '');
  const history = useHistory();

  const { theme, setTheme } = useContext(ThemeContext)
  const onChangeRoute = (route) => {
    history.push(route);
    const _chainId = route === "miner" ? process.env.REACT_APP_BSC_NETWORK_ID : process.env.REACT_APP_ETH_NETWORK_ID;
    if (getCurrentNetwork() !== _chainId){
      switchNetwork();
      window.location.reload();
    }
  }
  
  //switchNetwork();
  useEffect(() => {
    window.localStorage.setItem(chainIdLocalStorageKey, path === "miner" ? process.env.REACT_APP_BSC_NETWORK_ID : process.env.REACT_APP_ETH_NETWORK_ID);
    switchNetwork();
  }, [path])

  return (
    <div className="sideBar">

      <div className="navList" onClick={() => setMenuOpen(false)}>
        <h3>Bored Memes</h3>
        <ul className='bbr'>
          {loginStatus && <></>}
          <li className={path.indexOf('my_art') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("my_art")}><img src="/assets/icons/home_icon.svg" alt="" /> My Art</div>
          </li>
          <li className={path.indexOf('create_art') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("create_art")}><img src="/assets/icons/create_icon.svg" alt="" /> Create Art</div>
          </li>
          <li className={path.indexOf('community_feed') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("community_feed")}><img src="/assets/icons/community_icon.svg" alt="" /> Community Feed</div>
          </li>
          <li className={path.indexOf('bookmarks') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("bookmarks")}><img src="/assets/icons/bookmark_icon.svg" alt="" /> Bookmarks</div>
          </li>
        </ul>

        <h3>Rewards</h3>
        <ul>
          <li className={path === 'miner' ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("miner")}><img src="/assets/icons/miner_icon.svg" alt="" /> Miner</div>
          </li>
          <li className={path === '' ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("")}><img src="/assets/icons/stake_icon.svg" alt="" /> Stake</div>
          </li>
        </ul>

      </div>
      <div className="sideFooter" onClick={() => setMenuOpen(false)}>
        <ul>
          <li className={path.indexOf('edit_profile') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("edit_profile")}><img src="/assets/icons/setting_icon.svg" alt="" /> Settings</div>
          </li>
        </ul>
        <div className={`change_theme`}>
          <button onClick={() => setTheme("light")} className={`${theme === 'light' ? "activeThemeBtn themeBtn" : "themeBtn"}`}><img src="/assets/icons/light_icon.svg" alt="" /> Light</button>
          <button onClick={() => setTheme("dark")} className={`${theme === 'dark' ? "activeThemeBtn themeBtn" : "themeBtn"}`}><img src="/assets/icons/dark_icon.svg" alt="" /> Dark</button>
        </div>
        <div className="socialLinks">
          <a href="http://twitter.com/boredmemesAi" className="twitter" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://t.me/BoredMemesEntryPortal" className="telegram" target="_blank" rel="noreferrer">
            <i className="fab fa-telegram"> </i>
          </a>
          <a href="https://f1af1y.medium.com/bored-memes-boredm-fad095f74b97" className="medium" target="_blank" rel="noreferrer">
            <i className="fab fa-medium-m"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
