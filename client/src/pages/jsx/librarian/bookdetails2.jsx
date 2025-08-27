import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../css/BookCard.css";
import Header2 from '../../../components/topbar/headerAdmin.jsx';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [fbook, setFavouriteBook] = useState('NO');

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`https://rhombus-tnso.onrender.com/api/enter/book/${id}`,
    { withCredentials: true });
      setBook(res.data.data);

      const res2 = await axios.get(`https://rhombus-tnso.onrender.com/api/enter/getfavourite/${id}`,
    { withCredentials: true });
      setFavouriteBook(res2.data);
      console.log(res2.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className='body9i'>
      <Header2 />
      <div className='body2'>
        <div className="book-card3">
          <img
            src={`/uploads/${book.image}`}
            alt="Book Cover"
            className="book-cover2"
          />

          <div className="book-details2">
            <p className="book-title4" title={book.bookName}><strong>Book Name :</strong> {book.bookName}</p>
            <p><strong>Author Name :</strong> {book.author}</p>
            <p><strong>Edition :</strong> {book.edition}</p>
            <p><strong>Shelf :</strong> {book.shelf}</p>
            <p><strong>Book ID :</strong> {book.bookid}</p>

            <div className={book.state === 'avilable' ? 'available-label' : 'not-available-label'}>
              {book.state === 'avilable' ? 'Available' : 'Not Available'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;