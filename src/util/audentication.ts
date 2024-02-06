import { User } from "./AppTypes";

export const getLocalUser = () => {
  const user = localStorage.getItem("user") as string;
  if (!user) return null;
  try {
    const userData = JSON.parse(user);
    return userData as User;
  } catch (err) {
    return null;
  }
};

export const getLocalToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    let tokenData = JSON.parse(token);
    return tokenData;
  } catch (err) {
    return null;
  }
};

export const saveLocalToken = (token: string) => {
  if (!token) return null;
  localStorage.setItem("token", JSON.stringify(token));
};

export const removeLocalToken = () => {
  localStorage.removeItem("token");
};

export const saveLocalUser = (user: User) => {
  if (!user) {
    return null;
  }
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeLocalUser = () => {
  localStorage.removeItem("user");
};
