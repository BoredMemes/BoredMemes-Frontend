import { BrowserRouter as Switch, Route, useLocation  } from 'react-router-dom';
import Layout from 'components/Layout';

import MyArt from 'containers/MyArt';

import ScrollToTop from 'utils/scrollToTop';
import CreateArt from 'containers/CreateArt';
import CommunityFeed from 'containers/CommunityFeed';
import PersonalFeed from 'containers/PersonalFeed';
import Bookmarks from 'containers/Bookmarks';
import Staking from 'containers/Pool';
import Hub from 'containers/Hub';
import Login from 'containers/Login';
import EditProfile from 'containers/EditProfile';
import CreateNFTCollection from 'containers/CreateNFTCollection';
import ViewArt from 'containers/ViewArt';


const Routes = () => {
  const location = useLocation();
  let isLoginPage = location.pathname == '/login';
  return (
    <>
      <Switch>
        {
         isLoginPage && <Route exact path="/login" component={Login} />
        }
        {
          !isLoginPage &&
          <Layout>
            <ScrollToTop />
            <Route exact path="/" component={Hub} />
            <Route exact path="/my_art/:address" render={() => <MyArt feedMode={0}/>}/>
            <Route exact path="/community_feed" render={() => <MyArt feedMode={1}/>}/>
            <Route exact path="/personal_feed" render={() => <MyArt feedMode={2}/>}/>
            <Route exact path="/bookmarks" render={() => <MyArt feedMode={3}/>}/>
            {/* <Route exact path="/create_art" component={CreateArt} /> */}
            {/* <Route exact path="/community_feed" component={CommunityFeed} />
            <Route exact path="/personal_feed" component={PersonalFeed} />
            <Route exact path="/bookmarks" component={Bookmarks} /> */}
            <Route exact path="/staking" component={Staking} />
            <Route exact path="/settings" component={EditProfile} />
            <Route exact path="/edit_profile" component={EditProfile} />
            <Route exact path="/create_nft_collection/:id" component={CreateNFTCollection} />
            <Route exact path="/view_art/:new/:id/:col" component={ViewArt} />

            {/* <Route path="/detail/:tokenID" component={Setting} />EditProfile */}

            {/* <Route exact path="/" render={() => <Redirect to="/home" />} /> */}

          </Layout>
        }
      </Switch>
    </>
  )
}

export default Routes;
