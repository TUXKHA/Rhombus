import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { 
  MdLibraryBooks, 
  MdCreditCard, 
  MdMeetingRoom, 
  MdFolder, 
  MdAccountCircle, 
  MdHistory 
} from 'react-icons/md';
import "../../css/studentaccount.css";
import Header from '../../../components/topbar/header.jsx';

function App() {

        const [bookNam, setbookNam] = useState()
        const navigate = useNavigate();
          const go = useNavigate()
              const handleClick = (e) => {
                  e.preventDefault()
                  axios.get(`http://localhost:3001/api/enter/booksearch/${bookNam}`,
  {
    withCredentials: true,
  })
          .then(result => {
              console.log(result)
              if(result.data === "No")
              {
                alert("Book Not Found") ;
              }
                else
                  {
                    navigate(`/booksearch/${bookNam}`);
                  }
          })
          .catch(err => console.log(err))
              }
  return (
    <div className="app62">
     <Header />

      <div className="search-container62">
        <div className="search-input-wrapper62">
          <div className="search-label62">Name</div>
          <input type="text" placeholder="Search for books" className="search-input62" onChange={(e) => setbookNam(e.target.value)}/>
        </div>
        <button className="search-button62"  onClick={handleClick} >SEARCH</button>
      </div>

      <div className="nav-panel62">
        <div className="nav-item62 pink-bg"onClick={() => navigate("/books")}>
          <div className="nav-icon62"><MdLibraryBooks size={28} /></div>
          <div className="nav-label62"><b>BOOKS</b></div>
        </div>
        <div className="nav-item62" onClick={() => navigate("/librarycard")}>
          <div className="nav-icon62"><MdCreditCard size={28} /></div>
          <div className="nav-label62"><b>LIBRARY CARD</b></div>
        </div>
        <div className="nav-item62 pink-bg"onClick={() => navigate("/rooms")}>
          <div className="nav-icon62"><MdMeetingRoom size={28} /></div>
          <div className="nav-label62"><b>ROOMS</b></div>
        </div>
        <div className="nav-item62"onClick={() => navigate("/upcomingall")}>
          <div className="nav-icon62"><MdFolder size={28} /></div>
          <div className="nav-label62"><b>UPCOMING</b></div>
        </div>
        <div className="nav-item62 pink-bg"onClick={() => navigate("/studenthome")}>
          <div className="nav-icon62"><MdAccountCircle size={28} /></div>
          <div className="nav-label62"><b>MY ACCOUNT</b></div>
        </div>
        <div className="nav-item62"onClick={() => navigate("/bookhistory")}>
          <div className="nav-icon62"><MdHistory size={28} /></div>
          <div className="nav-label62"><b>HISTORY</b></div>
        </div>
      </div>
    </div>
  );
}

export default App;