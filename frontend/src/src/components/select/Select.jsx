import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TextInput from "components/textinput/TextInput";
import "./select.css";

const Select = ({ value, onInputChange, onBlur }) => {
  const { roles } = useSelector((state) => state.auth);

  return (
    <TextInput text="role" icon="fa-user-tag">
      <select
        name="role"
        id="role"
        className="select_role"
        onChange={onInputChange}
        defaultValue={value}
        onBlur={onBlur}
        required
      >
        <option value="" disabled>No selection</option>
        {roles.map((role, i) => (
          <option key={i} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    </TextInput>
  );
};

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default Select;
