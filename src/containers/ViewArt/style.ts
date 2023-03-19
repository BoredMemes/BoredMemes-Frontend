import { makeStyles, styled} from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  root: {
    background: '#ffffff',
    borderRadius : 20,
    height : '100%',
    overflow : 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: 20,
    },
    
  },

  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
    },
    '& .art_div': {
      width: '100%',
      '& img': {
        width: '100%',
        borderRadius : 20,
      },
    },
    '& .info_div': {
      width: '100%',
      padding : 25,
      '& .col': {
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
        },
      },
      '& .row': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
          // flexDirection: 'column',
          // alignItems: 'flex-start',
        },
        '& .col_info': {
          display: 'flex',
          alignItems: 'center',
          gridArea : 'auto',
          gap : 20,
          [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            marginBottom : 20,
          },
          '& span': {
            padding: 10,
            background : '#d2c4f5',
            color : 'rgba(73, 5, 251, 1)',
            fontWeight:600,
            borderRadius : 10,
            [theme.breakpoints.down('xs')]: {
              width: '100%',
            },
          }
        },
        '& .avatar': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          transition : 'all 0.3s ease',
          padding : 5,
          borderRadius : 40,
          // '&:hover': {
          //   background: '#D9D9D9',
          // },
          '& img': {
            marginRight: 7,
            height : 35,
            width : 35,
            objectfit : 'cover',
            borderRadius: 35,
          },
          '& p': {
            width: '100%',
            display: '-webkit-box',
            boxSizing: 'border-box',
            textOverflow:'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'normal',
            WebkitBoxOrient: 'vertical',
            fontSize : 12,
          },
          '& button': {
            cursor: 'pointer',
            background: '#d2c4f5', 
            color: 'rgba(73, 5, 251, 1)', 
            fontWeight: 600, 
            borderRadius: 10, 
            border: 'none', 
            padding: '3px 10px', 
            marginLeft: 20,
          }
        },
        '& .btns': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          '& button': {
            height : 80,
          }

        },
        '& .smallBtn': {
          width: 25,
          height: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          transition: 'all 0.3s ease',
          '&:hover': {
            background: '#D9D9D9',
          },
        },
        '& .dropdown': {
          position: 'relative',
          '&:hover': {
            '& .drodownMenu': {
              display: 'flex',
            },
            '& .drodownMenu1': {
              display: 'flex',
            }
          },
          '& .drodownMenu': {
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'absolute',
            backgroundColor: '#fff',
            // top: '-156px',
            bottom : '100%',
            padding: 7,
            borderRadius: 5,
            zIndex : 2,
            transition: 'all 0.3s ease',
            '& .menuItem': {
              display: 'flex',
              alignItems: 'center',
              fontSize: 14,
              width: 155,
              padding: 5,
              transition: 'all 0.3s ease',
              borderRadius: 5,
              color: '#727272',
              position: 'relative',
              '&:hover': {
                background: '#D9D9D9',
                '& .subDrodownMenu': {
                  display: 'flex',
                }
              },
              '& img': {
                marginRight: 7,
              },
              '& .subDrodownMenu': {
                display: 'none',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'absolute',
                backgroundColor: '#fff',
                left: '100%',
                bottom : 0,
                padding: 7,
                borderRadius: 5,
                zIndex : 2,
                transition: 'all 0.3s ease',
              }
            },
          },
          '& .drodownMenu1': {
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'absolute',
            backgroundColor: '#fff',
            top: '-3px',
            left: '-111px',
            padding: 3,
            borderRadius: 5,
            
            transition: 'all 0.3s ease',
            '& .menuItem': {
              display: 'flex',
              alignItems: 'center',
              width: 20,
              height: 20,
              transition: 'all 0.3s ease',
              borderRadius: 5,
              color: '#727272',
              margin: 3,
              '&:hover': {
                background: '#D9D9D9',
              },
              '& img': {
                marginRight: 7,
    
              }
            },
          },
        },
        '& .ml-3': {
          marginLeft: 7,
        },
        
      },
      '& .desc': {
        marginBottom : 20,
        '& p': {
          width: '100%',
          display: '-webkit-box',
          boxSizing: 'border-box',
          textOverflow:'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'normal',
          WebkitBoxOrient: 'vertical',
          fontSize : 12,
        }
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
        background: '#F400F5',
        border : 'none',
        '& p': {
          fontSize : 16,
          color : '#fff',
          [theme.breakpoints.down('xs')]: {
            fontSize : 12,
          },
        },
        '&:hover': {
          background: '#F400F5aa',
        },
      },
      '& .newCollectionCard': {
        background: '#ffffff00',
        border: '1px dashed #262626',
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
          fontSize : 16,
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
    paddingTop : 0,
    [theme.breakpoints.down('xs')]: {
      gap: 10,
    },
    '& button': {
      width : '100%',
      height : 80,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        height : 60,
      },
    },
  },
  modalBtnsDetail: {
    display: 'flex',
    alignItems: 'center',
    width: 330,
    height: 95,
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
