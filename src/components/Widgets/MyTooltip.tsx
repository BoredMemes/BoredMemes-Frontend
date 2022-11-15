import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, styled } from '@material-ui/core/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  alertText: {
    color: theme.palette.error.main,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    position : 'relative',
    marginLeft : 7,
    cursor : 'pointer',
    border : 'none',
    backgroundColor : '#ffffff00',
    padding : 0,
    color : '#727272',
  },
  
}));
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#d9dae2',
      color: '#fff',
      maxWidth: 250,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #ccc',
      margin : '0px 5px',
      '& p': {
        color : '#fff',
      },
      
    },
  }));

const MyTooltip = ({ text }) => {
  const classes = useStyles();
  const [showTooltip, setShowTooltip] = useState(false)
  return (

    <HtmlTooltip
      open = {showTooltip}
      onOpen={() => setShowTooltip(true)}
      onClose={() => setShowTooltip(false)}
      title={
        <>
          <p>{text}</p>
        </>
      }
    >
      <button className={classes.root} onClick={() => setShowTooltip(!showTooltip)}><i className="fas fa-exclamation-circle"></i></button>
    </HtmlTooltip>
  );
};

MyTooltip.propTypes = {
  text: PropTypes.node,
};

MyTooltip.defaultProps = {
  avatar: '',
};

export default MyTooltip;
