import { makeStyles, styled, Theme, withStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height : '100%',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      paddingTop: 0,
      paddingBottom: 50,
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
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
      width: 'calc(100%)',
      margin: theme.spacing(2, 0),
    },
    '& h1': {
      fontSize : 22,
      fontWeight : 500,
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        fontSize : 20,
      },
    },
    '& button': {
      [theme.breakpoints.down('xs')]: {
        fontSize:12,
      },
    },
  },

  content: {
    width: 'calc(100% - 300px)',
    height : 'auto',
    margin : 0,
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    paddingTop: 10,
    background: '#ffffff',
    borderRadius : 20,
    
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    
  },
  stakeCard: {
    width: '100%',
    background: 'rgba(220, 195, 244, 0.5)',
    borderRadius : 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom : 20,
    [theme.breakpoints.down('xs')]: {
    },
    '& .top': {
      width: '100%',
      background: '#F4F4F4',
      borderRadius : 20,
      padding : 20,
      paddingRight : 50,
      display: 'flex',
      alignItems: 'center',
      position : 'relative',
      [theme.breakpoints.down('xs')]: {
        padding : 10,
        paddingRight : 10,
      },
      '& ul': {
        width: '100%',
        display: 'flex',
        padding : 0,
        margin : 0,
        listStyle : 'none',
        justifyContent: 'space-between',
        flexWrap : 'wrap',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
          alignItems: 'flex-start',
        },
        '& li': {
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
          [theme.breakpoints.down('xs')]: {
            marginBottom : 10,
          },
          '& img': {
            width : 64,
            height : 64,
            marginRight : 8,
          },
          '& span': {
            display: 'flex',
            flexDirection: 'column',
          },
          
          '& h4': {
            color : '#343A69',
            fontSize : 20,
            width : '180px',
            [theme.breakpoints.down('xs')]: {
              fontSize : 18,
            },
          },
          '& h5': {
            color : '#727272',
          },
          '& .val': {
            fontSize : 16,
            display : 'flex',
            color : '#727272',
            [theme.breakpoints.down('xs')]: {
              fontSize : 12,
            },
            '& img': {
              width : 20,
              height : 20,
              // marginRight : 5,
              [theme.breakpoints.down('xs')]: {
                width : 15,
                height : 15,
              },
            },
          },
          
        },
      },
      '& .downBtn': {
        position : 'absolute',
        right : 10,
        cursor : 'pointer',
        width : 24,
        height : 24,
        borderRadius : 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        transition : 'all 0.3s ease',
        '&:hover':{
          background : '#E3E3E3'
        },
        '& img': {
          width : '90%',
          transition : 'all 0.3s ease',
        },
        [theme.breakpoints.down('xs')]: {
          top : 20,
        },
      },
    },
    '& .state': {
      width: '100%',
      borderRadius : 20,
      padding : 20,
      display: 'flex',
      alignItems: 'center',
      position : 'relative',
      [theme.breakpoints.down('xs')]: {
        padding : 10,
      },
      '& ul': {
        width: '100%',
        display: 'flex',
        padding : 0,
        margin : 0,
        listStyle : 'none',
        justifyContent: 'space-between',
        flexWrap : 'wrap',
        // alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
          justifyContent: 'space-around',
          gap: 10,
        },
        '& li': {
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
          gridTemplateColumns: 'auto auto auto',
          gap: 20,
          [theme.breakpoints.down('xs')]: {
            gap: 10,
          },
          '& span': {
            display: 'flex',
            flexDirection: 'column',
          },
          
          '& h4': {
            color : '#343A69',
            fontSize : 20,
            width : '180px',
          },
          '& h5': {
            color : '#727272',
          },
          '& .val': {
            fontSize : 14,
            display : 'flex',
          },
          '& button': {
            [theme.breakpoints.down('xs')]: {
              fontSize:12,
            },
          },
        },
      },
      '& .downBtn': {
        position : 'absolute',
        right : 10,
        cursor : 'pointer',
        width : 24,
        height : 24,
        borderRadius : 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        transition : 'all 0.3s ease',
        '&:hover':{
          background : '#E3E3E3'
        },
        '& img': {
          width : '90%',
          transition : 'all 0.3s ease',
        },
      },
    },
    '& .bottomTxt':{
      padding : 10,
      fontSize:16,
      [theme.breakpoints.down('xs')]: {
        fontSize:12,
      },
    }
  },
  right: {
    width: '280px',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    marginLeft : 20,
    borderRadius : 20,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: 20,
      marginLeft : 0,
    },
    
  },
  rewardCard: {
    width: '100%',
    background: '#F4F4F4',
    borderRadius : 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom : 20,
    padding : 10,
    [theme.breakpoints.down('xs')]: {
    },
    '& ul': {
      width: '100%',
      display: 'flex',
      padding : 0,
      
      listStyle : 'none',
      justifyContent: 'space-between',
      flexWrap : 'wrap',
      alignItems: 'center',
      '& li': {
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        '& h4': {
          color : '#343A69',
          fontSize : 18,
          fontFamily: "'Josefin Sans', sans-serif",
          marginTop : 10,
          marginBottom : 20,
        },
        '& h5': {
          color : '#F5007B',
          fontSize : 14,
          background : '#F5007B22',
          display: 'flex',
          alignItems: 'center',
          padding : '7px 20px',
          fontWeight : 400,
          fontFamily: "'Josefin Sans', sans-serif",
          borderRadius : 20,
          '& span': {
            fontWeight : 600,
            marginLeft : 7,
          },
        },
        '& p': {
          fontSize : 12,
          fontFamily: "'Josefin Sans', sans-serif",
        },
      },
    },
  },
  buyPanel: {
    width: '100%',
    borderRadius : 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding : 10,
    marginTop : 20,
    top : 0,
    left : 0,
    position : 'sticky',
    [theme.breakpoints.down('xs')]: {
      padding : 0,
    },
    '& ul': {
      width: '100%',
      display: 'flex',
      padding : 0,
      
      listStyle : 'none',
      justifyContent: 'space-between',
      flexWrap : 'wrap',
      alignItems: 'center',
      '& li': {
        width: '100%',
        marginBottom : 10,
        '& .balance': {
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          backgroundSize : '100% 100%',
          paddingTop : 70,
          paddingBottom : 10,
          '& h2': {
            color : '#fff',
            fontSize : 18,
            display: 'flex',
            alignItems: 'center',
            fontWeight : 400,
            fontFamily: "'Josefin Sans', sans-serif",
          },
          '& img': {
            fontWeight : 600,
            marginLeft : 7,
          },
        },
        '& a': {
          color : '#fff',
          width: '100%',
          fontSize : 14,
          background : '#F5007B22',
          display: 'flex',
          alignItems: 'center',
          padding : '7px 20px',
          justifyContent: 'end',
          fontWeight : 400,
          fontFamily: "'Josefin Sans', sans-serif",
          borderRadius : 20,
          transition : 'all 0.3s ease',
          '&:hover':{
            opacity : 0.8
          },
          '& img': {
            fontWeight : 600,
            marginLeft : 7,
          },
        },
        '& p': {
          fontSize : 12,
          fontFamily: "'Josefin Sans', sans-serif",
        },
      },
    },
  },
  
  modal: {
    width: '100%',
    padding : 10,
    [theme.breakpoints.down('xs')]: {
      padding : '10px 7px',
    },
  },
  modalTop: {
    display: 'flex',
    width: '100%',
    justifyContent : 'space-between',
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
        color : '#343A69',
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
      background : '#ffffff00',
      '&:hover':{
        background : '#F4F4F4'
      },
      [theme.breakpoints.down('xs')]: {
        width : 25,
        height : 25,
      },
      '& img': {
        [theme.breakpoints.down('xs')]: {
          width : 18,
          height : 18,
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
    '& h5': {
      fontSize : 14,
      color : '#343A69',
      width: '100%',
      textAlign : 'end',
      marginBottom : 20,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },

    '& .warning': {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      border: '3px solid #F3AC3D33',
      borderRadius: 7,
      marginBottom : 20,
      padding : 10,
      
      '& img': {
        marginRight : 10,
      },
      '& p': {
        fontSize : 14,
        color : '#F3AC3D',
        fontFamily: "'Josefin Sans', sans-serif",
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
        },
      },
    },
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    margin : 20,
    width: '100%',
    background : '#F4F4F4',
    padding : 15,
    borderRadius : 15,
    justifyContent : 'space-between',
    [theme.breakpoints.down('xs')]: {
      padding : 10,
    },
    '& input': {
      width: '90%',
      border : 'none',
      background : '#ffffff00',
      fontFamily: "'Josefin Sans', sans-serif",
      fontSize : 16,
      [theme.breakpoints.down('xs')]: {
        fontSize : 14,
      },
      '&:focus': {
        outline : 'none',
      },
    },
    '& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
      appearance : 'none',
      // -webkit-appearance: 'none',
      margin: 0,
    },
    '& button': {
      background : '#7A00F522',
      border : 'none',
      color : '#7A00F5',
      fontFamily: "'Josefin Sans', sans-serif",
      padding : '7px 15px',
      borderRadius : 7,
      fontSize : 16,
      cursor : 'pointer',
      transition : 'all 0.3s ease',
      '&:hover':{
        background : '#7A00F533'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize : 14,
      },
    },
    '& p': {
      fontSize : 14,
      color : '#343A69',
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
    
  },
  modalBtns: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gridTemplateColumns: 'auto auto auto',
    gap: 20,
    [theme.breakpoints.down('xs')]: {
      gap: 10,
    },
    '& button': {
      width : '50%',
      
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'space-between',
    width: '100%',
    position : 'relative',
    marginBottom : 5,
    [theme.breakpoints.down('xs')]: {
    },
    '& .node': {
      width : 20,
      height : 20,
      borderRadius : '50%',
      background : '#9B51E0',
      display: 'flex',
      alignItems: 'center',
      justifyContent : 'center',
      zIndex : 1,
      transition : 'all 0.3s ease',
      [theme.breakpoints.down('xs')]: {
      },
      '& .circle': {
        width : 10,
        height : 10,
        borderRadius : '50%',
        background : '#E0E0E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        transition : 'all 0.3s ease',
      },
    },
    '& .label': {
      fontSize : 14,
      [theme.breakpoints.down('xs')]: {
        fontSize : 12,
      },
    },
    '& .ml-5': {
      marginLeft : 5,
      [theme.breakpoints.down('xs')]: {
      },
    },
    '& .ml-10': {
      marginLeft : 10,
      [theme.breakpoints.down('xs')]: {
      },
    },
    '& .line': {
      width : '100%',
      height : 2,
      background : '#E0E0E7',
      position : 'absolute',
      transition : 'all 0.3s ease',
      [theme.breakpoints.down('xs')]: {
      },
      '& div': {
        transition : 'all 0.3s ease',
      }
    },
  },

  lock: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom : 10,
    [theme.breakpoints.down('xs')]: {
      flexWrap : 'wrap',
    },
    '& img': {
      marginRight : 10,
    },
    '& p': {
      fontSize : 16,
      color : '#727272',
      fontFamily: "'Josefin Sans', sans-serif",
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },

    '& h6': {
      fontSize : 16,
      padding : '5px 10px',
      fontFamily: "'Josefin Sans', sans-serif",
      borderRadius : 7,
      marginLeft : 7,
      marginRight : 7,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },

  },
}));

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

export const AntSwitch = withStyles((theme: Theme) => ({
  root: {
    width: (props: { kind: string }) => (props.kind === 'small' ? 40 : 48),
    height: (props: { kind: string }) => (props.kind === 'small' ? 20 : 24),
    borderRadius: 20,
    padding: 0,
    display: 'flex',
    border : '1px #F400F5 solid'
  },
  switchBase: {
    padding: 3,
    color: '#F400F5',

    
    '&$checked': {
      transform: 'translateX(calc(100% + 2px))',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#F400F5',
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: (props: { kind: string }) => ({
    width: props.kind === 'small' ? 13 : 17,
    height: props.kind === 'small' ? 13 : 17,
    boxShadow: 'none',
  }),
  track: {
    borderColor: '#fff',
    borderRadius: 20,
    opacity: 1,
    backgroundColor: '#fff',
  },
  checked: {},
}))(Switch);

export default useStyles;

