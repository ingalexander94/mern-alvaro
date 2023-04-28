import AuthService from "services/auth.service";
import { finishLoading, startLoading } from "store/ui";
import {
  finishCheking,
  login,
  logout,
  loadRoles,
  updateAvatar,
} from "store/auth";
import { showToast } from "utils/alerts";

const service = new AuthService();

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(logout());
    service.logout();
    dispatch(finishLoading());
  };
};

export const registerUser = (data, navigateLogin) => {
  return async (dispatch) => {
    dispatch(startLoading());
    await service.registerUser(data, navigateLogin);
    dispatch(finishLoading());
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const user = await service.loginUser(data);
    if (user) dispatch(login(user));
    dispatch(finishLoading());
  };
};

export const forgotPasswordUser = (data) => {
  return async (dispatch) => {
    dispatch(startLoading());
    await service.forgotPassword(data);
    dispatch(finishLoading());
  };
};

export const recoveryPasswordUser = (data, token, navigateLogin) => {
  return async (dispatch) => {
    dispatch(startLoading());
    await service.recoveryPassword(data, token, navigateLogin);
    dispatch(finishLoading());
  };
};

export const isAuthenticated = () => {
  return async (dispatch) => {
    const user = await service.isAuthenticated();
    if (user) dispatch(login(user));
    const roles = await service.getRoles();
    dispatch(loadRoles(roles));
    dispatch(finishCheking());
  };
};

export const uploadAvatar = (file, setFile) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const avatar = await service.updateAvatar(file);
    if (avatar) {
      dispatch(updateAvatar(avatar));
      setFile(URL.createObjectURL(file));
      showToast("success", "File Uploaded");
    }
    dispatch(finishLoading());
  };
};

export const removeAvatar = (setFile) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const res = await service.deleteAvatar();
    if (res) {
      dispatch(updateAvatar(null));
      setFile(null);
      showToast("success", "File Removed");
    }
    dispatch(finishLoading());
  };
};
