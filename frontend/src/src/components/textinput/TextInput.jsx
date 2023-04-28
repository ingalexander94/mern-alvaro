import PropTypes from "prop-types";
import "./textinput.css";

const TextInput = ({text, icon, children}) => {
  return (
    <div className="form_input">
      <label htmlFor={text}>{text}</label>
      <div className="input_text">
        {children}
        <i className={`fas ${icon}`}></i>
      </div>
    </div>
  );
};

TextInput.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default TextInput;
