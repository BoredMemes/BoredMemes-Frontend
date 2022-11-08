import { useStyles } from './style';
import Masonry from 'react-masonry-css';
import ProductCard1 from 'components/Cards/ProductCard1';
import Filter from 'components/Filter/Filter';
import { useContext, useEffect, useState } from 'react';
import ViewModal from 'components/modal/viewModal/ViewModal';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { useAuthState } from 'context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Bookmarks = () => {
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
  
  useEffect(() => {
    if (loginStatus){
      fetchItems();
    }
  }, [loginStatus])

  const fetchItems = async () => {
    let paramsData = {
      bookmarks : account.toLowerCase()
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

  const updateArts = (item) => {
    const newArts = [];
    for (const art of myArt){
      if (art.tokenId !== item.tokenId)newArts.push(art);
    }
    setMyArt([...newArts]);
  }

  useEffect(() => {
  }, [searchStr]);

  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const onShow = (d:any)=>{
    setShowModal(true)
    setData(d)
  }
  return (
    <>
      <div className={`${classes.root} mainContainer`}>
        <div className={classes.top}>
          <h1>Bookmarks</h1>
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
      <ViewModal showModal={showModal} setShowModal={setShowModal} product = {data} />
    </>
  );
};

export default Bookmarks;
