import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Layout from 'components/Layout';

import MyArt from 'containers/MyArt';

import ScrollToTop from 'utils/scrollToTop';
import CreateArt from 'containers/CreateArt';
import CommunityFeed from 'containers/CommunityFeed';
import Bookmarks from 'containers/Bookmarks';
import Miner from 'containers/Miner';
import Stake from 'containers/Stake';
import EditProfile from 'containers/EditProfile';

const Routes = () => (
  <>
    <Switch>
      <Layout>
        <ScrollToTop />
        <Route exact path="/" component={Stake} />
        <Route exact path="/my_art" component={MyArt} />
        <Route exact path="/create_art" component={CreateArt} />
        <Route exact path="/community_feed" component={CommunityFeed} />
        <Route exact path="/bookmarks" component={Bookmarks} />
        <Route exact path="/miner" component={Miner} />
        <Route exact path="/settings" component={EditProfile} />
        <Route exact path="/edit_profile" component={EditProfile} />

        {/* <Route path="/detail/:tokenID" component={Setting} />EditProfile */}

        {/* <Route exact path="/" render={() => <Redirect to="/home" />} /> */}

      </Layout>
    </Switch>
  </>
);

export default Routes;
