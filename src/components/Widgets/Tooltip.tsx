import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  alertText: {
    color: theme.palette.error.main,
  },
  text: {
    letterSpacing: 0.2,
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Josefin Sans', sans-serif",
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    position : 'relative',
    marginLeft : 7,
    cursor : 'pointer',

    '&:hover': {
      '& .tooltip-div': {
        display: 'flex',
      }
    },
    '& .tooltip-div': {
      position : 'absolute',
      backgroundColor : '#d9dae2',
      display: 'none',
      flexDirection : 'column',
      padding : 5,
      borderRadius : 7,
      zIndex : 1,
      top : 'calc(100% + 5px)',
      '& p': {
        display: 'inline !important',
        whiteSpace: 'nowrap',
        color : '#fff',
        fontSize : '14px !important',
      },
    },
  },
  
}));


const Tooltip = ({ text }) => {
  const classes = useStyles();

  return (
      <div className={classes.root} >
        <span><i className="fas fa-exclamation-circle"></i></span>
        <div className={'tooltip-div'}>
          {text}
        </div>
      </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.node,
};

Tooltip.defaultProps = {
  avatar: '',
};

export default Tooltip;
