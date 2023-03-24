import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import Topbar from './topbar/Topbar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import ThemeContext from "theme/ThemeContext"
import SideBar from './SideBar/SideBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Menu from 'components/menu/Menu';

const useStyles = makeStyles(theme => ({
  layout: {
    backgroundColor: '#121317',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
    padding : '20px 50px',
    backgroundRepeat : 'repeat',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding : 0,
      paddingTop: 80,
    },
    
  },
  
  layoutContent: {
    flex: 1,
    display: 'flex',
    
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      width: '100%',
    },
  },
  sideBar: {
    width: '20vw',
    minWidth: 230,
    maxWidth: 300,
    padding: '13px 1.5vw',
    position: 'relative',
    marginRight : 15,
    background: '#fff',
    borderRadius : 20,
    boxShadow: "0px 16px 60px #00000008",
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: '100%',
      padding: '0px 20px',
      marginTop: 80,
    },
  },
  mainContent: {
    width: 'calc(100% - 20vw)',
    borderRadius : 20,
    boxShadow: "0px 16px 60px #00000008",
    height : 'auto',
    margin : 0,
    [theme.breakpoints.up('xl')]: {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: '100%',
      padding: 0,
    },
  },
}));
const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();
  const { theme } = useContext(ThemeContext)
  const isMobileOrTablet = useMediaQuery(`(max-width:640px)`);

  return (
    <>
      <div className={`${classes.layout} ${theme}`} style = {{backgroundImage : theme === 'dark' ? `url("/assets/paper_dark.png")`: `url("/assets/paper.jpg")`}}>
        <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className={classes.layoutContent}>
          {!isMobileOrTablet && (
            <div className={`${classes.sideBar} sideBarMenu`}>
              <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
          )}

          <div className={`${classes.mainContent}`}>
            {children}
          </div>
        </div>
        <Footer />
      </div>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} children={<SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}/>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
