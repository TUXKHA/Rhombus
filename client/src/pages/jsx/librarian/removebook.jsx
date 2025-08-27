import React, { useState } from "react";
import axios from 'axios';
import '../../css/removebook.css'
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [bookid, setbookid] = useState()


      const handleSubmit = (e) => {
          e.preventDefault()
          axios.delete("http://localhost:3001/api/enter/removebook", {
  data: { bookid },
  withCredentials: true
      } )
          .then(result => {
              console.log(result)
              if(result.data === "Deleted")
              {
                alert("Book Deleted From Library") ;
              }
                else
                  {
                    alert(result.data) ;
                  }
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9y'>
          <Header2/>
                  <div className="center">
                  <div className="wrapper20">
                  <div className="form-box login">
                  <h2>Delete Book</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="input-box">
                  <input type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setbookid(e.target.value)} required/>
                  <label>Book ID</label>
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