import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from 'store/ui';
import './switch.css';

export const Switch = () => {

    const {darkMode} = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const handleToggleMode = ({target}) => {
        localStorage.clear();
        localStorage.setItem("isDark", target.checked);
        dispatch(toggleDarkMode());
    }

  return (
    <div className="switch-container" title='Dark mode'>
      <input type="checkbox" id="switch" checked={darkMode} onChange={handleToggleMode} />
      <div className="switch-color"></div>
      <label htmlFor="switch"></label>
    </div>
  );
};
