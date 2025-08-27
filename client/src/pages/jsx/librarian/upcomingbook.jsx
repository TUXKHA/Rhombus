import React, { useState } from "react";
import axios from 'axios';
import "../../css/upcoming.css";
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [bookNam, setBookNam] = useState()
  const [image, setImage ] = useState();
  const [edition, setEdition] = useState()
  const [bookid, setbookid] = useState()
  const [arrivaldate, setArival] = useState()


      const handleSubmit = (e) => {
          e.preventDefault()
          const form =new FormData();
          form.append('bookNam',bookNam)
          form.append('edition',edition)
          form.append('bookid',bookid)
          form.append('arrivaldate',arrivaldate)
          form.append('image',image)
          axios.post("https://rhombus-tnso.onrender.com/api/enter/upcomingbook", form,
    { withCredentials: true })
          .then(result => {
              console.log(result)
              if(result.data === "YESS")
              {
                alert("Book Added in Upcoming List") ;
              }
              else if(result.data === "Book Already In Library")
                {
                  alert("Book Already In Library") ;
                }
                else
                  {
                    alert("Book Already In Upcoming List") ;
                  }
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9af'>
      <Header2/>
        <div className="center">
            <div className="wrapper200">
            <div className="form-box login">
            <h2>Upcoming Books</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="input-box">
            <input type="text" onChange={(e) => setBookNam(e.target.value)}  required/>
            <label>Book Name</label>
            </div>
            <div className="input-box">
            <input type="text" inputmode="numeric" pattern="\d*"  onChange={(e) => setbookid(e.target.value)} required/>
            <label>Book ID</label>
            </div>
            <div className="input-box">
            <input type="text" inputmode="numeric" pattern="\d*"  onChange={(e) => setEdition(e.target.value)} required/>
            <label>Edition</label>
            </div>


            <div style={{ marginBottom: '20px' }}> 
            <label style={{ color: 'white' }}>Book Image :  </label>
            <input style={{ color: 'white' }} type="file" accept='.png,.jpg,.jpeg'onChange={(e) => setImage(e.target.files[0])}/>
            </div>

            <div style={{ marginBottom: '20px' }}> 
            <label style={{ color: 'white' }}>Arrival Date :  </label>
            <input type="date" name="arrival date" onChange={(e) => setArival(e.target.value)} required/>
            </div>
            <button  type="submit" className="btn">Apply</button>
            </form>
            </div>
            </div>
            </div>
    </div>
    );
}

export default S;