import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { getUser, useAuthDispatch, useAuthState } from 'context/authContext';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { isAddress } from '@ethersproject/address';

interface PropsType {
}

interface StyleType {
  height?: any;
}

const useStyles = makeStyles(theme => ({
  productWrapper: {
    maxWidth: 454,
    background: '#F0F2F5',
    borderRadius: 18,
    border: '3px #F400F500 solid',
    // overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '90vw',
      width: '90vw',
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
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
      width: '100%',
      minHeight: 160,
      bottom: 0,
      background: '#333333 !important',
      borderRadius: 16,
      opacity: 0,
      transition: 'all 0.3s ease',
      zIndex: 10,
      [theme.breakpoints.down('xs')]: {
        width: 'calc(100%-50px)',
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
      '& .sub-div1': {
        display: 'flex', width: '100%', justifyContent: 'space-between', fontSize: 12, marginTop: 10
      },
      '& .sub-div2': {
        display: 'flex', width: '100%', justifyContent: 'space-between', fontSize: 12
      },
      '& .footer': {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        '& .custom-input': {
          width: '50%', display: 'flex', justifyContent: 'space-between', position: 'relative', background: '#030316', border: 'solid 1px #727272', borderRadius: 8, padding: '4px 8px',
          '& input': {
            width: '80%', background: 'transparent', border: 'none', outline: 'none', color: '#727272'
          }
        },
        '& .buttons': {
          width: '50%', display: 'flex', justifyContent: 'space-between', position: 'relative', marginLeft: 5,
          '& button': {
            width: '50%', borderRadius: 8, padding: '4px 8px', marginLeft: 4, cursor: 'pointer',
            border: '1px solid transparent',
            background: 'transparent', backgroundImage: 'linear-gradient(90deg, #333, #333),linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 40%, #FFB332 100%)',
            backgroundClip: 'padding-box, border-box', backgroundOrigin: 'border-box',
            '& span': {
              background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }
          },
          '& div': {
            '& div': {
              background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textAlign: 'center', width: '100%', fontSize: 14
            }
          }
        },
        '& .tradebuttons': {
          width: '100%', display: 'flex', justifyContent: 'space-between', position: 'relative', marginLeft: 5,
          '& button': {
            width: '100%', borderRadius: 8, padding: '4px 8px', marginLeft: 4, cursor: 'pointer',
            border: '1px solid transparent',
            background: 'transparent', backgroundImage: 'linear-gradient(90deg, #333, #333),linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 40%, #FFB332 100%)',
            backgroundClip: 'padding-box, border-box', backgroundOrigin: 'border-box',
            '& span': {
              background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }
          },
          '& div': {
            '& div': {
              background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textAlign: 'center', width: '100%', fontSize: 14
            }
          }
        }
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
          height: 28,
          width: 28,
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
  onMint?: any;
}

const CollectionCard = ({ collection, onMint }: PropsType) => {
  const classes = useStyles();
  const { loginStatus, account } = useContext(Web3WalletContext)
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const [_collection, setCollection] = useState(collection);

  const ref = useRef(null)

  const copyHandle = () => {
    if (!isAddress(_collection.address))return;
    let textarea = document.createElement("textarea");
    textarea.textContent = _collection.address;
    //textarea.textContent = "dfghjkl;";
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return prompt("Copy to clipboard: Ctrl+C, Enter");
    } finally {
      toast.success("Copied to Clipboard");
      document.body.removeChild(textarea);
    }
  };
  return (
    <div className={`${classes.productWrapper} card1`} ref={ref} >
      <div className="top" >
        <img src={_collection?.reveal_uri} alt="" />
      </div>
      <div className="overly">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <p style={{ fontWeight: 500, paddingTop: 10, fontSize: 14 }}>{_collection?.name + (!_collection.isRevealed ? (" - " + _collection?.total_supply + " NFT") : "")}</p>
          <div className="avatar">
            <img src={_collection?.ownerUser.logo_url} alt="" width={16} />
            <p>{_collection?.ownerUser.name}</p>
          </div>
        </div>
        <div className="desc">
          <p>{_collection.description} </p>
        </div>
        <div className='sub-div1'>
          {
            !_collection?.isRevealed ? <p>Mintable NFT per User: <strong>{_collection?.max_count_per_wallet}</strong></p> : 
            <p>NFT Minted: <strong>{_collection?.itemCount}</strong></p>
          }
          {
            !_collection?.isRevealed ? <p style={{ textAlign: 'right' }}>Remaining NFT to Mint: <strong>{_collection?.artIds.length}</strong></p> : 
            <p style={{ textAlign: 'right' }}>NFT Burned: <strong>{_collection?.total_supply - _collection?.itemCount}</strong></p>
          }
          
        </div>
        <div className='sub-div2'>
          <p>Minting Price: <strong>{_collection?.mint_price} ETH</strong></p>
          {/* <p style={{ textAlign: 'right' }}>Ends in <strong>12h : 15m : 30s</strong></p> */}
          {!_collection?.isRevealed ? <p style={{ textAlign: 'right' }}>Ends <strong>{moment(_collection.reveal_date).fromNow()}</strong></p> :
          <p style={{ textAlign: 'right' }}>Ended <strong>{moment(_collection.reveal_date).format("MMMM DD, YYYY")}</strong></p>
          }
        </div>
        <div className="footer">
          {
            !_collection?.isRevealed ? <>
              <div className='custom-input'>
                <input
                  min="1"
                  step="1"
                  placeholder='1'
                  onKeyDown={(e) => !((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8) && e.preventDefault()}
                  type='number'
                  onChange={(e) => setCollection({ ..._collection, saleCnt: parseInt(e.target.value) })} />
                <p style={{ position: 'absolute', right: 8, fontSize: 14 }}>NFT</p>
              </div>
              <div className='buttons'>
                <div style={{ width: '50%', background: '#030316', borderRadius: 8, padding: '4px 8px', }}>
                  <div>{!_collection?.saleCnt ? 0 : _collection?.saleCnt * _collection?.mint_price} ETH</div>
                </div>
                <button onClick={() => onMint(_collection)}><span>Mint</span></button>
              </div>
            </> : <div className='tradebuttons'>
              <button onClick={copyHandle}><span>NFT Collection Address</span></button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
