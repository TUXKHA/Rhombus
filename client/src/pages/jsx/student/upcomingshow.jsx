import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../../css/upcomingall.css";
import "../../css/BooksGrid.css";
import Header from '../../../components/topbar/header.jsx';

const BooksGrid = () => {

    const [allData, setAllData] = useState([]);

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {
      const roomsRes = await axios.get("https://rhombus-tnso.onrender.com/api/enter/allupcomingbooks",
  {
    withCredentials: true,
  });
      setAllData(roomsRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  function formatDateToDayMonthYear(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) {
    throw new Error('Invalid date');
  }

  const day = date.getUTCDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

  return (
    <div className='body9ag'>
      <Header />
    <div className="books-container">
      <h2 className="books-title">Upcoming Books</h2>
      <div className="scroll-box2">
          {allData.map((data, index) => (
        <div className="book-cardc" key={index}>
          <img src={`/uploads/${data.image}`} alt={data.bookName} className="book-imagec" />
          <div className="book-infoc">
            <p><strong>Book Name:</strong> {data.bookName}</p>
            <p><strong>Edition:</strong> {data.edition}</p>
            <div className="book-detailsc">
              <span1x><strong>Book ID:</strong> {data.bookid}</span1x>
              <span1x><strong>Arrival Date :  </strong>{formatDateToDayMonthYear(data.arrivaldate)}</span1x>
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


