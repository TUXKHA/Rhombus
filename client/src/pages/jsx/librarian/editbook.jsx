import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../css/upcoming.css";
import '../../css/editbook.css'
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function AddBook() {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [shelf, setShelf] = useState('');
  const [bookid, setBookid] = useState('');
  const [_id, setID] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/enter/book/${id}`,
    { withCredentials: true });
      const data = res.data.data;
      setBookName(data.bookName || '');
      setAuthor(data.author || '');
      setEdition(data.edition || '');
      setShelf(data.shelf || '');
      setBookid(data.bookid || '');
      setID(data._id || '');
      setImageFile(null); 
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('bookNam', bookName);
    form.append('author', author);
    form.append('edition', edition);
    form.append('shelf', shelf);
    form.append('bookid', bookid);
    form.append('_id', _id);

    if (imageFile) {
      form.append('image', imageFile);
    }

    axios.post("http://localhost:3001/api/enter/editbook", form,
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
    <div className='body9s'>
    <Header2/>

      <div className="center">
        <div className="wrapper200">
          <div className="form-box login">
            <h2>Edit Book</h2>
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
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
                <label>Author Name</label>
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
                  type="text"
                  value={shelf}
                  onChange={(e) => setShelf(e.target.value)}
                  required
                />
                <label>Shelf</label>
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

              <button type="submit" className="btn">Apply</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;