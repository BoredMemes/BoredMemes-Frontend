import { makeStyles, styled} from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  root: {
    background: '#ffffff',
    borderRadius : 20,
    height : '100%',
    padding: 24,
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
          [theme.breakpoints.down('xs')]: {
            fontSize : 18,
          },
        },
        '& .follows': {
          marginRight : 20,
          display: 'flex',
          alignItems: 'center',
        },
        '& .socialLinks': {
          display: 'flex',
          alignItems: 'center',
          gridTemplateColumns: 'auto auto auto',
          gap: 20,
          [theme.breakpoints.down('xs')]: {
            gap: 10,
          },
          '& a' :{
            fontSize: 22,
            color: '#1EA1F2',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '& :hover':{
              opacity: 0.7,
            },
            [theme.breakpoints.down('xs')]: {
              fontSize : 20,
            },
          }
        },
        '& p': {
          fontSize: 14,
          marginRight : 20,
          [theme.breakpoints.down('xs')]: {
            fontSize: 12,
          },
        },
      },
    },
    '& .right': {
      marginLeft: 20,
      marginBottom: 20,
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        marginBottom: 0,
        width : '100%',
        justifyContent: 'space-between',
      },

      '& p': {
        fontSize: 14,
        [theme.breakpoints.down('xs')]: {
        },
      },
      '& .edit_profile':{
        padding : '10px 20px',
        background: '#F0F2F5',
        boxShadow: '-1.96149px 2.94223px 6.86521px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        fontSize: '0.8vw',
        color : '#727272',
        [theme.breakpoints.up('xl')]: {
          fontSize: 18,
        },
        [theme.breakpoints.only('xl')]: {
          fontSize: 16,
        },
        [theme.breakpoints.only('md')]: {
          padding: '8px 1vw',
        },
        [theme.breakpoints.down('xs')]: {
          fontSize : 12,
        },
      }
    },
  },

  topdetail: {
    backgroundSize : 'cover',
    backgroundRepeat : 'norepeat',
    backgroundPosition : '50%',
    background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)',
    width: '100%',
    height : 300,
    display: 'flex',
    alignItems: 'flex-start',
    padding : 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
      '& div': {
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

    [theme.breakpoints.down('xs')]: {
      paddingBottom: 20,
    },
    '& .MuiOutlinedInput-root': {
      background: '#00D9AC00',
      border: 'none',
      boxShadow: '0px 0px 3px #00D9AC',
    },
    '& .sticky': {
      position : 'sticky',
      bottom : 10,
      background : '#F0F2F5',
      width : '100%',
      padding : '10px 20px',
      borderRadius : 15,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition : 'all 0.5s ease',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
      '& .left': {
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
          width: '100%',
        },
      },
      '& .btns': {
        display: 'flex',
        alignItems: 'center',
        gridAare : 'auto',
        gap : 20,
        '& button': {
          display: 'flex',
          alignItems: 'center',
          border : 'none',
          padding : '8px 20px',
          fontSize : 16,
          cursor : 'pointer',
          transition : 'all 0.3s ease',
          borderRadius : 50,
          [theme.breakpoints.down('xs')]: {
            fontSize : 12,
          },
        },
        '& .grey': {
          color : '#727272',
          '&:hover': {
            background : '#D9D9D9'
          }
        },
        '& .pink': {
          color : '#fff',
          background : '#F400F5',
          position : 'relative',
          '&:hover': {
            background : '#F400F599',
            '& .drodownMenu': {
              display: 'flex',
            }
          },
          '& img': {
            marginLeft : 10,
          },
          '& .drodownMenu': {
            display: 'none',
            flexDirection: 'column',
            position: 'absolute',
            backgroundColor: '#fff',
            // top: '-156px',
            right : 0,
            bottom : '100%',
            padding: 7,
            borderRadius: 5,
            zIndex : 2,
            transition: 'all 0.3s ease',
            '& .menuItem': {
              fontSize: 14,
              // width: 155,
              whiteSpace : 'nowrap',
              padding: 5,
              transition: 'all 0.3s ease',
              borderRadius: 5,
              color: '#727272',
              position: 'relative',
              textAlign : 'left',
              '&:hover': {
                background: '#D9D9D9',
                '& .subDrodownMenu': {
                  display: 'flex',
                }
              },
              '& img': {
                marginRight: 7,
              },
            },
          },
        },
      },
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
    padding : '10px 20px 0px 20px',
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

    '& .row': {
      display: 'flex',
      alignItems: 'center',
      justifyContent : 'space-between',
      width: '100%',
      borderRadius: 7,

      '& p': {
        fontSize : 14,
        color : '#262626',
        fontFamily: "'Josefin Sans', sans-serif",
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
        },
      },
    },
  },
  modalContentDetail: {
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
  modalAddContent: {
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
      maxWidth : 350,
      marginBottom : 10,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
    
   
    '& .btns': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent : 'center',
      flexDirection : 'column',
      marginBottom : 20,
      gridArea : 'auto',
      gap: 20,
      '& button': {
        maxWidth: 254,
        width : '100%',
        cursor: 'pointer',
        transition : 'all 0.3s ease',
        borderRadius: 15,
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height : 80,
        position: 'relative',
        
        [theme.breakpoints.down('xs')]: {
          width : '100%',
          height : 60,
        },
        '& p': {
          margin : 0,
        },
      },
      '& .collectionCard': {
        background: 'linear-gradient(94.46deg, #F400F5 0.38%, #D300F5 100%);',
        border : 'none',
        '& p': {
          fontSize : 16,
          color : '#fff',
          [theme.breakpoints.down('xs')]: {
            fontSize : 12,
          },
        },
        '&:hover': {
          background: 'linear-gradient(94.46deg, #F400F5AA 0.38%, #D300F5AA 100%);',
        },
      },
      '& .newCollectionCard': {
        background: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%) border-box;',
        border: '2px dashed #fff',
        [theme.breakpoints.down('xs')]: {
          width : '100%',
          height : 60,
        },
        '& img': {
          marginRight : 10,
          [theme.breakpoints.down('xs')]: {
            width : 20,
          },
        },
        '& p': {
          background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
          width : 'fit-content',
          color : '#262626',
          [theme.breakpoints.down('xs')]: {
            fontSize : 12,
          },
        },
      },
      

    },
    '& .chooseBtns': {
      width: '100%',
      marginBottom : 20,
      maxWidth : 350,
      '& h4': {
        fontSize : 14,
        color : '#343A69',
        width: '100%',
        maxWidth : 350,
        marginBottom : 10,
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
        },
      },
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
        maxWidth: '50%',
        fontSize : 12,
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
  
  modalBtnsDetail: {
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
      background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)',
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
