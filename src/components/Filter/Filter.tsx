import { makeStyles } from '@material-ui/core/styles';

interface PropsType {
  filter?: string;
  setFilter?: any;
  searchStr?: string;
  setSearchStr?: any;
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
      '@media screen and (max-width: 768px) and (orientation: portrait)': {
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
          background: '#F400F577',
        },
        '& img': {
          marginLeft: 10,
          '@media screen and (max-width: 768px) and (orientation: portrait)': {
            marginRight: 10,
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

const Filter = ({ filter, setFilter, searchStr, setSearchStr }: PropsType) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className="row">
          <div className="search">
            <span  className = {'search-input'}>
              <button>
                <i className="fas fa-search"></i>
              </button>
              <input type="text" placeholder="Search" onChange={(e)=>setSearchStr(e.target.value)}/>
            </span>
          </div>

          <span className="select">
            <button onClick={() => setFilter('hot')} className={`${filter === 'hot' ? 'activeBtn filterBtn':'filterBtn'}`}>Hot</button>
          </span>
          <span className="select">
            <button onClick={() => setFilter('new')} className={`${filter === 'new' ? 'activeBtn filterBtn':'filterBtn'}`}>New</button>
          </span>
          <span className="select">
            <button onClick={() => setFilter('oldest')} className={`${filter === 'oldest' ? 'activeBtn filterBtn':'filterBtn'}`}>Oldest</button>
          </span>
          <span className="select">
            <button onClick={() => setFilter('top')} className={`${filter === 'top' ? 'activeBtn filterBtn':'filterBtn'}`}>Top</button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Filter;
