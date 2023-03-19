import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

interface PropsType {
  filter?: string;
  setFilter?: any;
  searchStr?: string;
  setSearchStr?: any;
  setEmoticonId ?: any;
  setPrivateType ?: any;
  isAllSelected?: boolean;
  setAllSelected?: any;
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0, 2),
    width: 'calc(100% - 30px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    '& .row': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'space-between',
      },
    },
    '& p': {
      fontSize: 14,
      color: '#93989A',
      [theme.breakpoints.down('sm')]: {
        marginBottom: 10,
      },
    },
    '& .search': {
      marginRight: 5,
      marginBottom: 10,
      marginTop: 10,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gridArea : 'auto',
      gap : 10,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginRight: 0,
        marginBottom: 10,
      },
      '& span': {
        position: 'relative',
        border: 'none',
        padding: '8px 18px',
        paddingLeft : 30,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        background: '#F0F2F5',
        color: '#93989A',
        width: 'calc(100% - 100px)',
        '@media screen and (max-width: 768px) and (orientation: portrait)': {
          justifyContent: 'center',
        },
        '& button': {
          position: 'absolute',
          left: 8,
          border: 'none',
          background: '#ffffff00',
          color: '#93989A',
        },
        '& input': {
          border: 'none',
          background: '#ffffff00',
          width: '15vw',
          fontSize: '0.8vw',
          [theme.breakpoints.up('xl')]: {
            fontSize: 18,
            width: '22vw',
          },
          [theme.breakpoints.only('xl')]: {
            fontSize: 16,
          },

          [theme.breakpoints.only('md')]: {
            width: '15vw',
          },
          '&::placeholder': {
            fontWeight: 500,
            color: '#727272',
            // fontSize: 'min(0.8vw, 13px)',
            '@media screen and (max-width: 768px) and (orientation: portrait)': {
              fontSize: 14,
              // textAlign: 'center',
            },
          },
          '&:focus': {
            outline: 'none',
          },
          '@media screen and (max-width: 768px) and (orientation: portrait)': {
            width: '100%',
            fontSize: 14,
          },
        },
      },
      '& .btns': {
        width : 100,
        gridArea : 'auto',
        gap : 10,
        display: 'flex',
        alignItems: 'center',
        '& button': {
          border : '1px #F400F500 solid',
          background: '#ffffff00',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent : 'center',
          width : 40,
          height : 40,
          borderRadius: 35,

          '&:hover': {
            background: '#F0F2F5',
          },
        }
      }
    },
    '& .select': {
      marginRight: 10,
      marginBottom: 10,
      marginTop: 10,
      '@media screen and (max-width: 768px) and (orientation: portrait)': {
        marginRight: 0,
        marginBottom: 10,
      },
      '& button': {
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        padding: '8px 1.5vw',
        // fontSize: 'min(0.8vw, 13px)',
        fontSize: '0.8vw',
        fontWeight: 500,
        background: '#F0F2F5',
        color: '#727272',
        borderRadius: 30,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        [theme.breakpoints.up('xl')]: {
          fontSize: 18,
        },
        [theme.breakpoints.only('xl')]: {
          fontSize: 16,
        },
        [theme.breakpoints.only('md')]: {
          padding: '8px 1vw',
        },
        [theme.breakpoints.only('xs')]: {
          width: '100%',
          justifyContent: 'center',
          padding: '8px 20px',
          fontSize: 14,
        },
        '&:hover': {
          background: 'linear-gradient(47.43deg, #2A01FF77 0%, #FF1EE177 57%, #FFB33277 100%);',
        },
        '& img': {
          marginLeft: 10,
          '@media screen and (max-width: 768px) and (orientation: portrait)': {
            marginRight: 10,
          },
        },
      },
      '& .activeBtn': {
        background: 'linear-gradient(47.43deg, #2A01FF 0%, #FF1EE1 57%, #FFB332 100%);',
        color : '#fff',
      }
    },

    '& .smalBtns': {
      marginRight: 0,
      marginLeft: 'auto',
      marginBottom: 10,
      marginTop: 10,
      display : 'flex',
      gridArea : 'auto',
      gap : 10,
      '@media screen and (max-width: 768px) and (orientation: portrait)': {
        marginRight: 0,
        marginBottom: 10,
      },
      '& .likeBtn': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        padding: 0,
        background: '#F0F2F500',
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        width : 30,
        height : 30,
        
        [theme.breakpoints.only('xs')]: {
        },
        '&:hover': {
          background: '#F0F2F5',
        },
        '& img': {
          [theme.breakpoints.only('xs')]: {
          },
        },
      },
      '& .imgBtn': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        padding: 0,
        background: '#F0F2F500',
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        height : 30,
        
        [theme.breakpoints.only('xs')]: {
        },
        '&:hover': {
          background: '#F0F2F5',
        },
        '& img': {
          [theme.breakpoints.only('xs')]: {
          },
        },
      },
      '& .activeBtn': {
        background: '#F400F5',
        color : '#fff',
      }
    },
  },
 
}));

