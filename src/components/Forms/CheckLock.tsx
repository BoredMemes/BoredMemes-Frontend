import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiFormControlLabel-label': {
      color: theme.palette.text.primary,
    },
  },
  icon: {
    borderRadius: 4,
    width: 26,
    height: 26,
    backgroundColor: 'transparent',
    border: `2px solid #555`,
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
  },
  checkedIcon: {
    // backgroundColor: '#fff',
    border: `2px solid #555`,
    position : 'relative',
    '&:before': {
      display: 'block',
      width: 28,
      height: 20,
      backgroundImage: "url('/assets/icons/check_icon_01.svg')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      backgroundPosition: '2px 0px',
      content: '""',
      // position : '',
    },
  },
}));

const CheckLock = ({
  wrapperClassName,
  className,
  value,
  onChange,
  label,
}) => {
  const classes = useStyles();
  const handleChangeCheck = (event) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      className={clsx(classes.root, wrapperClassName)}
      control={(
        <Checkbox
          className={clsx(classes.root, className)}
          disableRipple
          color="default"
          checkedIcon={(
            <span className={clsx(classes.icon, classes.checkedIcon)} />
          )}
          icon={<span className={classes.icon} />}
          value={value}
          onChange={handleChangeCheck}
        />
      )}
      label={label}
    />
  );
};

CheckLock.propTypes = {
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

CheckLock.defaultProps = {
  wrapperClassName: '',
  className: '',
  value: false,
  onChange: () => {},
  label: '',
};

export default CheckLock;
