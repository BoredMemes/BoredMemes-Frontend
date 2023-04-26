import { useStyles } from './style';
import { useContext, useEffect, useState } from 'react';
import Web3WalletContext from 'hooks/Web3ReactManager';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { getUser, useAuthDispatch, useAuthState } from 'context/authContext';
import BlindFilter from 'components/Filter/BlindFilter';
import CollectionCard from 'components/Cards/CollectionCard';
import { onMintArt } from 'utils/contracts';
import Modal from 'components/modal';
import ThemeContext from 'theme/ThemeContext';
type PropsType = {
  feedMode?: number//0- My Arts, 1- Community Feed, 2- Personal Feed, 3- Bookmarks
}
const BlindMint = () => {

  const classes = useStyles();
  const { loginStatus, account, library, chainId } = useContext(Web3WalletContext)
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const { theme } = useContext(ThemeContext);

  const history = useHistory();
  const location = useLocation();

  const MAX_MINT_CNT = 30;

  const [collections, setCollections] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState('new');
  const [searchStr, setSearchStr] = useState('');

  const [processingModal, setProcessingModal] = useState(false);
  const [successTrans, setSuccessTrans] = useState(false);

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

  const onMint = async (_collection) => {
    if (!loginStatus || !account) {
      return toast.error("Please connect your wallet.")
    }
    if (_collection.saleCnt) {
      if (_collection.saleCnt > _collection.artIds.length) {
        return toast.error("You can not more than " + _collection.artIds.length + " arts");
      }
      if (_collection.saleCnt > MAX_MINT_CNT) {
        return toast.error("Can not mint more than 30 arts at once.")
      }
      const load_toast_id = toast.loading("Please wait");
      try {
        setSuccessTrans(false);
        setProcessingModal(true);
        const isMinted = await onMintArt(
          _collection.isBlind,
          _collection.address,
          _collection.artIds.slice(0, _collection.saleCnt),
          library.getSigner()
        )
        toast.dismiss(load_toast_id);
        if (isMinted) {
          toast.success("Minted Successfully");
          setSuccessTrans(true);
          window.location.reload();
        } else {
          setSuccessTrans(false);
          setProcessingModal(false);
          return toast.error("Failed to mint.")
        }
      } catch (e) {
        console.log(e);
        toast.error("Failed to mint");
        toast.dismiss(load_toast_id);
        setSuccessTrans(false);
        setProcessingModal(false);
      }

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
                key={idx}
                collection={collection}
                onMint={onMint}
              />
            ))}
          </div>
        </div>
      </div>
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
                <p className="success-transaction">{"Your transaction was successful"}</p>
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
                      window.location.href = "/";
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

export default BlindMint;
