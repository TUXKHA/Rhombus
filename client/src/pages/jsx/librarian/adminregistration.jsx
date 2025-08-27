import React, { useState } from "react";
import axios from 'axios';
import Header2 from '../../../components/topbar/headerAdmin.jsx';
import '../../css/adminregistration.css'

function S()
{
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [cpassword, setCpassword] = useState()


     const handleSubmit = (e) => 
      {
        e.preventDefault()
        if(password!==cpassword)
          {alert("Password Didnt Match")
          return;
        }
        axios.post("http://localhost:3001/api/enter/adminregistretion", {email, password },
    { withCredentials: true })
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
  


    return(
      <div className='body9d'>
         <Header2/>
                  <div className="center">
                  <div className="wrapper20">
                  <div className="form-box login">
                  <h2>Admin Registration</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="input-box">
                  <input type="text" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e) => setemail(e.target.value)} required/>
                  <label>Email</label>
                  </div>
                  <div className="input-box">
                  <input type="password" onChange={(e) => setpassword(e.target.value)} required/>
                  <label>Password</label>
                  </div>
                  <div className="input-box">
                  <input type="password" onChange={(e) => setCpassword(e.target.value)} required/>
                  <label>Confirm Password</label>
                  </div>
                  <button type="submit" className="btn">ADD</button>
                  </form>
                  </div>
                  </div>
                  </div>
          </div>

    );
}

export default S;