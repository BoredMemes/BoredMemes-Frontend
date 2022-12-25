import { useStyles } from './style';
import { useContext, useEffect, useState } from 'react';
import Web3WalletContext from 'hooks/Web3ReactManager';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'components/modal';
import FilledButton from 'components/Buttons/FilledButton';
import { useHistory } from 'react-router-dom';

const ViewArt = () => {
  const classes = useStyles();
  const { loginStatus, account } = useContext(Web3WalletContext)

  const [myArt, setMyArt] = useState<any[]>([]);
  const [myCollection, setMyCollection] = useState<any>();
  const location = useHistory()
  useEffect(() => {
    let id = parseInt(location.location.pathname.split('/')[2])
    setMyCollection(myArt.filter(item=>item?.tokenId === id)[0])
    console.log(myCollection)
  }, [location.location.pathname, myArt, myCollection])

  useEffect(() => {
    if (loginStatus){
      fetchItems();
    }
  }, [loginStatus])

  const fetchItems = async () => {
    let paramsData = {
      emoticonAddr : loginStatus ? account?.toLowerCase() : undefined
    }
    axios.get("/api/item", {params : paramsData})
      .then((res) => {
        console.log(res.data.items)
        setMyArt(res.data.items);
      }).catch((e) => {
        console.log(e.message);
        toast.error(e.message);
      })
  }

  // Edit collection
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false)

  const onCreateNFT = () => {
    setShowEditCollectionModal(false)
  }

  // Selection Logic
  
  const handleBookmark = async (item) => {
    
  }

  const copyHandle = () => {
    
  };

  const onDownload = () => {
    
  }

  const handleEmoticon = (emoticonId) => {
    
  }
  const onGotoPage = (link : string)=>{
    location.push(link)
  }

  const [startYear, setStartYear] = useState('')
  const [startDay, setStartDay] = useState(0)
  const [startMon, setStartMon] = useState('')
  const [startHour, setStartHour] = useState('')

  useEffect(() => {
        var st = new Date(myCollection?.timestamp * 1000)
        setStartYear(st.toString().split(' ')[3])
        setStartDay(parseInt(st.toString().split(' ')[2]))
        setStartMon(st.toString().split(' ')[1])
        setStartHour(st.toString().split(' ')[4])

}, [setStartMon, setStartDay, myCollection?.timestamp]);

  return (
    <>
      <div className={`${classes.root} mainContainer`}>

        <div className={classes.content}>
          <div className="art_div">
            <img src={myCollection?.assetUrl} alt="" />
          </div>
          <div className="info_div">
            <div className="row">
              <div className="avatar">
                <img src="/assets/avatars/avatar_01.png" alt="" />
                <p>{myCollection?.name}</p>
              </div>
              <div className="btns">
              <div className="smallBtn dropdown">
                  <img src="/assets/icons/more_icon.svg" alt="" />
                  <div className="drodownMenu">
                    <div className="menuItem" onClick={() => copyHandle()}>
                      <img src="/assets/icons/arrow_icon_01.svg" alt="" /> Copy...

                      <div className="subDrodownMenu">
                        <div className="menuItem" onClick={() => copyHandle()}><img src="/assets/icons/link_icon.svg" alt="" /> Command</div>
                        <div className="menuItem" onClick={() => copyHandle()}><img src="/assets/icons/images_icon.svg.svg" alt="" /> Prompt</div>
                        <div className="menuItem" onClick={() => copyHandle()}><img src="/assets/icons/link_icon.svg" alt="" /> Link</div>
                      </div>
                    </div>
                    <div className="menuItem" onClick={() =>onGotoPage(`/view_art/${myCollection?.tokenId}`)}>
                      <img src="/assets/icons/newTab_icon.svg" alt=""  /> Open new tab
                    </div>
                    <div className="menuItem" onClick={() => onGotoPage(`/create_nft_collection/${myCollection?.tokenId}`)}>
                      <img src="/assets/icons/createNFT_icon.svg" alt="" /> Create NFT
                    </div>
                    
                    <div className="menuItem" onClick={() => onDownload()}>
                      <img src="/assets/icons/download_icon.svg" alt="" /> Save image
                    </div>
                    <div className="menuItem" >
                      <img src="/assets/icons/follow_icon.svg" alt="" /> Follow Username
                    </div>
                  </div>
                </div>

                {myCollection?.emoticonId === 0 &&
                <div className="smallBtn ml-3">
                  <img src="/assets/icons/image 185.png" alt="" />
                </div>}
                {myCollection?.emoticonId === 1 &&
                <div className="smallBtn ml-3">
                  <img src="/assets/icons/Grimacing Face.png" alt="" />
                </div>}
                {myCollection?.emoticonId === 2 &&
                <div className="smallBtn ml-3">
                  <img src="/assets/icons/Star-Struck.png" alt="" />
                </div>}
                {myCollection?.emoticonId === 3 &&
                <div className="smallBtn ml-3">
                <img src="/assets/icons/Smiling Face with Heart-Eyes.png" alt="" />
                </div>}
              
                <div className="smallBtn ml-3" onClick={() => handleBookmark(myCollection)}>
                  {(myCollection?.bookmarks && myCollection?.bookmarks.includes(account?.toLowerCase())) ?
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
              <p>{myCollection?.description}</p>
            </div>
            <div className="row col">
              <div className="col_info">
                <span>{startYear} {`${startDay}${startDay === 1 ? 'st' : startDay === 2 ? 'nd' : startDay === 3 ? 'rd' : 'th'}  ${startMon} ${startHour}` || '_'}</span>
                <span>{myCollection?.thumbSize}</span>
                <span>{myCollection?.name}</span>
              </div>

              <div className="btns">
              <FilledButton label={'Create NFT Colection'} icon = {<img src="/assets/icons/add_icon_01.svg" alt=""/>} iconPosition = 'end' handleClick={()=>setShowEditCollectionModal(true)} />
              </div>
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
            <div className={`${classes.modalTop} modalTop` }>
              <span className='topTitle'>
                <div>
                  <h4>Add To Collection</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowEditCollectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={`${classes.modalContent} modalContent`}>
              <p>Your NFTs are created for free, part of BoredMemesAi Collection. only network fees are applie on creation, and a 10% fee on buy/sell.</p>
              
              <div className="chooseBtns">
                <h4>Choose Your Network</h4>
                <div className="row ">
                <FilledButton label={'ETHEREUM'} icon = {<img src="/assets/icons/eth_icon_01.svg" alt=""/>} iconPosition = 'start' handleClick={()=>{}}  color = 'smart'/>
                <FilledButton label={'BINANCE SMART CHAIN'} icon = {<img src="/assets/icons/binance_icon.svg" alt=""/>} iconPosition = 'start'  color = 'grey' />
                </div>
              </div>
            </div>
            <div className={classes.modalBtns}>
              <FilledButton label={'Create NFTs'} icon = {<img src="/assets/icons/add_icon_01.svg" alt=""/>} iconPosition = 'start' handleClick={onCreateNFT} />
            </div>
          </div>
        </>}
      />
    </>
  );
};

export default ViewArt;
