import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import { useUser } from './UserContext';
import GoogleRedirect from './GoogleRedirect.jsx'

import Header from './components/topbar/header.jsx';

import AdminAddbook from './pages/jsx/librarian/addbook.jsx';
import AdminAddRoom from './pages/jsx/librarian/addroom.jsx';
import AdminBookHistory from './pages/jsx/librarian/adminbookhistory.jsx';
import AdminRegistration from './pages/jsx/librarian/adminregistration.jsx';
import AdminReturnDue from './pages/jsx/librarian/adminreturndue.jsx';
import AdminRoomReservation from './pages/jsx/librarian/adminroomreservation.jsx';
import AdminRooms from './pages/jsx/librarian/adminrooms.jsx';
import AdminBookDetails2 from './pages/jsx/librarian/bookdetails2.jsx';
import AdminBooks2 from './pages/jsx/librarian/books2.jsx';
import AdminDeleteLibraryCard from './pages/jsx/librarian/deletelibrary.jsx';
import AdminDeleteRoom from './pages/jsx/librarian/deleteroom.jsx';
import AdminDeleteUpcomingBook from './pages/jsx/librarian/deleteupcomingbook.jsx';
import AdminEditBook from './pages/jsx/librarian/editbook.jsx';
import AdminEditUpcomingBook from './pages/jsx/librarian/editupcoming.jsx';
import AdminGetBook from './pages/jsx/librarian/getbookforedit.jsx';
import AdminGetUpcomingBook from './pages/jsx/librarian/getupcomingforedit.jsx';
import AdminIssueBook from './pages/jsx/librarian/issuebook.jsx';
import AdminRemoveBook from './pages/jsx/librarian/removebook.jsx';
import AdminReturnBook from './pages/jsx/librarian/returnbook.jsx';
import AdminBookSearch2 from './pages/jsx/librarian/searchbook.jsx'
import AdminADDSID from './pages/jsx/librarian/studentids.jsx'
import AdminUpcomingBook from './pages/jsx/librarian/upcomingbook.jsx'
import AdminSeeUpBooks2 from './pages/jsx/librarian/upcomingshow2.jsx'
import AdminDash from './pages/jsx/librarian/dash.jsx';
import AdminDash2 from './pages/jsx/librarian/dash2.jsx';
import AdminDeleteSignup from './pages/jsx/librarian/deletesignupaccount.jsx';
import AdminDeleteAdmin from './pages/jsx/librarian/deleteadmin.jsx';

import StudentApply from './pages/jsx/student/applyroom.jsx';
import StudentBookDetails from './pages/jsx/student/bookdetails.jsx';
import StudentBookHistory from './pages/jsx/student/bookhistory.jsx';
import StudentBooks from './pages/jsx/student/books.jsx';
import StudentBookSearch from './pages/jsx/student/booksearch.jsx';
import StudentEditLibraryCard from './pages/jsx/student/editlibrarycard.jsx';
import StudentLcard from './pages/jsx/student/librarycard.jsx';
import StudentRemoveReservation from './pages/jsx/student/removeroomreservation.jsx';
import StudentReturnDue from './pages/jsx/student/returndue.jsx';
import StudentRooms from './pages/jsx/student/rooms.jsx';
import StudentStudentAccount from './pages/jsx/student/studentaccount.jsx';
import StudentShome from './pages/jsx/student/studenthome.jsx';
import StudentSeeUpBooks from './pages/jsx/student/upcomingshow.jsx'
import Login from './entry/loginV2.jsx';
import ResetPassword from './entry/resetpass.jsx';



