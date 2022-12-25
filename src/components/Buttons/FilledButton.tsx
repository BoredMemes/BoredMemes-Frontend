import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    // fontWeight: 600,
    borderRadius: 15,
    height: 45,
    border: '1px solid #FFFFFF',
    boxShadow: '-1.96149px 2.94223px 6.86521px rgba(0, 0, 0, 0.25)',
    lineHeight : 1,
  },
  icon: {
    marginLeft: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      fontSize: 17,
    },
    '& img': {
      width: 25,
      height: 25,
    },
  },
  primary: {
    background: '#F400F5',
    color: '#fff',
    '&:hover': {
      background: '#F400F599',
    },
  },
  secondary: {
    background: '#7E9EF9',
    color: '#fff',
    '&:hover': {
      background: '#7E9EF999',
    },
  },
  success: {
    background: '#87BE9C',
    color: '#fff',
    '&:hover': {
      background: '#87BE9C99',
    },
  },
  error: {
    background: '#F400F5',
    color: '#fff',
    '&:hover': {
      background: '#F400F599',
    },
  },
  grey: {
    background: '#E3E3E3',
    color: '#727272',
    fontWeight: 400,
    '&:hover': {
      background: '#E3E3E399',
    },
  },
  smart: {
    background: '#fdccfd',
    color: '#F400F5',
    fontWeight: 400,
    
    '&:hover': {
      background: '#fdccfd99',
    },
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  iconEnd: {
    marginLeft: theme.spacing(1),
  },
  iconStart: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
}));

const FilledButton = ({ className, label, icon, size, iconPosition, handleClick, color, disabled }) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, className, classes[color], disabled ? classes.disabled : '')}
      variant="contained"
      size={size}
      onClick={handleClick}
      type="submit"
    >
      {iconPosition === 'start' && Boolean(icon) && (
        <span className={clsx(classes.icon, classes.iconStart)}>{icon}</span>
      )}
      {label}
      {iconPosition === 'end' && Boolean(icon) && <span className={clsx(classes.icon, classes.iconEnd)}>{icon}</span>}
    </Button>
  );
};

FilledButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.any.isRequired,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  iconPosition: PropTypes.oneOf(['start', 'end']),
  handleClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'grey', 'smart']),
  disabled: PropTypes.bool,
};

FilledButton.defaultProps = {
  className: '',
  icon: '',
  size: 'medium',
  handleClick: () => {},
  color: 'primary',
  disabled: false,
};

export default FilledButton;
