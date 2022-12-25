import { useStyles } from './style';
import Masonry from 'react-masonry-css';
import ProductCard1 from 'components/Cards/ProductCard1';
import Filter from 'components/Filter/Filter';
import { useContext, useEffect, useState } from 'react';
import ViewModal from 'components/modal/viewModal/ViewModal';
import Web3WalletContext from 'hooks/Web3ReactManager';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'components/modal';
import FilledButton from 'components/Buttons/FilledButton';
import TextInput from 'components/Forms/TextInput';
import { useHistory } from 'react-router-dom';

const tmp = [
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao.png",
    useerUrl: "/assets/avatars/avatar_01.png",
    title : 'First Collection',
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId:-1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner:"0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus:true,
    lastBid:0,
    lastSold:0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser:{notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId:0,
    ratio: "1:1",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp:1668589607,
    tokenId: 4,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (1).png",
    useerUrl: "/assets/avatars/avatar_01.png",
    title : 'First Collection',
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId:-1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner:"0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus:true,
    lastBid:0,
    lastSold:0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser:{notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId:0,
    ratio: "2:3",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp:1668589607,
    tokenId: 5,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (1).png",
    useerUrl: "/assets/avatars/avatar_01.png",
    title : 'First Collection',
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId:-1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner:"0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus:true,
    lastBid:0,
    lastSold:0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser:{notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId:0,
    ratio: "2:3",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp:1668589607,
    tokenId: 6,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (2).png",
    useerUrl: "/assets/avatars/avatar_01.png",
    title : 'First Collection',
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId:-1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner:"0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus:true,
    lastBid:0,
    lastSold:0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser:{notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId:0,
    ratio: "3:2",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp:1668589607,
    tokenId: 7,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (2).png",
    useerUrl: "/assets/avatars/avatar_01.png",
    title : 'First Collection',
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId:-1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner:"0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus:true,
    lastBid:0,
    lastSold:0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser:{notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId:0,
    ratio: "3:2",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp:1668589607,
    tokenId: 8,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (3).png",
    useerUrl: "/assets/avatars/avatar_01.png",
    title : 'First Collection',
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId:-1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner:"0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus:true,
    lastBid:0,
    lastSold:0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser:{notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId:0,
    ratio: "1:1",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp:1668589607,
    tokenId: 9,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (3).png",
    useerUrl: "/assets/avatars/avatar_01.png",
    title : 'First Collection',
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId:-1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner:"0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus:true,
    lastBid:0,
    lastSold:0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser:{notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId:0,
    ratio: "1:1",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp:1668589607,
    tokenId: 10,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  }
]

const CreateNFTCollection = () => {
  const classes = useStyles();
  const { loginStatus, account } = useContext(Web3WalletContext)
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
        // setMyArt(res.data.items);
        setMyArt(tmp);
      }).catch((e) => {
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

  // Edit collection
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false)
  const [isPublicCollection, setIsPublicCollection] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onChangeTitle = async (e: any) => {
    if (e === null || e === '') {
      setTitle('');
    } else {
      setTitle(e);
    }
  }
  const onChangeDescription = async (e: any) => {
    if (e === null || e === '') {
      setDescription('');
    } else {
      setDescription(e);
    }
  }

  const onSave = async () => {

    if(isPublicCollection){

    }
  }
  const onEditCollection = ()=>{
    setDescription(myCollection?.description)
    setTitle(myCollection?.title)
    setShowEditCollectionModal(true)
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


  return (
    <>
      <div className={`${classes.root} mainContainer`}>
        <div className={classes.top} style = {{backgroundImage : `url('${myCollection?.assetUrl}')`}}>
          <div className="avatar">
            <img src={myCollection?.useerUrl } alt="" />
            <span>
              <h3>{myCollection?.name}</h3>
            </span>
          </div>
          <div className="right">
            <p>{myCollection?.description}</p>
          </div>

          <div className="title">
            <h2>{myCollection?.title}</h2>
          </div>

          <div className="btns">
            <a href={`https://opensea.io/${account}`} target="_blank" rel="noreferrer" >
            Edit on OpenSea <img src="/assets/icons/opensea_icon.svg" alt="" />
            </a>
            <button onClick={onEditCollection}>
              <p>Mint added images to Collection</p>
              <img src="/assets/icons/add_icon_01.svg" alt="" />
            </button>
          </div>
        </div>
        
        <div className={classes.content}>
        <Filter filter = {filter} setFilter = {setFilter} setSearchStr = {setSearchStr} handleAllClick = {handleAllClick}/>

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
        </div>
      </div>
      <ViewModal updateArts={updateArts} showModal={showModal} setShowModal={setShowModal} item = {data} />
      <Modal
        show={showEditCollectionModal}
        maxWidth='sm'
        contentClass={classes.modalRootContent}
        children={<>
          <div className={classes.modal}>
            <div className={`${classes.modalTop} modalTop` }>
              <span className='topTitle'>
                <div>
                  <h4>Create NFT Collection</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowEditCollectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={`${classes.modalContent} modalContent`}>
              <TextInput label={'Title'} wrapperClass = {classes.myInputWrap} value = {title} onChangeData = {(d)=>onChangeTitle(d)}/>

              <TextInput isMulti label={<>{'Description'} <span>Optional</span></>} wrapperClass = {classes.myInputWrap} value = {description} onChangeData = {(d)=>onChangeDescription(d)}/>
              
              <div className="chooseBtns">
                <p>Choose Your Network</p>
                <div className="row">
                <FilledButton label={'ETHEREUM'} icon = {<img src="/assets/icons/eth_icon_01.svg" alt=""/>} iconPosition = 'start' handleClick={onSave}  color = 'smart'/>
                <FilledButton label={'BINANCE SMART CHAIN'} icon = {<img src="/assets/icons/binance_icon.svg" alt=""/>} iconPosition = 'start'  color = 'grey' />
                </div>
              </div>

              <div className="chooseBtns">
                <p>Choose Your Price</p>
                <div className="row">
                <FilledButton label={'Free Creation 10% Buy/Sell Tax'} color = 'smart'/>
                <FilledButton label={'1 ETH Creation 1% Buy/Sell Tax'} color = 'grey' />
                </div>
              </div>

            </div>
            <div className={classes.modalBtns}>
              <FilledButton label={'Create NFT Colection'} icon = {<img src="/assets/icons/add_icon_01.svg" alt=""/>} iconPosition = 'start' handleClick={onSave} />
            </div>
          </div>

        </>}
      />
    </>
  );
};

export default CreateNFTCollection;
