import React, { useEffect,useState } from "react";
import axios from 'axios';
import "../../css/issuebook.css";
import '../../css/issuebookbg.css'
import Header2 from '../../../components/topbar/headerAdmin.jsx';


function S()
{
  const [bookid, setbookid] = useState()
  const [SID, setSID] = useState()
  const [issudate, setissudate] = useState()
  const [returndate, setreturndate] = useState()


 const [books, setBooks] = useState([]);

      useEffect(() => {getBooks();}, []);
      
      const getBooks = async () => {
      const result = await axios.get("http://localhost:3001/api/enter/allbookshistory",
    { withCredentials: true });
      console.log(result);
      setBooks(result.data.data);
    };

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.post("http://localhost:3001/api/enter/issuebook", {bookid,SID,issudate,returndate},
    { withCredentials: true })
          .then(result => {
              console.log(result)
              if(result.data === "YESS")
              {
                alert("Book Booked") ;
                getBooks();
                setbookid("");
        setSID("");
        setissudate("");
        setreturndate("");
              }
              else if(result.data === "Dont Have Library Card")
                {
                  alert("Need Library Card First") ;
                }
                else if(result.data === "Bookid Not Found")
                {
                  alert("Book Not Found") ;
                }
                else
                  {
                    alert("Book Not Avilable") ;
                  }
          })
          .catch(err => console.log(err))
      }
  
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



    return(
      <div className='body9w'>
      <Header2/>
                            <div className="body3">

 <div className="xtable-container">
  <h2>Issue Book</h2>
  <div className="xtable-scroll-wrapper">
    <form onSubmit={handleSubmit}>
    <table className="xscrollable-table">
      <thead>
        <tr>
            <th>Book ID</th>
            <th>Library ID</th>
            <th>Date of issue</th>
            <th>Return date</th>
            <th>Confirmation</th>
          </tr>
      </thead>
      <tbody>
         <tr>
              <td>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  value={bookid}
                  onChange={(e) => setbookid(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  value={SID}
                  onChange={(e) => setSID(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="date"
                  value={issudate}
                  onChange={(e) => setissudate(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="date"
                  value={returndate}
                  onChange={(e) => setreturndate(e.target.value)}
                  required
                />
              </td>
              <td>
                <button type="submit" className="xadd-btn" >ADD</button>
              </td>
            </tr>
        {books == null
        ? ""
        : books.map((data,idx) => {
            return (
          <tr key={idx}>
              <td>{data.bookid}</td>
              <td>{data.SID}</td>
              <td>{formatDateToDayMonthYear(data.issudate)}</td>
              <td>{formatDateToDayMonthYear(data.returndate)}</td>
              <td>confirmed</td>
              
            </tr>
        );
        })}
      </tbody>
    </table>
    </form>
  </div>
</div>

</div>
        
    </div>
    );
}

export default S;
