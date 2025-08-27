import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../css/deleteroom.css'
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [roomnumber, setRoom] = useState()
  const go = useNavigate()


      const handleSubmit = (e) => {
          e.preventDefault()
          axios.delete(`https://rhombus-tnso.onrender.com/api/enter/removeroom`, {data: { roomnumber },
     withCredentials: true })
          .then(result => {
              console.log(result)
              alert(result.data);
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9p'>
            <Header2 />
                  <div className="center">
                  <div className="wrapper20">
                  <div className="form-box login">
                  <h2>Delete Room From Rooms</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="input-box">
                  <input type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setRoom(e.target.value)} required/>
                  <label>Room Number</label>
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