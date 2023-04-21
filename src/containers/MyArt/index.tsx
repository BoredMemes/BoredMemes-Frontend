import { MaterialUISwitch, useStyles } from './style';
import Masonry from 'react-masonry-css';
import ProductCard1 from 'components/Cards/ProductCard1';
import Filter from 'components/Filter/Filter';
import { useContext, useEffect, useRef, useState } from 'react';
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
import ThemeContext from 'theme/ThemeContext';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import UploadFile from 'components/Forms/UploadFile';
import { ethers } from 'ethers';
type PropsType = {
  feedMode?: number//0- My Arts, 1- Community Feed, 2- Personal Feed, 3- Bookmarks
}
const MyArt = ({ feedMode }: PropsType) => {

  const classes = useStyles();
  const { loginStatus, account, library, chainId } = useContext(Web3WalletContext)
  const { user } = useAuthState();
  const { theme } = useContext(ThemeContext);
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
  const dateRef = useRef();
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
  const [showCollectionTypeModal, setShowCollectionTypeModal] = useState(false)
  const [showPublishCollectionModal, setShowPublishCollectionModal] = useState(false)
  const [showMintCollectionModal, setShowMintCollectionModal] = useState(false)
  const [showBlindCollectionModal, setShowBlindCollectionModal] = useState(false)
  const [processingModal, setProcessingModal] = useState(false);
  const [successTrans, setSuccessTrans] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isPublicCollection, setIsPublicCollection] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [mintPrice, setMintPrice] = useState(0)
  const [revealDate, setRevealDate] = useState(Date.now())
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
      privateType: filter === "nft" ? undefined : profile?.address.toLowerCase() === account?.toLowerCase() ? privateType : 1,
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
      isPublic: owner?.toLowerCase() === account?.toLowerCase() ? undefined : true,
      isBlind: false
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
  
  const [nftAsset, setNFTAsset] = useState(undefined);
  const [nftAssetType, setNFTAssetType] = useState('image');

  function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }
  function getAssetType(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'png':
      case 'heif':
      case 'heic':
      case 'tiff':
      case 'raw':
        return 'Image';
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
        return 'Video';
      case 'mp3':
        return 'Audio';
    }
    return '';
  }

  const onChangeNFTAsset = async asset => {
    setNFTAsset(asset);
    setNFTAssetType(getAssetType(asset.name));
  };

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
  const onCreateNFTCollection = async (plan, isBlind) => {
    if (!loginStatus || !account) {
      return toast.error("Please connect your wallet correctly.");
    }
    if (isAddress(selectedCollection.address)){
      return toast.error("Your collection is already on chain.")
    }
    if (isBlind){
      if (!mintPrice){
        return toast.error("You must set the mint price.")
      }
      if (!nftAsset){
        return toast.error("You must select the reveal art");
      }
      if (!revealDate || revealDate <= Date.now()){
        return toast.error("The reveal date should be later than current date and time");
      }
    }
    const load_toast_id = toast.loading("Please wait...");
    setSuccessTrans(false);
    setProcessingModal(true);
    try {
      let revealUri = "";
      if (isBlind && nftAsset){
        let formData = new FormData();
        formData.append('file', nftAsset);
        const revealData = await axios.post("/api/upload_reveal", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        if (revealData && revealData.data.message == "success"){
          revealUri = revealData.data.url;
          console.log("Reveal URI ", revealUri);
        }
      }
      const colAddr = await createNewCollection(
        plan, 
        isBlind,
        mintPrice,
        ethers.constants.AddressZero,
        revealUri,
        revealDate,
        selectedCollection.id, chainId, library.getSigner());
      if (isAddress(colAddr)) {
        let metadata = {
          isOnChain: true,
          id: selectedCollection.id,
          address: account,
          itemCollection: colAddr.toString().toLowerCase(),
          name: title,
          description: description,
          isBlind: isBlind,
          mint_price: mintPrice,
          token_addr: ethers.constants.AddressZero,
          reveal_date: revealDate,
          reveal_uri: revealUri
        }
        await axios
          .post('/api/collection/update/', metadata)
          .then((res) => {
            toast.success("NFT Collection is created successfully.")
            setSuccessTrans(true);
            toast.dismiss(load_toast_id);
            setSelectedCollection(res.data.collection);
            setShowPublishCollectionModal(false)
          })
          .catch((err) => {
            console.log(err);
            toast.dismiss(load_toast_id);
            setSuccessTrans(false);
            setProcessingModal(false);
            toast.error("NFT Collection Creation is failed");
          });
      } else {
        toast.dismiss(load_toast_id);
        toast.error("NFT Collection Creation is failed");
        setSuccessTrans(false);
        setProcessingModal(false);
      }
    } catch (e) {
      console.log(e);
      toast.dismiss(load_toast_id);
      setSuccessTrans(false);
      setProcessingModal(false);
    }
  }

  const [mintCnt, setMintCnt] = useState(0);
  const onMintArts = async (collection, _selectedItems) => {
    if (!loginStatus || !account) {
      return toast.error("Please connect your wallet correctly.")
    }
    console.log(_selectedItems);
    if (!collection || !_selectedItems || _selectedItems.length <= 0) {
      return toast.error("You have to choose items to mint.")
    }

    if (filter === "nft") {
      return toast.error("You can not mint the existed nft items again.");
    }
    const load_toast_id = toast.loading("Please wait");
    setSuccessTrans(false);
    setProcessingModal(true);
    try {
      const _artIds = [..._selectedItems.map((_item) => _item.id), ...collection.artIds];
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
      setSuccessTrans(true);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000)
    } catch (e) {
      console.log(e);
      toast.dismiss(load_toast_id);
      setSuccessTrans(false);
      setProcessingModal(false);
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
  const onCreateNFT = (_selectedItems) => {
    //setShowCreateColllectionModal(false)
    if (defaultCollection) {
      onMintArts(defaultCollection, _selectedItems);
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
      const fileUrl = (!loginStatus || (loginStatus && user?.planId <= 0 && user?.additional_credits <= 0)) ? item.watermark : item.thumbnail;
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
                <div className={classes.topdetail} style={selectedCollection?.background && selectedCollection?.background.length > 0 ? { backgroundImage: `url('${selectedCollection?.background}')` } : {}}>
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
                      !isAddress(selectedCollection?.address) && <button onClick={() => setShowCollectionTypeModal(true)}>
                        <p>Create NFT Collection</p>
                        <img src="/assets/icons/add_icon_01.svg" alt="" />
                      </button>
                    }
                    {
                      isAddress(selectedCollection?.address) &&
                      // <button onClick={() => onMintArts(selectedCollection, selectedItems)}>
                      <button onClick={() => {
                        const _artIds = [...selectedItems.map((_item) => _item.id), ...selectedCollection.artIds];
                        const artIds = _artIds.reduce((acc, current) => {
                          if (!acc.includes(current)) {
                            acc.push(current);
                          }
                          return acc;
                        }, []);
                        setMintCnt(artIds.length);
                        setShowMintCollectionModal(true);
                      }}>
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
          profile={profile}
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
        show={showCollectionTypeModal}
        maxWidth='sm'
        contentClass={classes.modalRootContent}
        children={<>
          <div className={classes.modal}>
            <div className={`${classes.modalTop} customModalTop`}>
              <span className='topTitle'>
                <div>
                  <h4>{"Personal or Blind Mint Collection?"}</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowCollectionTypeModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <p>You can Either create A Personal NFT Collection or A Blind Mint Collection.</p>
              <h4>Personal Collection:</h4>
              <p>Your Art Pieces Will Be Later Minted, And You Can Mint New Pieces At Any Time.</p>
              <h4>Blind Mint Collection:</h4>
              <p>Offer your community with a blind minting option to launch your NFT collection and start generating revenues. Choose your custom minting price and mint ending time. the reveal is made after all NFTs are minted or sale has ended.</p>
            </div>
            <div className={classes.modalBtns}>
              {/* <FilledButton color='custom' handleClick={() => setShowEditCollectionModal(false)} /> */}
              <button className='newCollectionCard' onClick={() => {
                setShowCollectionTypeModal(false);
                setShowBlindCollectionModal(true)
              }}>
                <p>Blind Mint NFT Collection</p>
              </button>
              <FilledButton label={'Personal NFT Collection'} handleClick={() => {
                setShowPublishCollectionModal(true);
                setShowCollectionTypeModal(false);
              }} />
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
                  <h4>{"Create Personal NFT Collection"}</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowPublishCollectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <TextInput label={'Title'} wrapperClass={classes.myInputWrap} value={!isDetail ? title : selectedCollection?.name} placeholder='First Collection' onChangeData={(d) => onChangeTitle(d)} />

              <TextInput isMulti label={<>{'Description'} <span>Optional</span></>} wrapperClass={classes.myInputWrap} placeholder='Elon Musk as Santa Floki' value={!isDetail ? description : selectedCollection?.description} onChangeData={(d) => onChangeDescription(d)} />
              <p className={classes.text_number}>0/250</p>
            </div>
            <div className={classes.modalBtns}>
              {/* <FilledButton color='custom' handleClick={() => setShowEditCollectionModal(false)} /> */}
              <button className='newCollectionCard' onClick={() => onCreateNFTCollection(1, false)}>
                <p>Payed NFT Collection</p>
                <h6>3 ETH Creation && No fees</h6>
              </button>
              <FilledButton label={'Free NFT Collection 3% Trading Fee'} handleClick={() => onCreateNFTCollection(0, false)} />
            </div>
          </div>

        </>}
      />
      <Modal
        show={showBlindCollectionModal}
        maxWidth='sm'
        contentClass={classes.modalRootContent}
        children={<>
          <div className={classes.modal}>
            <div className={`${classes.modalTop} customModalTop`}>
              <span className='topTitle'>
                <div>
                  <h4>{"Create Blind Mint NFT Collection"}</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowBlindCollectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <p>Once the blind mint has started, no additional art pieces can be added. Make sure to have added the correct number of art pieces before continuing.</p>
              <p>Your Blind mint collection includes a maximum of 30 NFT</p>
              <TextInput label={'Title'} wrapperClass={classes.myInputWrap} value={!isDetail ? title : selectedCollection?.name} placeholder='First Collection' onChangeData={(d) => onChangeTitle(d)} />

              <TextInput isMulti label={<>{'Description'} <span>Optional</span></>} wrapperClass={classes.myInputWrap} placeholder='Elon Musk as Santa Floki' value={!isDetail ? description : selectedCollection?.description} onChangeData={(d) => onChangeDescription(d)} />
              <p className={classes.text_number}>0/250</p>
              <TextInput label={'Mint Price'} type='number' wrapperClass={classes.myInputWrap} placeholder='0.1' onChangeData={(d) => setMintPrice(parseFloat(d))}
                endIcon={<span>ETH</span>} />
              <div style={{width:'100%'}} >
                <h3 className={classes.label}>Profile image</h3>
                <UploadFile
                  label="Upload"
                  dispalyAsset
                  fileName={nftAsset?.name}
                  fileSize={nftAsset?.size}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      onChangeNFTAsset(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <TextInput
                type="datetime-local"
                label={'Minting Ends, Date and time'}
                wrapperClass={classes.myInputWrap}

                onChangeData={(d) => setRevealDate(new Date(d).getTime())} />
            </div>
            <div className={classes.modalBtns}>
              {/* <FilledButton color='custom' handleClick={() => setShowEditCollectionModal(false)} /> */}
              <button className='newCollectionCard' onClick={() => onCreateNFTCollection(1, true)}>
                <p>Payed Blind Mint</p>
                <h6>10 ETH Creation && No fees</h6>
              </button>
              <FilledButton label={'Free Blind Mint 3% Minting & Trading Fee'} handleClick={() => onCreateNFTCollection(0, true)} />
            </div>
          </div>

        </>}
      />
      <Modal
        show={showMintCollectionModal}
        maxWidth='sm'
        contentClass={classes.modalRootContent}
        children={<>
          <div className={classes.modal}>
            <div className={`${classes.modalTop} customModalTop`}>
              <span className='topTitle'>
                <div>
                  <h4>{"Mint Added Images to NFT Collection"}</h4>
                </div>
              </span>
              <button className="closeBtn" onClick={() => setShowMintCollectionModal(false)}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
            </div>
            <div className={classes.modalContent}>
              <p>We are optimising the number of transactions that will be Processing to mint all your newly added Images.</p>
              <p>You have {mintCnt} Pieces that will be minted in {Math.ceil(mintCnt / MAX_MINT_CNT)} transactions.</p>
            </div>
            <div className={classes.modalBtns}>
              {/* <FilledButton color='custom' handleClick={() => setShowEditCollectionModal(false)} /> */}
              <button className='newCollectionCard' onClick={() => {

              }}>
                <p>Cancel</p>
              </button>
              <FilledButton label={'Start Minting'} handleClick={() => {
                onMintArts(selectedCollection, selectedItems)
                setShowMintCollectionModal(false);
              }} />
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
              <p>NFT minting within the PIXIAI platform is - ETH</p>

              <div className="chooseBtns">
                <h4>Choose Your Network</h4>
                <div className="row">
                  <FilledButton label={'ETHEREUM'} icon={<img src="/assets/icons/eth_icon_01.svg" alt="" />} iconPosition='start' handleClick={() => { }} color='smart' />
                  <FilledButton label={'BINANCE SMART CHAIN'} icon={<img src="/assets/icons/binance_icon.svg" alt="" />} iconPosition='start' color='grey' />
                </div>
              </div>
            </div>
            <div className={classes.modalBtns} style={{ justifyContent: 'center' }}>
              <FilledButton label={'Create NFTs'} icon={<img src="/assets/icons/add_icon_01.svg" alt="" />} iconPosition='start' handleClick={() => onCreateNFT(selectedItems)} />
            </div>
          </div>
        </>}
      />
      <Modal
        show={processingModal}
        contentClass={classes.processModalRoot}
        maxWidth='sm'
        children={<>
          <div className={classes.processModal}>
            {!successTrans
              ?
              <>
                <div className={classes.processModalTop}>
                  <span>
                    {theme === 'dark' ? <img src="/assets/imgs/logo.png" alt="" /> : <img src="/assets/logo.png" alt="" />}
                    <h4>Your transaction is beeing processed</h4>
                  </span>
                </div>
                <div className={classes.processModalContent}>
                  <span>
                    <img src="/assets/icons/2.png" alt="" />
                  </span>
                  <div className="warning">
                    <img src="/assets/icons/warning_icon.png" alt="" />
                    <p>Validate your transaction to continue.</p>
                  </div>
                </div>
              </>
              :
              <>
                <div className={classes.processModalTop}>
                  <span className='topTitle'>
                    {theme === 'dark' ? <img src="/assets/imgs/logo.png" alt="" /> : <img src="/assets/logo.png" alt="" />}
                    <div>
                      <h3>Wooohoooo! </h3>
                    </div>
                  </span>
                  <button className="closeBtn" onClick={() => { setProcessingModal(false); setSuccessTrans(false); }}><img src="/assets/icons/close_icon_01.svg" alt="" /></button>
                </div>
                <p className="success-transaction">{showBlindCollectionModal ? "Your Blind Mint is Live" : "Your transaction was successful"}</p>
                <div className={classes.processModalContent}>
                  <div className={classes.modalBtns}>
                    <button style={{
                      padding: '5px', width: '50%',
                      background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      height: '45px', borderRadius: '15px', textAlign: 'center', border: 'dashed 1px #ff589d', color: '#be16d2', alignSelf: 'center', cursor: 'pointer'
                    }} onClick={() => {
                      setSuccessTrans(false);
                      setProcessingModal(false);
                      history.push("/blind_mint")
                    }}
                      className="cancel-btn">
                      My Art
                    </button>
                    <button style={{
                      padding: '5px', background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%)', width: '50%',
                      height: '45px', borderRadius: '15px', textAlign: 'center', border: 'none', color: 'white', alignSelf: 'center', cursor: 'pointer'
                    }}
                      onClick={() => {
                        setSuccessTrans(false);
                        setProcessingModal(false);
                        history.push("/staking")
                      }}
                    > Staking Pools </button>
                  </div>
                </div>
              </>
            }
          </div>
        </>}
      />
    </>
  );
};

export default MyArt;
