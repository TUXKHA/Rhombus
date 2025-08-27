import React, { useState } from "react";
import axios from 'axios';
import "../../css/delupcoming.css";
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [bookid, setbookid] = useState()
  const [edition, setEdition] = useState()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.delete("https://rhombus-tnso.onrender.com/api/enter/deleteupcomingbook", { data: {bookid,edition}  ,
    withCredentials: true} )
   
          .then(result => {
              console.log(result)
              if(result.data === "Deleted")
              {
                alert("Book Deleted From Upcoming List") ;
              }
                else
                  {
                    alert("Book Didnt Found In Upcoming List") ;
                  }
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9r'>
       <Header2/>
            <div className="center">
            <div className="wrapper20">
            <div className="form-box login">
            <h2>Delete Upcoming Books</h2>
            <form onSubmit={handleSubmit}>
            <div className="input-box">
            <input type="text" inputmode="numeric" pattern="\d*" onChange={(e) => setbookid(e.target.value)} required/>
            <label>Book ID</label>
            </div>

            <div className="input-box">
            <input type="text" inputmode="numeric" pattern="\d*"  onChange={(e) => setEdition(e.target.value)} required/>
            <label>Edition</label>
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