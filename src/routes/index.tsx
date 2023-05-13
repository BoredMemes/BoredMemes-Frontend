import { BrowserRouter as Switch, Route, useHistory, useLocation  } from 'react-router-dom';
import Layout from 'components/Layout';

import MyArt from 'containers/MyArt';
import BlindMint from 'containers/BlindMint';
import ScrollToTop from 'utils/scrollToTop';
import Staking from 'containers/Pool';
import Hub from 'containers/Hub';
import Login from 'containers/Login';
import EditProfile from 'containers/EditProfile';
import ViewArt from 'containers/ViewArt';
import { useContext, useEffect } from 'react';
import Web3WalletContext from 'hooks/Web3ReactManager';

const _routes = ["art", "community_feed", "personal_feed", "bookmarks", "staking", "settings", "edit_profile", "view_art"];
const Routes = () => {
  const { loginStatus, account, library, chainId } = useContext(Web3WalletContext)
  let history = useHistory();
  let location = useLocation();
  const pathname = location.pathname;
  // useEffect(() => {
  //   if (!loginStatus) history.push("/");
  // }, [loginStatus])
  return (
    <>
      <Switch>
        {/* {
         !loginStatus && <Route exact path="/" component={Login} />
        }
        {
          loginStatus && */}
          <Layout>
            <ScrollToTop />
            <Route exact path="/" render={() => <MyArt feedMode={1}/>}/>
            {/* <Route exact path="/hub" component={Hub} /> */}
            <Route exact path="/art/:address" render={() => <MyArt feedMode={0}/>}/>
            <Route exact path="/community_feed" render={() => <MyArt feedMode={1}/>}/>
            <Route exact path="/personal_feed" render={() => <MyArt feedMode={2}/>}/>
            <Route exact path="/bookmarks" render={() => <MyArt feedMode={3}/>}/>
            <Route exact path="/blind_mint" render={() => <BlindMint/>}/>
            {/* <Route exact path="/staking" component={Staking} /> */}
            <Route exact path="/settings" component={EditProfile} />
            <Route exact path="/edit_profile" component={EditProfile} />
            <Route exact path="/view_art/:new/:id/:col" component={ViewArt} />

            {/* <Route path="/detail/:tokenID" component={Setting} />EditProfile */}

            {/* <Route exact path="/" render={() => <Redirect to="/home" />} /> */}

          </Layout>
        {/* } */}
      </Switch>
    </>
  )
}

export default Routes;
