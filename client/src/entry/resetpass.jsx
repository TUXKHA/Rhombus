import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { FaLock } from "react-icons/fa6";

function Bh ()
{
    const [passer, setpass] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const token = window.location.pathname.split("/").pop();
        axios
        .post(`http://localhost:3001/api/auth/reset-password/${token}`, { passer })
        .then((response) => {
          console.log(response.data.message);
            if(response.data.Status === "Success") {
                navigate('/login') 
            }
        })
            .catch((error) => {
                 console.log(error);
            });
        }

  return (
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
                <div className="flip-card">
                  <div className="wrapper2">
                  <x style={{"--clr": "rgb(1, 162, 173)"}}></x>
                    <div className="form-box login">
                    <h2>Reset Password</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="input-box">
                          <input type="password" onChange={(e) => setpass(e.target.value)} required/>
                        <label>Password</label>
                        <i><FaLock/></i>
                          </div>
                          <button type="submit" className="btn">Apply</button>
                          </form>
                          </div>
                          </div>
                  </div>
              </div>
  )
}

export default Bh;