import { makeStyles, styled} from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  root: {
    background: '#ffffff',
    borderRadius : 20,
    height : '100%',
    
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      paddingTop: 0,
      paddingBottom: 50,
    },
    '&.MuiSelect-icon': {},
  },
  top: {
    backgroundSize : 'cover',
    backgroundRepeat : 'norepeat',
    backgroundPosition : '50%',
    width: '100%',
    height : 300,
    display: 'flex',
    alignItems: 'flex-start',
    padding : 24,
    borderRadius : 20,
    position : 'relative',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding : 15,
    },
    '& .title': {
      position : 'absolute',
      bottom : 24,
      left: 24,
      [theme.breakpoints.down('xs')]: {
        bottom : 15,
        left: 15,
      },
      '& h2': {
        fontSize : 32,
        color : '#fff',
        textShadow : '5px 5px 10px #000000aa',
        [theme.breakpoints.down('xs')]: {
          fontSize : 18,
        },
      },
    },

    '& .btns': {
      position : 'absolute',
      bottom : 24,
      right: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gridArea : 'auto',
      gap : 20,
      [theme.breakpoints.down('xs')]: {
        bottom : 50,
        right: 15,
      },
      '& button': {
        maxWidth: 250,
        cursor: 'pointer',
        background: '#F400F5',
        borderRadius: 15,
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height : 80,
        position: 'relative',
        transition : 'all 0.3s ease',
        border : 'none',
        padding : '0px 20px',
        [theme.breakpoints.down('xs')]: {
            maxWidth: 200,
            height : 60,
        },
        '& p': {
          fontSize : 16,
          color : '#fff',
          marginRight: 10,
          [theme.breakpoints.down('xs')]: {
            fontSize : 12,
          },
        },
        '& img': {
          [theme.breakpoints.down('xs')]: {
            width: 20,
            height: 20,
          },
        },
        '&:hover': {
          background: '#F400a5',
        },
      },
      '& a': {
        maxWidth: 250,
        cursor: 'pointer',
        background: '#fff',
        borderRadius: 15,
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        transition : 'all 0.3s ease',
        border : 'none',
        padding : '10px 20px',
        color : '#727272',
        [theme.breakpoints.down('xs')]: {
          fontSize : 12,
        },

        '& img': {
          width: 30,
          height: 30,
          marginLeft : 10,
          [theme.breakpoints.down('xs')]: {
            width: 20,
            height: 20,
          },
        },
        
        '&:hover': {
          background: '#eee',
        },
      }
    },
    
    '& .avatar': {
      display: 'flex',
      alignItems: 'center',
      '& img': {
        borderRadius: '50%',
        width: 48,
        height: 48,
      },
      '& span': {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginLeft : 7,
        '& h3': {
          fontSize : 20,
          lineHeight : 1,
          color : '#fff',
          [theme.breakpoints.down('xs')]: {
            fontSize : 18,
          },
        },
      },
    },
    '& .right': {
      marginLeft: 'auto',
      marginRight : 0,
      marginBottom: 20,
      flex: 0.8,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        marginBottom: 0,
        width : '100%',
        alignItems: 'flex-start',
      },

      '& p': {
        fontSize: 14,
        color : '#fff',
        [theme.breakpoints.down('xs')]: {
          display: '-webkit-box',
          WebkitLineClamp: 2,
          boxSizing: 'border-box',
          textOverflow:'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'normal',
          WebkitBoxOrient: 'vertical',
        },
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
    padding: 24,
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
    margin: theme.spacing(0, 1),
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
  modal: {
    width: '100%',
    
    [theme.breakpoints.down('xs')]: {
      padding : '10px 7px',
    },
  },
  modalRootContent: {
    padding : '0px !important',
    [theme.breakpoints.down('xs')]: {
    },
  },
  modalTop: {
    display: 'flex',
    width: '100%',
    background : '#F0F2F5',
    justifyContent : 'space-between',
    padding : 10,
    [theme.breakpoints.down('xs')]: {
    },

    '& .topTitle': {
      display: 'flex',
      alignItems: 'center',
      marginRight : 10,
      '& img': {
        width : 60,
        height : 60,
        marginRight : 10,
        [theme.breakpoints.down('xs')]: {
          marginRight : 7,
          width : 50,
          height : 50,
        },
      },
      '& h4': {
        fontWeight: 700,
        fontSize: 16,
        color : '#727272',
        width: 300,
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
          width: 150,
        },
      },
      '& p': {
        fontSize : 12,
        color : '#343A69',
        fontFamily: "'Josefin Sans', sans-serif",
      },
    },
    '& button': {
      width : 30,
      height : 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent : 'center',
      border : 'none',
      cursor : 'pointer',
      transition : 'all 0.3s ease',
      background : '#727272',
      borderRadius : 30,
      '&:hover':{
        background : '#727272aa'
      },
      [theme.breakpoints.down('xs')]: {
        width : 25,
        height : 25,
      },
      '& img': {
        width : 15,
        height : 15,
        [theme.breakpoints.down('xs')]: {
          width : 12,
          height : 12,
        },
      },
    },
  },
  modalContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'center',
    flexDirection : 'column',
    width: '100%',
    padding : '10px 20px 0px 20px',
    '& p': {
      fontSize : 14,
      color : '#343A69',
      width: '100%',
      marginBottom : 10,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
    '& .chooseBtns': {
      width: '100%',
      marginBottom : 20,
    },

    '& .row': {
      display: 'flex',
      alignItems: 'center',
      justifyContent : 'flex-start',
      width: '100%',
      gridArea : 'auto',
      gap : 10,
      [theme.breakpoints.down('xs')]: {
        // flexDirection : 'column',
      },
      '& button': {
        width : 'fit-content',
        maxWidth: '40%',
        [theme.breakpoints.down('xs')]: {
          maxWidth: '50%',
          fontSize : 10,
          padding : 5,
          // width : '100%',
        },
      },
    },
  },
  modalBtns: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gridTemplateColumns: 'auto auto auto',
    gap: 20,
    padding : 20,
    paddingTop : 0,
    [theme.breakpoints.down('xs')]: {
      gap: 10,
    },
    '& button': {
      width : '100%',
      
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
  myInputWrap: {
    width : '100%',
    marginBottom :20,
  }
}));



export default useStyles;
export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 40,
  
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(8px)',
    backgroundColor: '#F400F5',
    top: 8,
    
    '&.Mui-checked': {
      color: '#fff',
      backgroundColor: '#fff',
      zIndex : 1,
      transform: 'translateX(calc(100% + 8px))',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('/assets/icons/lock_icon_02.svg')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#F400F5',
        
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#ffffff00',
    width: 22,
    height: 22,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('/assets/icons/lock_icon_01.svg')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    color : '#F400F5',
    backgroundColor: '#fff',
    borderRadius: 30,
    border : '1px #F400F5 solid',
  },
}));
