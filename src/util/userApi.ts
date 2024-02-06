import axios from "axios";
import { User } from "./AppTypes";
import { getLocalToken } from "./audentication";

interface LoginForm {
  email: string;
  password: string;
}

export const login = async ({ inputForm }: { inputForm: LoginForm }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/login`,
      inputForm
    );
    return {
      msg: response.data.msg,
      user: response.data.user,
      token: response.data.token,
    };
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.msg);
    }
  }
};

export const signup = async ({ inputForm }: { inputForm: LoginForm }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/signup`,
      inputForm
    );
    return {
      msg: response.data.msg,
      user: response.data.user,
      token: response.data.token,
    };
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.msg);
    }
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/logout`,
      {},
      { withCredentials: true }
    );
    if (response.status === 200) {
      return response.data.msg;
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

export const updateUserName = async ({ name }: { name: string }) => {
  try {
    await axios.patch(
      `${import.meta.env.VITE_APP_API}/update-user-name`,
      { name },
      { headers: { Authorization: `Bearer ${getLocalToken()}` } }
    );
    return name;
  } catch (err: any) {
    console.log(err.response.data.msg);
  }
};

export const updatePlan = async ({ plan }: { plan: string }) => {
  try {
    await axios.patch(
      `${import.meta.env.VITE_APP_API}/update-plan`,
      { plan },
      { headers: { Authorization: `Bearer ${getLocalToken()}` } }
    );
    return plan;
  } catch (err: any) {
    console.log(err.response.data.msg);
  }
};

export const checkUserIsLogin = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/check-is-login`,
      { withCredentials: true }
    );
    localStorage.setItem("isLoggedIn", response.data.isLoggedIn);
    return response.data.isLoggedIn;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/get-user`,
      { headers: { Authorization: `Bearer ${getLocalToken()}` } }
    );
    return response.data.user as User;
  } catch (err) {
    return null;
  }
};

export const updatePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/update-password`,
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${getLocalToken()}` } }
    );
    if (response.status !== 200) return;
    return response.data.msg;
  } catch (err: any) {
    if (err.response.status === 400) {
      throw new Error(err.response.data.msg);
    }
  }
};
