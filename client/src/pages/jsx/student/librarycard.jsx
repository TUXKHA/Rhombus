import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../css/librarycard.css";
import Header from '../../../components/topbar/header.jsx';

function S()
{
  const [emailx, setEmail] = useState()
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [city, setCity] = useState()
  const [phonenum, setPhone] = useState()
  const [SID, setSID] = useState()
  const go = useNavigate()
  
      const handleSubmit = (e) => {
          e.preventDefault()
          axios.post("https://rhombus-tnso.onrender.com/api/enter/librarycard", { emailx, firstname,lastname,city,phonenum,SID },
    { withCredentials: true })
          .then(result => {
              console.log(result)
              if(result.data === "Success")
              {
                alert("Library Card created")
                  //go("/studentaccount")
              }
              else if(result.data === "Two")
              {
                  alert("You Already Have Library Card")
              }
              else if(result.data === "One")
              {
                alert("Your Student ID Didn't Match")
              }
              else{
                alert("Error")
              }
          })
          .catch(err => console.log(err))
      }
  


    return(

      <div className='body9x'>
      <Header />
<div className='body3'>
<div className="library-background">
      <form className="library-form" onSubmit={handleSubmit}>
        <h1>Library card</h1>

        <label>Email Address</label>
        <input type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e) => setEmail(e.target.value)} required />

        <label>First Name</label>
        <input type="text" onChange={(e) => setFirstname(e.target.value)} required />

        <label>Last Name</label>
        <input type="text" onChange={(e) => setLastname(e.target.value)} required />

        <label>City</label>
        <input type="text" onChange={(e) => setCity(e.target.value)} required />

        <label>Phone number</label>
        <input type="tel" pattern="[0-9]{11}" onChange={(e) => setPhone(e.target.value)} required />

        <label>Student ID</label>
        <input style={{ marginBottom: '20px' }} type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setSID(e.target.value)} required />

        <button  type="submit" className="btn">Apply</button>
      </form>
    </div>
</div>
</div>
    );
}

export default S;
