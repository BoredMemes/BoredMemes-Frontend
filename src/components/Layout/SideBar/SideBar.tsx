import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './style.scss';
import ThemeContext from "theme/ThemeContext"
import Web3WalletContext from 'hooks/Web3ReactManager';
import { chainIdLocalStorageKey } from 'hooks';
import useAuth from 'hooks/useAuth';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
type MenuType = {
  menuOpen?: boolean;
  setMenuOpen?(flag: boolean): void;
};
let isChecked = window.localStorage.getItem("themeId") == 'dark' ? true : false

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(10px)',
    '&.Mui-checked': {
      value: 'sg',
      color: '#fff',
      transform: 'translateX(30px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 18,
    height: 18,
    marginTop: 8,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '90%',
      height: '90%',
      left: 0,
      top: 4,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function SideBar({ menuOpen, setMenuOpen }: MenuType) {

  const { loginStatus, account, library } = useContext(Web3WalletContext)
  const { switchNetwork } = useAuth();

  const search = useLocation();
  const path = search.pathname.replace('/', '');
  const history = useHistory();

  const [switchLabel, setSwitchLabel] = useState('Dark Mxxode');
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

  const onChangeHandler = (e) => {
    let theme = ''
    if(e.target.checked) {
      theme = 'dark'
      setSwitchLabel('Dark Mode');
    } else {
      setSwitchLabel('Light Mode');
      theme = 'light'
    }
    window.localStorage.setItem("themeId", theme);
    setTheme(theme);
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
        {/* <div className={`change_theme`}>
          <button onClick={() => onChangeTheme("light")} className={`${theme === 'light' ? "activeThemeBtn themeBtn" : "themeBtn"}`}><img src="/assets/icons/light_icon.svg" alt="" /> Light</button>
          <button onClick={() => onChangeTheme("dark")} className={`${theme === 'dark' ? "activeThemeBtn themeBtn" : "themeBtn"}`}><img src="/assets/icons/dark_icon.svg" alt="" /> Dark</button>
        </div> */}
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={isChecked} />}
          label={switchLabel}
          onChange={(e) => onChangeHandler(e)}
          className={switchLabel == 'Dark Mode' ? 'black' : 'white'}
        />
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
