// Local storage Keys
const IS_LOGIN = "IsLoggedIn";
const TOKEN = "token";



/**
 * Get current islogged in value from localstorage
 * @returns boolean
 */
export const getIsLoggedIn = () => JSON.parse(window.localStorage.getItem(IS_LOGIN));
/**
 * Save islogged in value to localstorage
 * @param {boolean} value
 * @returns void
 */
export const setIsLoggedIn = (value) => window.localStorage.setItem(IS_LOGIN, JSON.stringify(value));

export const setToken = (token) => window.localStorage.setItem(TOKEN, token);
export const getToken = (token) => window.localStorage.getItem(TOKEN)
