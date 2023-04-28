import { makeStyles, styled } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
  root: {
    background: '#ffffff',
    borderRadius: 20,
    height: '100%',
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
        marginLeft: 7,
        '& h3': {
          fontSize: 20,
          lineHeight: 1,
          [theme.breakpoints.down('xs')]: {
            fontSize: 18,
          },
        },
        '& .follows': {
          marginRight: 20,
          display: 'flex',
          alignItems: 'center',
        },
        '& p': {
          fontSize: 14,
          marginRight: 20,
          [theme.breakpoints.down('xs')]: {
            fontSize: 12,
          },
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
        width: '100%',
        justifyContent: 'space-between',
      },
      '& .socialLinks': {
        display: 'flex',
        alignItems: 'center',
        gridTemplateColumns: 'auto auto auto',
        gap: 20,
        [theme.breakpoints.down('xs')]: {
          gap: 10,
        },
        '& a': {
          fontSize: 22,
          color: '#1EA1F2',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '& :hover': {
            opacity: 0.7,
          },
          [theme.breakpoints.down('xs')]: {
            fontSize: 20,
          },
          '& i': {
            background: 'linear-gradient(203.2deg, #37AEE2 21.67%, #1E96C8 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }
        },
        '& div': {
          color: 'white'
        }
      },
      '& p': {
        fontSize: 14,
        [theme.breakpoints.down('xs')]: {
        },
      },
      '& .edit_profile': {
        padding: '10px 20px',
        background: '#F0F2F5',
        boxShadow: '-1.96149px 2.94223px 6.86521px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        fontSize: '0.8vw',
        color: '#727272',
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
          fontSize: 12,
        },
      }
    },
    '& h2': {
      fontSize: 32,
      color: '#fff',
      textShadow: '5px 5px 10px #000000aa',
      [theme.breakpoints.down('xs')]: {
        fontSize: 18,
      },
    },
    '& .feedBtns': {
      marginRight: 10,
      padding: 2,
      paddingRight: 8,
      paddingLeft: 8,
      color: '#727272',
      borderBottom: 'solid 1px #727272',
      fontWeight: 600,
      cursor: 'pointer'
    },
    '& .activeFeedBtns': {
      borderImage: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)',
      borderBottom: 'solid 1px',
      borderImageSlice: 1,
      padding: 2,
      paddingRight: 8,
      paddingLeft: 8,
      fontWeight: 600,
      background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      width: 'fit-content',
      color: '#262626',
      cursor: 'pointer'
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
      position: 'sticky',
      bottom: 10,
      background: '#F0F2F5',
      width: '100%',
      padding: '10px 20px',
      borderRadius: 15,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.5s ease',
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
        gridAare: 'auto',
        gap: 20,
        '& button': {
          display: 'flex',
          alignItems: 'center',
          border: 'none',
          padding: '8px 20px',
          fontSize: 16,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          borderRadius: 50,
          [theme.breakpoints.down('xs')]: {
            fontSize: 12,
          },
        },
        '& .grey': {
          color: '#727272',
          '&:hover': {
            background: '#D9D9D9'
          }
        },
        '& .pink': {
          color: '#fff',
          background: '#F400F5',
          position: 'relative',
          '&:hover': {
            background: '#F400F599',
            '& .drodownMenu': {
              display: 'flex',
            }
          },
          '& img': {
            marginLeft: 10,
          },
          '& .drodownMenu': {
            display: 'none',
            flexDirection: 'column',
            position: 'absolute',
            backgroundColor: '#fff',
            // top: '-156px',
            right: 0,
            bottom: '100%',
            padding: 7,
            borderRadius: 5,
            zIndex: 2,
            transition: 'all 0.3s ease',
            '& .menuItem': {
              fontSize: 14,
              // width: 155,
              whiteSpace: 'nowrap',
              padding: 5,
              transition: 'all 0.3s ease',
              borderRadius: 5,
              color: '#727272',
              position: 'relative',
              textAlign: 'left',
              border: '1.5px solid transparent',
              '&:hover': {
                background: 'transparent !important',
                backgroundImage: 'linear-gradient(90deg, white, white),linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 40%, #FFB332 100%) !important',
                backgroundClip: 'padding-box, border-box !important',
                backgroundOrigin: 'border-box !important',
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
  cardContainer: {
    display: 'grid',
    gap: '10px',
    width: '100%',
    padding:'0px 16px',
    gridTemplateColumns: 'repeat(3, 1fr)',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  modalBtns: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gridTemplateColumns: 'auto auto auto',
    gap: 20,
    padding: '20px 70px 20px ',
    [theme.breakpoints.down('xs')]: {
      gap: 10,
    },
    [theme.breakpoints.down('xs')]: {
      padding: '10px 30px 10px ',
      display: 'block',
    },
    '& button': {
      width: '227px',
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        marginTop: 5,
        // width: '100%',
        borderRadius: '9px !important'
      },
    },
  },
  
  processModalRoot: {
    margin: '0px !important',
    padding: 0,
    paddingTop: '0px !important',
  },
  processModal: {
    width: '550px',
    paddingBottom: 10,
    [theme.breakpoints.down('xs')]: {
      width: '270px',
    },
    '& .success-transaction': {
      background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: '#262626',
      fontWeight: 500,
      fontSize: 20,
      marginTop: 50,
      marginBottom: 70,
      textAlign: 'center',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        marginTop: 30,
        marginBottom: 30,
      },
    }
  },
  processModalTop: {
    display: 'flex',
    width: '100%',
    padding: '22px 34px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      padding: '8px 12px',
    },
    '& .topTitle': {
      color: '#343A69',
      '& p': {
        color: '#343A69',
      }
    },
    '& span': {
      display: 'flex',
      alignItems: 'center',
      '& img': {
        width: 60,
        height: 60,
        marginRight: 10,
        [theme.breakpoints.down('xs')]: {
          marginRight: 7,
          width: 50,
          height: 50,
        },
      },
      '& h4': {
        fontWeight: 700,
        fontSize: 16,
        color: '#343A69',
        width: 350,
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
          width: 180,
        },
      },
    },
    '& button': {
      width: 30,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: 'rgba(127, 129, 158, 0.8)',
      borderRadius: 30,
      '&:hover': {
        background: '#727272aa'
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: 4,
        width: 25,
        height: 25,
      },
      '& img': {
        width: 15,
        height: 15,
        [theme.breakpoints.down('xs')]: {
          width: 18,
          height: 18,
        },
      },
    },
  },
  processModalContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    padding: '20px 40px',
    [theme.breakpoints.down('xs')]: {
      padding: '8px 12px',
    },
    '& span': {
      display: 'flex',
      alignItems: 'center',
      margin: 20,

      '& img': {
        width: 60,
        height: 60,
        marginRight: 10,
        animation: 'loadingAni 1s linear 0s infinite forwards',
        [theme.breakpoints.down('xs')]: {
          width: 30,
          height: 30,
        },
      },
      '& p': {
        fontSize: 14,
        color: '#343A69',
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
        },
      },

    },
    '& .warning': {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      border: '3px solid #703afb',
      borderRadius: 7,
      marginBottom: 20,
      padding: '20px 10px',
      background: 'white !important',
      '& img': {
        marginRight: 10,
      },
      '& p': {
        fontSize: 14,
        fontWeight: 500,
        color: '#4905FB',
        fontFamily: "'Josefin Sans', sans-serif",
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
        },
      },
    },
  },
}));



export default useStyles;