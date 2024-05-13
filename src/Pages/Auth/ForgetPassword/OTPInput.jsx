import { useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { baseURL, CODE } from "../../../Api/Api";

function OTPInput({ onSubmit, setCode }) {
  const [err, setErr] = useState("");
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, event) => {
    const newOTP = [...otp];
    newOTP[index] = event.target.value;
    setOTP(newOTP);
    if (event.target.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = otp.join("");
    try {
      // Make Axios POST request
      const response = await axios.post(`${baseURL}/${CODE}`, { code });
      if (response.status === 200) {
        setCode(code);
        onSubmit(code); // Move to the next step
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) setErr("Wrong Code");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        marginBottom: "4px",
      }}
    >
      <img
        src="./undraw_certification_re_ifll (2).svg"
        className="im"
        alt="Login"
      />
      <div className="titleh">
        <h1 style={{ marginBottom: "20px", marginLeft: "80px" }}>
          Enter Code:
        </h1>
        <p>Please enter the 6-digit code sent to your email:</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="parent-otp">
          {otp.map((digit, index) => (
            <input
              className="input-otp"
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </div>
        <button type="submit" className="butt">
          Submit
        </button>
        {err !== "" && <span className="err">{err}</span>}
      </form>
    </div>
  );
}

OTPInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired,
};

export default OTPInput;
