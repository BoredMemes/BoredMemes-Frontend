import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    background: '#ffffff',
    borderRadius : 20,
    padding: 24,
    height : '100%',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      paddingTop: 0,
      paddingBottom: 50,
    },
    '&.MuiSelect-icon': {},
  },
  top: {
    background: '#ffffff00',
    margin: theme.spacing(0, 2),
    width: 'calc(100% - 30px)',
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '& h1': {
      fontSize : 22,
      fontWeight : 500,
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        fontSize : 20,
      },
    },

  },

  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,

    [theme.breakpoints.down('xs')]: {
      paddingBottom: 20,
    },
    '& .MuiOutlinedInput-root': {
      background: '#00D9AC00',
      border: 'none',
      boxShadow: '0px 0px 3px #00D9AC',
    },
  },
  masonry: {
    display: 'flex',
    width: '100%',
    '@media screen and (max-width: 768px) and (orientation: portrait)': {
      flexDirection: 'column',
      width: '100%',
    },
  },
  gridColumn: {
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100% !important',
      margin: theme.spacing(0, 0),
    },
  },
}));



export default useStyles;
