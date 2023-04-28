import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/auth/login" /> ;
};

PrivateRouter.propTypes = {
  isAuth: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default PrivateRouter;