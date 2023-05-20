export const TOKEN_KEY = "auth.token";
import jwt_decode from 'jwt-decode';

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return false;
  }
  // Verifique se o token é válido ou não expirou
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

export const getToken = () => { 
  return localStorage.getItem(TOKEN_KEY);
}
export const getTokenn= () => { 
  localStorage.getItem(TOKEN_KEY);
}