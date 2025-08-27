import { FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from '../UserContext';
import './loginV2.css';


function Bh()
{

    const { user, setUser } = useUser();
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [cpassword, setCpassword] = useState()
    const go = useNavigate()




   const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/api/auth/login", { email, password }, {
        withCredentials: true
    })
    .then(result => {
      const data = result.data;
      if (data.success) {
  setUser(data.user);
  if (data.user.role === "admin") go("/dash");
  else if (data.user.role === "student") go("/studentaccount");
}

      else alert("Login failed");
       
    })
    .catch(err => {
        if (err.response && err.response.data && err.response.data.message === "Invalid credentials") {
            alert("Invalid email or password.");
        } else {
            console.error("Login error:", err);
            alert("Server error. Please try again later.");
        }
    });
};



    const handleSignup = (e) => 
      {
        e.preventDefault()
        if(password!==cpassword)
          {alert("Password Didnt Match")
          return;
        }
        axios.post("http://localhost:3001/api/auth/signup", {email, password })
        .then(result => {
          console.log(result)
        if(result.data === "Success")
        {
          alert("Account Created, Login") ;
        }
        else if(result.data === "exist")
        {
          alert("User already Exists") ;
        }
        else
        {
          alert("ERROR IN REGISTRATION") ;
        }
        })
        .catch(err => console.log(err))
    }

    const handleForgot = (e) => 
      {
    e.preventDefault()
    axios.post("http://localhost:3001/api/auth/forgetPassword", {email})
    .then(result => 
    {
        console.log(result)
        if(result.data === "Success")
        {
          alert("Success , check Mailbox") ;
        }
        else if(result.data === "No")
        {
          alert("Email Not Found") ;
        }
        else
        {
          alert("Error") ;
        }
    })
    .catch(err => console.log(err))
    }

    const GoogleLogin = () => 
      {
  window.location.href = "http://localhost:3001/api/auth/log/google/callback";
    }





    function myFunction() {
        const list = document.getElementById('wrapper').classList;
        list.add('active');
      }
      function myFunction1() {
        const list = document.getElementById('wrapper').classList;
        list.remove('active');
      }
      function myFunction2() {
        const list = document.getElementById('flip').classList;
        list.add('active');
      }
      function myFunction3() {
        const list = document.getElementById('flip').classList;
        list.remove('active');
      }

    return(
            <div className="bb">
            <xy>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            </xy>
                   <div class="flip-card" id='flip'>
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                        <div className="wrapper" id="wrapper">
                    <zz className="bg-animate"></zz>
                    <zz className="bg-animate2"></zz>
                        <div className="form-box login">
                            <h2 className="animation" style={{"--i":0,"--j":21}}>Login</h2>


                            <form onSubmit={handleLogin}>
                                <div className="input-box animation" style={{"--i":1,"--j":22}}>
                                    <input type="text" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e) => setemail(e.target.value)} required/>
                                    <label>Email</label>
                                    <i><MdEmail /></i>
                                </div>
                                <div className="input-box animation" style={{"--i":2,"--j":23}}>
                                    <input type="password" onChange={(e) => setpassword(e.target.value)} required/>
                                    <label>Password</label>
                                    <i><FaLock/></i>
                                </div>
                                <button type="submit" className="btn animation" style={{"--i:":3,"--j":24}}>Login</button>
                                <div className="logreg-link animation" style={{"--i":4,"--j":25}}>
                                    <p>Don't have an account ? <button type="reset" className="bton" id="registerlink" onClick={myFunction}>Sign Up</button></p>
                                    <p>Forgot Password ? <button type="reset" className="bton" id="push" onClick={myFunction2}>Click Here</button></p>
                                </div>
                            </form>


                        </div>
                        <div className="info-text login">
                            <h2 className="animation" style={{"--i":0,"--j":20}}>Welcome Back</h2> 
                            <p className="animation" style={{"--i":1,"--j":21}}> Continue With Google  <button className="btn5" style={{ marginTop: '20px' }} onClick={GoogleLogin}>Google</button></p>
                        </div>
                        <div className="form-box register">
                            <h2 className="animation" style={{"--i":17,"--j":0}}>Sign Up</h2>


                            <form onSubmit={handleSignup}>
                                <div className="input-box animation" style={{"--i":18,"--j":1}}>
                                    <input type="text" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e) => setemail(e.target.value)} required/>
                                    <label>Email</label>
                                    <i><MdEmail /></i>
                                </div>
                                <div className="input-box animation" style={{"--i":19,"--j":2}}>
                                    <input type="password" onChange={(e) => setpassword(e.target.value)} required/>
                                    <label>Password</label>
                                    <i><FaLock/></i>
                                </div>
                                <div className="input-box animation" style={{"--i":20,"--j":3}}>
                                    <input type="password" onChange={(e) => setCpassword(e.target.value)} required/>
                                    <label>Confirm Password</label>
                                    <i><FaLock/></i>
                                </div>
                                <button type="submit" className="btn animation" style={{"--i":21,"--j":4}}>Sign Up</button>
                                <div className="logreg-link animation" style={{"--i":22,"--j":5}}>
                                    <p>Already have an account? <button type="reset" className="bton" id="loginlink" onClick={myFunction1}>Login</button></p>
                                </div>
                            </form>


                        </div>
                        <div className="info-text register">
                            <h2 className="animation" style={{"--i":17,"--j":0}}>Welcome Back</h2>
                            <p className="animation" style={{"--i":18,"--j":1}}> Continue With Google  <button className="btn5" style={{ marginTop: '20px' }} onClick={GoogleLogin}>Google</button></p>
                        </div>
                </div>
                        </div>
                    <div className="flip-card-back">
                    <div className="wrapper2">
                    <x style={{"--clr": "rgb(1, 162, 173)"}}></x>
                    <div className="form-box login">
                        <h2>Forgot Password</h2>


                        <form onSubmit={handleForgot}>
                        <div className="input-box">
                        <input type="text" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e) => setemail(e.target.value)} required/>
                        <label>Email</label>
                        <i><MdEmail /></i>
                        </div>
                        <button type="submit" className="btn">Apply</button>
                        <div className="logreg-link">
                        <p><button type="reset" className="bton" id="back" onClick={myFunction3}>Go Back</button></p>
                        </div>
                        </form>


                    </div>
                    </div>
                    </div>
                   </div>
                  </div>
                </div>
    );
}
export default Bh; 