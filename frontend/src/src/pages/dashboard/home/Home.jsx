import { FileInput } from 'components/fileInput/FileInput';
import { Switch } from 'components/switch/Switch';
import { useSelector } from 'react-redux';
import './home.css';

export const Home = () => {

  const {user} = useSelector(state => state.auth);
  const {darkMode} = useSelector(state => state.ui);

  return (
    <div className={`home ${darkMode ? 'dark_theme' : 'light_theme'}`}>
      <FileInput/>
      <h2>{user.role}</h2>
      <Switch/>
      <p>Hola <strong>{user.fullname}</strong></p>
      <p>{user.email}</p>
    </div>
  )
}
