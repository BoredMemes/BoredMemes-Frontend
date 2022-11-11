import { useWeb3React } from '@web3-react/core';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';
import ThemeContext from "theme/ThemeContext"
import Web3WalletContext from 'hooks/Web3ReactManager';
type MenuType = {
  menuOpen?: boolean;
  setMenuOpen?(flag: boolean): void;
};
export default function SideBar({ menuOpen, setMenuOpen }: MenuType) {

  const { loginStatus, account, library } = useContext(Web3WalletContext)

  const [navId, setNavId] = useState('');
  const search = useLocation();
  useEffect(() => {
    const path = search.pathname.replace('/', '');
    setNavId(path);
  }, [setNavId, search]);

  const { theme, setTheme } = useContext(ThemeContext)
  
  return (
    <div className="sideBar">

      <div className="navList" onClick={() => setMenuOpen(false)}>
        <h3>Bored Memes</h3>
        <ul className='bbr'>
          {loginStatus && <></>}
          <li className={navId === '' ? 'selected' : ''}>
            <Link to="/"><img src="/assets/icons/home_icon.svg" alt="" /> My Art</Link>
          </li>
          <li className={navId.indexOf('create_art') >= 0 ? 'selected' : ''}>
            <Link to="/create_art"><img src="/assets/icons/create_icon.svg" alt="" /> Create Art</Link>
          </li>
          <li className={navId.indexOf('community_feed') >= 0 ? 'selected' : ''}>
            <Link to="/community_feed"><img src="/assets/icons/community_icon.svg" alt="" /> Community Feed</Link>
          </li>
          <li className={navId.indexOf('bookmarks') >= 0 ? 'selected' : ''}>
            <Link to="/bookmarks"><img src="/assets/icons/bookmark_icon.svg" alt="" /> Bookmarks</Link>
          </li>
        </ul>

        <h3>Rewards</h3>
        <ul>
          <li className={navId.indexOf('miner') >= 0 ? 'selected' : ''}>
            <Link to="/miner"><img src="/assets/icons/miner_icon.svg" alt="" /> Miner</Link>
          </li>
          <li className={navId.indexOf('stake') >= 0 ? 'selected' : ''}>
            <Link to="/stake"><img src="/assets/icons/stake_icon.svg" alt="" /> Stake</Link>
          </li>
        </ul>
       
      </div>
      <div className="sideFooter"  onClick={() => setMenuOpen(false)}>
        <ul>
          <li className={navId.indexOf('settings') >= 0 ? 'selected' : ''}>
            <Link to="/edit_profile"><img src="/assets/icons/setting_icon.svg" alt="" /> Settings</Link>
          </li>
        </ul>
        <div className={`change_theme`}>
          <button onClick={() => setTheme("light")} className = {`${theme === 'light'?"activeThemeBtn themeBtn":"themeBtn"}`}><img src="/assets/icons/light_icon.svg" alt="" /> Light</button>
          <button onClick={() => setTheme("dark")} className = {`${theme === 'dark'?"activeThemeBtn themeBtn":"themeBtn"}`}><img src="/assets/icons/dark_icon.svg" alt="" /> Dark</button>
        </div>
        <div className="socialLinks">
          <a href="http://twitter.com/boredmemesAi" className = "twitter" target="_blank"rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a> 
          <a href="https://t.me/BoredMemesEntryPortal" className = "telegram" target="_blank"rel="noreferrer">
            <i className="fab fa-telegram"> </i>
          </a> 
          <a href="https://f1af1y.medium.com/bored-memes-boredm-fad095f74b97" className = "medium" target="_blank"rel="noreferrer">
          <i className="fab fa-medium-m"></i>
          </a> 
        </div>
      </div>
    </div>
  );
}
