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

const CommunityFeed = () => {
  const classes = useStyles();
  const { loginStatus, account, library } = useContext(Web3WalletContext)
  const { user } = useAuthState();
  const breakpointColumnsObj = {
    // default: 4,
    3840: 8,
    3000: 7,
    2560: 6,
    2200: 5,
    1840: 4,
    1440: 4,
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
    console.log(paramsData);
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
  const onShow = (d:any)=>{
    if (d?.itemStatus && d?.isRequested){
      setShowModal(true)
      setData(d)
    }
  }
  return (
    <>
      <div className={`${classes.root} mainContainer`}>
        <div className={classes.top}>
          <h1>Community Feed</h1>
        </div>
        <Filter filter = {filter} setFilter = {setFilter} setSearchStr = {setSearchStr}/>

        <div className={classes.content}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={classes.masonry}
            columnClassName={classes.gridColumn}
          >
            {myArt.map((d, i) => (
              <ProductCard1 key={i} updateArts={updateArts} item={d} onShow ={()=>onShow(d)}/>
            ))}
          </Masonry>
        </div>
      </div>
      <ViewModal updateArts={updateArts} showModal={showModal} setShowModal={setShowModal} item = {data} />
    </>
  );
};

export default CommunityFeed;
