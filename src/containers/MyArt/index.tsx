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
import axios from 'axios';
import { toast } from 'react-toastify';
import CollectionLIst from 'components/CollectionLIst/CollectionLIst';
import Modal from 'components/modal';
import FilledButton from 'components/Buttons/FilledButton';
import TextInput from 'components/Forms/TextInput';
import { arrayify, hashMessage } from 'ethers/lib/utils';
import { createNewCollection, isAddress, onMintArt } from 'utils/contracts';
import { useHistory, useLocation } from 'react-router-dom';
import { CONTRACTS_BY_NETWORK, Networks } from 'utils';
import { getUser, useAuthDispatch, useAuthState } from 'context/authContext';
type PropsType = {
  feedMode?: number//0- My Arts, 1- Community Feed, 2- Personal Feed, 3- Bookmarks
}
const MyArt = ({ feedMode }: PropsType) => {

  const classes = useStyles();
  const { loginStatus, account, library, chainId } = useContext(Web3WalletContext)
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const MAX_MINT_CNT = 30;
  const history = useHistory();
  const location = useLocation();
  let owner = feedMode === 0 ? location.pathname.split('/')[2].toLowerCase() : account;
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
  const [isLoading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [filter, setFilter] = useState('new');
  const [searchStr, setSearchStr] = useState('');
  const [privateType, setPrivateType] = useState(undefined);
  const [emoticonId, setEmoticonId] = useState(undefined);
  const [myArt, setMyArt] = useState<any[]>([]);
  const [myCollection, setMyCollection] = useState<any[]>();
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [defaultCollection, setDefaultCollection] = useState(null);

  // Edit collection
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false)
  const [showPublishCollectionModal, setShowPublishCollectionModal] = useState(false)
  const [isDetail, setIsDetail] = useState(false);
  const [isPublicCollection, setIsPublicCollection] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedChainId, setSelectedChainId] = useState(process.env.REACT_APP_NODE_ENV === "production" ? 1 : 5);

  useEffect(() => {
    // if (feedMode !== 2  && (!loginStatus || !account)) {
    //   return;
    // }
    if (feedMode === 2 && !user) return;
    if (feedMode === 0 && loginStatus && account && owner === "undefined") {
      history.push("/art/" + account);
      window.location.reload();
      return;
    }
    if (!isAddress(owner)) {
      owner = loginStatus ? account : null;
      if (feedMode === 0 && !owner) return;
    }
    setSelectedItems([]);
    fetchItems();
    if (feedMode === 0) {
      fetchUsers();
      fetchCollections();
      fetchDefaultCollection();
    }

  }, [loginStatus, account, owner, filter, searchStr, emoticonId, privateType, user])

  useEffect(() => {
    if (isDetail && selectedCollection) {
      fetchItems();
      setIsPublicCollection(selectedCollection.isPublic);
    }
  }, [isDetail, selectedCollection])

  const fetchUsers = async () => {
    const res = await axios.get(`/api/user/${owner}`);
    setProfile(res.data.user);
  }

  const fetchItems = async () => {
    setLoading(true);
    let paramsData = {
      emoticonAddr: loginStatus && account ? owner?.toLowerCase() : undefined,
      owner: (feedMode === 0 || feedMode === 2) ? (feedMode !== 2 ? owner?.toLowerCase() : user?.followers) : undefined,
      searchTxt: searchStr,
      emoticonId: emoticonId,
      progress: filter === "nft" ? undefined : 0,
      privateType: filter === "nft" ? undefined : feedMode === 0 ? privateType : 1,
      filter: filter,
      itemCollection: filter === "nft" && selectedCollection && isDetail ? selectedCollection.address : undefined,
      collectionId: filter !== "nft" && selectedCollection && isDetail ? selectedCollection.id : undefined,
      bookmarks: feedMode === 3 && loginStatus && account ? account.toLowerCase() : undefined,
    }
    axios.get(filter !== "nft" ? "/api/art" : "/api/item", { params: paramsData })
      .then((res) => {
        setMyArt(res.data.items);
        setLoading(false);
      }).catch((e) => {
        console.log(e.message);
        toast.error(e.message);
        setLoading(false);
      })
  }

  const fetchDefaultCollection = async () => {
    const res = await axios.get(`/api/collection/default`);
    setDefaultCollection(res.data.collection);
  }

  const fetchCollections = async () => {
    let paramsData = {
      owner: owner?.toLowerCase(),
      //isPublic: true,
    }
    axios.get('/api/collection', { params: paramsData })
      .then((res) => {
        setMyCollection(res.data.collections);
      }).catch((e) => {
        console.log(e.message);
        toast.error(e.message);
      })
  }

  const updateArts = (item) => {
    const newArts = myArt.map((art, key) => {
      if (filter === "nft") {
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
        isOnChain: false,
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
          if (selectedCollection) {
            setSelectedCollection(res.data.collection);
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

  const onDelete = () => {
    if (selectedCollection && !isAddress(selectedCollection.address)) {
      let paramsData = {
        collectionId: selectedCollection.id
      }
      const toast_load_id = toast.loading("Please wait...");
      axios.get("/api/collection/delete/", { params: paramsData })
        .then((res) => {
          toast.success("Success");
          toast.dismiss(toast_load_id);
          setTimeout(() => {
            window.location.reload();
          }, 800)
        }).catch((e) => {
          console.log(e);
          toast.dismiss(toast_load_id);
          toast.error(e.message);
        })
    }
  }

  const onEditCollection = (d: any) => {
    setDescription(d?.description)
    setTitle(d?.title)
    setShowEditCollectionModal(true)
  }

  const onDetailCollection = async (collection: any) => {
    setSelectedItems([]);
    setSelectedCollection(collection);
    setIsDetail(true);

  }
  const onCreateNFTCollection = async (plan) => {
    if (!loginStatus || !account) {
      return toast.error("Please connect your wallet correctly.");
    }
    const load_toast_id = toast.loading("Please wait...");
    try {
      const colAddr = await createNewCollection(plan, selectedCollection.id, chainId, library.getSigner());
      if (isAddress(colAddr)) {
        let metadata = {
          isOnChain: true,
          id: selectedCollection.id,
          address: account,
          itemCollection: colAddr.toString().toLowerCase(),
          name: title,
          description: description,
        }
        await axios
          .post('/api/collection/update/', metadata)
          .then((res) => {
            toast.success("NFT Collection is created successfully.")
            toast.dismiss(load_toast_id);
            setSelectedCollection(res.data.collection);
            setShowPublishCollectionModal(false)
          })
          .catch((err) => {
            console.log(err);
            toast.dismiss(load_toast_id);
            toast.error("NFT Collection Creation is failed");
          });
      } else {
        toast.dismiss(load_toast_id);
        toast.error("NFT Collection Creation is failed");
      }
    } catch (e) {
      console.log(e);
      toast.dismiss(load_toast_id);
    }
  }

  const onMintArts = async (collection) => {
    if (!loginStatus || !account) {
      return toast.error("Please connect your wallet correctly.")
    }
    if (!collection || !selectedItems) {
      return toast.error("You have to choose items to mint.")
    }

    if (filter === "nft") {
      return toast.error("You can not mint the existed nft items again.");
    }
    const load_toast_id = toast.loading("Please wait");
    try {
      const _artIds = [...selectedItems.map((_item) => _item.id), ...collection.artIds];
      const artIds = _artIds.reduce((acc, current) => {
        if (!acc.includes(current)) {
          acc.push(current);
        }
        return acc;
      }, []);
      const transCnt = Math.ceil(artIds.length / MAX_MINT_CNT);
      const lastCount = artIds.length % MAX_MINT_CNT;
      const transResults = [];
      for (let i = 0; i < transCnt; i++) {
        const isMinted = await onMintArt(
          collection.address,
          artIds.slice(i * MAX_MINT_CNT, i * MAX_MINT_CNT + (i === transCnt - 1 && lastCount !== 0 ? lastCount : MAX_MINT_CNT)),
          library.getSigner()
        )
        if (isMinted) transResults.push(i);
      }

      if (transResults.length === transCnt) {
        toast.success("Minted your selected arts on chain successfully.")
      } else {
        toast.warn("Some Arts are not minted.");
      };
      toast.dismiss(load_toast_id);
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    } catch (e) {
      console.log(e);
      toast.dismiss(load_toast_id);
    }
  }

  // Selection Logic

  const [selectedItems, setSelectedItems] = useState([])
  const [selectable, setSelectable] = useState(false);
  const [isAllSelected, setAllSelected] = useState(false);

  const handleClick = (isSelected, item) => {
    const isNew = filter !== "nft";
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

  useEffect(() => {
    setSelectedItems(isAllSelected ? [...myArt] : []);
  }, [isAllSelected])

  useEffect(() => {
    if (!selectable) setSelectedItems([]);
  }, [selectable])

  useEffect(() => {
    const isAllSelected = selectedItems.length > 0 && myArt.length === selectedItems.length;
    setAllSelected(isAllSelected);
  }, [selectedItems])

  const onChooseChain = (_chainId) => {
    setSelectedChainId(_chainId);
  }

  const [showAddColllectionModal, setShowAddColllectionModal] = useState(false)
  const [showRemoveColllectionModal, setShowRemoveColllectionModal] = useState(false)
  const [showCreateColllectionModal, setShowCreateColllectionModal] = useState(false)

  const onRemove = () => {
    setShowRemoveColllectionModal(true);
  }
  const onAdd = () => {
    setShowAddColllectionModal(true)
  }
  const onCreateNFT = () => {
    //setShowCreateColllectionModal(false)
    if (defaultCollection) {
      onMintArts(defaultCollection);
    }
  }

  const onPublish = (isPublic, _selectedItems) => {
    if (!loginStatus || !account) {
      return toast.error("Please connect your wallet correctly.");
    }
    let paramsData = {
      address: account,
      itemIds: _selectedItems.map((_item) => filter !== "nft" ? _item.id : _item.tokenId),
      collections: filter !== "nft" ? [] : _selectedItems.map((_item) => _item.itemCollection),
      isPublic: isPublic,
      isNew: filter !== "nft"
    }
    const load_toast_id = toast.loading("Please wait...")
    axios.post("/api/publish", paramsData)
      .then((res) => {
        for (const art of myArt) {
          for (const _item of res.data.items) {
            if ((filter !== "nft" && _item.id === art.id) || (filter === "nft" && _item.tokenId === art.tokenId && _item.itemCollection === art.itemCollection)) {
              art.privateType = _item.privateType;
            }
          }
        }
        setMyArt([...myArt]);
        toast.success((isPublic ? "Published" : "Unpublished") + " Successfully")
        toast.dismiss(load_toast_id);
      }).catch((e) => {
        toast.error(e.message);
        toast.dismiss(load_toast_id);
        console.log(e);
      })
  }
  const onDownload = () => {
    if (!user) return;
    const load_toast_id = toast.loading("Please wait...");
    const zip = new JSZip();
    const zipFile = zip.folder("images");
    const list = selectedItems.map(async (item, index) => {
      const fileUrl = user?.planId <= 0 && user?.additional_credits <= 0 ? item.watermark : item.thumbnail;
      //const fileUrl = item.watermark;
      const response = await fetch(fileUrl);
      const data = await response.blob();
      const name = fileUrl.split("/")[fileUrl.split("/").length - 1];
      zipFile.file(name, data);
      return data;
    })
    Promise.all(list).then(function () {
      zip.generateAsync({ type: "blob" })
        .then((content) => {
          FileSaver.saveAs(content, "images");
          toast.dismiss(load_toast_id);
        })
    })
  }

  const onAddToCollection = async (_collection) => {
    if (_collection) {
      if (!loginStatus || !account) {
        return toast.error("Please connect your wallet correctly.");
      }
      let paramsData = {
        artIds: selectedItems.map((_item) => filter !== "nft" ? _item.id : _item.tokenId),
        collectionId: _collection.id
      }
      const load_toast_id = toast.loading("Please wait...")
      axios.post("/api/addcollection", paramsData)
        .then((res) => {
          toast.success("Added Successfully");
          toast.dismiss(load_toast_id);
          setShowAddColllectionModal(false);
        }).catch((e) => {
          toast.error(e.message);
          toast.dismiss(load_toast_id);
          console.log(e);
        })
    }
  }

  const onRemoveToCollection = async (_collection) => {
    if (_collection) {
      if (!loginStatus || !account) {
        return toast.error("Please connect your wallet correctly.");
      }
      let paramsData = {
        artIds: selectedItems.map((_item) => filter !== "nft" ? _item.id : _item.tokenId),
        collectionId: _collection.id
      }
      const load_toast_id = toast.loading("Please wait...")
      axios.post("/api/removecollection", paramsData)
        .then((res) => {
          toast.success("Removed Successfully");
          toast.dismiss(load_toast_id);
          setShowRemoveColllectionModal(false);
        }).catch((e) => {
          toast.error(e.message);
          toast.dismiss(load_toast_id);
          console.log(e);
        })
    }
  }

  const gotoTab = (_feedMode) => {
    _feedMode === 1 ? history.push('/community_feed') :
      _feedMode === 2 ? history.push('/personal_feed') :
        history.push('/bookmarks');
  }

  const onFollow = async () => {
    if (!loginStatus) {
      return toast.error("Please connect your wallet correctly.");
    }
    if (account?.toLowerCase() === profile?.address.toLowerCase()) {
      return toast.error("You can not follow yourself.");
    }
    let paramsData = {
      address: account?.toLowerCase(),
      toAddress: profile?.address.toLowerCase()
    }
    axios.post("/api/user/follow", paramsData)
      .then(async (res) => {
        getUser(dispatch, account);
      }).catch((e) => {
        console.log(e);
      })
  }

  return (
    <>
      <div className={`${classes.root} mainContainer`}>
        {
          feedMode === 0 && <>
            {
              !isDetail ?
                <div className={classes.top}>
                  <div className="avatar">
                    <img src={profile?.logo_url} alt="" />
                    <span>
                      <h3>{profile?.name}</h3>
                      <div className="follows">
                        <p>{profile?.followers.length || 0} Following</p>
                        {
                          loginStatus && account && account?.toLowerCase() !== profile?.address.toLowerCase() && user && 
                          <button onClick={onFollow}>{user?.followers.includes(profile?.address.toLowerCase()) ? "Unfollow" : "Follow"}</button>
                        }
                        
                      </div>
                    </span>
                  </div>
                  <div className="right">
                    {/* <p>{profile?.bio}</p> */}
                    <div className="socialLinks">
                      <div style={{ maxWidth: 30 }}>
                        <a href={"http://twitter.com/" + profile?.social_twitter_id} className="twitter" target="_blank" rel="noreferrer">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href={"https://t.me/" + profile?.social_telegram_id} className="telegram" target="_blank" rel="noreferrer">
                          <i className="fab fa-telegram"> </i>
                        </a>
                      </div>
                      <p>
                        {profile?.bio}
                      </p>
                    </div>
                  </div>
                </div> :
                <div className={classes.topdetail} style={myArt.length > 0 ? { backgroundImage: `url('${myArt[0]?.assetUrl}')` } : {}}>
                  <div className="avatar">
                    <img src={profile?.logo_url} alt="" />
                    <span>
                      <h3>{profile?.name}</h3>
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
                    {
                      !isAddress(selectedCollection?.address) && <button onClick={() => setShowPublishCollectionModal(true)}>
                        <p>Create NFT Collection</p>
                        <img src="/assets/icons/add_icon_01.svg" alt="" />
                      </button>
                    }
                    {
                      isAddress(selectedCollection?.address) &&
                      <button onClick={() => onMintArts(selectedCollection)}>
                        <p>Mint Added Arts to Collection</p>
                        <img src="/assets/icons/add_icon_01.svg" alt="" />
                      </button>
                    }
                  </div>
                </div>
            }
          </>
        }
        {feedMode === 0 && !isDetail && <CollectionLIst collections={myCollection} onEditCollection={onEditCollection} onDetailCollection={onDetailCollection} />}
        {
          feedMode !== 0 && <div className={classes.top}>
            <h2>{feedMode === 1 ? "Community Feed" : feedMode === 2 ? "Your Feed" : "Bookmarks"}</h2>
            <div>
              {loginStatus && account && <>
                <span className={feedMode === 3 ? "activeFeedBtns" : "feedBtns"} onClick={() => gotoTab(3)}>Bookmarks</span>
                <span className={feedMode === 2 ? "activeFeedBtns" : "feedBtns"} onClick={() => gotoTab(2)}>Your Feed</span>
              </>}
              <span className={feedMode === 1 ? "activeFeedBtns" : "feedBtns"} onClick={() => gotoTab(1)}>Community</span>
            </div>
          </div>
        }
        <Filter
          feedMode={feedMode}
          isLoading={isLoading}
          setLoading={setLoading}
          filter={filter}
          setFilter={setFilter}
          setPrivateType={setPrivateType}
          setSearchStr={setSearchStr}
          emoticonId={emoticonId}
          setEmoticonId={setEmoticonId}
          selectable={selectable}
          setSelectable={setSelectable}
          fetchItems={fetchItems}
        />

        <div className={`${classes.content} card2`}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={classes.masonry}
            columnClassName={classes.gridColumn}
          >
            {myArt.map((item, key) => {
              var isSelected = false;
              for (const _item of selectedItems) {
                if (filter !== "nft" && _item.id === item.id) {
                  isSelected = true;
                  break;
                }
                if (filter === "nft" && _item.tokenId === item.tokenId && _item.itemCollection === item.itemCollection) {
                  isSelected = true;
                  break;
                }
              }
              return (
                <ProductCard1
                  key={key}
                  isNew={filter !== "nft"}
                  updateArts={updateArts}
                  item={item}
                  profile={profile}
                  setProfile={setProfile}
                  setSelectedItems={setSelectedItems}
                  onCreateNFT={onCreateNFT}
                  onClick={() => selectable && handleClick(isSelected, item)}
                  selectable={selectable}
                  isSelected={isSelected}
                  onPublish={onPublish}
                />)
            })}
          </Masonry>
          <div className="sticky" style={{ opacity: selectedItems.length !== 0 ? 1 : 0, zIndex: selectedItems.length !== 0 ? 10 : -1 }}>
            <div className="left">
              <p>Selected : {selectedItems.length}</p>
            </div>
            <div className="btns">
              <button className='grey' onClick={() => setSelectedItems([])}>Close</button>
              <button className='grey' onClick={() => setAllSelected(!isAllSelected)}>{isAllSelected ? "Deselect All" : "Select All"}</button>
              <button className='pink' style={{ background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)' }}>Actions <img src="/assets/icons/arrow_down_icon_01.svg" alt="" />
                <div className="drodownMenu">
                  <div className="menuItem" onClick={() => onDownload()}>Download Zip</div>
                  {
                    feedMode === 0 && filter !== "nft" && <>
                      <div className="menuItem" onClick={() => onPublish(true, selectedItems)}>Publish</div>
                      <div className="menuItem" onClick={() => onPublish(false, selectedItems)}>Unpublish</div>
                      <div className="menuItem" onClick={() => setShowCreateColllectionModal(true)}>Create NFT</div>
                      <div className="menuItem" onClick={() => onAdd()}>Add To Collection</div>
                      <div className="menuItem" onClick={() => onRemove()}>Remove From Collection</div>
                    </>
                  }

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
            <div className={`${classes.modalTop} customModalTop modalTop`}>
              <span className='topTitle'>
                <div>
                  <h4>{!isDetail ? "Create Collection" : "Edit Collection"}</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowEditCollectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <TextInput label={'Title'} wrapperClass={classes.myInputWrap} value={!isDetail ? title : selectedCollection?.name} placeholder='First Collection' onChangeData={(d) => onChangeTitle(d)} />

              <TextInput isMulti label={<>{'Description'} <span>Optional</span></>} wrapperClass={classes.myInputWrap} placeholder='Elon Musk as Santa Floki' value={!isDetail ? description : selectedCollection?.description} onChangeData={(d) => onChangeDescription(d)} />
              <p className={classes.text_number}>1/255</p>
              {
                profile?.planId === 3 && <div className="row">
                  <p>Public Collection</p>
                  <MaterialUISwitch defaultChecked={isPublicCollection} onChange={e => setIsPublicCollection(!isPublicCollection)} className='modal_switch' />
                </div>
              }
            </div>
            <div className={classes.modalBtns}>
              <FilledButton color='secondary' label={'Cancel'} handleClick={() => setShowEditCollectionModal(false)} />
              {
                selectedCollection && !isAddress(selectedCollection.address) && <FilledButton label={'Delete'} handleClick={onDelete} />
              }
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
                  <h4>{"Create NFT Collection"}</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowPublishCollectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <TextInput label={'Title'} wrapperClass={classes.myInputWrap} value={!isDetail ? title : selectedCollection?.name} placeholder='First Collection' onChangeData={(d) => onChangeTitle(d)} />

              <TextInput isMulti label={<>{'Description'} <span>Optional</span></>} wrapperClass={classes.myInputWrap} placeholder='Elon Musk as Santa Floki' value={!isDetail ? description : selectedCollection?.description} onChangeData={(d) => onChangeDescription(d)} />
              <p className={classes.text_number}>1/255</p>
            </div>
            <div className={classes.modalBtns}>
              {/* <FilledButton color='custom' handleClick={() => setShowEditCollectionModal(false)} /> */}
              <button className='newCollectionCard' onClick={() => onCreateNFTCollection(1)}>
                <p>3 ETH NFT Collection</p>
                <h6>No fees</h6>
              </button>
              <FilledButton label={'Free NFT Collection 3% Buy/Sell Fee'} handleClick={() => onCreateNFTCollection(0)} />
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
              <button className="closeBtn" onClick={() => setShowAddColllectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={`${classes.modalAddContent} modalContent`}>


              <div className="btns">
                {myCollection?.map((collection, key) => (
                  <button className={`collectionCard`} key={key} onClick={() => onAddToCollection(collection)}>
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
        show={showRemoveColllectionModal}
        maxWidth='sm'
        contentClass={classes.modalAddRootContent}
        children={<>
          <div className={classes.modal}>
            <div className={`${classes.modalTop} customModalTop modalTop`}>
              <span className='topTitle'>
                <div>
                  <h4>Remove From Collection</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowRemoveColllectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={`${classes.modalAddContent} modalContent`}>


              <div className="btns">
                {myCollection?.map((collection, key) => (
                  <button className={`collectionCard`} key={key} onClick={() => onRemoveToCollection(collection)}>
                    <p>{collection?.name.length > 18 ? collection?.name.substring(0, 17) + "..." : collection?.name}</p>
                  </button>
                ))}
                <button className='newCollectionCard' onClick={() => setShowRemoveColllectionModal(true)}>
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
              <button className="closeBtn" onClick={() => setShowCreateColllectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
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
