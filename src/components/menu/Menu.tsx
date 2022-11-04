import './menu.scss';
// import { HashLink } from 'react-router-hash-link';
// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useWeb3React } from '@web3-react/core';
// import { getAllowedMint } from 'utils/contracts';
type MenuType = {
  menuOpen: boolean;
  setMenuOpen(flag: boolean): void;
  children?: any;
};

export default function Menu({ menuOpen, setMenuOpen, children }: MenuType) {
  // const [navId, setNavId] = useState('');
  // const search = useLocation();
  // useEffect(() => {
  //   const path = search.pathname.replace('/', '');
  //   if (path === 'terms-and-condition') {
  //     setNavId(path);
  //   } else {
  //     const label = search.hash.replace('#', '');
  //     setNavId(label);
  //   }
  // }, [setNavId, search]);

  // const { connector, library, chainId, account, active } = useWeb3React();
  // const [allowedMint, setAllowedMint] = useState(false);
  // useEffect(() => {
  //   const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
  //   if (isLoggedin) {
  //     getAllowedMint(chainId, library, account).then((bAllowed: boolean) => {
  //       setAllowedMint(bAllowed);
  //     });
  //   }
  // }, [connector, library, account, active, chainId]);

  return (
    <div className={'menubar ' + (menuOpen && 'active')}>
      <div className="menuContent">{children}</div>
      {/* <ul>
        <li
          onClick={() => setMenuOpen(false)}
          className={`menuItem1 ${menuOpen ? 'active' : ''} ${navId === 'dashboard' ? 'selected' : ''}`}
        >
          <HashLink to="/home" smooth>
            Home
          </HashLink>
        </li>
        <li
          onClick={() => setMenuOpen(false)}
          className={`menuItem2 ${menuOpen ? 'active' : ''} ${navId === 'contribute' ? 'selected' : ''}`}
        >
          <HashLink to="/contribute" smooth>
            Contribute
          </HashLink>
        </li>

        <li
          onClick={() => setMenuOpen(false)}
          className={`menuItem3 ${menuOpen ? 'active' : ''} ${navId === 'invests' ? 'selected' : ''}`}
        >
          <HashLink to="/invests" smooth>
            Invests
          </HashLink>
        </li>
        <li
          onClick={() => setMenuOpen(false)}
          className={`menuItem3 ${menuOpen ? 'active' : ''} ${navId === 'marketplace' ? 'selected' : ''}`}
        >
          <HashLink to="/marketplace" smooth>
            Marketplace
          </HashLink>
        </li>

        <li
          onClick={() => setMenuOpen(false)}
          className={`menuItem3 ${menuOpen ? 'active' : ''} ${navId === 'voting' ? 'selected' : ''}`}
        >
          <HashLink to="/voting" smooth>
            Voting
          </HashLink>
        </li>
        <li onClick={() => setMenuOpen(false)} className={`menuItem4 ${menuOpen ? 'active' : ''} `}>
          <a href="/assets/deck.pdf" target={'_blank'}>
            Deck
          </a>
        </li>

        {allowedMint && (
          <li
            onClick={() => setMenuOpen(false)}
            className={`menuItem4 ${menuOpen ? 'active' : ''} ${navId === 'create' ? 'selected' : ''}`}
          >
            <HashLink to="/create" smooth>
              Create
            </HashLink>
          </li>
        )}
      </ul> */}
    </div>
  );
}
