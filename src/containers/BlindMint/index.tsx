import { useStyles } from './style';
import { useContext, useEffect, useState } from 'react';
import Web3WalletContext from 'hooks/Web3ReactManager';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { getUser, useAuthDispatch, useAuthState } from 'context/authContext';
import BlindFilter from 'components/Filter/BlindFilter';
import CollectionCard from 'components/Cards/CollectionCard';
type PropsType = {
  feedMode?: number//0- My Arts, 1- Community Feed, 2- Personal Feed, 3- Bookmarks
}
const BlindMint = () => {

  const classes = useStyles();
  const { loginStatus, account, library, chainId } = useContext(Web3WalletContext)
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const history = useHistory();
  const location = useLocation();

  const [collections, setCollections] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState('new');
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    fetchCollections();
  }, [loginStatus, account, filter, searchStr, user])

  const fetchCollections = async () => {
    let paramsData = {
      isPublic: true,
      isBlind: true
    }
    axios.get('/api/collection', { params: paramsData })
      .then((res) => {
        setCollections(res.data.collections);
      }).catch((e) => {
        console.log(e.message);
        toast.error(e.message);
      })
  }

  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const onShow = (d: any) => {
    if (d?.itemStatus && d?.isRequested) {
      setShowModal(true)
      setData(d)
    }
  }
  return (
    <>
      <div className={`${classes.root} mainContainer`}>
        {
          <div className={classes.top}>
            <h2>{"Blind Mint"}</h2>
          </div>
        }
        <BlindFilter
          isLoading={isLoading}
          setLoading={setLoading}
          filter={filter}
          setFilter={setFilter}
          setSearchStr={setSearchStr}
        />

        <div className={`${classes.content} card2`}>
          <div className={classes.cardContainer}>
            {collections && collections.length > 0 && collections.map((collection, idx) => (
              <CollectionCard
                key="idx"
                collection={collection}
              />
            ))}
            {collections && collections.length > 0 && collections.map((collection, idx) => (
              <CollectionCard
                key="idx"
                collection={collection}
              />
            ))}
            {collections && collections.length > 0 && collections.map((collection, idx) => (
              <CollectionCard
                key="idx"
                collection={collection}
              />
            ))}
            {collections && collections.length > 0 && collections.map((collection, idx) => (
              <CollectionCard
                key="idx"
                collection={collection}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlindMint;
