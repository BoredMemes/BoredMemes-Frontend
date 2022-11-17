import './viewModal.scss';
import Bounce from 'react-reveal/Bounce';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import Web3WalletContext from 'hooks/Web3ReactManager';

interface Props {
  updateArts: any;
  showModal: boolean;
  setShowModal?: any;
  item?: any;
}

const ViewModal: React.FC<Props> = ({ updateArts, showModal, setShowModal, item }) => {
  const { loginStatus, account, library } = useContext(Web3WalletContext)
  const [isStart, setIsStart] = useState(false);
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setIsStart(true);
      }, 100);
    }
  }, [setIsStart, showModal]);
  const onClose = () => {
    setIsStart(false);
    setTimeout(() => {
      setShowModal(false);
    }, 800);
  };

  const [emoticon, setEmoticon] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoaded = () => {
    setIsLoaded(true)
  }

  const handleBookmark = async (item) => {
    if (!loginStatus) {
      return toast.error("Please connect your wallet correctly.");
    }
    let paramsData = {
      address: account?.toLowerCase(),
      tokenId: item?.tokenId,
      collection: item?.itemCollection
    }
    axios.post("/api/item/bookmark", paramsData)
      .then((res) => {
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

  return (
    <div className={showModal === true ? 'viewModal active' : 'viewModal'}>
      <Bounce opposite when={isStart}>
        <div className="modelContent">
          <button className="connectModalCloseButton" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          <div className="connectWalletWrapper">
            <div className="top">
              {
                item?.assetUrl && item?.assetUrl !== "" ? <img src={item?.thumbnail} alt="" onLoad={handleImageLoaded} /> :
                  <div>
                    Awaiting Design
                  </div>
              }
            </div>

            <div className="footer" style={{ opacity: isLoaded ? 1 : 0 }}>
              <div className="left">
                <img src={item?.ownerUser.logo_url} alt="" />
                <p>{item?.ownerUser.name}</p>
                <button>Follow</button>
              </div>
              <div className="right">
                <div className="smallBtn" onClick={() => onDownload()}>
                  <img src="/assets/icons/download_icon.svg" alt="" />
                </div>
                <div className="smallBtn dropdown ml-3">
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

                {(item?.commentType === 0 || emoticon === 0) &&
                  <div className="smallBtn ml-3">
                    <img src="/assets/icons/image 185.png" alt="" />
                  </div>}
                {(item?.commentType === 1 || emoticon === 1) &&
                  <div className="smallBtn ml-3">
                    <img src="/assets/icons/Grimacing Face.png" alt="" />
                  </div>}
                {(item?.commentType === 2 || emoticon === 2) &&
                  <div className="smallBtn ml-3">
                    <img src="/assets/icons/Star-Struck.png" alt="" />
                  </div>}
                {(item?.commentType === 3 || emoticon === 3) &&
                  <div className="smallBtn ml-3">
                    <img src="/assets/icons/Smiling Face with Heart-Eyes.png" alt="" />
                  </div>}

                {/* <div className="smallBtn ml-3" onClick={() => handleBookmark(item)}>
                  {(item?.bookmarks && item?.bookmarks.includes(account.toLowerCase()))?
                    <img src="/assets/icons/bookmark_full_icon.svg" alt="" /> :
                    <img src="/assets/icons/bookmark_line_icon.svg" alt="" />}
                </div> */}

                {/* <div className="smallBtn ml-3 dropdown">
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
                </div> */}
              </div>
            </div>

            <div className="row" style={{ opacity: isLoaded ? 1 : 0 }}>
              <p>{item?.description}</p>
            </div>

            <div className="row" style={{ opacity: isLoaded ? 1 : 0 }}>
              <span>{moment(item?.timestamp * 1000).format("MMM DD YYYY HH:mm")}</span>
              <span>{item?.thumbSize}</span>
            </div>
          </div>
        </div>
      </Bounce>
    </div>
  );
};
export default ViewModal;