function App() {

  const { user } = useUser();

  return (
    <BrowserRouter>
    <Routes>


      <Route path='/' element={<Login/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword />}/>
      <Route path="/google-success" element={<GoogleRedirect />} />


      <Route path='/addbook' element={<ProtectedRoute allowedRoles={['admin']}><AdminAddbook/></ProtectedRoute>}/>
      <Route path="/addroom" element={<ProtectedRoute allowedRoles={['admin']}><AdminAddRoom /></ProtectedRoute>} />
      <Route path='/adminbookhistory' element={<ProtectedRoute allowedRoles={['admin']}><AdminBookHistory/></ProtectedRoute>}/>
      <Route path="/adminregistration" element={<ProtectedRoute allowedRoles={['admin']}><AdminRegistration /></ProtectedRoute>} />
      <Route path='/adminreturndue' element={<ProtectedRoute allowedRoles={['admin']}><AdminReturnDue/></ProtectedRoute>}/>
      <Route path="/adminroomreservation" element={<ProtectedRoute allowedRoles={['admin']}><AdminRoomReservation /></ProtectedRoute>} />
      <Route path='/adminrooms' element={<ProtectedRoute allowedRoles={['admin']}><AdminRooms/></ProtectedRoute>}/>
      <Route path="/book2/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminBookDetails2 /></ProtectedRoute>} />
      <Route path='/books2' element={<ProtectedRoute allowedRoles={['admin']}><AdminBooks2/></ProtectedRoute>}/>
      <Route path="/deletelibrary" element={<ProtectedRoute allowedRoles={['admin']}><AdminDeleteLibraryCard /></ProtectedRoute>} />
      <Route path='/deleteroom' element={<ProtectedRoute allowedRoles={['admin']}><AdminDeleteRoom/></ProtectedRoute>}/>
      <Route path='/deleteupcomingbook' element={<ProtectedRoute allowedRoles={['admin']}><AdminDeleteUpcomingBook/></ProtectedRoute>}/>
      <Route path="/editbook/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminEditBook /></ProtectedRoute>} />
      <Route path="/editupcomingbook/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminEditUpcomingBook /></ProtectedRoute>} />
      <Route path="/getbook" element={<ProtectedRoute allowedRoles={['admin']}><AdminGetBook /></ProtectedRoute>} />
      <Route path="/getupcomingbook" element={<ProtectedRoute allowedRoles={['admin']}><AdminGetUpcomingBook /></ProtectedRoute>} />
      <Route path='/issuebook' element={<ProtectedRoute allowedRoles={['admin']}><AdminIssueBook/></ProtectedRoute>}/>
      <Route path='/removebook' element={<ProtectedRoute allowedRoles={['admin']}><AdminRemoveBook/></ProtectedRoute>}/>
      <Route path='/returnbook' element={<ProtectedRoute allowedRoles={['admin']}><AdminReturnBook/></ProtectedRoute>}/>
      <Route path="/searchbook" element={<ProtectedRoute allowedRoles={['admin']}><AdminBookSearch2 /></ProtectedRoute>} />
      <Route path="/addsid" element={<ProtectedRoute allowedRoles={['admin']}><AdminADDSID /></ProtectedRoute>} />
      <Route path='/upcomingbook' element={<ProtectedRoute allowedRoles={['admin']}><AdminUpcomingBook/></ProtectedRoute>}/>
      <Route path="/upcomingall2" element={<ProtectedRoute allowedRoles={['admin']}><AdminSeeUpBooks2 /></ProtectedRoute>} />
      <Route path='/dash' element={<ProtectedRoute allowedRoles={['admin']}><AdminDash/></ProtectedRoute>}/>
      <Route path='/dash2' element={<ProtectedRoute allowedRoles={['admin']}><AdminDash2/></ProtectedRoute>}/>
      <Route path='/deletesignup' element={<ProtectedRoute allowedRoles={['admin']}><AdminDeleteSignup/></ProtectedRoute>}/>
      <Route path='/deleteadmin' element={<ProtectedRoute allowedRoles={['admin']}><AdminDeleteAdmin/></ProtectedRoute>}/>



      <Route path='/applyroom' element={<ProtectedRoute allowedRoles={['student']}><StudentApply/></ProtectedRoute>}/>
      <Route path="/book/:id" element={<ProtectedRoute allowedRoles={['student']}><StudentBookDetails /></ProtectedRoute>} />
      <Route path='/bookhistory' element={<ProtectedRoute allowedRoles={['student']}><StudentBookHistory/></ProtectedRoute>}/>
      <Route path='/books' element={<ProtectedRoute allowedRoles={['student']}><StudentBooks/></ProtectedRoute>}/>
      <Route path='/booksearch/:bookNam' element={<ProtectedRoute allowedRoles={['student']}><StudentBookSearch/></ProtectedRoute>}/>
      <Route path="/editlibrarycard" element={<ProtectedRoute allowedRoles={['student']}><StudentEditLibraryCard /></ProtectedRoute>} />
      <Route path='/librarycard' element={<ProtectedRoute allowedRoles={['student']}><StudentLcard/></ProtectedRoute>}/>
      <Route path="/removereservation" element={<ProtectedRoute allowedRoles={['student']}><StudentRemoveReservation /></ProtectedRoute>} />
      <Route path='/returndue' element={<ProtectedRoute allowedRoles={['student']}><StudentReturnDue/></ProtectedRoute>}/>
      <Route path='/rooms' element={<ProtectedRoute allowedRoles={['student']}><StudentRooms/></ProtectedRoute>}/>
      <Route path="/studentaccount" element={<ProtectedRoute allowedRoles={['student']}><StudentStudentAccount /></ProtectedRoute>} />
      <Route path='/studenthome' element={<ProtectedRoute allowedRoles={['student']}><StudentShome/></ProtectedRoute>}/>
      <Route path="/upcomingall" element={<ProtectedRoute allowedRoles={['student']}><StudentSeeUpBooks /></ProtectedRoute>} />


    </Routes>
  </BrowserRouter>
  );
}

export default App;
/*


*/