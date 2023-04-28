import * as alerts from "utils/alerts";
import { sendmultipartRequest, sendRequest } from "utils/axios";
import codes from "resources/codes.json";
import Cookies from "universal-cookie";

const { REACT_APP_DOMAIN } = process.env;

export default class AuthService {
  async registerUser(data, navigateLogin) {
    try {
      await sendRequest("auth/register", data, "POST");
      navigateLogin();
    } catch (error) {
      const { code } = error.response.data;
      alerts.showToast("error", codes[code]);
    }
  }

  async loginUser(data) {
    try {
      const res = await sendRequest("auth/login", data, "POST");
      const { token, ...user } = res.data;
      const cookie = new Cookies();
      cookie.set("x-access-token", token, {
        domain: REACT_APP_DOMAIN,
        path: "/",
        sameSite: "strict",
      });
      return user;
    } catch (error) {
      const { code } = error.response.data;
      alerts.showToast("error", codes[code]);
      return null;
    }
  }

  async forgotPassword(data) {
    try {
      await sendRequest("auth/forgot", data, "POST");
      alerts.showToast("success", "Check your email to recover the password");
    } catch (error) {
      const { code } = error.response.data;
      alerts.showToast("error", codes[code]);
    }
  }

  async recoveryPassword(data, token, navigateLogin) {
    const cookie = new Cookies();
    try {
      cookie.set("x-access-token", token, {
        domain: REACT_APP_DOMAIN,
        path: "/",
        sameSite: "strict",
      });
      await sendRequest("auth/recovery", data, "PUT", true);
      cookie.remove("x-access-token");
      navigateLogin();
    } catch (error) {
      const { code } = error.response.data;
      alerts.showToast("error", codes[code]);
      cookie.remove("x-access-token");
    }
  }

  async isAuthenticated() {
    try {
      const res = await sendRequest("auth/renew", null, "GET", true);
      const { token, ...user } = res.data;
      const cookie = new Cookies();
      cookie.set("x-access-token", token, {
        domain: REACT_APP_DOMAIN,
        path: "/",
        sameSite: "strict",
      });
      return user;
    } catch (error) {
      if (error.response.status === 401) {
        const { code } = error.response.data;
        alerts.showToast("error", codes[code]);
      }
      return null;
    }
  }

  async getRoles() {
    try {
      const res = await sendRequest("roles", null, "GET");
      return res.status === 200 ? res.data : [];
    } catch (error) {
      const { code } = error.response.data;
      alerts.showToast("error", codes[code]);
    }
  }

  async updateAvatar(file) {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await sendmultipartRequest("uploads/avatar", formData);
      return res.data.avatar;
    } catch (error) {
      const code = error.response.data;
      alerts.showToast("error", codes[code]);
      return null;
    }
  }

  async deleteAvatar() {
    try {
      const res = await sendRequest("uploads/avatar", {}, "DELETE", true);
      return res.status === 200;
    } catch (error) {
      const { code } = error.response.data;
      alerts.showToast("error", codes[code]);
    }
  }

  logout() {
    const cookie = new Cookies();
    cookie.remove("x-access-token", {
      path: "/",
      domain: REACT_APP_DOMAIN,
      sameSite: "strict",
    });
  }
}
