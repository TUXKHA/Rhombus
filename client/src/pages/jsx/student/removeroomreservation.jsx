import React, { useState } from "react";
import axios from 'axios';
import '../../css/removeroomreservation.css';
import '../../css/returnbook.css';
import Header from '../../../components/topbar/header.jsx';

function S()
{
  const [roomnumber, setRoom] = useState();
  const [SID, setID] = useState();


      const handleSubmit = (e) => {
          e.preventDefault()
          axios.post(`https://rhombus-tnso.onrender.com/api/enter/deletroomreservation`,{ SID,roomnumber },
  {
    withCredentials: true,
  })
          .then(result => {
              console.log(result)
              alert(result.data);
          })
          .catch(err => console.log(err))
      }

    return(
      <div className='body9z'>
             <Header />
                  <div className="center">
                  <div className="wrapper20">
                  <div className="form-box login">
                  <h2>Cancle Room Reservation</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="input-box">
                  <input type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setRoom(e.target.value)} required/>
                  <label>Room Number</label>
                  </div>
                  <div className="input-box">
                  <input type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setID(e.target.value)} required/>
                  <label>Library ID</label>
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