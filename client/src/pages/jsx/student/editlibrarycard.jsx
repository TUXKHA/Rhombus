import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../css/upcoming.css";
import '../../css/editlibrarycard.css';
import Header from '../../../components/topbar/header.jsx';

function AddBook() {
  const [emailx, setEmail] = useState()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [city, setCity] = useState()
    const [phonenum, setPhone] = useState()
    const [SID, setSID] = useState()


  useEffect(() => {fetchBook();}, []);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/enter/getlibrary`,
    { withCredentials: true });
      if(res.data==="NO"){
        alert("Library Card Not Found");
      }
      const data = res.data.data;
      setEmail(data.emailx || '');
      setFirstname(data.firstname || '');
      setLastname(data.lastname || '');
      setCity(data.city || '');
      setPhone(data.phonenum || '');
      setSID(data.SID||'');
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
  emailx,
  firstname,
  lastname,
  city,
  phonenum,
  SID
};

    axios.post("http://localhost:3001/api/enter/edilibrarycard", form,
    { withCredentials: true })
      .then(result => {
        alert(result.data);
      })
      .catch(err => {
        console.error("Error submitting book:", err);
        alert("Something went wrong");
      });
  };

  return (
    <div className='body9t'>
       <Header/>
    <div className='body3'>
    <div className="library-background">
          <form className="library-form" onSubmit={handleSubmit}>
            <h1>Library card</h1>
    
            <label>Email Address</label>
            <input type="email" value={emailx} pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e) => setEmail(e.target.value)} required />
    
            <label>First Name</label>
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
    
            <label>Last Name</label>
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
    
            <label>City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
    
            <label>Phone number</label>
            <input type="tel" value={phonenum} pattern="[0-9]{11}" onChange={(e) => setPhone(e.target.value)} required />
    
            <label>Student ID</label>
            <input style={{ marginBottom: '20px' }} type="text" value={SID} readOnly required/>
    
            <button  type="submit" className="btn">Apply</button>
          </form>
        </div>
    </div>
    </div>
  );
}

export default AddBook;
