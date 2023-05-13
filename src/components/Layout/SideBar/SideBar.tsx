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
import { getDistributorInfo, onFuelUp } from 'utils/contracts';
import { Networks } from 'utils';
import { toast } from 'react-toastify';
type MenuType = {
  menuOpen?: boolean;
  setMenuOpen?(flag: boolean): void;
};
let isChecked = window.localStorage.getItem("themeId") == 'dark' ? true : false

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 36,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      value: 'sg',
      color: '#fff',
      transform: 'translateX(30px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(assets/icons/theme-dark-icon.png)`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    background: 'transparent',
    boxShadow: 'none',
    width: 23,
    height: 23,
    marginTop: 8,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '88%',
      left: 0,
      top: 4,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(assets/icons/theme-light-icon.png)`,
    },
  },
  '& .MuiSwitch-track': {
    border: 'solid 1px #ccc',
    opacity: 1,
    backgroundColor: '#e9e9e9 !important',
    borderRadius: 16,
  },
  '& .MuiFormControlLabel-label': {
    color: '#aaa'
  }
}));

export default function SideBar({ menuOpen, setMenuOpen }: MenuType) {

  const { loginStatus, account, chainId, library } = useContext(Web3WalletContext)
  const { switchNetwork } = useAuth();

  const search = useLocation();
  const path = search.pathname.replace('/', '');
  const history = useHistory();

  const { theme, setTheme } = useContext(ThemeContext)
  const onChangeRoute = (route) => {
    history.push(route);
    if (route.indexOf('art') >= 0) window.location.reload();
  }

  useEffect(() => {
    // window.localStorage.setItem(chainIdLocalStorageKey, path === "miner" ? process.env.REACT_APP_BSC_NETWORK_ID : process.env.REACT_APP_ETH_NETWORK_ID);
    // switchNetwork();
  }, [path, account, library])

  useEffect(() => {
    getDistriInfo();
  }, [loginStatus, chainId, account]);

  const [distributorInfo, setDistributorInfo] = useState(null);
  const getDistriInfo = async () => {
    if (loginStatus && account) {
      const _info = await getDistributorInfo(chainId);
      setDistributorInfo(_info);
    }
  }

  const onChangeHandler = (e) => {
    let theme = e.target.checked ? "light" : "dark"
    window.localStorage.setItem("themeId", theme);
    setTheme(theme);
  }

  const fuelUp = async () => {
    if (loginStatus && chainId && account) {
      const isSuccess = await onFuelUp(chainId, library.getSigner())
      if (isSuccess) {
        toast.success("Triggered Successfully")
      }
    } else {
      toast.error("Please connect your wallet.")
    }

  }

  return (
    <div className="sideBar">

      <div className="navList" onClick={() => setMenuOpen(false)}>
        <h3>PIXIA AI</h3>
        <ul className='bbr'>
          {loginStatus && <li className={path.indexOf('art') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/art/" + account)}>
              {/* <img src="/assets/icons/home_icon.svg" alt="" /> */}
              <i className="fas fa-home"></i>
              My Art</div>
          </li>}

          {/* <li className={path.indexOf('create_art') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/create_art")}><img src="/assets/icons/create_icon.svg" alt="" /> Create Art</div>
          </li> */}
          <li className={path === "" || path.indexOf('community_feed') >= 0 || path.indexOf('personal_feed') >= 0 || path.indexOf('bookmarks') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/community_feed")}><img src="/assets/icons/community_icon.svg" alt="" /> Explorer</div>
          </li>
          {
            loginStatus && <li className={path.indexOf('blind_mint') >= 0 ? 'selected' : ''}>
              <div onClick={() => onChangeRoute("/blind_mint")}>
                <i className="fab fa-microsoft"></i>
                Blind Mint</div>
            </li>
          }

          {/* <li className={path.indexOf('bookmarks') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/bookmarks")}>
              <i className="fas fa-bookmark"></i>
              Bookmarks</div>
          </li> */}
        </ul>
        {
          false && loginStatus && account && <>
            <h3>Rewards</h3>
            <ul>
              <li className={path === 'staking' ? 'selected' : ''}>
                <div onClick={() => onChangeRoute("/staking")}><img src="/assets/icons/farms_icon.svg" alt="" /> Farms</div>
              </li>
              <li className={path === 'hub' ? 'selected' : ''}>
                <div onClick={() => onChangeRoute("/hub")}><img src="/assets/icons/manage_hub_icon.svg" alt="" /> Manage Hub</div>
              </li>
            </ul>
          </>
        }
      </div>
      {loginStatus && account && <div className="sideIncome">
        <div className="sideStake">
          <p>Total Revenues</p>
          <div>{distributorInfo ? distributorInfo[4].toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0} {chainId === (process.env.REACT_APP_NODE_ENV === "development" ? Networks.ETH_TestNet : Networks.ETH_MainNet) ? "ETH" : "BNB"}</div>
        </div>
      </div>}
      {loginStatus && account && <div className="stakeInfo">
        <div className="sideStake">
          <p>PIXIA Liquidity</p>
          <div>{distributorInfo ? distributorInfo[0].toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0} {chainId === (process.env.REACT_APP_NODE_ENV === "development" ? Networks.ETH_TestNet : Networks.ETH_MainNet) ? "ETH" : "BNB"}</div>
        </div>
        <div className="sideStake">
          <p>PIXIA Burn</p>
          <div>{distributorInfo ? distributorInfo[1].toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0} {chainId === (process.env.REACT_APP_NODE_ENV === "development" ? Networks.ETH_TestNet : Networks.ETH_MainNet) ? "ETH" : "BNB"}</div>
        </div>
        <div className="sideStake">
          <p>Staking Reward</p>
          <div>{distributorInfo ? distributorInfo[2].toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0} {chainId === (process.env.REACT_APP_NODE_ENV === "development" ? Networks.ETH_TestNet : Networks.ETH_MainNet) ? "ETH" : "BNB"}</div>
        </div>
        <div className="sideStake">
          <p>Caller Reward</p>
          <div>{distributorInfo ? distributorInfo[3].toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0} {chainId === (process.env.REACT_APP_NODE_ENV === "development" ? Networks.ETH_TestNet : Networks.ETH_MainNet) ? "ETH" : "BNB"}</div>
        </div>
        <div className='fuelup' onClick={() => fuelUp()}>FUEL UP</div>
      </div>}

      <div className="sideFooter" onClick={() => setMenuOpen(false)}>
        {loginStatus && account && <ul>
          <li className={path.indexOf('edit_profile') >= 0 ? 'selected' : ''}>
            <div onClick={() => onChangeRoute("/edit_profile")}>
              {/* <img src="/assets/icons/setting_icon.svg" alt="" />  */}
              <i className="fas fa-cog"></i>
              Settings</div>
          </li>
        </ul>}
        {/* <div className={`change_theme`}>
          <button onClick={() => onChangeTheme("light")} className={`${theme === 'light' ? "activeThemeBtn themeBtn" : "themeBtn"}`}><img src="/assets/icons/light_icon.svg" alt="" /> Light</button>
          <button onClick={() => onChangeTheme("dark")} className={`${theme === 'dark' ? "activeThemeBtn themeBtn" : "themeBtn"}`}><img src="/assets/icons/dark_icon.svg" alt="" /> Dark</button>
        </div> */}
        {/* <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={isChecked} />}
          label={theme === "dark" ? "Light Mode" : "Dark Mode"}
          onChange={(e) => onChangeHandler(e)}
          className={theme == 'dark' ? 'black' : 'white'}
        /> */}
        <div className="socialLinks">
          <a href="https://twitter.com/pixiaai" className="twitter" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://t.me/PixiaAi" className="telegram" target="_blank" rel="noreferrer">
            <i className="fab fa-telegram"> </i>
          </a>
          <a href="https://blog.pixia.ai/" className="medium" target="_blank" rel="noreferrer">
            <i className="fab fa-medium-m"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
