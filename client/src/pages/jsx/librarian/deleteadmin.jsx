import React, { useState } from "react";
import axios from 'axios';
import { MdEmail } from "react-icons/md";
import "../../css/delupcoming.css";
import '../../css/deleteadmin.css'
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [email, setemail] = useState()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.delete(`http://localhost:3001/api/enter/deleteadmin`, {data: { email },
    withCredentials: true })
          .then(result => {
              console.log(result)
              alert(result.data);
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9n'>
       <Header2/>
            <div className="center">
            <div className="wrapper20">
            <div className="form-box login">
            <h2>Delete Admin Account</h2>
            <form onSubmit={handleSubmit}>
            <div className="input-box">
            <input type="text" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e) => setemail(e.target.value)} required/>
            <label>Email</label>
             <i><MdEmail /></i>
            </div>

            <button type="submit" className="btn">Apply</button>
            </form>
            </div>
            </div>
            </div>
    </div>
    );
}

export default S;