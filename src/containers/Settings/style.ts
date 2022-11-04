import { makeStyles } from '@material-ui/core/styles';

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
  panel: {
    width: '100%',
    background: '#F4F4F4',
    borderRadius : 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom : 20,
    padding : 20,
    [theme.breakpoints.down('xs')]: {
    },
    '& h2': {
      color : '#343A69',
      fontSize : 18,
      marginTop : 10,
      marginBottom : 20,
    },
  },
  myCheck: {
    width: '100%',
    background: '#fff',
    border : '1px #222 solid',
    borderRadius : 15,
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    marginBottom : 20,
    padding : 8,
    position : 'relative',
    [theme.breakpoints.down('xs')]: {
    },
    '& h3': {
      color : '#343A69',
      fontSize : 16,
      fontWeight : 500,
    },
    '& .fab': {
      color : '#1EA1F2',
      fontSize : 25,
      position : 'absolute',
      right : 15,
    },
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
      marginLeft : 0,
      padding: 20,
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

  subTitle: {
    fontSize: 20,
    color: '#000',
    width: '100%',
    fontWeight: 600,
    paddingBottom: 15,
    paddingTop: 10,
    borderBottom: '1px #ddd solid',
  },
  label: {
    fontWeight: 500,
    marginBottom: 9,
    fontSize: 16,
    display : 'flex',
    justifyContent : 'space-between',
    color : '#343A69',
    '& span': {
      fontWeight: 400,
      color: '#727272',
    },
  },
  myInput: {
    color: '#333',
  },
  saveButton: {
    width : '100%',
  },
  formWrapper: {
    marginTop: 20,
    width: '100%',
    '& h3': {
      fontWeight: 600,
      fontSize: 16,
      '@media screen and (max-width: 768px) and (orientation: portrait)': {
        fontSize: 16,
        fontWeight: 600,
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
