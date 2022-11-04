import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  alertText: {
    color: theme.palette.error.main,
  },
  title: {
    letterSpacing: 0.2,
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Josefin Sans', sans-serif",
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '7px 20px',
    marginTop : 5,
    borderRadius : 15,
  },
}));


const ErrorAlert = ({ title, description, show, alertType }) => {
  const classes = useStyles();

  return (
    show && (
      <span className={classes.root} style = {{backgroundColor : alertType==='success' ? '#17D76022': alertType==='warning' ? '#FF4D0022':'#F5007B22' }}>
        <p className={clsx(classes.alertText, classes.title)} style = {{color : alertType==='success' ? '#17D760': alertType==='warning' ? '#FF4D00':'#F5007B' }}>{title}</p>
        <p className={classes.alertText}>{description}</p>
      </span>
    )
  );
};

ErrorAlert.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  avatar: PropTypes.node,
  alertType: PropTypes.string,
};

ErrorAlert.defaultProps = {
  avatar: '',
};

export default ErrorAlert;
