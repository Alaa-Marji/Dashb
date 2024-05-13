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
    <div>
      <div
        className="form-email"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <form onSubmit={handleSubmit}>
          <h3 style={{ marginTop: "0px", marginLeft: "150px" }}>
            Enter Your Email:
          </h3>
          <label
            style={{
              marginTop: "0px",
              marginLeft: "99px",
              marginBottom: "40px",
            }}
          >
            We Will Send Code Co Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" Email"
          />
          <br></br>
          <button
            style={{
              background: "#3585a5",
              color: "white",
              fontSize: "15px",
              cursor: "pointer",
              marginLeft: "150px",
              marginTop: "50px",
            }}
          >
            Submit
          </button>
          {err !== "" && <span className="err">{err}</span>}
        </form>
      </div>
    </div>
  );
}

EmailInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EmailInputForm;
