import PropTypes from "prop-types";
import "./texterror.css";

const TextError = ({ formik, value }) => {
  const { touched, errors } = formik;
  return <>{touched[value] && errors[value] && <span className="text_error">* {errors[value]}</span>}</>;
};

TextError.propTypes = {
  formik: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextError;