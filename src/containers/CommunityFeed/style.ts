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
    '& .tabList': {
      display: 'flex',
      alignItems: 'center',
      gridArea : 'auto',
      gap : 20,
      [theme.breakpoints.down('xs')]: {
        fontSize : 20,
      },
      '& .tab': {
        fontSize : 16,
        fontWeight : 500,
        padding : '5px 10px',
        borderBottom : '1px #727272 solid',
        color : '#727272',
        cursor : 'pointer',
        transition : 'all 0.3s ease',
        [theme.breakpoints.down('xs')]: {
        },
      },
      '& .activeTab': {
        borderColor : '#000',
        color : '#000',
        [theme.breakpoints.down('xs')]: {
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
    position : 'relative',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 20,
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
    [theme.breakpoints.down('xs')]: {
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
}));



export default useStyles;
