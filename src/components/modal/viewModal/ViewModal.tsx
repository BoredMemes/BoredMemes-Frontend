import './viewModal.scss';
import Bounce from 'react-reveal/Bounce';
import { useEffect, useState } from 'react';

interface Props {
  showModal: boolean;
  setShowModal?: any;
  product?: any;
}

const ViewModal: React.FC<Props> = ({ showModal, setShowModal, product }) => {
  const [isStart, setIsStart] = useState(false);
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setIsStart(true);
      }, 100);
    }
  }, [setIsStart, showModal]);
  const onClose = () => {
    setIsStart(false);
    setTimeout(() => {
      setShowModal(false);
    }, 800);
  };

  const [bookmarked, setBookmarked] = useState(false);
  const [emoticon, setEmoticon] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoaded=()=> {
    setIsLoaded(true)
  }

  return (
    <div className={showModal === true ? 'viewModal active' : 'viewModal'}>
      <Bounce opposite when={isStart}>
        <div className="modelContent">
          <button className="connectModalCloseButton" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          <div className="connectWalletWrapper">
          <div className="top">
              <img src={product?.img || '/assets/imgs/img_01.png'} alt=""  onLoad={handleImageLoaded} />
            </div>
            
            <div className="footer" style={{opacity : isLoaded ? 1 : 0}}>
              <div className="left">
                <img src="/assets/avatars/avatar_01.png" alt="" />
                <p>User name</p>
                <button>Follow</button>
              </div>
              <div className="right">
                <div className="smallBtn">
                  <img src="/assets/icons/download_icon.svg" alt="" />
                </div>
                <div className="smallBtn dropdown ml-3">
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

            <div className="row" style={{opacity : isLoaded ? 1 : 0}}>
              <p>Pirate. Highly detailed head and shoulders photograph of Domhnall Gleeson as a pirate, wearing a pirate uniform, long hair, desaturated, area light, high contrast, foggy volumetric lighting, directed by James Cameron, photorealism, 8k matte, unreal engine, octane render</p>
            </div>

            <div className="row" style={{opacity : isLoaded ? 1 : 0}}>
              <span>August, 15th 2022</span>
              <span>1500 x 1128</span>
            </div>
          </div>
        </div>
      </Bounce>
    </div>
  );
};
export default ViewModal;
