import { makeStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-css';

interface PropsType {
  collections?: any[];
  onEditCollection ?: any
}


const useStyles = makeStyles(theme => ({
  root: {
    display : 'flex',
    position: 'relative',
    padding : 10,
    [theme.breakpoints.down('xs')]: {
    },
  },
  collectionCard: {
    maxWidth: 454,
    cursor: 'pointer',
    background: '#F400F5',
    borderRadius: 15,
    display : 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height : 80,
    position: 'relative',
    transition : 'all 0.3s ease',
    [theme.breakpoints.down('xs')]: {
        width : '100%',
        height : 60,
    },
    '& p': {
      fontSize : 16,
      color : '#fff',
      [theme.breakpoints.down('xs')]: {
        fontSize : 12,
      },
    },
    
    '&:hover': {
      background: '#F400F5aa',
    },
  },
  newCollectionCard: {
    maxWidth: 454,
    cursor: 'pointer',
    background: '#ffffff00',
    borderRadius: 15,
    display : 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height : 80,
    position: 'relative',
    transition : 'all 0.3s ease',
    border: '1px dashed #262626',
    [theme.breakpoints.down('xs')]: {
      width : '100%',
      height : 60,
    },
    '& img': {
      marginRight : 10,
      [theme.breakpoints.down('xs')]: {
        width : 20,
      },
    },
    '& p': {
      fontSize : 16,
      color : '#262626',
      [theme.breakpoints.down('xs')]: {
        fontSize : 12,
      },
    },
  },
  masonry: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  gridColumn: {
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('sm')]: {
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
}));


const CollectionLIst = ({ collections, onEditCollection }: PropsType) => {
  const classes = useStyles();
  const breakpointColumnsObj = {
    // default: 4,
    3840: 9,
    3000: 8,
    2560: 7,
    2200: 6,
    1840: 5,
    1440: 4,
    1280: 3,
    768: 2,
    450: 2,
  };

  return (
    <div className={`${classes.root} collectionList`}>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={classes.masonry}
            columnClassName={classes.gridColumn}
          >
            {collections.map((collection, key) => (
              <div className={`${classes.collectionCard} collectionCard`} key = {key} onClick = {()=>onEditCollection(collection)}>
                <p>{collection?.title}</p>
              </div>
            ))}
            <div className={`${classes.newCollectionCard} newCollectionCard`}>
              <img src="/assets/icons/add_icon.svg" alt="" />
              <p>New Collection</p>
            </div>
          </Masonry>
          
        
    </div>
  );
};

export default CollectionLIst;
