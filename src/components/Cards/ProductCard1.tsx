import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface PropsType {
  item?: any;
  onShow?: any;
  updateArts?: any;
}

const useStyles = makeStyles(theme => ({
  productWrapper: {
    maxWidth: 454,
    cursor: 'pointer',
    background: '#F0F2F5',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 30,
    position: 'relative',
    '@media screen and (max-width: 768px) and (orientation: portrait)': {
      maxWidth: '90vw',
    },
    '& .top': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      '& img': {
        width: '100%',
        minHeight: '13vw',
        objectFit: 'cover',
      },
      '& div': {
        width: '100%',
        minHeight: '13vw',
        objectFit: 'cover',
        fontSize: 14,
        textAlign: 'center',
        color: '#727272',
        backgroundColor: '#D9D9D9'
      },
    },

    '& .footer': {
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      '@media screen and (max-width: 768px) and (orientation: portrait)': {
        width: '100% !important',
      },
      '& .left': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      '& .right': {
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
          top: '-76px',
          padding: 7,
          borderRadius: 5,
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
            '&:hover': {
              background: '#D9D9D9',
            },
            '& img': {
              marginRight: 7,

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
    '& .footer1': {
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      '@media screen and (max-width: 768px) and (orientation: portrait)': {
        width: '100% !important',
      },
      '& .left': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      '& .right': {
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
      '& .ml-3': {
        marginLeft: 7,
      },
    },
  },
}));


const PropertyCard1 = ({ item, onShow, updateArts }: PropsType) => {
  const classes = useStyles();
  const { loginStatus, account, library } = useContext(Web3WalletContext)
  const [emoticon, setEmoticon] = useState(-1);

  const handleBookmark = async (item) => {
    if (!loginStatus) {
      return toast.error("Please connect your wallet correctly.");
    }
    let paramsData = {
      address: account.toLowerCase(),
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

  const copyHandle = () => {
    if (item?.description === "")return;
    let textarea = document.createElement("textarea");
    textarea.textContent = item?.description;
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
    if (item?.assetUrl !== "")
    fetch(item?.assetUrl).then(response => {
      response.blob().then(blob => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.setAttribute('target', '_blank');
        alink.download = item?.assetUrl.split('/')[item?.assetUrl.split('/').length - 1];
        alink.click();
        // Append to html link element page
        document.body.appendChild(alink);
        // Clean up and remove the link
        alink.parentNode.removeChild(alink);
      })
    })
  }

  return (
    <div className={`${classes.productWrapper} card1`}>
      <div className="top" onClick={onShow}>
        {
          item?.assetUrl && item?.assetUrl !== "" ? <img src={item?.assetUrl} alt="" /> :
            <div>
              Awaiting Design
            </div>
        }
      </div>

      <div className="footer">
        <div className="left">
          <div className="smallBtn" onClick={() => onDownload()}>
            <img src="/assets/icons/download_icon.svg" alt="" />
          </div>
        </div>
        <div className="right">
          <div className="smallBtn dropdown">
            <img src="/assets/icons/more_icon.svg" alt="" />
            <div className="drodownMenu">
              <div className="menuItem" onClick={() => copyHandle()}>
                <img src="/assets/icons/images_icon.svg" alt="" /> Copy description
              </div>
              <div className="menuItem" onClick={() => onDownload()}>
                <img src="/assets/icons/download_icon.svg" alt="" /> Save image
              </div>
            </div>
          </div>

          {/* {(product?.commentType === 0 || emoticon === 0) &&
          <div className="smallBtn ml-3">
             <img src="/assets/icons/image 185.png" alt="" />
          </div>}
          {(product?.commentType === 1 || emoticon === 1) &&
          <div className="smallBtn ml-3">
            <img src="/assets/icons/Grimacing Face.png" alt="" />
          </div>}
          {(product?.commentType === 2 || emoticon === 2) &&
          <div className="smallBtn ml-3">
            <img src="/assets/icons/Star-Struck.png" alt="" />
          </div>}
          {(product?.commentType === 3 || emoticon === 3) &&
          <div className="smallBtn ml-3">
           <img src="/assets/icons/Smiling Face with Heart-Eyes.png" alt="" />
          </div>}
          */}
          <div className="smallBtn ml-3" onClick={() => handleBookmark(item)}>
            {(item?.bookmarks && item?.bookmarks.includes(account.toLowerCase())) ?
              <img src="/assets/icons/bookmark_full_icon.svg" alt="" /> :
              <img src="/assets/icons/bookmark_line_icon.svg" alt="" />}
          </div>

          <div className="smallBtn ml-3 dropdown">
            <img src="/assets/icons/face_icon.svg" alt="" />
            <div className="drodownMenu1">
              <div className="menuItem" onClick={() => setEmoticon(0)}>
                <img src="/assets/icons/image 185.png" alt="" />
              </div>
              <div className="menuItem" onClick={() => setEmoticon(1)}>
                <img src="/assets/icons/Grimacing Face.png" alt="" />
              </div>
              <div className="menuItem" onClick={() => setEmoticon(2)}>
                <img src="/assets/icons/Star-Struck.png" alt="" />
              </div>
              <div className="menuItem" onClick={() => setEmoticon(3)}>
                <img src="/assets/icons/Smiling Face with Heart-Eyes.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard1;
