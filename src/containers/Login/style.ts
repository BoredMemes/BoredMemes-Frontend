import { makeStyles, styled, Theme, withStyles } from '@material-ui/core/styles';
// import { Switch } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: `url(assets/imgs/desk_login_bg.png)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    textAlign: 'center',
    '& p': {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      lineHeight: '110%',
      display: 'flex',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      backgroundImage: `url(assets/imgs/mobile_login_bg.png)`,
    },
  },
  logo: {
    width: '144px',
    height: '121px',
    marginTop: '248px',
    [theme.breakpoints.down('xs')]: {
      width: '120px',
      height: '101px',
      marginTop: '78px',
    },
  },
  text_body: {
    width: '582px',
    margin: 'auto',
    marginTop: '91px',
    [theme.breakpoints.down('xs')]: {
      width: '304px',
      marginTop: '84.5px',
    },
  },
  text_1: {
    fontSize: '48px',
    fontWeight: 800,
    textTransform: 'uppercase',
    margin: 'auto',
    width: 'fit-content',
    color: '#FFFFFF',
    [theme.breakpoints.down('xs')]: {
      fontSize: '36px',
    },
  },
  text_2: {
    fontSize: '68px',
    fontWeight: 900,
    textTransform: 'uppercase',
    margin: 'auto',
    width: 'fit-content',
    backgroundImage: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF)',
    backgroundClip: 'text',
    color: 'transparent',
    /* Create the gradient. */

    /* Set the background size and repeat properties. */
    backgroundSize: '100%',
    backgroundRepeat: 'repeat',
    /* Use the text as a mask for the background. */
    /* This will show the gradient as a text color rather than element bg. */
    // -webkit-background-clip: text;
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    // -webkit-text-fill-color: transparent; 
    MozBackgroundClip: 'text',
    MozTextFillColor: 'transparent',
    [theme.breakpoints.down('xs')]: {
      fontSize: '50px',
    },
  },
  pixia_text_mobile: {
    display: 'none !important',
    height: '26px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '11px',
    lineHeight: '20px !important',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#FFFFFF',
    [theme.breakpoints.down('xs')]: {
      display: 'block !important'
    },
  },
  pixia_text: {
    fontWeight: 500,
    fontSize: '16px',
    margin: 'auto',
    marginTop: '133px',
    lineHeight: '20px !important',
    textTransform: 'capitalize',
    width: 'fit-content',
    color: '#FFFFFF',
    height: '49px',
    [theme.breakpoints.down('xs')]: {
      display: 'none !important',
    },
  },
  connect_btn_wallet: {
    boxSizing: 'border-box',

    /* Auto layout */

    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: '6px 44px',
    gap: '10px',

    width: '478px',
    height: '92px',

    /* Pixia 3 */

    background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)',
    borderRadius: '25px',
    margin: 'auto',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '29px',
    color: '#FFFFFF',
    textAlign: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      width: '282px',
      height: '54px',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '17px',
      borderRadius: '18px',
      marginTop: '356px',
      border: 'none'
    },
  }
}));

