import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../css/BooksGrid.css";
import Header2 from '../../../components/topbar/headerAdmin.jsx';


const BooksGrid = () => {
  const navigate = useNavigate();

    const handleClick = (id) => {
    navigate(`/book2/${id}`);
  };

    const [allData, setAllData] = useState([]);

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {
      const roomsRes = await axios.get("http://localhost:3001/api/enter/allbooks",
    { withCredentials: true });
      setAllData(roomsRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className='body9k'>
      <Header2 />
    <div className="books-container">
      <h2 className="books-title">Books</h2>
      <div className="scroll-box2">
        <div className="books-grid">
          {allData.map((data, index) => (
            <button
              className="book-card"
              key={index}
              onClick={() => handleClick(data.bookid)}
            >
              <img src={`/uploads/${data.image}`} alt={data.bookName} className="book-image" />
              <p className="book-title">{data.bookName}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BooksGrid;