import Cookies from "js-cookie";

export function getAccessToken() {
  return localStorage.getItem("accessToken") || Cookies.get("accessToken");
}
