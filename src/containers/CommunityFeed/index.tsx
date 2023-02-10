import { MaterialUISwitch, useStyles } from './style';
import Masonry from 'react-masonry-css';
import ProductCard1 from 'components/Cards/ProductCard1';
import Filter from 'components/Filter/Filter';
import { useContext, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import JSZip from "jszip";
import FileSaver from "file-saver";
import ViewModal from 'components/modal/viewModal/ViewModal';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { useAuthState } from 'context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import CollectionLIst from 'components/CollectionLIst/CollectionLIst';
import Modal from 'components/modal';
import FilledButton from 'components/Buttons/FilledButton';
import TextInput from 'components/Forms/TextInput';
import { arrayify, hashMessage } from 'ethers/lib/utils';
import { createNewCollection } from 'utils/contracts';

const tmp = [
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao.png",
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId: -1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus: true,
    lastBid: 0,
    lastSold: 0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser: { notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId: 0,
    ratio: "1:1",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp: 1668589607,
    tokenId: 4,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (2).png",
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId: -1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus: true,
    lastBid: 0,
    lastSold: 0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser: { notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId: 0,
    ratio: "3:2",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp: 1668589607,
    tokenId: 7,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (1).png",
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId: -1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus: true,
    lastBid: 0,
    lastSold: 0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser: { notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId: 0,
    ratio: "2:3",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp: 1668589607,
    tokenId: 5,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (1).png",
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId: -1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus: true,
    lastBid: 0,
    lastSold: 0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser: { notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId: 0,
    ratio: "2:3",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp: 1668589607,
    tokenId: 6,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (2).png",
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId: -1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus: true,
    lastBid: 0,
    lastSold: 0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser: { notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId: 0,
    ratio: "3:2",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp: 1668589607,
    tokenId: 8,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (3).png",
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId: -1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus: true,
    lastBid: 0,
    lastSold: 0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser: { notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId: 0,
    ratio: "1:1",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp: 1668589607,
    tokenId: 9,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  },
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao (3).png",
    bookmarkCount: 0,
    bookmarks: [],
    creator: "0x0000000000000000000000000000000000000000",
    description: "Michael Jordan, flying dunk, fantasy, style by Ernie Barnes and Leonardo da Vinci, anime Art, unrealistic, art station, hyper realism, hyper realistic, artstation, hyperrealism, ultra render, digital art, fantasy, magic, wlop, and artgerm, oil paint",
    emoticonId: -1,
    isCompleted: true,
    isRequested: true,
    itemCollection: "0x44a488437a7f258d29d17f3674fe96ccc1307b9c",
    itemOwner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    itemStatus: true,
    lastBid: 0,
    lastSold: 0,
    listedPrice: 0,
    name: "BoredMemes #4",
    owner: "0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13",
    ownerUser: { notifyIds: Array(0), address: '0x936bda832ecd3eb28edaf5a6a85662b6eb66bd13', name: 'Divlji Bucak', username: 'Db', bio: '', },
    packId: 0,
    ratio: "1:1",
    requestId: 1668589582,
    soldTimeStamp: 0,
    thumbSize: "3000 x 3000",
    thumbnail: "https://app.boredmemes.ai/api/uploads/thumbnail/1668618761281.png",
    timestamp: 1668589607,
    tokenId: 10,
    txAmount: 0.016,
    txHash: "0xafaa3e61e6d5ad107c9355f48c628bd3b3475157a54a2c7e30c0800161fecd0d",
  }
]

const tmpCollections = [
  {
    assetUrl: "/assets/imgs/unsplash_bMSA5-tLFao.png",
    title: "First collection",
    description: 'First Collection'
  }
]
const MyArt = () => {
  const classes = useStyles();
  const { loginStatus, account, library, chainId } = useContext(Web3WalletContext)
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
  const [privateType, setPrivateType] = useState(undefined);
  const [emoticonId, setEmoticonId] = useState(undefined);
  const [myArt, setMyArt] = useState<any[]>([]);
  const [myCollection, setMyCollection] = useState<any[]>();
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    if (loginStatus && account) {
      fetchItems();
      fetchCollections();
    }
  }, [loginStatus, account, filter, searchStr, emoticonId, privateType])


  const fetchItems = async () => {
    console.log("Fetch Items");
    let paramsData = {
      emoticonAddr: loginStatus ? account?.toLowerCase() : undefined,
      owner: account?.toLowerCase(),
      searchTxt: searchStr,
      emoticonId: emoticonId,
      privateType: privateType
    }
    axios.get(filter === "new" ? "/api/art" : "/api/item", { params: paramsData })
      .then((res) => {
        console.log(res.data.items)
        setMyArt(res.data.items);
        //setMyArt(tmp);
      }).catch((e) => {
        console.log(e.message);
        toast.error(e.message);
      })
  }

  const fetchCollections = async () => {
    let paramsData = {
      owner: account?.toLowerCase()
    }
    axios.get('/api/collection', { params: paramsData })
      .then((res) => {
        console.log(res.data.collections);
        setMyCollection(res.data.collections);
      }).catch((e) => {
        console.log(e.message);
        toast.error(e.message);
      })
  }

  const updateArts = (item) => {
    const newArts = myArt.map((art, key) => {
      if (filter !== "new") {
        if (art.tokenId === item.tokenId) {
          return item;
        }
      } else {
        if (art.id === item.id) {
          return item;
        }
      }

      return art;
    })
    console.log(newArts);
    setMyArt(newArts);
  }

  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const onShow = (d: any) => {
    if (d?.itemStatus && d?.isRequested) {
      setShowModal(true)
      setData(d)
    }
  }

  // Edit collection
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false)
  const [showPublishCollectionModal, setShowPublishCollectionModal] = useState(false)
  const [isDetail, setIsDetail] = useState(false);
  const [isPublicCollection, setIsPublicCollection] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedChainId, setSelectedChainId] = useState(process.env.NODE_ENV === "production" ? 1 : 5);
  const [priceMode, setPriceMode] = useState(0);

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
    if (!loginStatus || !account) {
      return toast.error("Please connect your wallet correctly.");
    }

    if (!title || title.length <= 0) {
      return toast.error("Input title!");
    }

    if (isDetail && !selectedCollection) {
      return toast.error("Collection is not selected");
    }

    try {
      const timestamp = !isDetail ? Math.floor(new Date().getTime() / 1000) : selectedCollection?.id;
      const msg = await library.getSigner().signMessage(arrayify(hashMessage(account?.toLowerCase() + "-" + timestamp)));

      const toast_load_id = toast.loading("Please wait...");
      let paramsData = {
        address: account,
        name: title,
        description: description,
        ispublic: isPublicCollection,
        timestamp: timestamp,
        message: msg
      }

      axios.post("/api/collection/update", paramsData)
        .then((res) => {
          toast.dismiss(toast_load_id);
          toast.success((!isDetail ? "Created" : "Saved") + " Collection Successfully!")
          console.log(res.data.collections);
          setMyCollection(res.data.collections);
          if (isDetail) {
            for (const collection of res.data.collections) {
              if (selectedCollection.id === collection.id) {
                setSelectedCollection(collection);
              }
            }
          }
          setTitle("");
          setDescription("");
          setIsPublicCollection(false);
          setShowEditCollectionModal(false);
        }).catch((e) => {
          toast.dismiss(toast_load_id);
          toast.error(e.message);
          console.log(e);
        })
    } catch (e) {
      console.log("Sign Message Error : ", e)
      toast.error("Failed");
    }
  }
  const onEditCollection = (d: any) => {
    setDescription(d?.description)
    setTitle(d?.title)
    setShowEditCollectionModal(true)
  }

  const onDetailCollection = (collection: any) => {
    setSelectedCollection(collection);
    setIsDetail(true);
  }

  const onCreateNFTCollection = async () => {
    if (!loginStatus || !account) {
      return toast.error("Please connect your wallet correctly.");
    }
    const load_toast_id = toast.loading("Please wait...");
    try {
      const colAddr = await createNewCollection(chainId, library.getSigner());
    } catch (e) {
      console.log(e);
      toast.dismiss(load_toast_id);
      toast.error("NFT Collection Creation is failed");
    }
  }

  // Selection Logic

  const [selectedItems, setSelectedItems] = useState([])

  const handleClick = (isSelected, item) => {
    const isNew = filter === "new";
    if (isSelected) {
      setSelectedItems(selectedItems.filter((_item) => isNew ? item.id !== _item.id : (item.tokenId !== _item.tokenId && item.itemCollection !== _item.itemCollection)))
    } else {
      setSelectedItems(selectedItems.concat([item]))
    }
  }
  const handleAllClick = () => {
    const isAllSelected = selectedItems.length > 0 && myArt.length === selectedItems.length;
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...myArt]);
    }
  }

  const onChooseChain = (_chainId) => {
    setSelectedChainId(_chainId);
  }

  const [showAddColllectionModal, setShowAddColllectionModal] = useState(false)
  const [showCreateColllectionModal, setShowCreateColllectionModal] = useState(false)

  const onRemove = () => {
  }
  const onAdd = () => {
    setShowAddColllectionModal(true)
  }
  const onCreateNFT = () => {
    //setShowCreateColllectionModal(false)
  }

  const onPublish = (isPublic) => {
    if (!loginStatus || !account) {
      return toast.error("Please connect your wallet correctly.");
    }
    let paramsData = {
      address: account,
      itemIds: selectedItems.map((_item) => filter === "new" ? _item.id : _item.tokenId),
      collections: filter === "new" ? [] : selectedItems.map((_item) => _item.itemCollection),
      isPublic: isPublic,
      isNew: filter === "new"
    }
    axios.post("/api/publish", paramsData)
      .then((res) => {
        toast.success((isPublic ? "Published" : "Unpublished") + " Successfully")
      }).catch((e) => {
        toast.error(e.message);
        console.log(e);
      })
  }
  const onDownload = () => {
    const zip = new JSZip();
    const zipFile = zip.folder("images");
    const list = selectedItems.map(async (item, index) => {
      const fileUrl = item.thumbnail;
      const response = await fetch(item.thumbnail);
      const data = await response.blob();
      const name = fileUrl.split("/")[fileUrl.split("/").length - 1];
      zipFile.file(name, data);
      return data;
    })
    Promise.all(list).then(function () {
      zip.generateAsync({ type: "blob" })
        .then((content) => {
          FileSaver.saveAs(content, "images");
        })
    })
  }

  return (
    <>
      <div className={`${classes.root} mainContainer`}>
        {
          !isDetail ?
            <div className={classes.top}>
              <h2>Community Feed</h2>
              <div>
                <span style={{ marginRight: 10, padding: 2, paddingRight: 8, paddingLeft: 8, color: '#727272', borderBottom: 'solid 1px #727272', fontWeight: 600 }}>Your Feed</span>
                <span style={{ borderImage: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', borderBottom: 'solid 1px', borderImageSlice: 1, padding: 2, paddingRight: 8, paddingLeft: 8, fontWeight: 600, background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', width: 'fit-content', color: '#262626' }}>Community</span>
              </div>
              {/* <div className="avatar">
                <img src={user?.logo_url} alt="" />
                <span>
                  <h3>{user?.name}</h3>
                  <div className="follows">
                    <p>{user?.followers.length || 0} Following</p>
                    <div className="socialLinks">
                      <a href={"http://twitter.com/" + user?.social_twitter_id} className="twitter" target="_blank" rel="noreferrer">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href={"https://t.me/" + user?.social_telegram_id} className="telegram" target="_blank" rel="noreferrer">
                        <i className="fab fa-telegram"> </i>
                      </a>
                    </div>
                  </div>
                </span>
              </div>
              <div className="right">
                <p>{user?.bio}</p>

              </div> */}
            </div> :
            <div className={classes.topdetail} style={myArt.length > 0 ? { backgroundImage: `url('${myArt[0]?.assetUrl}')` } : {}}>
              <div className="avatar">
                <img src={user?.logo_url} alt="" />
                <span>
                  <h3>{user?.name}</h3>
                </span>
              </div>
              <div className="right">
                <p>{selectedCollection?.description}</p>
              </div>
              <div className="title">
                <h2>{selectedCollection?.name}</h2>
              </div>
              <div className="btns">
                <div onClick={() => onEditCollection(selectedCollection)}>
                  Edit Collection
                </div>
                <button onClick={() => setShowPublishCollectionModal(true)}>
                  <p>Create NFT Collection</p>
                  <img src="/assets/icons/add_icon_01.svg" alt="" />
                </button>
              </div>
            </div>
        }
        {/* {!isDetail && <CollectionLIst collections={myCollection} onEditCollection={onEditCollection} onDetailCollection={onDetailCollection} />} */}
        <Filter filter={filter} setFilter={setFilter} setPrivateType={setPrivateType} setSearchStr={setSearchStr} handleAllClick={handleAllClick} setEmoticonId={setEmoticonId} />

        <div className={classes.content}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={classes.masonry}
            columnClassName={classes.gridColumn}
          >
            {myArt.map((item, key) => {
              var isSelected = false;
              for (const _item of selectedItems) {
                if (filter === "new" && _item.id === item.id) {
                  isSelected = true;
                  break;
                }
                if (filter !== "new" && _item.tokenId === item.tokenId && _item.itemCollection === item.itemCollection) {
                  isSelected = true;
                  break;
                }
              }
              return (
                <ProductCard1 key={key} isNew={filter === "new"} updateArts={updateArts} item={item} onClick={() => handleClick(isSelected, item)} isSelected={isSelected} />)
            })}
          </Masonry>
          <div className="sticky" style={{ opacity: selectedItems.length !== 0 ? 1 : 0, zIndex: selectedItems.length !== 0 ? 0 : -1 }}>
            <div className="left">
              <p>Selected : {selectedItems.length}</p>
            </div>
            <div className="btns">
              <button className='grey' onClick={() => setSelectedItems([])}>Close</button>
              <button className='grey' onClick={handleAllClick}>Selet All</button>
              <button className='pink' style={{ background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)' }}>Actions <img src="/assets/icons/arrow_down_icon_01.svg" alt="" />
                <div className="drodownMenu">
                  <div className="menuItem" onClick={() => onDownload()}>Download Zip</div>
                  <div className="menuItem" onClick={() => onPublish(true)}>Publish</div>
                  <div className="menuItem" onClick={() => onPublish(false)}>Unpublish</div>
                  <div className="menuItem" onClick={() => setShowCreateColllectionModal(true)}>Create NFT</div>
                  <div className="menuItem" onClick={() => onAdd()}>Add To Collection</div>
                  <div className="menuItem" onClick={() => onRemove()}>Remove From Collection</div>
                </div>
              </button>

            </div>
          </div>
        </div>
      </div>
      <ViewModal updateArts={updateArts} showModal={showModal} setShowModal={setShowModal} item={data} />
      <Modal
        show={showEditCollectionModal}
        maxWidth='sm'
        contentClass={classes.modalRootContent}
        children={<>
          <div className={classes.modal}>
            <div className={`${classes.modalTop} customModalTop`}>
              <span className='topTitle'>
                <div>
                  <h4>{!isDetail ? "Create Collection" : "Edit Collection"}</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowEditCollectionModal(false)}><img src="/assets/icons/close-modal-btn.png" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <TextInput label={'Title'} wrapperClass={classes.myInputWrap} value={!isDetail ? title : selectedCollection?.name} placeholder='First Collection' onChangeData={(d) => onChangeTitle(d)} />

              <TextInput isMulti label={<>{'Description'} <span>Optional</span></>} wrapperClass={classes.myInputWrap} placeholder='Elon Musk as Santa Floki' value={!isDetail ? description : selectedCollection?.description} onChangeData={(d) => onChangeDescription(d)} />
              <p className={classes.text_number}>1/255</p>
              <div className="row">
                <p>Public Collection</p>
                <MaterialUISwitch onChange={e => setIsPublicCollection(!e.target.checked)} className='modal_switch' />
              </div>
            </div>
            <div className={classes.modalBtns}>
              <FilledButton color='custom' handleClick={() => setShowEditCollectionModal(false)} />
              <FilledButton label={!isDetail ? 'Create' : 'Save'} handleClick={onSave} />
            </div>
          </div>

        </>}
      />
      <Modal
        show={showPublishCollectionModal}
        maxWidth='sm'
        contentClass={classes.modalRootContent}
        children={<>
          <div className={classes.modal}>
            <div className={`${classes.modalTop} customModalTop`}>
              <span className='topTitle'>
                <div>
                  <h4>{!isDetail ? "Create NFT Collection" : "Mint added images to Collection"}</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowPublishCollectionModal(false)}><img src="/assets/icons/close-modal-btn.png" alt="" /></button>
            </div>
            {/* <div className={classes.modalContentDetail}>
              <TextInput label={'Title'} wrapperClass={classes.myInputWrap} value={!isDetail ? title : selectedCollection?.name} onChangeData={(d) => onChangeTitle(d)} />

              <TextInput isMulti label={<>{'Description'} <span>Optional</span></>} wrapperClass={classes.myInputWrap} value={!isDetail ? description : selectedCollection?.description} onChangeData={(d) => onChangeDescription(d)} />
              <div className="chooseBtns">
                <p>Choose Your Network</p>
                <div className="row">
                  <FilledButton
                    label={'ETHEREUM'}
                    icon={<img src="/assets/icons/eth_icon_01.svg" alt="" />}
                    iconPosition='start'
                    handleClick={() => onChooseChain(process.env.NODE_ENV === "production" ? 1 : 5)}
                    color={selectedChainId === (process.env.NODE_ENV === "production" ? 1 : 5) ? 'smart' : 'grey'} />
                  <FilledButton
                    label={'BINANCE SMART CHAIN'}
                    icon={<img src="/assets/icons/binance_icon.svg" alt="" />}
                    iconPosition='start'
                    handleClick={() => onChooseChain(process.env.NODE_ENV === "production" ? 56 : 97)}
                    color={selectedChainId === (process.env.NODE_ENV === "production" ? 56 : 97) ? 'smart' : 'grey'} />
                </div>
              </div>

              <div className="chooseBtns">
                <p>Choose Your Price</p>
                <div className="row">
                  <FilledButton
                    label={'Free Creation 10% Buy/Sell Tax'}
                    handleClick={() => setPriceMode(0)}
                    color={priceMode === 0 ? 'smart' : 'grey'} />
                  <FilledButton
                    label={'1 ETH Creation 1% Buy/Sell Tax'}
                    handleClick={() => setPriceMode(1)}
                    color={priceMode === 1 ? 'smart' : 'grey'} />
                </div>
              </div>
            </div>
            <div className={classes.modalBtnsDetail}>
              <FilledButton label={'Create NFT Colection'} icon={<img src="/assets/icons/add_icon_01.svg" alt="" />} iconPosition='start' handleClick={onCreateNFTCollection} />
            </div> */}

            <div className={classes.modalContent}>
              <TextInput label={'Title'} wrapperClass={classes.myInputWrap} value={!isDetail ? title : selectedCollection?.name} placeholder='First Collection' onChangeData={(d) => onChangeTitle(d)} />

              <TextInput isMulti label={<>{'Description'} <span>Optional</span></>} wrapperClass={classes.myInputWrap} placeholder='Elon Musk as Santa Floki' value={!isDetail ? description : selectedCollection?.description} onChangeData={(d) => onChangeDescription(d)} />
              <p className={classes.text_number}>1/255</p>
            </div>
            <div className={classes.modalBtns}>
              {/* <FilledButton color='custom' handleClick={() => setShowEditCollectionModal(false)} /> */}
              <button className='newCollectionCard'>
                <p>1 ETH NFT Collection</p>
                <h6>No fees</h6>
              </button>
              <FilledButton label={'Free NFT Collection 3% Buy/Sell Fee'} handleClick={onSave} />
            </div>
          </div>

        </>}
      />
      <Modal
        show={showAddColllectionModal}
        maxWidth='sm'
        contentClass={classes.modalAddRootContent}
        children={<>
          <div className={classes.modal}>
            <div className={`${classes.modalTop} customModalTop modalTop`}>
              <span className='topTitle'>
                <div>
                  <h4>Add To Collection</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowAddColllectionModal(false)}><img src="/assets/icons/close-modal-btn.png" alt="" /></button>
            </div>
            <div className={`${classes.modalAddContent} modalContent`}>

              <div className="btns">
                {myCollection?.map((collection, key) => (
                  <button className={`collectionCard`} key={key} onClick={() => { }}>
                    <p>{collection?.name.length > 18 ? collection?.name.substring(0, 17) + "..." : collection?.name}</p>
                  </button>
                ))}
                <button className='newCollectionCard' onClick={() => setShowEditCollectionModal(true)}>
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
        contentClass={classes.modalAddNftRootContent}
        children={<>
          <div className={classes.modal}>
            <div className={`${classes.modalTop} customModalTop modalTop`}>
              <span className='topTitle'>
                <div>
                  <h4>Add To Collection</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowCreateColllectionModal(false)}><img src="/assets/icons/close-modal-btn.png" alt="" /></button>
            </div>
            <div className={`${classes.modalAddContent} modalContent`}>
              <p>Your NFTs are created for free, part of BoredMemesAi Collection. only network fees are applie on creation, and a 10% fee on buy/sell.</p>

              <div className="chooseBtns">
                <h4>Choose Your Network</h4>
                <div className="row">
                  <FilledButton label={'ETHEREUM'} icon={<img src="/assets/icons/eth_icon_01.svg" alt="" />} iconPosition='start' handleClick={() => { }} color='smart' />
                  <FilledButton label={'BINANCE SMART CHAIN'} icon={<img src="/assets/icons/binance_icon.svg" alt="" />} iconPosition='start' color='grey' />
                </div>
              </div>
            </div>
            <div className={classes.modalBtns} style={{ justifyContent: 'center' }}>
              <FilledButton label={'Create NFTs'} icon={<img src="/assets/icons/add_icon_01.svg" alt="" />} iconPosition='start' handleClick={onCreateNFT} />
            </div>
          </div>
        </>}
      />
    </>
  );
};

export default MyArt;
