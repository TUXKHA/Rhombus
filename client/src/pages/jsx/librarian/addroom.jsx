import React, { useState } from "react";
import axios from 'axios';
import '../../css/addroom.css';
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [roomnumber, setRoom] = useState()


      const handleSubmit = (e) => {
          e.preventDefault()
          axios.post(`http://localhost:3001/api/enter/addroom`,{ roomnumber },
    { withCredentials: true })
          .then(result => {
              console.log(result)
              alert(result.data);
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9b'>
            <Header2/>
                  <div className="center">
                  <div className="wrapper20">
                  <div className="form-box login">
                  <h2>Add Room in Library</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="input-box">
                  <input type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setRoom(e.target.value)} required/>
                  <label>Room Number</label>
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