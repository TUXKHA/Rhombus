import React, { useState } from "react";
import axios from 'axios';
import '../../css/studentids.css'
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [SID, setID] = useState();


      const handleSubmit = (e) => {
          e.preventDefault()
          axios.post(`https://rhombus-tnso.onrender.com/api/enter/addsid`,{ SID},
    { withCredentials: true })
          .then(result => {
              console.log(result)
              alert(result.data);
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9ae'>
        <Header2/>
                  <div className="center">
                  <div className="wrapper20">
                  <div className="form-box login">
                  <h2>ADD Student ID</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="input-box">
                  <input type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setID(e.target.value)} required/>
                  <label>SID</label>
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