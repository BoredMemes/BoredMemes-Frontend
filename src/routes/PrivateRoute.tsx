import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ path, component: C, layout: L, user, props: cProps }) => {
  return (
    <Route
      {...path}
      render={props => (
        <L>
          <C {...props} {...cProps} />
        </L>
      )}
    />
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  user: PropTypes.object,
  props: PropTypes.object,
};

PrivateRoute.defaultProps = {
  path: '',
  user: null,
  props: {},
};

export default PrivateRoute;
