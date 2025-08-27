import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../css/BookCard.css";
import "../../css/applyroom.css"
import Header from '../../../components/topbar/header.jsx';


function S()
{

  const [name, setsname] = useState()
  const [endx, setetime] = useState(1)
  const [numofs, setnumstudent] = useState()
  const [SID, setSID] = useState()
  const [roomnumber, setRoom] = useState()
  const [start, setStart] = useState()
  const go = useNavigate()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.post("http://localhost:3001/api/enter/applyroom", { name, SID,start,endx,roomnumber,numofs },
    { withCredentials: true })
          .then(result => {
              console.log(result)
              if(result.data === "Success")
              {
                alert("Room Booked");
                go('/studentaccount');
              }
              else if(result.data === "Library Card First")
                {
                  alert("Need Library Card First") ;
                  go("/librarycard")
                }
                else if(result.data === "Room Not Found")
                {
                  alert("Room Not Found") ;
                }
                else if(result.data === "Not Avilable")
                  {
                    alert("Room Not Avilable") ;
                  }
                else
                {
                  alert("Already you booked Room") ;
                }
          })
          .catch(err => console.log(err))
      }

    return(
      <div className='body9h'>
    <Header />

        <div className='body3'>
<div className="library-background">
      <form className="library-form" onSubmit={handleSubmit}>
        <h1>Apply For Room</h1>

        <label>Student Name</label>
        <input type="text" name="studentName" onChange={(e) => setsname(e.target.value)} required/>

        <label>Library ID</label>
        <input type="text" inputmode="numeric" pattern="\d*" name ="SID" onChange={(e) => setSID(e.target.value)}  required />

        <label>Start Time</label>
        <div className="start-timex">
  <input type="time" min="09:00" max="19:00" step='3600' onChange={(e) => setStart(e.target.value)}  required />
  
  <label>
    <input
      type="checkbox"
      checked={endx === 1} onChange={(e) => setetime(1)} />
    1 hour
  </label>
  <label>
    <input
      type="checkbox"
      checked={endx === 2} onChange={(e) => setetime(2)} />
    2 hours
  </label>
</div>
        <label>Room Number</label>
      <input type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setRoom(e.target.value)}  required/>
        <label>Number of Students</label>
        <input style={{ marginBottom: '20px' }} type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setnumstudent(e.target.value)}  required />


        <button  type="submit" className="btn">Apply</button>
      </form>
    </div>
</div>





















       
    </div>
    );
}

export default S;

/*
 <form onSubmit={handleSubmit}>
      <label>Student Name
        <input type="text" placeholder="Student Name" name = "name"  onChange={(e) => setsname(e.target.value)} required/>
      </label>
      <label>Library ID
      <input type="text" inputmode="numeric" pattern="\d*" name ="SID" onChange={(e) => setSID(e.target.value)}  required/>
      </label>
      <label>Start Time
      <input type="time" name="librarytime" min="09:00" max="19:00" step='3600' onChange={(e) => setStart(e.target.value)}  required/>
      </label>
      <input type="radio" name="time" value="01:00" onChange={(e) => setetime(e.target.value)} />
      <label for="etime1"> 1 Hour </label>
      <input type="radio" name="time" value="02:00"  onChange={(e) => setetime(e.target.value)}/>
      <label for="etime2"> 2 Hours </label>
      
      <input type="submit" value ="Apply"/>
    </form>

    */