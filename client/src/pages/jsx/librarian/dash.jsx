import { useNavigate } from 'react-router-dom';
import { MdMenu } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";
import { 
  MdMeetingRoom, 
  MdFolder, 
  MdArrowCircleLeft,
  MdCancel,
  MdBusiness ,
  MdCheckCircle ,
  MdCreateNewFolder ,
  MdDevicesFold ,
  MdFlood ,
  MdFollowTheSigns ,
  MdFormatListNumbered ,
} from 'react-icons/md';
import React, { useEffect, useState } from "react";
import { ObjectId } from 'bson';
import axios from "axios";
import "../../css/dash.css";

function Bh() {
    function toggleNav() {
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}

const navigate = useNavigate();
const [allData, setAllData] = useState(null);
const [allData2, setAllData2] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const roomsRes = await axios.get("http://localhost:3001/api/enter/allbookhistory",
    { withCredentials: true });
      setAllData(roomsRes.data.data);
      const roomsRes2 = await axios.get("http://localhost:3001/api/enter/totalmember",
    { withCredentials: true });
      setAllData2(roomsRes2.data.data);
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
        <div className='body'>
            <div className='container'>
              <div className='navigation'>
                    <ul>
                        <li>
                            <a onClick={() => navigate('/dash')} >
                                <span1 className='icon'>🏛</span1>
                                <span1 className='title'>RHOMBUS</span1>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/dash2')}>
                                <span1 className='icon'><MdBusiness  /></span1>
                                <span1 className='title'>Other</span1>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/upcomingbook')}>
                                <span1 className='icon'><MdCheckCircle  /></span1>
                                <span1 className='title'>Add Upcoming</span1>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/addbook')}>
                                <span1 className='icon'><MdCreateNewFolder  /></span1>
                                <span1 className='title'>Add Book</span1>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/removebook')}>
                                <span1 className='icon'><MdDevicesFold  /></span1>
                                <span1 className='title'>Remove Book</span1>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/adminrooms')}>
                                <span1 className='icon'><MdFlood /></span1>
                                <span1 className='title'>Rooms</span1>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/adminreturndue')}>
                                <span1 className='icon'><MdFollowTheSigns  /></span1>
                                <span1 className='title'>Return Due</span1>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/adminbookhistory')}>
                                <span1 className='icon'><MdFormatListNumbered  /></span1>
                                <span1 className='title'>Book History</span1>
                            </a>
                        </li>
                        <li>
                            <a onClick={handleLogout}>
                                <span1 className='icon'><VscSignOut /></span1>
                                <span1 className='title'>Logout</span1>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="main">
                    <div className="topbar">
                        <div className="toggle" onClick={toggleNav}>
                            <MdMenu />
                        </div>
                        <div className="toggle">
                            Admin Dashboard</div>
                        <div className="toggle" onClick={() => navigate('/dash2')}>
                            <MdBusiness  /></div>
                    </div>

                   <div className="cardbox">
  <div className="box" onClick={() => navigate('/deleteroom')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Delete Room</div>
    </div>
    <div className="iconbx">
      <MdMeetingRoom />
    </div>
  </div>

  <div className="box" onClick={() => navigate('/issuebook')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Issue Book</div>
    </div>
    <div className="iconbx">
      <MdFolder />
    </div>
  </div>

  <div className="box" onClick={() => navigate('/returnbook')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Return Book</div>
    </div>
    <div className="iconbx">
      <MdArrowCircleLeft />
    </div>
  </div>

  <div className="box" onClick={() => navigate('/deleteupcomingbook')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Remove Upcoming</div>
    </div>
    <div className="iconbx">
      <MdCancel />
    </div>
  </div>
</div>

                    <div className="details" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
                        <div className="recentborrow" style={{ flex: 1 }}>
                            <div className="cardheader">
                                <h2>Recent Activity</h2>
                                
                            </div>
                            <div className="table-containere" style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th>Bookid</th>
                                            <th>LID</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData === null ? (
                  <tr>
                    <td colSpan="3">Loading...</td>
                  </tr>
                ) : (
                  allData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.bookid}</td>
                      <td>{data.SID}</td>
                      <td>{new ObjectId(data._id).getTimestamp().toLocaleString()}</td>
                      <td>{data.bookstatus}</td>
                    </tr>
                  ))
                )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="recentAccount" style={{ flex: 1 }}>
                            <div className="cardheader">
                                <h2>Recent Account</h2>
                            </div>
                            <div className="table-containere" style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Join Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData2 === null ? (
                  <tr>
                    <td colSpan="3">Loading...</td>
                  </tr>
                ) : (
                  allData2.map((data, index) => (
                    <tr key={index}>
                      <td>{data.email}</td>
                      <td>{new ObjectId(data._id).getTimestamp().toLocaleString()}</td>
                    </tr>
                  ))
                )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bh;
