import { useStyles } from './style';
import Masonry from 'react-masonry-css';
import ProductCard1 from 'components/Cards/ProductCard1';
import Filter from 'components/Filter/Filter';
import { useEffect, useState } from 'react';
import ViewModal from 'components/modal/viewModal/ViewModal';

const myData = [
  {
    id: 0,
    img: '/assets/imgs/img_01.png',
    type: 'new',
    name: '',
    commentType : 3,
    isBookmark : true,
  },
  
  {
    id: 1,
    img: '/assets/imgs/img_02.png',
    type: 'new',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
 
  {
    id: 2,
    img: '/assets/imgs/img_03.png',
    type: 'new',
    name: '',
    commentType : 2,
    isBookmark : false,
  },
  
  {
    id: 3,
    img: '/assets/imgs/img_04.png',
    type: 'new',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 4,
    img: '/assets/imgs/img_05.png',
    type: 'new',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 5,
    img: '/assets/imgs/img_06.png',
    type: 'new',
    name: '',
    commentType : -1,
    isBookmark : true,
  },
  {
    id: 6,
    img: '/assets/imgs/img_07.png',
    type: 'new',
    name: '',
    commentType : 1,
    isBookmark : false,
  },
  {
    id: 7,
    img: '/assets/imgs/img_08.png',
    type: 'new',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 8,
    img: '/assets/imgs/img_09.png',
    type: 'new',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 9,
    img: '/assets/imgs/img_10.png',
    type: 'new',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 10,
    img: '/assets/imgs/img_11.png',
    type: 'new',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 11,
    img: '/assets/imgs/img_12.png',
    type: 'new',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 12,
    img: '/assets/imgs/img_08.png',
    type: 'hot',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 13,
    img: '/assets/imgs/img_09.png',
    type: 'hot',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 14,
    img: '/assets/imgs/img_10.png',
    type: 'hot',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 15,
    img: '/assets/imgs/img_04.png',
    type: 'oldest',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 16,
    img: '/assets/imgs/img_05.png',
    type: 'oldest',
    name: '',
    commentType : -1,
    isBookmark : false,
  },
  {
    id: 17,
    img: '/assets/imgs/img_04.png',
    type: 'top',
    name: '',
    commentType : 3,
    isBookmark : false,
  },
  {
    id: 18,
    img: '/assets/imgs/img_05.png',
    type: 'top',
    name: '',
    commentType : 3,
    isBookmark : false,
  },
  {
    id: 19,
    img: '/assets/imgs/img_06.png',
    type: 'top',
    name: '',
    commentType : 3,
    isBookmark : false,
  },
  {
    id: 20,
    img: '/assets/imgs/img_07.png',
    type: 'top',
    name: '',
    commentType : 3,
    isBookmark : false,
  },
];
const CommunityFeed = () => {
  const classes = useStyles();
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
    let filteredData = myData.filter(d=> d.type === filter)
    setMyArt(filteredData)
  }, [filter]);

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
              <ProductCard1 key={i} product={d} onShow ={()=>onShow(d)}/>
            ))}
          </Masonry>
        </div>
      </div>
      <ViewModal showModal={showModal} setShowModal={setShowModal} product = {data} />
    </>
  );
};

export default CommunityFeed;