const Filter = ({ filter, setFilter, setPrivateType, searchStr, setSearchStr, isAllSelected, setAllSelected, setEmoticonId }: PropsType) => {
  const classes = useStyles();

  const [ searchTxt, setSearchTxt] = useState("");
  const [stateShowImage, setStateShowImage] = useState(0)
  const onShowImages = ()=>{
    if(stateShowImage < 2){
      setStateShowImage(stateShowImage + 1)
    }
    else{
      setStateShowImage(0)
    }
  }

  useEffect(() => {
    setPrivateType(stateShowImage === 0 ? undefined : stateShowImage === 1 ? 1 : 0)
  }, [stateShowImage])
  const onSelectAll = ()=>{
    setAllSelected(!isAllSelected);

  }
  return (
    <>
      <div className={classes.root}>
        <div className="row">
          <div className="search">
            <span  className = {'search-input'}>
              <button>
                <i className="fas fa-search"></i>
              </button>
              <input type="text" placeholder="Search" value={searchTxt} onChange={(e)=>setSearchTxt(e.target.value)}/>
            </span>
            <div className="btns">
              <button><img src="/assets/icons/refresh_icon.svg" alt="" onClick={() => setSearchStr(searchTxt)}/></button>
              <button onClick={onSelectAll} style = {{borderColor : isAllSelected ? '#F400F5' : '#F400F500'}}><img src="/assets/icons/select_icon.svg" alt="" /></button>
            </div>
          </div>

          <span className="select">
            <button onClick={() => setFilter('hot')} className={`${filter === 'hot' ? 'activeBtn filterBtn':'filterBtn'}`}>Hot</button>
          </span>
          <span className="select">
            <button onClick={() => setFilter('new')} className={`${filter === 'new' ? 'activeBtn filterBtn':'filterBtn'}`}>New</button>
          </span>
          <span className="select">
            <button onClick={() => setFilter('top')} className={`${filter === 'top' ? 'activeBtn filterBtn':'filterBtn'}`}>Top</button>
          </span>
          <span className="select">
            <button onClick={() => setFilter('nft')} className={`${filter === 'nft' ? 'activeBtn filterBtn':'filterBtn'}`}>NFT</button>
          </span>
          <div className="smalBtns">
            <button onClick={() => onShowImages()} className={`imgBtn`}>
              {stateShowImage === 0 ? 
                <img src="/assets/icons/show_all_icon.svg" alt="" />:
                stateShowImage === 1 ?
                <img src="/assets/icons/show_icon.svg" alt="" /> :
                <img src="/assets/icons/show_private_icon.svg" alt="" /> }
            </button>
            <button className={`likeBtn`} onClick={() => setEmoticonId(0)}>
              <img src="/assets/icons/image 185.png" alt="" />
            </button>
            <button className={`likeBtn`} onClick={() => setEmoticonId(1)}>
              <img src="/assets/icons/Grimacing Face.png" alt="" />
            </button>
            <button className={`likeBtn`} onClick={() => setEmoticonId(2)}>
              <img src="/assets/icons/Star-Struck.png" alt="" />
            </button>
            <button className={`likeBtn`} onClick={() => setEmoticonId(3)}>
              <img src="/assets/icons/Smiling Face with Heart-Eyes.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
