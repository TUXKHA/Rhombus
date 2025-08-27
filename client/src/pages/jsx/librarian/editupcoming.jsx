import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../css/upcoming.css";
import '../../css/editupcoming.css';
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function AddBook() {
  const [bookName, setBookName] = useState('');
  const [edition, setEdition] = useState('');
  const [bookid, setBookid] = useState('');
  const [_id, setID] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [arrivaldate, setArival] = useState()

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/enter/upcomingbookdetails/${id}`,
    { withCredentials: true });
      const data = res.data.data;
      setBookName(data.bookName || '');
      setEdition(data.edition || '');
      setBookid(data.bookid || '');
      setID(data._id || '');
      setArival(data.arrivaldate || '');
      setImageFile(null); 
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('bookNam', bookName);
    form.append('edition', edition);
    form.append('bookid', bookid);
    form.append('arrivaldate', arrivaldate);
    form.append('_id', _id);

    if (imageFile) {
      form.append('image', imageFile);
    }

    axios.post("http://localhost:3001/api/enter/editupcomingbook", form,
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
    <div className='body9u'>
    <Header2/>

      <div className="center">
        <div className="wrapper200">
          <div className="form-box login">
            <h2>Edit Upcoming Book</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>

              <div className="input-box">
                <input
                  type="text"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  required
                />
                <label>Book Name</label>
              </div>


              <div className="input-box">
                <input
                  type="number"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                  required
                />
                <label>Edition</label>
              </div>


              <div className="input-box">
                <input
                  type="number"
                  value={bookid}
                  onChange={(e) => setBookid(e.target.value)}
                  required
                />
                <label>Book ID</label>
              </div>

              {/* Image input without preview */}
              <div style={{ marginBottom: '13px', color: 'white' }}>
                <label>Book Image:</label><br />
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}> 
            <label style={{ color: 'white' }}>Arrival Date :  </label>
            <input type="date" value={arrivaldate} name="arrival date" onChange={(e) => setArival(e.target.value)} required/>
            </div>

              <button type="submit" className="btn">Apply</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;