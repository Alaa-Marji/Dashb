import { useState } from "react";
import PropTypes from "prop-types";
import { baseURL, FORGETPASSWORD } from "../../../Api/Api";
import axios from "axios";
import "../css/components/button.css";

function EmailInputForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/${FORGETPASSWORD}`, { email });
      // If POST request succeeds, call the onSubmit function with the email
      onSubmit(email);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        setErr("Wrong Email");
      } else {
        setErr("Internal Server Error");
      }
    }
  }

  return (
    <form className="forma" onSubmit={handleSubmit}>
      <h2>Enter Your Email:</h2>
      <label>We Will Send Code Co Your Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="input"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        placeholder=" Email"
      />
      <br></br>
      <button className=" btn btn-primary">Submit</button>
      {err !== "" && <span className="err">{err}</span>}
    </form>
  );
}

EmailInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EmailInputForm;
