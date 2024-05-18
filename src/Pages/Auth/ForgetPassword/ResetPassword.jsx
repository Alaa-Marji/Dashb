import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { RESETPASSWORD, baseURL } from "../../../Api/Api";
import "../css/components/form.css";

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
          onSubmit(password, password_confirmation);
        } else {
          //
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <form className="reset" onSubmit={handleSubmit}>
      <h2>Enter Password</h2>
      <p>Please enter your password and confirm it below:</p>
      <input
        type="password"
        placeholder="Password"
        value={password}
        className="mb-3 input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="mb-3 input"
        value={password_confirmation}
        onChange={(e) => setPassword_confirmation(e.target.value)}
      />
      <button type="submit" className=" btn btn-primary">
        Submit
      </button>
    </form>
  );
}

ResetPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
};

export default ResetPassword;
