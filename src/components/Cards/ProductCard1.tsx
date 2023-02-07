import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { useAuthState } from 'context/authContext';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PropsType {
  item?: any;
  onClick?: any;
  updateArts?: any;
  onShow?: any;
  isSelected ?: boolean
  isNew ?: boolean
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
    border : '3px #F400F500 solid',
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
      height : '100%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      '& img': {
        width: '100%',
        height : '100%',
        // height: '15vw',
        // maxHeight : 300,
        borderRadius: 16,
        objectFit: 'cover',
        [theme.breakpoints.down('xs')]: {
          display : 'flex',
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
        display : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
          display : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    '&:hover': {
      '& .overly': {
        opacity : 1,
      }
    },

    '& .overly': {
      padding: '10px 10px',
      justifyContent: 'space-between',
      display : 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
      width : 'calc(100% - 10px)',
      height : 100,
      left : 5,
      bottom : 5,
      background : '#F0F2F5',
      borderRadius: 16,
      opacity : 0,
      transition : 'all 0.3s ease',
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
          textOverflow:'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'normal',
          WebkitBoxOrient: 'vertical',
          fontSize : 12,
        }
      },
      '& .footer': {
        justifyContent: 'space-between',
        display : 'flex',
        alignItems: 'center',
        width : '100%',
      },
      '& .avatar': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        transition : 'all 0.3s ease',
        padding : 5,
        borderRadius : 40,
        '&:hover': {
          background: '#D9D9D9',
        },
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
          bottom : '100%',
          padding: 7,
          borderRadius: 5,
          zIndex : 2,
          transition: 'all 0.3s ease',
          '& .menuItem': {
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            width: 170,
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
    '&.selected': {
      borderColor : '#F400F5'
    },
  },
}));

