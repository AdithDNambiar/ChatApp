import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await axios.post("http://localhost:5000/api/login",{
        username,
        password
      });

      localStorage.setItem("user",JSON.stringify(res.data));

      navigate("/dashboard");

    } catch (err) {

      alert(err.response?.data?.message || "Login failed");

    }

  };

  return(

    <div className="auth-container">

      <div className="auth-card">

        <h2>ChatApp Login</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p className="auth-link"
           onClick={()=>navigate("/register")}>
           Not Registered? Create Account
        </p>

      </div>

    </div>

  );
}

export default Login;