import { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './style.scss';
import ThemeContext from "theme/ThemeContext"
import Web3WalletContext from 'hooks/Web3ReactManager';
import { chainIdLocalStorageKey } from 'hooks';
import useAuth from 'hooks/useAuth';
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
  }

  useEffect(() => {
    // window.localStorage.setItem(chainIdLocalStorageKey, path === "miner" ? process.env.REACT_APP_BSC_NETWORK_ID : process.env.REACT_APP_ETH_NETWORK_ID);
    // switchNetwork();
  }, [path, account, library])

  const onChangeTheme = (_theme) => {
    window.localStorage.setItem("themeId", _theme);
    setTheme(_theme);
  }

  return (
    <div className="sideBar">

      <div className="navList" onClick={() => setMenuOpen(false)}>
        <h3>PIXIA AI</h3>
        <ul className='bbr'>
          {loginStatus && <></>}
          <li className={path.indexOf('my_art') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/my_art")}><img src="/assets/icons/home_icon.svg" alt="" /> My Art</div>
          </li>
          {/* <li className={path.indexOf('create_art') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/create_art")}><img src="/assets/icons/create_icon.svg" alt="" /> Create Art</div>
          </li> */}
          <li className={path.indexOf('community_feed') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/community_feed")}><img src="/assets/icons/community_icon.svg" alt="" /> Community Feed</div>
          </li>
          <li className={path.indexOf('personal_feed') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/personal_feed")}><img src="/assets/icons/personal_icon.svg" alt="" /> Personal Feed</div>
          </li>
          <li className={path.indexOf('bookmarks') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/bookmarks")}><img src="/assets/icons/bookmark_icon.svg" alt="" /> Bookmarks</div>
          </li>
        </ul>

        <h3>Rewards</h3>
        <ul>
          <li className={path === 'miner' ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/miner")}><img src="/assets/icons/farms_icon.svg" alt="" /> Farms</div>
          </li>
          <li className={path === '' ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("")}><img src="/assets/icons/manage_hub_icon.svg" alt="" /> Manage Hub</div>
          </li>
        </ul>
      </div>
      
      <div className="stakeInfo">
        <div className="sideStake">
          <p>PIXIA Liquidity</p>
          <div>0.5 ETH</div>
        </div>
        <div className="sideStake">
          <p>Staking Reward</p>
          <div>0.5 ETH</div>
        </div>
        <div className="sideStake">
          <p>Caller Reward</p>
          <div>0.5 ETH</div>
        </div>
        <div className='fuelup'>FUEL UP</div>
      </div>

      <div className="sideFooter" onClick={() => setMenuOpen(false)}>
        <ul>
          <li className={path.indexOf('edit_profile') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/edit_profile")}><img src="/assets/icons/setting_icon.svg" alt="" /> Settings</div>
          </li>
        </ul>
        <div className={`change_theme`}>
          <button onClick={() => onChangeTheme("light")} className={`${theme === 'light' ? "activeThemeBtn themeBtn" : "themeBtn"}`}><img src="/assets/icons/light_icon.svg" alt="" /> Light</button>
          <button onClick={() => onChangeTheme("dark")} className={`${theme === 'dark' ? "activeThemeBtn themeBtn" : "themeBtn"}`}><img src="/assets/icons/dark_icon.svg" alt="" /> Dark</button>
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
