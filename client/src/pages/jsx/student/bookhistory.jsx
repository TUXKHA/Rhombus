import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/upcoming.css';
import "../../css/adminrooms.css";
import Header from '../../../components/topbar/header.jsx';

function S() {
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const roomsRes = await axios.get("https://rhombus-tnso.onrender.com/api/enter/bookhistory",
    { withCredentials: true });
      setAllData(roomsRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 function formatDateToDayMonthYear(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) {
    throw new Error('Invalid date',Error);
  }

  const day = date.getUTCDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}
  return (
    <div className="body9c">
    <Header />

      <div className="body2">
        <div className="table-containerz">
          <h2>Book History</h2>
          <div className="table-scroll-wrapperz">
            <table className="scrollable-table">
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Book ID</th>
                  <th>Book Status</th>
                  <th>Borrow Date</th>
                </tr>
              </thead>
              <tbody>
                {allData === null ? (
                  <tr>
                    <td colSpan="3">Loading rooms...</td>
                  </tr>
                ) : (
                  allData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.bookName}</td>
                      <td>{data.bookid}</td>
                      <td>{data.bookstatus}</td>
                      <td>{formatDateToDayMonthYear(data.issudate)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default S;