import { useStyles } from './style';
import Masonry from 'react-masonry-css';
import ProductCard1 from 'components/Cards/ProductCard1';
import Filter from 'components/Filter/Filter';
import { useContext, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import ViewModal from 'components/modal/viewModal/ViewModal';
import Web3WalletContext from 'hooks/Web3ReactManager';
import { useAuthState } from 'context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyArt = () => {
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
      owner : account.toLowerCase()
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
    setShowModal(true)
    setData(d)
  }

  return (
    <>
      <div className={`${classes.root} mainContainer`}>
        <div className={classes.top}>
          <div className="avatar">
            <img src={user?.logo_url} alt="" />
            <span>
              <h3>{user?.name}</h3>
              <p>{user?.bio}</p>
            </span>
          </div>
          <div className="right">
            <div className="follows">
              <div className="socialLinks">
                <a href={"http://twitter.com/" + user?.social_twitter_id} className = "twitter" target="_blank"rel="noreferrer">
                  <i className="fab fa-twitter"></i>
                </a> 
                <a href={"https://t.me/" + user?.social_telegram_id} className = "telegram" target="_blank"rel="noreferrer">
                  <i className="fab fa-telegram"> </i>
                </a> 
              </div>
              <p>0 Following</p>
            </div>
            <HashLink to="/edit_profile" className = 'edit_profile'>Edit Profile</HashLink>
          </div>
        </div>
        <Filter filter = {filter} setFilter = {setFilter} setSearchStr = {setSearchStr}/>

        <div className={classes.content}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={classes.masonry}
            columnClassName={classes.gridColumn}
          >
            {myArt.map((item, key) => (
              <ProductCard1 key={key} updateArts={updateArts} item={item} onShow = {()=>onShow(item)}/>
            ))}
          </Masonry>
        </div>
      </div>
      <ViewModal showModal={showModal} setShowModal={setShowModal} product = {data} />
    </>
  );
};

export default MyArt;
