import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/upcoming.css';
import "../../css/adminrooms.css";
import Header2 from '../../../components/topbar/headerAdmin.jsx';

function S() {
  const [allData, setAllData] = useState(null);
  const [endTimes, setEndTimes] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const formatTo12Hour = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":")) {
      return "Invalid time";
    }

    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  const getData = async () => {
    try {
      const roomsRes = await axios.get("https://rhombus-tnso.onrender.com/api/enter/rooms",
    { withCredentials: true });
    setAllData(roomsRes.data.data);
      const timesRes = await axios.get("https://rhombus-tnso.onrender.com/api/enter/applyroomshow",
    { withCredentials: true });
      setEndTimes(timesRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getRoomEndTime = (roomNumber) => {
    const match = endTimes?.find((et) => et.roomnumber === roomNumber);
    return match ? formatTo12Hour(match.end) : null;
  };

  const getRoomSID = (roomNumber) => {
    const match = endTimes?.find((et) => et.roomnumber === roomNumber);
    return match ? match.SID : null;
  };

  const getRoomName = (roomNumber) => {
    const match = endTimes?.find((et) => et.roomnumber === roomNumber);
    return match ? match.name : null;
  };
  return (
    <div className="body9g">
    <Header2/>

      <div className="body2">
        <div className="table-containerz">
          <h2>Rooms</h2>
          <div className="table-scroll-wrapperz">
            <table className="scrollable-table">
              <thead>
                <tr>
                  <th>Room No</th>
                  <th>Available</th>
                  <th>Reservation</th>
                  <th>Name</th>
                  <th>Library ID</th>
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
                      <td>{data.roomnumber}</td>
                      <td>
                        {data.avilable === "YES" ? (
                          <span1 className="available">✅</span1>
                        ) : (
                          <span1 className="booked">Booked</span1>
                        )}
                      </td>
                      <td>
                        {data.avilable === "YES" ? (
                          <button
                            className="xadd-btn"
                          >
                            Clean
                          </button>
                        ) : (
                          <span2>
                            {getRoomEndTime(data.roomnumber)
                              ? `Ends at : ${getRoomEndTime(data.roomnumber)}`
                              : "No end time available"}
                          </span2>
                        )}
                      </td>
                      <td>
                        {data.avilable === "YES" ? (
                          <button
                            className="xadd-btn"
                          >
                            Clean
                          </button>
                        ) : (
                          <span2>
                            {getRoomName(data.roomnumber)
                              ? `${getRoomName(data.roomnumber)}`
                              : "No end time available"}
                          </span2>
                        )}
                      </td>
                      <td>
                        {data.avilable === "YES" ? (
                          <button
                            className="xadd-btn"
                          >
                            Clean
                          </button>
                        ) : (
                          <span2>
                            {getRoomSID(data.roomnumber)
                              ? `${getRoomSID(data.roomnumber)}`
                              : "No end time available"}
                          </span2>
                        )}
                      </td>
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