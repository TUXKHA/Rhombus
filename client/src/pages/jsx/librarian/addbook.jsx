import React, { useState } from "react";
import axios from 'axios';
import '../../css/upcoming.css';
import '../../css/addbook.css';
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
  const [bookNam, setBookNam] = useState()
  const [image, setImage ] = useState();
  const [edition, setEdition] = useState()
  const [bookid, setbookid] = useState()
  const [author, setAuthor] = useState()
  const [shelf, setShelf] = useState()

      

      const handleSubmit = (e) => {
          e.preventDefault()
          const form =new FormData();
          form.append('bookNam',bookNam)
          form.append('author',author)
          form.append('edition',edition)
          form.append('shelf',shelf)
          form.append('bookid',bookid)
          form.append('image',image)
          axios.post("http://localhost:3001/api/enter/addbook", form,
    { withCredentials: true })
          .then(result => {
              console.log(result)
              if(result.data === "Success")
              {
                alert("Book Added in Library") ;
              }
                else
                  {
                    alert("Book Already in Library") ;
                  }
          })
          .catch(err => console.log(err))
      }
  


    return(
      <div className='body9a'>
      <Header2/>
        <div className="center">
            <div className="wrapper200">
            <div className="form-box login">
            <h2 style={{ marginTop: '20px' }}>Add Books</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="input-box">
            <input type="text" onChange={(e) => setBookNam(e.target.value)}  required/>
            <label>Book Name</label>
            </div>
            <div className="input-box">
            <input type="text" onChange={(e) => setAuthor(e.target.value)}  required/>
            <label>Author Name</label>
            </div>
            <div className="input-box">
            <input type="text" inputmode="numeric" pattern="\d*"  onChange={(e) => setEdition(e.target.value)} required/>
            <label>Edition</label>
            </div>
            <div className="input-box">
            <input type="text" onChange={(e) => setShelf(e.target.value)}  required/>
            <label>Shelf</label>
            </div>
            <div className="input-box">
            <input type="text" inputmode="numeric" pattern="\d*"  onChange={(e) => setbookid(e.target.value)} required/>
            <label>Book ID</label>
            </div>
            <div style={{ marginBottom: '13px' }}> 
            <label style={{ color: 'white' }}>Book Image :  </label>
            <input style={{ color: 'white' }} type="file" accept='.png,.jpg,.jpeg'onChange={(e) => setImage(e.target.files[0])}/>
            </div>

            <button style={{ marginBottom: '25px' }} type="submit" className="btn">Apply</button>
            </form>
            </div>
            </div>
            </div>
    </div>
    );
}

export default S;