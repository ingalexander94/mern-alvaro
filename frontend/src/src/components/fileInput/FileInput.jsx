import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatar, removeAvatar } from "store/auth";
import "./fileInput.css";

export const FileInput = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, darkMode } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [file, setFile] = useState(user.avatar ? `https://s3bengali.s3.amazonaws.com/prototype_mern/files/${user.avatar}` : null);
  const inputFile = useRef(null);
  const inputCheckbox = useRef(null);

  const handleSelectFile = (e) => {
    inputCheckbox.current.checked = false;
    const uploaded = e.target.files[0];
    dispatch(uploadAvatar(uploaded, setFile));
  };

  const handleRemoveFile = (e) => {
    inputCheckbox.current.checked = false;
    dispatch(removeAvatar(setFile));
  };

  return (
    <section className="upload_avatar">
      <label>
        {file ? (
          <img src={file} alt="avatar user" />
        ) : (
          <div>{user.initials}</div>
        )}
      </label>
      <label className={`checkbox ${darkMode ? "light_theme" : "dark_theme"}`} htmlFor="check">
        {isLoading ? (
          <i className="fas fa-spinner fa-spin fa-fw"></i>
        ) : (
          <i className="fas fa-camera fa-fw"></i>
        )}
      </label>
      <input ref={inputCheckbox} type="checkbox" name="check" id="check" />
      <div className={`menu_options ${darkMode ? "light_theme" : "dark_theme"}`}>
        <ul>
          <li>
            <label htmlFor="avatar">
              {!user.avatar && !file ? "Upload" : "Change"}
            </label>
            <input
              type="file"
              ref={inputFile}
              name="avatar"
              id="avatar"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleSelectFile}
            />
          </li>
          <li onClick={handleRemoveFile}>Remove</li>
        </ul>
      </div>
    </section>
  );
};
