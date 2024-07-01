const TOKEN_KEY = "user_session_token";
const USER_KEY = "user_session_user";
const EXPIRES_KEY = "user_session_expiry";

// เก็บ token ลงใน sessionStorage
export const setToken = (token, user) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const expiry = decodedToken.exp * 1000;
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, user);
  sessionStorage.setItem(EXPIRES_KEY, expiry);
};

// ดึง token จาก sessionStorage
export const getToken = () => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const expiry = sessionStorage.getItem(EXPIRES_KEY);
  if ((!token || !expiry || new Date().getTime() > expiry)) {
    removeToken();
    return null;
  }
  return token;
};

export const getUser = () => {
  return sessionStorage.getItem(USER_KEY);
};

// ลบ token ออกจาก sessionStorage
export const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(EXPIRES_KEY);

};
