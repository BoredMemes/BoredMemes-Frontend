import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width : '100%',
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
    textAlign : 'center',
    '& p':{
      color : '#343A69',
      fontSize : 16,
      display : 'flex',
      alignItems : 'center',
      width : 'fit-content',
      '& img':{
        width : 20,
        marginLeft : 7,
        marginRight : 7,
      }
    },

    [theme.breakpoints.down('xs')]: {
    },
  },

}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <p>Made with <img src="/assets/icons/heart_icon.svg" alt="" /> by Pixia AI</p>

    </footer>
  );
};

export default Footer;
