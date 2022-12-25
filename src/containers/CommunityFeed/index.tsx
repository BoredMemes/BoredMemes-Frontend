import { useStyles } from './style';
import Masonry from 'react-masonry-css';
import ProductCard1 from 'components/Cards/ProductCard1';
import Filter from 'components/Filter/Filter';
import { useContext, useEffect, useState } from 'react';
import ViewModal from 'components/modal/viewModal/ViewModal';
import axios from 'axios';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { useAuthState } from 'context/authContext';
import { toast } from 'react-toastify';
import FilledButton from 'components/Buttons/FilledButton';
import Modal from 'components/modal';
const CommunityFeed = () => {
  const classes = useStyles();
  const { loginStatus, account } = useContext(Web3WalletContext)
  const { user } = useAuthState();
  const breakpointColumnsObj = {
    // default: 4,
    3840: 7,
    3000: 6,
    2560: 5,
    2200: 4,
    1840: 3,
    1440: 3,
    1280: 3,
    768: 2,
    450: 1,
  };
  const [filter, setFilter] = useState('new');
  const [searchStr, setSearchStr] = useState('');
  const [myArt, setMyArt] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!isLoaded && !isLoading){
      setIsLoading(true)
      fetchItems();
    }
  }, [isLoaded])

  const fetchItems = async () => {
    let paramsData = {
      emoticonAddr : loginStatus ? account?.toLowerCase() : undefined
    }
    axios.get("/api/item", {params : paramsData})
      .then((res) => {
        console.log(res.data.items)
        setMyArt(res.data.items);
        setIsLoaded(true);
        setIsLoading(false);
      }).catch((e) => {
        setIsLoaded(false);
        setIsLoading(false);
        console.log(e.message);
        toast.error(e.message);
      })
  }

  const updateArts = (item) => {
    const newArts = myArt.map((art, key) => {
      if (art.tokenId === item.tokenId){
        return item;
      }
      return art;
    })
    setMyArt(newArts);
  }

  useEffect(() => {
  }, [searchStr]);
  
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  
  const [tabId, setTabId] = useState(1)
  const onShowTab = (id : number)=>{
    if(id === 0){
      setTabId(id)
    }
    if(id === 1){
      setTabId(id)
    }
    
  }
  // Selection Logic

  const [selectedList, setSelectedList] = useState([])

  const handleClick = (isSelected, tokenId: number) => {
    console.log(selectedList)
    if (isSelected) {
      setSelectedList(selectedList.filter((id) => tokenId !== id))
    } else {
      setSelectedList(selectedList.concat([tokenId]))
    }
  }
  const handleAllClick = () => {
    const tokenIds = myArt.map((token) => token.tokenId)
    const isAllSelected = selectedList.length > 0 && myArt.filter((token) => selectedList.indexOf(token.tokenId) === -1).length === 0
    if (isAllSelected) {
      setSelectedList(selectedList.filter((id) => tokenIds.indexOf(id) === -1))
    } else {
      setSelectedList(tokenIds)
    }
  }
  const [showAddColllectionModal, setShowAddColllectionModal] = useState(false)
  const [showCreateColllectionModal, setShowCreateColllectionModal] = useState(false)

  const onRemove = () => {
  }
  const onAdd = () => {
    setShowAddColllectionModal(true)
  }
  const onCreateNFT = () => {
    setShowCreateColllectionModal(false)
  }
  const onUnpublish = () => {
  }
  const onPublish = () => {
  }
  const onDownload = () => {
  }
  return (
    <>
      <div className={`${classes.root} mainContainer`}>
        <div className={classes.top}>
          <h1>Community Feed</h1>
          <div className="tabList">
            <div className={`tab ${tabId === 0 ? 'activeTab':''}`} onClick = {()=>onShowTab(0)}>Your Feed</div>
            <div className={`tab ${tabId === 1 ? 'activeTab':''}`} onClick = {()=>onShowTab(1)}>Community</div>
          </div>
        </div>
        <Filter filter = {filter} setFilter = {setFilter} setSearchStr = {setSearchStr} handleAllClick = {handleAllClick}/>

        <div className={classes.content}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={classes.masonry}
            columnClassName={classes.gridColumn}
          >
            {myArt.map((item, key) => {
              const isSelected = selectedList.indexOf(item.tokenId) > -1;
              return(
                <ProductCard1 key={key} updateArts={updateArts} item={item} onClick = {()=>handleClick(isSelected, item.tokenId)} isSelected = {isSelected}/> )
            })}
          </Masonry>
          <div className="sticky" style={{opacity : selectedList.length !== 0? 1 : 0, zIndex : selectedList.length !== 0? 0 : -1}}>
            <div className="left">
              <p>Selected : {selectedList.length}</p>
            </div>
            <div className="btns">
              <button className='grey' onClick={()=>setSelectedList([])}>Close</button>
              <button className='grey' onClick={handleAllClick}>Selet All</button>
              <button className='pink'>Actions <img src="/assets/icons/arrow_down_icon_01.svg" alt="" />
                <div className="drodownMenu">
                  <div className="menuItem" onClick={() => onDownload()}>Download Zip</div>
                  <div className="menuItem" onClick={() => onPublish()}>Publish</div>
                  <div className="menuItem" onClick={() => onUnpublish()}>Unpublish</div>
                  <div className="menuItem" onClick={() => setShowCreateColllectionModal(true)}>Create NFT</div>
                  <div className="menuItem" onClick={() => onAdd()}>Add To Collection</div>
                  <div className="menuItem" onClick={() => onRemove()}>Remove From Collection</div>
                </div>
              </button>

            </div>
          </div>
        </div>
      </div>
      <ViewModal updateArts={updateArts} showModal={showModal} setShowModal={setShowModal} item = {data} />

      <Modal
        show={showAddColllectionModal}
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
              <button className="closeBtn" onClick={() => setShowAddColllectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={`${classes.modalContent} modalContent`}>

              
              <div className="btns">
                <button className='collectionCard'><p>First collection</p></button>
                <button className='newCollectionCard'>
                  <img src="/assets/icons/add_icon.svg" alt="" />
                  <p>New Collection</p>
                </button>
                
              </div>
            </div>
          </div>
        </>}
      />
      <Modal
        show={showCreateColllectionModal}
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
              <button className="closeBtn" onClick={() => setShowCreateColllectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={`${classes.modalContent} modalContent`}>
              <p>Your NFTs are created for free, part of BoredMemesAi Collection. only network fees are applie on creation, and a 10% fee on buy/sell.</p>
              
              <div className="chooseBtns">
                <h4>Choose Your Network</h4>
                <div className="row">
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

export default CommunityFeed;
