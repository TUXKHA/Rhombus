import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../css/searchbook.css'
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [bookid, setbookid] = useState()

  const go = useNavigate()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.get(`https://rhombus-tnso.onrender.com/api/enter/book/${bookid}`,
    { withCredentials: true })
          .then(result => {
              console.log(result)
              if(result.data === "NO")
              {
                alert("Book Not Found") ;
              }
                else
                  {
                    go(`/book/${bookid}`); ;
                  }
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9ad'>
         <Header2/>
                  <div className="center">
                  <div className="wrapper20">
                  <div className="form-box login">
                  <h2>Search Book</h2>
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