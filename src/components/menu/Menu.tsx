import './menu.scss';

type MenuType = {
  menuOpen: boolean;
  setMenuOpen(flag: boolean): void;
  children?: any;
};

export default function Menu({ menuOpen, setMenuOpen, children }: MenuType) {

  return (
    <div className={'menubar ' + (menuOpen && 'active')}>
      <div className="menuContent">{children}</div>
    </div>
  );
}
