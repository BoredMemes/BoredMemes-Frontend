import { makeStyles, styled, Theme, withStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
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
      fontSize: 22,
      fontWeight: 500,
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        fontSize: 20,
      },
    },
    '& button': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },

  content: {
    width: '100%',
    height: 'auto',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    paddingTop: 10,
    background: '#ffffff',
    borderRadius: 20,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },

  },
  createCustomModal: {
    display: 'none !important'
  },

  stakeCard: {
    width: '100%',
    background: 'rgba(220, 195, 244, 0.5)',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
    },
    '& .top': {
      width: '100%',
      background: '#F4F4F4',
      borderRadius: 20,
      padding: 20,
      paddingRight: 50,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        padding: 10,
        paddingRight: 10,
      },
      '& ul': {
        width: '100%',
        display: 'flex',
        padding: 0,
        margin: 0,
        listStyle: 'none',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
          alignItems: 'flex-start',
        },
        '& li': {
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
          [theme.breakpoints.down('xs')]: {
            marginBottom: 10,
          },
          '& img': {
            width: 64,
            height: 64,
            marginRight: 8,
          },
          '& span': {
            display: 'flex',
            flexDirection: 'column',
          },

          '& h4': {
            color: '#343A69',
            fontSize: 20,
            width: '180px',
            [theme.breakpoints.down('xs')]: {
              fontSize: 18,
            },
          },
          '& h5': {
            color: '#727272',
          },
          '& p': {
            fontSize: 16,
            [theme.breakpoints.down('xs')]: {
              fontSize: 12,
            },
          },

        },
      },
      '& .downBtn': {
        position: 'absolute',
        right: 10,
        cursor: 'pointer',
        width: 24,
        height: 24,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: '#E3E3E3'
        },
        '& img': {
          width: '90%',
          transition: 'all 0.3s ease',
        },
        [theme.breakpoints.down('xs')]: {
          top: 20,
        },
      },
    },
    '& .state': {
      width: '100%',
      borderRadius: 20,
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        padding: 10,
      },
      '& ul': {
        width: '100%',
        display: 'flex',
        padding: 0,
        margin: 0,
        listStyle: 'none',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
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
            color: '#343A69',
            fontSize: 20,
            width: '180px',
          },
          '& h5': {
            color: '#727272',
          },
          '& p': {
            fontSize: 14,
          },
          '& button': {
            [theme.breakpoints.down('xs')]: {
              fontSize: 12,
            },
          },
        },
      },
      '& .downBtn': {
        position: 'absolute',
        right: 10,
        cursor: 'pointer',
        width: 24,
        height: 24,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: '#E3E3E3'
        },
        '& img': {
          width: '90%',
          transition: 'all 0.3s ease',
        },
      },
    },
    '& .bottomTxt': {
      padding: 10,
      fontSize: 16,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    }
  },
  right: {
    width: '280px',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    marginLeft: 20,
    borderRadius: 20,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: 20,
      marginLeft: 0,
    },

  },
  rewardCard: {
    width: '100%',
    background: '#F4F4F4',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    [theme.breakpoints.down('xs')]: {
    },
    '& ul': {
      width: '100%',
      display: 'flex',
      padding: 0,

      listStyle: 'none',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'center',
      '& li': {
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        '& h4': {
          color: '#343A69',
          fontSize: 18,
          fontFamily: "'Josefin Sans', sans-serif",
          marginTop: 10,
          marginBottom: 20,
        },
        '& h5': {
          color: '#F5007B',
          fontSize: 14,
          background: '#F5007B22',
          display: 'flex',
          alignItems: 'center',
          padding: '7px 20px',
          fontWeight: 400,
          fontFamily: "'Josefin Sans', sans-serif",
          borderRadius: 20,
          '& span': {
            fontWeight: 600,
            marginLeft: 7,
          },
        },
        '& p': {
          fontSize: 12,
          fontFamily: "'Josefin Sans', sans-serif",
        },
      },
    },
  },
  buyPanel: {
    width: '100%',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    top: 0,
    left: 0,
    position: 'sticky',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
    '& ul': {
      width: '100%',
      display: 'flex',
      padding: 0,

      listStyle: 'none',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'center',
      '& li': {
        width: '100%',
        marginBottom: 10,
        '& .balance': {
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          backgroundSize: '100% 100%',
          paddingTop: 70,
          paddingBottom: 10,
          '& h2': {
            color: '#fff',
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 400,
            fontFamily: "'Josefin Sans', sans-serif",
          },
          '& img': {
            fontWeight: 600,
            marginLeft: 7,
          },
        },
        '& a': {
          color: '#fff',
          width: '100%',
          fontSize: 14,
          background: '#F5007B22',
          display: 'flex',
          alignItems: 'center',
          padding: '7px 20px',
          justifyContent: 'end',
          fontWeight: 400,
          fontFamily: "'Josefin Sans', sans-serif",
          borderRadius: 20,
          transition: 'all 0.3s ease',
          '&:hover': {
            opacity: 0.8
          },
          '& img': {
            fontWeight: 600,
            marginLeft: 7,
          },
        },
        '& p': {
          fontSize: 12,
          fontFamily: "'Josefin Sans', sans-serif",
        },
      },
    },
  },

  modal: {
    width: '100%',
    padding: 10,
    [theme.breakpoints.down('xs')]: {
      padding: '10px 7px',
    },
  },
  modalTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
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
        width: 300,
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
          width: 150,
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
      background: '#ffffff00',
      '&:hover': {
        background: '#F4F4F4'
      },
      [theme.breakpoints.down('xs')]: {
        width: 25,
        height: 25,
      },
      '& img': {
        [theme.breakpoints.down('xs')]: {
          width: 18,
          height: 18,
        },
      },
    },
  },
  createModal: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: '10px 7px',
    },
  },
  createModalRootContent: {
    maxWidth: '636px',
    padding: '0px !important',
    width: '636px',
    height: '615px',
    [theme.breakpoints.down('xs')]: {
      width: '320px',
      height: '585px',
    },
  },
  createModalTop: {
    display: 'flex',
    width: '100%',
    background: '#030316',
    justifyContent: 'space-between',
    padding: '22px 34px',
    [theme.breakpoints.down('xs')]: {
      padding: '6px 10px',
    },

    '& .topTitle': {
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '36px',
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
        fontSize: 20,
        color: '#727272 !important',
        width: 300,
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
          width: 150,
        },
      },
      '& p': {
        fontSize: 12,
        color: '#343A69',
        fontFamily: "'Josefin Sans', sans-serif",
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
  createModalContent: {
    modalContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
      padding: '37px 88px 20px 68px',
      [theme.breakpoints.down('xs')]: {
        padding: '17px 38px 10px 28px',
      },
      '& h5': {
        fontSize: 14,
        color: '#343A69',
        width: '100%',
        textAlign: 'end',
        marginBottom: 20,
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
        },
      },
      '& h3, input, textarea': {
        fontSize: 18,
        [theme.breakpoints.down('xs')]: {
          fontSize: 14,
        },
      },
      '& textarea': {
        height: 140,
        [theme.breakpoints.down('xs')]: {
          height: 120,
        },
      },
      '& .row': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 7,

        '& p': {
          fontSize: 18,
          color: '#262626',
          fontFamily: 'Poppins',
          [theme.breakpoints.down('xs')]: {
            fontSize: 12,
          },
        },
      },
      '& .modal_switch': {
        width: 64,
        height: 40,
        [theme.breakpoints.down('xs')]: {
          width: 48,
          height: 32.
        },
      }
    },
  },
  createModalAddContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    padding: '20px 40px',
    '& .btn-wrapper': {
      '& button': {
        [theme.breakpoints.down('xs')]: {
          width: '100% !important',
          marginLeft: '0px !important',
          marginTop: 8
        },
      }
    },
    '& div': {
      marginTop: 15,
      width: '100%',
      '& div': {
        width: '50%'
      },
      '& input': {
        width: '95%',
        border: 'solid 1px white',
        background: 'rgba(3, 3, 22, 1)',
        padding: 21,
        borderRadius: 8,
        fontFamily: "'Josefin Sans', sans-serif",
        fontSize: 18,
        [theme.breakpoints.down('xs')]: {
          fontSize: 14,
        },
      },

    },
    '& p': {
      fontSize: 14,
      color: '#343A69',
      width: '100%',
      maxWidth: 350,
      marginBottom: 10,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },

    '& .btns': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginBottom: 20,
      gridArea: 'auto',
      gap: 20,
      '& button': {
        maxWidth: 254,
        width: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        position: 'relative',

        [theme.breakpoints.down('xs')]: {
          width: '100%',
          height: 40,
        },
        '& p': {
          margin: 0,
        },
      },
      '& .collectionCard': {
        background: 'linear-gradient(94.46deg, #F400F5 0.38%, #D300F5 100%);',
        border: 'none',
        '& p': {
          fontSize: 16,
          color: '#fff',
          [theme.breakpoints.down('xs')]: {
            fontSize: 12,
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
          width: '100%',
          height: 60,
        },
        '& img': {
          marginRight: 10,
          [theme.breakpoints.down('xs')]: {
            width: 20,
          },
        },
        '& p': {
          background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          width: 'fit-content',
          color: '#262626',
          [theme.breakpoints.down('xs')]: {
            fontSize: 12,
          },
        },
      },


    },
    '& .chooseBtns': {
      width: '100%',
      marginBottom: 20,
      maxWidth: 350,
      '& h4': {
        fontSize: 14,
        color: '#343A69',
        width: '100%',
        maxWidth: 350,
        marginBottom: 10,
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
        },
      },
    },
    '& .row': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      gridArea: 'auto',
      gap: 10,
      [theme.breakpoints.down('xs')]: {
        // flexDirection : 'column',
      },
      '& button': {
        width: 'fit-content',
        maxWidth: '50%',
        fontSize: 12,
        [theme.breakpoints.down('xs')]: {
          maxWidth: '50%',
          fontSize: 10,
          padding: 5,
          // width : '100%',
        },
      },
    },
  },
  modalContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    '& h5': {
      fontSize: 14,
      color: '#343A69',
      width: '100%',
      textAlign: 'end',
      marginBottom: 20,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
    '& span': {
      display: 'flex',
      alignItems: 'center',
      margin: 20,
      width: '100%',
      background: '#F4F4F4',
      padding: 15,
      borderRadius: 15,
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        padding: 10,
      },
      '& input': {
        width: '90%',
        border: 'none',
        background: '#ffffff00',
        fontFamily: "'Josefin Sans', sans-serif",
        fontSize: 16,
        [theme.breakpoints.down('xs')]: {
          fontSize: 14,
        },
        '&:focus': {
          outline: 'none',
        },
      },
      '& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
        appearance: 'none',
        // -webkit-appearance: 'none',
        margin: 0,
      },
      '& button': {
        background: '#7A00F522',
        border: 'none',
        color: '#7A00F5',
        fontFamily: "'Josefin Sans', sans-serif",
        padding: '7px 15px',
        borderRadius: 7,
        fontSize: 16,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: '#7A00F533'
        },
        [theme.breakpoints.down('xs')]: {
          fontSize: 14,
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
      border: '2px dashed rgba(24, 70, 232, 1)',
      borderRadius: 7,
      marginBottom: 20,
      padding: '20px 10px',
      background: '#cdcdd0 !important',
      '& img': {
        marginRight: 10,
      },
      '& p': {
        fontSize: 14,
        color: 'rgba(24, 70, 232, 1)',
        fontFamily: "'Josefin Sans', sans-serif",
        [theme.breakpoints.down('xs')]: {
          fontSize: 12,
        },
      },
    },
  },

  lock: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
    '& span': {
      padding: '2px',
      margin: 'unset',
      '&:hover': {
        background: 'none'
      },
      background: 'none',
      '& span': {
        background: 'none',
        display: 'block',
        width: '25px',
        margin: 'unset',
        borderRadius: '4px',
        padding: 1
      }
    },
    '& img': {
      marginRight: 10,
    },
    '& p': {
      fontSize: 16,
      color: '#727272',
      fontFamily: "'Josefin Sans', sans-serif",
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },

    '& h6': {
      fontSize: 16,
      padding: '5px 10px',
      fontFamily: "'Josefin Sans', sans-serif",
      borderRadius: 7,
      marginLeft: 7,
      marginRight: 7,
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
      width: '50%',
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
    '& .cancel-btn': {
      fontWeight: 600,
      background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
    marginBottom: 5,
    [theme.breakpoints.down('xs')]: {
    },
    '& .node': {
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#9B51E0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      transition: 'all 0.3s ease',
      [theme.breakpoints.down('xs')]: {
      },
      '& .circle': {
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: '#E0E0E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      },
    },
    '& .label': {
      fontSize: 14,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
    '& .ml-5': {
      marginLeft: 5,
      [theme.breakpoints.down('xs')]: {
      },
    },
    '& .ml-10': {
      marginLeft: 10,
      [theme.breakpoints.down('xs')]: {
      },
    },
    '& .line': {
      width: '100%',
      height: 2,
      background: '#E0E0E7',
      position: 'absolute',
      transition: 'all 0.3s ease',
      [theme.breakpoints.down('xs')]: {
      },
      '& div': {
        transition: 'all 0.3s ease',
      }
    },
  },

  boostModal: {
    width: '100%',
    maxWidth: 480,
    padding: 10,
    [theme.breakpoints.down('xs')]: {
      padding: '10px 7px',
    },
    '& .customSwitchText': {
      right: 20,
      display: 'flex',
      position: 'absolute',
      '& span': {
        fontSize: 12,
        marginLeft: 10,
        color: '#3b485e'
      }
    },
    '& .boostModalContent': {
      '& .img-group': {
        marginTop: 20,
        display: 'block',
        cursor:'pointer',
        '&.selected': {
          border:'solid 1px black'
        },
        '& img': {
          margin: 4
        }
      }
    }
  },
  img_list:{
    maxWidth:145, overflowX:'scroll',
    '& img': {
      margin:2
    },
  },
  stake_card: {
    width: '100%',
    height: 'fit-content',
    left: '0px',
    top: '0px',
    padding: '20px 15px',
    display: 'flex',
    background: '#333333',
    borderRadius: '16px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      height: 'fit-content',
      display: 'list-item'
    },
    '& button': {
      cursor: 'pointer',
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      },
    },
    '& div': {
      // marginLeft: '20px',

      '& p': {
        fontDamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '13.7304px',
        lineHeight: '21px',
        color: '#FFFFFF !important',
        textAlign: 'left'
      },
      '& h3': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: '20px',
        lineHeight: '27px',
        letterSpacing: '-0.005em',
        background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 16%, #FFB332 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 800,
        backgroundClip: 'text',
        textFillColor: 'transparent',
      },
      '& h4': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '27px',
        letterSpacing: '-0.005em',
        color: '#FFFFFF',
        textAlign: 'left'
      },
      '& h5': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: '16px',
        lineHeight: '27px',
        letterSpacing: '-0.005em',
        color: 'rgba(114, 114, 114, 0.9)',
        textAlign: 'left'
      },
      '& span': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
        color: 'rgba(114, 114, 114, 0.9)',
        textAlign: 'left'
      },
    }
  },

  withdraw_card: {
    width: '100%',
    height: 'fit-content',
    left: '0px',
    top: '0px',
    padding: '20px 15px',
    display: 'flex',
    borderRadius: '16px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      height: 'fit-content',
      display: 'list-item'
    },
    '& button': {
      cursor: 'pointer'
    },
    '& div': {
      // marginLeft: '20px',
      '& div': {
        display: 'flex',
        '& span': {
          padding: 5,
          paddingRight: 15,
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontSize: '20px',
          lineHeight: '27px',
          letterSpacing: '-0.005em',
          background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 16%, #FFB332 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
          backgroundClip: 'text',
          textFillColor: 'transparent',
        },
      },
      '& p': {
        fontDamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '13.7304px',
        lineHeight: '21px',
        // color: '#FFFFFF !important',
        textAlign: 'left'
      },
      '& h3': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: '20px',
        lineHeight: '27px',
        letterSpacing: '-0.005em',
        background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 16%, #FFB332 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 800,
        backgroundClip: 'text',
        textFillColor: 'transparent',
      },
      '& h6': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: '15px',
        lineHeight: '27px',
        letterSpacing: '-0.005em',
        background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 16%, #FFB332 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 800,
        backgroundClip: 'text',
        textFillColor: 'transparent',
      },
      '& h4': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '27px',
        letterSpacing: '-0.005em',
        color: '#FFFFFF',
        textAlign: 'left'
      },

      '& h5': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: '16px',
        lineHeight: '27px',
        letterSpacing: '-0.005em',
        color: 'rgba(114, 114, 114, 0.9)',
        textAlign: 'left'
      },
      '& span': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
        color: 'rgba(114, 114, 114, 0.9)',
        textAlign: 'left'
      },
    }
  },
  custom_create_btn: {
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 'auto',
    gap: '23px',
    width: '100%',
    height: '115px',
    borderRadius: '10px',
    border: 'dashed 1px #850df2',
    marginTop: '30px',
    justifyContent: 'center',
    '& span': {
      // color: '#e91be4'
      background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }
  },
  custom_pool_btn: {
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 'auto',
    gap: '13px',
    width: '250px',
    height: '60px',
    borderRadius: '8px',
    border: 'dashed 1px #850df2',
    marginTop: '8px',
    justifyContent: 'center',
    '& span': {
      background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: 12
    },
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    margin: 20,
    width: '100%',
    background: '#F4F4F4',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
    '& input': {
      width: '90%',
      border: 'none',
      background: '#ffffff00',
      fontFamily: "'Josefin Sans', sans-serif",
      fontSize: 16,
      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
      },
      '&:focus': {
        outline: 'none',
      },
    },
    '& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
      appearance: 'none',
      // -webkit-appearance: 'none',
      margin: 0,
    },
    '& button': {
      background: '#7A00F522',
      border: 'none',
      color: '#7A00F5',
      fontFamily: "'Josefin Sans', sans-serif",
      padding: '7px 15px',
      borderRadius: 7,
      fontSize: 16,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: '#7A00F533'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
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
      zIndex: 1,
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
    color: '#F400F5',
    backgroundColor: '#fff',
    borderRadius: 30,
    border: '1px #F400F5 solid',
  },
}));
