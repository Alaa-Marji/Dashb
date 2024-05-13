import axios from "axios"; // added import
import { useState } from "react";
import { LOG, baseURL } from "../../Api/Api";
import Loading from "../Loading/loading";
import "./css/components/Auth.css";
import "./css/components/alert.css";
import "./css/components/button.css";
import "./css/components/form.css";
import "./css/components/Loading.css";
import { Box, Button, Modal } from "@mui/material"; // added Box import

import PasswordResetComponent from "../Auth/ForgetPassword/Forget";

import { useNavigate } from "react-router-dom";

export default function Login() {
  // States
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const [oLoading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  // Modal state and functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${baseURL}/${LOG}`, form);
      setLoading(false);
      //replace true delete path and show last path
      navigate("/dash", { replace: true });
    } catch (err) {
      setLoading(false);
      if (err.response === 401) {
        setErr("Wrong Email Or Password");
      } else {
        setErr("Internal Server Error");
      }
    }
  }

  return (
    <>
      {oLoading && <Loading></Loading>}
      <div className="co">
        <div className="row h-100">
          <form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Login Now</h1>
              <div className="mb-3">
                <label htmlFor="login">Email/Username:</label>
                <div className="input-field">
                  <input
                    id="login"
                    type="text"
                    value={form.login}
                    placeholder="Enter Your Email.."
                    onChange={handleChange}
                    name="login"
                    required
                    minLength={2}
                  ></input>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password:</label>
                <div className="input-field">
                  <input
                    id="password"
                    type="password"
                    value={form.password}
                    placeholder="Enter Your Password.."
                    onChange={handleChange}
                    name="password"
                    required
                    minLength={6}
                  ></input>
                </div>
                <div>
                  <Button onClick={handleOpen}>Forget Password?</Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      {" "}
                      {/* Apply style here */}
                      <PasswordResetComponent />
                    </Box>
                  </Modal>
                </div>
              </div>
              <button className="btn btn-primary">Submit</button>
              {err !== "" && <span className="err">{err}</span>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// Modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "background.paper",
  borde: "2px solid #",
  boxShadow: "0 0 20px rgba(189, 181, 181, 0.856)",
  p: 4,
};
