import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../css/studenthome.css";
import Header from '../../../components/topbar/header.jsx';

function App() {
  const [allData, setAllData] = useState([]);
  const [allData2, setAllData2] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const roomsRes = await axios.get(
        "http://localhost:3001/api/enter/getAllFavouriteBooksDetails",
  {
    withCredentials: true,
  }
      );
      setAllData(roomsRes.data);
      const roomsRes2 = await axios.get(
        "http://localhost:3001/api/enter/recentlyreturned",
  {
    withCredentials: true,
  }
      );
      setAllData2(roomsRes2.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
const handleLogout = async () => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/enter/logout',
      {}, 
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      console.log('Logout successful:', response.data.message);
      alert(response.data.message);
      navigate('/');
    } else {
      console.error('Logout failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

  return (
    <div className="app-containervcv">
      <Header />

      <div className="content-areavcv">
        <div className="sidebarvcv">
          <button onClick={() => navigate(`/bookhistory`)}>Book History</button>
          <button onClick={() => navigate('/returndue')}>Return Due</button>
          <button onClick={() => navigate('/rooms')}>Rooms</button>
          <button onClick={() => navigate(`/editlibrarycard`)}>Edit Library Card</button>
          <button onClick={() => navigate(`/removereservation`)}>Cancel Room</button>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className="main-contentvcv">
          <h1 className="page-titlevcv">My Account</h1>

          <div className="books-boxvcv">
            <h2>Favourite Books</h2>
            <div className="book-scroll-containervcv">
              <div className="book-rowvcv">
                {allData.length === 0 ? (
                  <p>No books added in favourite list.</p>
                ) : (
                  allData.map((data) => (
                    <div
                      key={data.bookid}
                      className="book-cardvcv"
                      onClick={() => navigate(`/book/${data.bookid}`)}>
                      <img
                        className="book-imagevcv"
                        src={`/uploads/${data.image}`}
                        alt={data.bookName}
                        onError={(e) => {
                          e.target.src = "/uploads/default.jpg";
                        }}
                      />
                      <div className="book-titlevcv">{data.bookName}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="books-boxvcv">
            <h2>Recently Returned Books In Library</h2>
            <div className="book-scroll-containervcv">
              <div className="book-rowvcv">
                {allData2.length === 0 ? (
                  <p>No books Returned...........</p>
                ) : (
                  allData2.map((data) => (
                    <div
                      key={data.bookid}
                      className="book-cardvcv"
                      onClick={() => navigate(`/book/${data.bookid}`)}>
                      <img
                        className="book-imagevcv"
                        src={`/uploads/${data.image}`}
                        alt={data.bookName}
                        onError={(e) => {
                          e.target.src = "/uploads/default.jpg";
                        }}
                      />
                      <div className="book-titlevcv">{data.bookName}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
