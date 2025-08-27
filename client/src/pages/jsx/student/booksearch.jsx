import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../css/BooksGrid.css";
import "../../css/upcomingall.css";
import "../../css/booksearch.css";
import Header from '../../../components/topbar/header.jsx';


const BooksGrid = () => {

  const navigate = useNavigate();
  const { bookNam } = useParams();

    const [allData, setAllData] = useState([]);
    const handleClick = (id) => {
    navigate(`/book/${id}`);
  };

  useEffect(() => {
  getData();
}, []);

const getData = async () => {
  try {
    const roomsRes = await axios.get(`http://localhost:3001/api/enter/booksearch/${bookNam}`,
    { withCredentials: true });
    if (roomsRes.data === "No") {
      setAllData([]);
    } else {
      setAllData(roomsRes.data.xx);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  return (
    <div className='body9au'>
    <Header />
    <div className="books-container">
      <h2 className="books-title">Search Result</h2>
      <div className="scroll-box2">
          {allData.map((data, index) => (
        <div className="book-cardc button-cardpc"
              key={index}
              onClick={() => handleClick(data.bookid)}
              role="button"
              tabIndex={0}>
          <img src={`/uploads/${data.image}`} alt={data.bookName} className="book-imagec" />
          <div className="book-infoc">
            <p><strong>Book Name:</strong> {data.bookName}</p>
            <p><strong>Edition:</strong> {data.edition}</p>
            <div className="book-detailsc">
              <span1x><strong>Book ID:</strong> {data.bookid}</span1x>
              <span1x><strong>Author Name:</strong> {data.author}</span1x>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
    </div>
  );
};

export default BooksGrid;