const PropertyCard1 = ({ item, onClick, onShow, isSelected, updateArts, isNew }: PropsType) => {
  const classes = useStyles();
  const { loginStatus, account } = useContext(Web3WalletContext)
  const { user } = useAuthState();

  const handleBookmark = async (item) => {
    if (!loginStatus) {
      return toast.error("Please connect your wallet correctly.");
    }
    let paramsData = {
      address: account?.toLowerCase(),
      isNew: isNew,
      artId: item?.id,
      tokenId: item?.tokenId,
      collection: item?.itemCollection
    }
    axios.post("/api/item/bookmark", paramsData)
      .then((res) => {
        console.log(res.data.item);
        updateArts(res.data.item);
      }).catch((e) => {
        console.log(e);
      })
  }

  const onFollow = async () => {
    if (!loginStatus) {
      return toast.error("Please connect your wallet correctly.");
    }
    if (account?.toLowerCase() === item?.ownerUser?.address.toLowerCase()){
      return toast.error("You can not follow yourself.");
    }
    let paramsData = {
      address: account?.toLowerCase(),
      toAddress: item?.ownerUser?.address.toLowerCase()
    }
    axios.post("/api/user/follow", paramsData)
    .then((res) => {
      console.log(res.data.user);
    }).catch((e) => {
      console.log(e);
    })
  }

  const copyHandle = (type) => {
    if (item?.description === "")return;
    let textarea = document.createElement("textarea");
    textarea.textContent = type === 0 ? item?.fullCommand : type === 1 ? item?.description : "Item Link";
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

  const onDownload = () => {
    if (item?.thumbnail !== "")
    fetch(item?.thumbnail).then(response => {
      response.blob().then(blob => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.setAttribute('target', '_blank');
        alink.download = item?.thumbnail.split('/')[item?.thumbnail.split('/').length - 1];
        alink.click();
        // Append to html link element page
        document.body.appendChild(alink);
        // Clean up and remove the link
        alink.parentNode.removeChild(alink);
      })
    })
  }

  const handleEmoticon = (emoticonId) => {
    if (loginStatus){
      let paramsData = {
        address: account?.toLowerCase(),
        isNew: isNew,
        artId: item?.id,
        tokenId: item?.tokenId,
        collection: item?.itemCollection,
        emoticonId: emoticonId
      }
      axios.post("/api/item/emoticon", paramsData)
        .then((res) => {
          if (res.data.message === "success"){
            item.emoticonId = emoticonId;
            updateArts(item);
          }          
        }).catch((e) => {
          console.log(e);
        })
    }
  }
  const ref = useRef(null)
  const [divStyle, setDivStyle] = useState<StyleType>();
  useLayoutEffect(() => {
    let x = parseInt(item.ratio.split(':')[0])
    let y = parseInt(item.ratio.split(':')[1])
    
    setDivStyle({height: ((ref.current.offsetWidth * y)/x)+ "px"})

  }, []);

  function updateDimensions() {
    let x = parseInt(item.ratio.split(':')[0])
    let y = parseInt(item.ratio.split(':')[1])
    console.log(ref.current.offsetWidth, x)
    setDivStyle({height: ((ref.current.offsetWidth * y)/x)+ "px"})
  }

  window.removeEventListener('resize', updateDimensions);
  
  window.onresize = ()=>{
    let x = parseInt(item.ratio.split(':')[0])
    let y = parseInt(item.ratio.split(':')[1])
    
    setDivStyle({height: ((ref.current.offsetWidth * y)/x)+ "px"})
  }
  const onGotoPage = (link : string)=>{
    window.open(link, "_blank");
  }


  return (
    <div className={`${classes.productWrapper} ${isSelected ? 'selected':''} card1`} ref = {ref} style = {divStyle} onClick={onClick}>
      <div className="top" >
        {
          item?.assetUrl && item?.assetUrl !== "" ? <img src={item?.assetUrl} alt="" /> :
            <div>
              Awaiting Design
            </div>
        }
      </div>

      <div className="overly">
        <div className="desc">
          <p>{item?.description}</p>
        </div>
        <div className="footer">
          <div className="avatar">
            <img src={item?.ownerUser?.logo_url} alt="" />
            <p>{item?.ownerUser?.name}</p>
          </div>
          <div className="btns">
          <div className="smallBtn dropdown">
              <img src="/assets/icons/more_icon.svg" alt="" />
              <div className="drodownMenu">
                <div className="menuItem">
                  <img src="/assets/icons/arrow_icon_01.svg" alt="" /> Copy...

                  <div className="subDrodownMenu">
                    <div className="menuItem" onClick={() => copyHandle(0)}><img src="/assets/icons/link_icon.svg" alt="" /> Command</div>
                    <div className="menuItem" onClick={() => copyHandle(1)}><img src="/assets/icons/images_icon.svg" alt="" /> Prompt</div>
                    <div className="menuItem" onClick={() => copyHandle(2)}><img src="/assets/icons/link_icon.svg" alt="" /> Link</div>
                  </div>
                </div>
                <div className="menuItem" onClick={() =>onGotoPage(`/view_art/${isNew ? "new" : "onchain"}/${isNew? item?.id : item?.tokenId}`)}>
                  <img src="/assets/icons/newTab_icon.svg" alt=""  /> Open new tab
                </div>
                <div className="menuItem" onClick={() => onGotoPage(`/create_nft_collection/${item?.tokenId}`)}>
                  <img src="/assets/icons/createNFT_icon.svg" alt="" /> Create NFT
                </div>
                
                <div className="menuItem" onClick={() => onDownload()}>
                  <img src="/assets/icons/download_icon.svg" alt="" /> Save image
                </div>
                {
                  account?.toLowerCase() !== item?.ownerUser?.address.toLowerCase() && <div className="menuItem" onClick={() => onFollow()}>
                  <img src="/assets/icons/follow_icon.svg" alt="" /> {user?.followers.includes(item?.ownerUser?.address.toLowerCase()) ? "Unfollow" : "Follow"} {item?.ownerUser?.name.length > 6 ? item?.ownerUser?.name.substring(0,6) + "..." : item?.ownerUser?.name}
                </div>
                }
                
              </div>
            </div>

            {item?.emoticonId === 0 &&
            <div className="smallBtn ml-3">
              <img src="/assets/icons/image 185.png" alt="" />
            </div>}
            {item?.emoticonId === 1 &&
            <div className="smallBtn ml-3">
              <img src="/assets/icons/Grimacing Face.png" alt="" />
            </div>}
            {item?.emoticonId === 2 &&
            <div className="smallBtn ml-3">
              <img src="/assets/icons/Star-Struck.png" alt="" />
            </div>}
            {item?.emoticonId === 3 &&
            <div className="smallBtn ml-3">
            <img src="/assets/icons/Smiling Face with Heart-Eyes.png" alt="" />
            </div>}
          
            <div className="smallBtn ml-3" onClick={() => handleBookmark(item)}>
              {(item?.bookmarks && item?.bookmarks.includes(account?.toLowerCase())) ?
                <img src="/assets/icons/bookmark_full_icon.svg" alt="" /> :
                <img src="/assets/icons/bookmark_line_icon.svg" alt="" />}
            </div>

            <div className="smallBtn ml-3 dropdown">
              <img src="/assets/icons/face_icon.svg" alt="" />
              <div className="drodownMenu1">
                <div className="menuItem" onClick={() => handleEmoticon(0)}>
                  <img src="/assets/icons/image 185.png" alt="" />
                </div>
                <div className="menuItem" onClick={() => handleEmoticon(1)}>
                  <img src="/assets/icons/Grimacing Face.png" alt="" />
                </div>
                <div className="menuItem" onClick={() => handleEmoticon(2)}>
                  <img src="/assets/icons/Star-Struck.png" alt="" />
                </div>
                <div className="menuItem" onClick={() => handleEmoticon(3)}>
                  <img src="/assets/icons/Smiling Face with Heart-Eyes.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard1;
