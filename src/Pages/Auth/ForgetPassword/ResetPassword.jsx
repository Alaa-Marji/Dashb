import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { RESETPASSWORD, baseURL } from "../../../Api/Api";

function ResetPassword({ onSubmit, code }) {
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password === password_confirmation) {
      try {
        const response = await axios.post(`${baseURL}/${RESETPASSWORD}`, {
          code,
          password,
          password_confirmation,
        });
        if (response.status === 200) {
          onSubmit(password, password_confirmation); // Move to the next step
        } else {
          // Handle other status codes if necessary
        }
      } catch (error) {
        console.log(error);
        // Handle error
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "250px" }}>
      <h2 style={{ marginBottom: "2px" }}>Enter Password</h2>
      <p style={{ marginBottom: "2px" }}>
        Please enter your password and confirm it below:
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "6px" }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "5px" }}
        />
        <button
          type="submit"
          style={{ marginRight: "10px", marginBottom: "6px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

ResetPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
};

export default ResetPassword;
