import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { getUser, useAuthDispatch, useAuthState } from 'context/authContext';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

interface PropsType {
}

interface StyleType {
  height?: any;
}

const useStyles = makeStyles(theme => ({
  productWrapper: {
    maxWidth: 454,
    cursor: 'pointer',
    background: '#F0F2F5',
    borderRadius: 18,
    border: '3px #F400F500 solid',
    // overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '90vw',
      width: '70vw',
    },
    '& .top': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      height: '100%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      '& img': {
        width: '100%',
        height: '100%',
        // height: '15vw',
        // maxHeight : 300,
        borderRadius: 16,
        objectFit: 'cover',
        [theme.breakpoints.down('xs')]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      '& div': {
        width: '100%',
        // height: '15vw',
        objectFit: 'cover',
        fontSize: 14,
        textAlign: 'center',
        color: '#727272',
        backgroundColor: '#D9D9D9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    '&:hover': {
      '& .overly': {
        opacity: 1,
      }
    },

    '& .overly': {
      padding: '10px 10px',
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
      width: 'calc(100% - 10px)',
      height: 100,
      left: 5,
      bottom: 5,
      background: '#F0F2F5',
      borderRadius: 16,
      opacity: 0,
      transition: 'all 0.3s ease',
      zIndex: 10,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important',
      },
      '& .desc': {
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        '& p': {
          width: '100%',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          boxSizing: 'border-box',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'normal',
          WebkitBoxOrient: 'vertical',
          fontSize: 12,
        }
      },
      '& .footer': {
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },
      '& .avatar': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        transition: 'all 0.3s ease',
        padding: 5,
        borderRadius: 40,
        '&:hover': {
          background: '#D9D9D9',
        },
        '& img': {
          marginRight: 7,
          height: 35,
          width: 35,
          objectfit: 'cover',
          borderRadius: 35,
        },
        '& p': {
          width: '100%',
          display: '-webkit-box',
          boxSizing: 'border-box',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'normal',
          WebkitBoxOrient: 'vertical',
          fontSize: 12,
        }
      },
      '& .btns': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
          bottom: '100%',
          padding: 7,
          borderRadius: 5,
          zIndex: 20,
          transition: 'all 0.3s ease',
          '& .menuItem': {
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            width: 170,
            padding: 5,
            transition: 'all 0.3s ease',
            borderRadius: 8,
            color: '#727272',
            position: 'relative',
            border: 'solid 1px',
            borderColor: 'transparent',
            '&:hover': {
              background: 'transparent !important',
              backgroundImage: 'linear-gradient(90deg, white, white),linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 40%, #FFB332 100%) !important',
              backgroundClip: 'padding-box, border-box !important',
              backgroundOrigin: 'border-box !important',
              border: '1.5px solid transparent',
              '& .subDrodownMenu': {
                display: 'flex',
              }
            },
            '&:before': {
              borderImage: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)',
              border: 'solid 3.5px transparent',
              borderImageSlice: 1,
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
              left: '-110%',
              bottom: 0,
              padding: 7,
              borderRadius: 5,
              zIndex: 2,
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
    '&.selected': {
      borderColor: '#F400F5'
    },

    '& .dark': {
      '& .menuItem': {
        '&:hover': {
          display: 'none !important',
          '& .subDrodownMenu': {
            display: 'flex',
          }
        },
      },
    }
  },
}));

interface PropsType {
  collection?: any;
}

const CollectionCard = ({ collection }: PropsType) => {
  const classes = useStyles();
  const { loginStatus, account } = useContext(Web3WalletContext)
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const ref = useRef(null)

  return (
    <div className={`${classes.productWrapper} card1`} ref={ref} >
      <div className="top" >
          <img src={collection?.reveal_uri} alt="" />
      </div>
      <div className="overly">
        <div className="desc">
          <p>{collection.description} </p>
        </div>
        <div className="footer">
          <div className="avatar">
            <img src={collection?.ownerUser.logo_url} alt="" />
            <p>{collection?.ownerUser.name}</p>
          </div>
          <div className="btns">

          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
