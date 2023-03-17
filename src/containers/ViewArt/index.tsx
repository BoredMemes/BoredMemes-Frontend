import { useStyles } from './style';
import { useContext, useEffect, useState } from 'react';
import Web3WalletContext from 'hooks/Web3ReactManager';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'components/modal';
import FilledButton from 'components/Buttons/FilledButton';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'context/authContext';
import moment from 'moment';
import { onMintArt } from 'utils/contracts';

const ViewArt = () => {
  const classes = useStyles();
  const { loginStatus, account, chainId, library } = useContext(Web3WalletContext)
  const { user } = useAuthState();

  const [isNew, setNew] = useState(false);
  const [itemId, setItemId] = useState(undefined);
  const [itemCollection, setItemCollection] = useState(undefined);
  const [defaultCollection, setDefaultCollection] = useState(null);
  const [item, setItem] = useState(undefined);
  const location = useHistory()
  useEffect(() => {
    console.log(location.location.pathname);
    const paths = location.location.pathname.split("/");
    if (paths.length >= 4) {
      let isNew = paths[2] === "new";
      setNew(isNew);
      if (isNew) {
        setItemId(paths[3])
      } else if (!isNew && paths.length >= 5) {
        setItemId(paths[4])
        setItemCollection(paths[3]);
      }
    }
  }, [location.location.pathname])

  useEffect(() => {
    if (loginStatus) {
      fetchItems();
      fetchDefaultCollection();
    }
  }, [loginStatus, isNew, itemId])

  const fetchItems = async () => {
    let paramsData = {
      emoticonAddr: loginStatus ? account?.toLowerCase() : undefined,
      owner: account?.toLowerCase(),
      itemId: itemId,
      itemCollection: itemCollection,
    }
    axios.get(isNew ? "/api/artdetail" : "/api/itemdetail", { params: paramsData })
      .then((res) => {
        console.log(res.data.item)
        setItem(res.data.item);
      }).catch((e) => {
        console.log(e.message);
        toast.error(e.message);
      })
  }

  const fetchDefaultCollection = async () => {
    const res = await axios.get(`/api/collection/default`);
    setDefaultCollection(res.data.collection);
  }

  // Edit collection
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false)

  const onCreateNFT = async () => {
    if (!loginStatus || !account) {
      return toast.error("Please connect your wallet correctly.")
    }
    if (!defaultCollection) {
      return toast.error("Default Pixia Ai Nft Collection is not ready.")
    }
    const load_toast_id = toast.loading("Please wait");
    try {
      const isMinted = await onMintArt(
        defaultCollection.address,
        [item.id],
        library.getSigner()
      )

      if (isMinted) {
        toast.success("Minted Successfully.")
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      } else {
        toast.error("Failed");
      };
      toast.dismiss(load_toast_id);
    } catch (e) {
      console.log(e);
      toast.dismiss(load_toast_id);
    }
  }

  // Selection Logic

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
        res.data.item.emoticonId = item.emoticonId;
        setItem(res.data.item);
      }).catch((e) => {
        console.log(e);
      })
  }

  const onFollow = async () => {
    if (!loginStatus) {
      return toast.error("Please connect your wallet correctly.");
    }
    if (account?.toLowerCase() === item?.ownerUser?.address.toLowerCase()) {
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
    if (item?.description === "") return;
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
    if (loginStatus) {
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
          if (res.data.message === "success") {
            item.emoticonId = emoticonId;
            setItem(item);
          }
        }).catch((e) => {
          console.log(e);
        })
    }
  }

  const onGotoPage = (link: string) => {
    location.push(link)
  }

  const [startYear, setStartYear] = useState('')
  const [startDay, setStartDay] = useState(0)
  const [startMon, setStartMon] = useState('')
  const [startHour, setStartHour] = useState('')

  useEffect(() => {
    var st = new Date(item?.timestamp * 1000)
    setStartYear(st.toString().split(' ')[3])
    setStartDay(parseInt(st.toString().split(' ')[2]))
    setStartMon(st.toString().split(' ')[1])
    setStartHour(st.toString().split(' ')[4])

  }, [setStartMon, setStartDay, item?.timestamp]);

  return (
    <>
      <div className={`${classes.root} mainContainer`}>

        <div className={classes.content}>
          <div className="art_div">
            <img src={item?.assetUrl} alt="" />
          </div>
          <div className="info_div">
            <div className="row">
              <div className="avatar">
                <img src={item?.ownerUser?.logo_url} alt="" />
                <p>{item?.ownerUser?.name}</p>
                <button className='follow' style={{ background: '#d2c4f5', color: 'rgba(73, 5, 251, 1)', fontWeight: 600, borderRadius: 10, border: 'none', padding: '3px 10px', marginLeft: 20 }}>follow</button>
              </div>
              <div className="btns">

                <div className="smallBtn dropdown">
                  <img src="/assets/icons/more_icon.svg" alt="" />
                  <div className="drodownMenu">
                    <div className="menuItem">
                      <img src="/assets/icons/arrow_icon_01.svg" alt="" /> Copy...

                      <div className="subDrodownMenu">
                        <div className="menuItem" onClick={() => copyHandle(0)}><img src="/assets/icons/link_icon.svg" alt="" /> Command</div>
                        <div className="menuItem" onClick={() => copyHandle(1)}><img src="/assets/icons/images_icon.svg.svg" alt="" /> Prompt</div>
                        <div className="menuItem" onClick={() => copyHandle(2)}><img src="/assets/icons/link_icon.svg" alt="" /> Link</div>
                      </div>
                    </div>
                    {
                      account?.toLowerCase() !== item?.ownerUser?.address.toLowerCase() && <div className="menuItem" onClick={() => onFollow()}>
                        <img src="/assets/icons/follow_icon.svg" alt="" /> {user?.followers.includes(item?.ownerUser?.address.toLowerCase()) ? "Unfollow" : "Follow"} {item?.ownerUser?.name.length > 6 ? item?.ownerUser?.name.substring(0, 6) + "..." : item?.ownerUser?.name}
                      </div>
                    }
                  </div>
                </div>
                <div className="smallBtn ml-3" onClick={() => onDownload()}>
                  <img src="/assets/icons/download_icon.svg" alt="" />
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
            <div className="desc">
              <p>{item?.description}</p>
            </div>
            <div className="row col">
              <div className="col_info">
                <span>{moment(item?.timestamp).format("MMM DD YYYY")}</span>
                <span>{item?.thumbSize}</span>
                <span>{item?.name}</span>
              </div>
              {
                isNew && <div className={classes.modalBtnsDetail}>
                  <FilledButton label={'Create NFT'} icon={<img src="/assets/icons/add_icon_01.svg" alt="" />} iconPosition='end' handleClick={() => setShowEditCollectionModal(true)} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showEditCollectionModal}
        maxWidth='sm'
        contentClass={classes.modalRootContent}
        children={<>
          <div className={classes.modal}>
            <div className={`${classes.modalTop} modalTop`}>
              <span className='topTitle'>
                <div>
                  <h4>Add To Collection</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowEditCollectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={`${classes.modalContent} modalContent`}>
              <p>Your NFTs are created for free, part of PixiaAi Collection. only network fees are applie on creation, and a 10% fee on buy/sell.</p>

              <div className="chooseBtns">
                <h4>Choose Your Network</h4>
                <div className="row ">
                  <FilledButton label={'ETHEREUM'} icon={<img src="/assets/icons/eth_icon_01.svg" alt="" />} iconPosition='start' handleClick={() => { }} color='smart' />
                  <FilledButton label={'BINANCE SMART CHAIN'} icon={<img src="/assets/icons/binance_icon.svg" alt="" />} iconPosition='start' color='grey' />
                </div>
              </div>
            </div>
            <div className={classes.modalBtns}>
              <FilledButton label={'Create NFTs'} icon={<img src="/assets/icons/add_icon_01.svg" alt="" />} iconPosition='start' handleClick={onCreateNFT} />
            </div>
          </div>
        </>}
      />
    </>
  );
};

export default ViewArt;
