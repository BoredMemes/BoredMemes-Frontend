import { useWeb3React } from "@web3-react/core";
import {  useEagerConnect, useInactiveListener} from "hooks";
import { useState, createContext, useEffect } from "react"
import { getCurrentNetwork, Networks } from "utils";

const Web3WalletContext = createContext({
  loginStatus : false,
  setLoginStatus : (val : boolean) => {},
  account : null,
  library : null,
  chainId : null,
})

export default Web3WalletContext;

export function Web3ReactManager({ children }) {

  const { connector, library, account, active, chainId, activate } = useWeb3React();
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    console.log("Chain ID : ", chainId)
    console.log("account : ", account)
    const isLoggedin = account && active && (chainId === Networks.ETH_MainNet || chainId === Networks.BSC_Mainnet);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  const value = { loginStatus, setLoginStatus, account, library, chainId }

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  return (
    <Web3WalletContext.Provider value={value}>
      {children}
    </Web3WalletContext.Provider>
  );
}
