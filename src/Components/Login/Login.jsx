import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  }

  async function sendData(e) {
    /*
    axios
      .post(
        "http://restapi.adequateshop.com/api/authaccount/registration",
        user
      )
      .then(function (response) {
        alert(response);
      })
      .catch(function (error) {
        alert(error);
      });
      */
    console.log(user);
    setLoading(true);
    e.preventDefault();
    let { data } = await axios.post(
      "https://route-egypt-api.herokuapp.com/signin",
      user
    );
    if (data.message === "success") {
      localStorage.setItem("token", data.token);
      props.saveUserData();
      navigate("/home");
    } else {
      setError(data.message);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
          <h2 className="h1 text-white">Login</h2>
          <form>
            <div className="form-group">
              <input
                onChange={handleChange}
                placeholder="Enter email"
                type="email"
                name="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange}
                placeholder="Enter you password"
                type="password"
                name="password"
                className="form-control"
              />
            </div>
            <button
              onClick={sendData}
              type="submit"
              className="btn btn-info w-100"
            >
              {loading ? (
                <div>
                  Waiting...<i className="fa-solid fa-spinner fa-spin"></i>
                </div>
              ) : (
                "SignIn"
              )}
            </button>
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
