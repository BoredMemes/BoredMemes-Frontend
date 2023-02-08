import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useContext } from 'react';
import ThemeContext from 'theme/ThemeContext';

interface PropsType {
  show: boolean;
  onHide?: () => void;
  label?: any;
  border?: boolean;
  children: any;
  className?: string;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false;
  contentClass?:string
}
const Modal = (props: PropsType) => {
  const { theme } = useContext(ThemeContext)
  return (

    <Dialog
      open={props.show}
      onClose={props.onHide}
      maxWidth={props.maxWidth}
      aria-labelledby="responsive-dialog-title"
      className={theme}
      style = {{backdropFilter : 'blur(5px)'}}
    >
      <DialogContent className={props.contentClass}>{props.children}</DialogContent>
    </Dialog>
  );
};
export default Modal;
