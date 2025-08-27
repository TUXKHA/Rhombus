import { FaHome} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdMenu } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";
import { SiPhpmyadmin } from "react-icons/si";
import { 
 
  MdLibraryBooks, 
  MdCheckCircle ,
  MdCreateNewFolder ,
  MdDevicesFold ,
  MdFlood ,
  MdFollowTheSigns ,
  MdFormatListNumbered ,
  MdGavel ,
  MdFrontHand ,
  MdGite ,
  MdGrid4X4 ,
  MdFaceRetouchingNatural ,
  MdContactEmergency ,
  MdConveyorBelt ,
  MdContrast ,
  MdOutlineSearch ,
  MdDeleteForever 
} from 'react-icons/md';
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
                                            <a href='/dash'>
                                                <span1 className='icon'>🏛</span1>
                                                <span1 className='title'>RHOMBUS</span1>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/dash'>
                                                <span1 className='icon'><FaHome  /></span1>
                                                <span1 className='title'>Dashboard</span1>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/upcomingbook'>
                                                <span1 className='icon'><MdCheckCircle  /></span1>
                                                <span1 className='title'>Add Upcoming</span1>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/addbook'>
                                                <span1 className='icon'><MdCreateNewFolder  /></span1>
                                                <span1 className='title'>Add Book</span1>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/removebook'>
                                                <span1 className='icon'><MdDevicesFold  /></span1>
                                                <span1 className='title'>Remove Book</span1>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/adminrooms'>
                                                <span1 className='icon'><MdFlood /></span1>
                                                <span1 className='title'>Rooms</span1>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/adminreturndue'>
                                                <span1 className='icon'><MdFollowTheSigns  /></span1>
                                                <span1 className='title'>Return Due</span1>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/adminbookhistory'>
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
                            More Features</div>
                        <div className="toggle" onClick={() => navigate('/dash')}>
                           <FaHome  /> </div>
                    </div>

                   <div className="cardbox">
  <div className="box" onClick={() => navigate('/books2')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">See Books</div>
    </div>
    <div className="iconbx">
      <MdLibraryBooks />
    </div>
  </div>

  <div className="box" onClick={() => navigate('/adminroomreservation')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Maintain Room</div>
    </div>
    <div className="iconbx">
      <MdGavel  />
    </div>
  </div>

  <div className="box" onClick={() => navigate('/deletelibrary')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Delete LID</div>
    </div>
    <div className="iconbx">
      < MdFrontHand />
    </div>
  </div>

  <div className="box" onClick={() => navigate('/getupcomingbook')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Edit Upcoming</div>
    </div>
    <div className="iconbx">
      <MdGrid4X4  />
    </div>
  </div>
</div>
<div className="cardbox">
  <div className="box" onClick={() => navigate('/addroom')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Add Room</div>
    </div>
    <div className="iconbx">
      <MdGite  />
    </div>
  </div>

  <div className="box" onClick={() => navigate('/addsid')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Add Student ID</div>
    </div>
    <div className="iconbx">
      <MdFaceRetouchingNatural  />
    </div>
  </div>

  <div className="box" onClick={() => navigate('/adminregistration')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Add Admin</div>
    </div>
    <div className="iconbx">
      <MdContactEmergency  />
    </div>
  </div>

  <div className="box" onClick={() => navigate('/getbook')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Edit Book</div>
    </div>
    <div className="iconbx">
      <MdConveyorBelt  />
    </div>
  </div>
</div>
<div className="cardbox">
  <div className="box" onClick={() => navigate('/searchbook')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Search Book</div>
    </div>
    <div className="iconbx">
      <MdOutlineSearch  />
    </div>
  </div>

  <div className="box" onClick={() => navigate('/upcomingall2')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Upcoiming Books</div>
    </div>
    <div className="iconbx">
      <MdContrast  />
    </div>
  </div>
  <div className="box" onClick={() => navigate('/deletesignup')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Delete Student Account</div>
    </div>
    <div className="iconbx">
      <MdDeleteForever   />
    </div>
  </div>
  <div className="box" onClick={() => navigate('/deleteadmin')} style={{ cursor: 'pointer' }}>
    <div>
      <div className="numbers">Delete Admin Account</div>
    </div>
    <div className="iconbx">
      <SiPhpmyadmin   />
    </div>
  </div>
</div>

                </div>
            </div>
        </div>
    );
}

export default Bh;
