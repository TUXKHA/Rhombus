import React, { useState } from "react";
import axios from 'axios';
import '../../css/deletelibrary.css'
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [SID, setSID] = useState()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.delete(`https://rhombus-tnso.onrender.com/api/enter/removelibrary`, {data: { SID },
     withCredentials: true })
          .then(result => {
              console.log(result)
              if(result.data === "Deleted")
              {
                alert("Library Card Deleted") ;
              }
                else
                  {
                    alert("Library Card Didnt Found") ;
                  }
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9o'>
          <Header2/>
                  <div className="center">
                  <div className="wrapper20">
                  <div className="form-box login">
                  <h2>Delete Library ID</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="input-box">
                  <input type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setSID(e.target.value)} required/>
                  <label>Library ID</label>
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