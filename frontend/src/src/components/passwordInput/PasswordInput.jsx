import PropTypes from "prop-types";
import { useState } from "react";

const PasswordInput = ({ text, name, value, onInputChange, onBlur }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form_input">
      <label htmlFor={text}>{text}</label>
      <div className="input_text">
        <input
          id={text}
          type={showPassword ? "text" : "password"}
          name={name}
          autoComplete="off"
          value={value}
          onBlur={onBlur}
          onChange={onInputChange}
          required
        />
        <i
          onClick={() => setShowPassword(!showPassword)}
          className={`cursor fas fa-eye${showPassword ? "-slash" : ""}`}
        ></i>
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default PasswordInput;
