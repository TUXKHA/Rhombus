import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../css/delupcoming.css";
import '../../css/getbookforedit.css';
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [bookid, setbookid] = useState()

  const navigate = useNavigate();

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
                    navigate(`/editbook/${bookid}`); ;
                  }
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9v'>
       <Header2/>
            <div className="center">
            <div className="wrapper20">
            <div className="form-box login">
            <h2>Edit Book</h2>
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