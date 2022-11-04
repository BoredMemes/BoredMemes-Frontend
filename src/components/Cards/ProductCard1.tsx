import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

interface PropsType {
  product?: any;
  onShow?: any;
}

const useStyles = makeStyles(theme => ({
  productWrapper: {
    maxWidth: 454,
    cursor: 'pointer',
    background: '#F0F2F5',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 30,
    position : 'relative',
    '@media screen and (max-width: 768px) and (orientation: portrait)': {
      maxWidth: '90vw',
    },
    '& .top': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      '& img': {
        width: '100%',
        minHeight : '13vw',
        objectFit : 'cover',
      },
    },

    '& .footer': {
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      '@media screen and (max-width: 768px) and (orientation: portrait)': {
        width: '100% !important',
      },
      '& .left': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      '& .right': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      '& .smallBtn': {
        width: 25,
        height: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 5,
        transition : 'all 0.3s ease',
        '&:hover': {
          background: '#D9D9D9',
        },
      },
      '& .dropdown': {
        position : 'relative',
        '&:hover': {
          '& .drodownMenu': {
            display: 'flex',
          },
          '& .drodownMenu1': {
            display: 'flex',
          }
        },
        '& .drodownMenu': {
          display: 'none',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          position : 'absolute',
          backgroundColor : '#fff',
          top : '-76px',
          padding : 7,
          borderRadius : 5,
          transition : 'all 0.3s ease',
          '& .menuItem': {
            display: 'flex',
            alignItems: 'center',
            fontSize : 14,
            width : 155,
            padding : 5,
            transition : 'all 0.3s ease',
            borderRadius : 5,
            color : '#727272',
            '&:hover': {
              background: '#D9D9D9',
            },
            '& img':{
              marginRight : 7,
              
            }
          },
        },
        '& .drodownMenu1': {
          display: 'none',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          position : 'absolute',
          backgroundColor : '#fff',
          top : '-3px',
          left : '-111px',
          padding : 3,
          borderRadius : 5,
          transition : 'all 0.3s ease',
          '& .menuItem': {
            display: 'flex',
            alignItems: 'center',
            width : 20,
            height : 20,
            transition : 'all 0.3s ease',
            borderRadius : 5,
            color : '#727272',
            margin : 3,
            '&:hover': {
              background: '#D9D9D9',
            },
            '& img':{
              marginRight : 7,
              
            }
          },
        },
      },
      '& .ml-3': {
        marginLeft: 7,
      },
    },
    '& .footer1': {
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width : '100%',
      position : 'absolute',
      bottom : 0,
      left : 0,
      '@media screen and (max-width: 768px) and (orientation: portrait)': {
        width: '100% !important',
      },
      '& .left': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      '& .right': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      '& .smallBtn': {
        width: 25,
        height: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 5,
        transition : 'all 0.3s ease',
        '&:hover': {
          background: '#D9D9D9',
        },
      },
      '& .ml-3': {
        marginLeft: 7,
      },
    },
  },
}));


const PropertyCard1 = ({ product, onShow }: PropsType) => {
  const classes = useStyles();
  const [bookmarked, setBookmarked] = useState(false);
  const [emoticon, setEmoticon] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleImageLoaded=()=> {
    setIsLoaded(true)
  }
  useEffect(() => {
    // console.log(product?.id)
  }, [product]);
  return (
    <div className={`${classes.productWrapper} card1`}>
      <div className="top" onClick={onShow}>
        <img src={product?.img || '/assets/imgs/img_01.png'} alt=""  onLoad={handleImageLoaded} />
      </div>
      
      <div className="footer" style={{opacity : isLoaded ? 1 : 0}}>
        <div className="left">
          <div className="smallBtn">
            <img src="/assets/icons/download_icon.svg" alt="" />
          </div>
        </div>
        <div className="right">
          <div className="smallBtn dropdown">
            <img src="/assets/icons/more_icon.svg" alt="" />
            <div className="drodownMenu">
              <div className="menuItem">
                <img src="/assets/icons/images_icon.svg" alt="" /> Copy description
              </div>
              <div className="menuItem">
                <img src="/assets/icons/download_icon.svg" alt="" /> Save image
              </div>
            </div>
          </div>

          {(product?.commentType === 0 || emoticon === 0) &&
          <div className="smallBtn ml-3">
             <img src="/assets/icons/image 185.png" alt="" />
          </div>}
          {(product?.commentType === 1 || emoticon === 1) &&
          <div className="smallBtn ml-3">
            <img src="/assets/icons/Grimacing Face.png" alt="" />
          </div>}
          {(product?.commentType === 2 || emoticon === 2) &&
          <div className="smallBtn ml-3">
            <img src="/assets/icons/Star-Struck.png" alt="" />
          </div>}
          {(product?.commentType === 3 || emoticon === 3) &&
          <div className="smallBtn ml-3">
           <img src="/assets/icons/Smiling Face with Heart-Eyes.png" alt="" />
          </div>}
          
          <div className="smallBtn ml-3" onClick={()=>setBookmarked(!bookmarked)}>
          {(product?.isBookmark || bookmarked) ?
            <img src="/assets/icons/bookmark_full_icon.svg" alt="" />:
            <img src="/assets/icons/bookmark_line_icon.svg" alt="" />}
          </div>
         
          <div className="smallBtn ml-3 dropdown">
            <img src="/assets/icons/face_icon.svg" alt="" />
            <div className="drodownMenu1">
              <div className="menuItem" onClick={()=>setEmoticon(0)}>
                <img src="/assets/icons/image 185.png" alt="" />
              </div>
              <div className="menuItem" onClick={()=>setEmoticon(1)}>
                <img src="/assets/icons/Grimacing Face.png" alt="" />
              </div>
              <div className="menuItem" onClick={()=>setEmoticon(2)}>
                <img src="/assets/icons/Star-Struck.png" alt="" />
              </div>
              <div className="menuItem" onClick={()=>setEmoticon(3)}>
                <img src="/assets/icons/Smiling Face with Heart-Eyes.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isLoaded && <div className="footer1" style={{opacity : isLoaded ? 0 : 1, zIndex : isLoaded ? -1 : 1}}>
        <div className="left">
          <div className="smallBtn">
            <img src="/assets/icons/download_icon.svg" alt="" />
          </div>
        </div>
        <div className="right">
          <div className="smallBtn">
            <img src="/assets/icons/more_icon.svg" alt="" />
          </div>
          <div className="smallBtn ml-3">
            <img src="/assets/icons/bookmark_line_icon.svg" alt="" />
          </div>
         
          <div className="smallBtn ml-3">
            <img src="/assets/icons/face_icon.svg" alt="" />
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default PropertyCard1;
