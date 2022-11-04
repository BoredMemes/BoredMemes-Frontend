import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    background: '#ffffff',
    borderRadius : 20,
    padding: theme.spacing(3, 5),
    height : '100%',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      paddingTop: 0,
      paddingBottom: 50,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
  top: {
    background: '#ffffff00',
    width: 'calc(100% - 30px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    
    '& h1': {
      color : '#262626',
      fontWeight : 500,
      fontSize : 32,
      [theme.breakpoints.down('xs')]: {
        fontSize : 22,
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
  },
  step: {
    width: '100%',
    display: 'flex',
    marginBottom : 30,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  stepLeft: {
    width: 250,
    height : 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 40,
    position : 'relative',
    margin : 0,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom : 20,
    },
    '& h3': {
      color : '#333333',
      fontWeight : 500,
      fontSize : 18,
      [theme.breakpoints.only('md')]: {
        fontSize : 16,
      },
      [theme.breakpoints.only('sm')]: {
        fontSize : 14,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize : 14,
      },
    },
    '& p': {
      color : '#888888',
      fontSize : 14,
      [theme.breakpoints.only('md')]: {
        fontSize : 14,
      },
      [theme.breakpoints.only('sm')]: {
        fontSize : 12,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize : 12,
      },
    },
    '& .circle': {
      position : 'absolute',
      color : '#fff',
      fontSize : 18,
      left : 0,
      top : 0,
      height : 30,
      width : 30,
      display : 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius : 30,
      [theme.breakpoints.down('xs')]: {
        fontSize : 16,
        height : 26,
        width : 26,
      },
    },
    '& .leftLine': {
      position : 'absolute',
      color : '#fff',
      left : 13,
      top : 30,
      height : '100%',
      width : 2,
      [theme.breakpoints.down('xs')]: {
        display : 'none',
      },
    },
  },
  stepContent: {
    width: 'calc(100% - 250px)',
    display: 'flex',
    // justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: theme.spacing(0),
    },
    '& .ratioContent':{
      background: '#F4F4F4',
      display: 'flex',
      // alignItems: 'center',
      justifyContent: 'space-between',
      padding : 20,
      borderRadius : 10,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        padding : 10,
        flexWrap : 'wrap',
      },

      '& .ratioMain':{
        background: '#E4CCFD',
        width : 64,
        height : 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize : 20,
        fontFamily: "'Roboto', sans-serif",
        marginRight:10,
        marginTop : 10,
        position : 'relative',
        cursor : 'pointer',
        [theme.breakpoints.down('xs')]: {
          fontSize : 16,
          width : 50,
          height : 50,
        },

        '& .heart':{
          position : 'absolute',
          width : 30,
          height : 30,
          top : -15,
          right : -15,
          borderRadius : 30,
          border : '1px #F4F4F4 solid',
          backgroundColor : '#F5007B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      '& .showBtn':{
        marginLeft : 10,
        marginTop : 30,
        cursor : 'pointer',
        width : 24,
        height : 24,
        borderRadius : 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        transition : 'all 0.3s ease',
        [theme.breakpoints.down('xs')]: {
          marginTop : 20,
        },
        '&:hover':{
          background : '#E3E3E3'
        },
        '& img': {
          width : '90%',
          transition : 'all 0.3s ease',
          [theme.breakpoints.down('xs')]: {
            width : '80%',
          },
        },
      },
      '& .ratioList':{
        display: 'flex',
        fontSize : 20,
        fontFamily: "'Roboto', sans-serif",
        transition : 'all 0.3s ease',
        gridTemplateColumns: 'auto auto auto',
        justifyContent: 'space-between',
        gap: 20,
        [theme.breakpoints.down('xs')]: {
          gap: 10,
          width: '100%',
        },
        
        '& .col':{
          display: 'flex',
          flexDirection: 'column',
          // margin:'0px 10px',
          fontSize : 20,
        },
        '& .ratio':{
          background: '#D4D4D4',
          width : 45,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize : 14,
          fontFamily: "'Roboto', sans-serif",
          marginBottom:'10px',
          position : 'relative',
          cursor : 'pointer',
          marginTop : 10,
          [theme.breakpoints.down('xs')]: {
            width : 35,
            fontSize : 12,
            marginBottom: 5,
          },
          '& .heart':{
            position : 'absolute',
            top : -10,
            right : -10,
            [theme.breakpoints.down('xs')]: {
              width : 15,
              top : -5,
              right : -5,
            },
            '& img': {
              width : '100%',
            },
          },
        },
      },
    },
    '& .cards':{
      width : '100%',
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius : 10,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
      '& .card':{
        background: '#F4F4F4',
        width : '32%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position : 'relative',
        padding : 20,
        cursor : 'pointer',
        borderRadius : 15,
        [theme.breakpoints.down('xs')]: {
          width : '100%',
          marginBottom : 10,
        },
        '& span':{
          width : '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        '& h3':{
          fontSize : '1.2vw',
          fontWeight : 500,
          color : '#343A69',
          marginBottom : 20,
          fontFamily: "'Josefin Sans', sans-serif",
          [theme.breakpoints.down('xs')]: {
            fontSize : 18,
          },
        },
        '& h4':{
          fontSize : '0.8vw',
          fontWeight : 400,
          color : '#343A69',
          fontFamily: "'Josefin Sans', sans-serif",
          [theme.breakpoints.down('xs')]: {
            fontSize : 12,
          },
        },
        '& button':{
          fontSize : '0.8vw',
          fontWeight : 400,
          color : '#353535',
          borderRadius : 25,
          display: 'flex',
          alignItems: 'center',
          border: '0.980745px solid #FFFFFF',
          boxShadow: '-1.96149px 2.94223px 6.86521px rgba(0, 0, 0, 0.25)',
          padding : '5px 10px',
          [theme.breakpoints.down('xs')]: {
            fontSize : 12,
            padding : '5px 20px',
          },
          '& img':{
            width : 26,
            height : 26,
            marginRight : 10,
          },
        },
        '& .heart':{
          position : 'absolute',
          width : 30,
          height : 30,
          top : -15,
          right : -15,
          borderRadius : 30,
          border : '1px #F4F4F4 solid',
          backgroundColor : '#F5007B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    '& .row':{
      width : '100%',
      display: 'flex',
      // alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft : 10,
      borderRadius : 10,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        paddingLeft : 0,
      },
      '& .input-div':{
        width : 'calc(100% - 250px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap : 'wrap',
        position : 'relative',
        cursor : 'pointer',
        borderRadius : 15,
        gridTemplateColumns: 'auto auto auto',
        gap: 20,
        [theme.breakpoints.down('xs')]: {
          width : '100%',
          gap: 10,
        },
      },
      '& button':{
        minWidth : 200,
        [theme.breakpoints.down('xs')]: {
          marginTop : 20,
        },
        '&:hover':{
          background : '#F400F599',
        }
      },
    }
  },
  footText:{
    [theme.breakpoints.down('xs')]: {
      fontSize : 12,
      textAlign : 'center',
    },
  },
  myCheck: {
    width: 'auto',
    background: '#fff',
    border : '1px #222 solid',
    borderRadius : 15,
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    padding : 3,
    paddingRight : 50,
    position : 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '& h3': {
      color : '#343A69',
      fontSize : 14,
      fontWeight : 500,
      [theme.breakpoints.down('xs')]: {
        fontSize : 12,
      },
    },
    '& .fab': {
      color : '#1EA1F2',
      fontSize : 25,
      position : 'absolute',
      right : 15,
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

    '& span': {
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
    
    '& span': {
      display: 'flex',
      alignItems: 'center',
      margin : 20,
      
      '& img': {
        width : 60,
        height : 60,
        marginRight : 10,
        animation: 'loadingAni 1s linear 0s infinite forwards',
        [theme.breakpoints.down('xs')]: {
          width : 30,
          height : 30,
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
}));



export default useStyles;
