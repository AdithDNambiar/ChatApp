import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Register(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");

  const navigate = useNavigate();

  const register = async () => {

    try{

      await axios.post("http://localhost:5000/api/register",{
        name,
        email
      });

      alert("Password sent to your email");

      navigate("/");

    }catch(err){

      alert("Registration failed");

    }

  };

  return(

    <div className="auth-container">

      <div className="auth-card">

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button onClick={register}>
          Register
        </button>

        <p className="auth-link"
           onClick={()=>navigate("/")}>
           Already have an account? Login
        </p>

      </div>

    </div>

  );
}

export default Register;