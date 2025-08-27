import React, { useEffect,useState } from "react";
import axios from 'axios';
import '../../css/upcoming.css';
import '../../css/returndue.css';
import '../../css/adminreturn.css';
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S()
{
    const [allData, setAllData] = useState();
    const SID = 201;
    useEffect(() => {getData();}, []);
        const getData = async () => {
          console.log(SID);
        const result = await axios.get("https://rhombus-tnso.onrender.com/api/enter/allreturndue",
    { withCredentials: true });
        console.log(result);
        setAllData(result.data.data);
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

    return(
      <div className='body9e'>
      <Header2/>
                            <div className='body2'>
        <div className="table-container">
  <h2>Return Due</h2>
  <div className="table-scroll-wrapper">
    <table className="scrollable-table">
      <thead>
        <tr>
          <th>Book Name</th>
          <th>Book ID</th>
          <th>Library ID</th>
          <th>Return Date</th>
        </tr>
      </thead>
      <tbody>
        {allData == null 
        ? "" : 
        allData.map((data,index) => {
            return (
          <tr key={index}>
            <td>{data.bookName}</td>
            <td>{data.bookid}</td>
            <td>{data.SID}</td>
            <td>{formatDateToDayMonthYear(data.returndate)}</td>
          </tr>
        );
        })}
      </tbody>
    </table>
  </div>
</div>


      </div>
    </div>
    );
}

export default S;
