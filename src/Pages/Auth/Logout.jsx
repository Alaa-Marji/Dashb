import { LOGOUT, baseURL } from "../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import PropTypes from "prop-types";

export default function Logout({ handleLogout }) {
  // استخدام handleLogout كـ prop
  //Cookies
  const cookie = Cookie();

  async function handleLogoutClick() {
    try {
      const res = await axios.get(`${baseURL}/${LOGOUT}`, {
        headers: {
          Authorization: "Bearer" + cookie.get("e-commerce"),
        },
      });

      handleLogout();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button
      style={{
        background: "transparent",
        color: "primary",
        minHeight: 48,
      }}
      onClick={handleLogoutClick}
    >
      Logout
    </button>
  );
}

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
