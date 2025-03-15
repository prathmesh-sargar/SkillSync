

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import JobsPage from "./pages/JobsPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfile from "./components/UpdateProfile";
import Jobdetails from "./components/Jobdetails";
import Companies from "./components/Admin/Companies";
import ResisterCompany from "./components/Admin/ResisterCompany";
import SetupCompany from "./components/Admin/SetupCompany";
import AdminJobs from "./components/Admin/Adminjobs";
import PostJob from "./components/Admin/PostJob";
import Applicants from "./components/Admin/Applicants";
import Resource from "./pages/Resource";
import ATSResume from "./components/ATS_Resume/ATSResume";
import Footer from "./components/Footer";
import Blogs from "./components/Blogs/Blogs";
import CommunityChat from "./components/chat/ChatCommunity";
import Improve from "./components/Communication/Improve";
import CoursesList from "./components/challenges/CoursesList";
import ChallengePage from "./components/challenges/ChallengePage";
import Watch from './components/YTclone/Watch'
import HomepageYT from './components/YTclone/HomepageYT'
function App() {

  return (
   <>
 
     <Router>
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/jobs" element={<JobsPage/>}/>
        <Route path="/description/:id" element={<JobsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/profile/update" element={<UpdateProfile/>}/>
        <Route path="jobs/description/:id" element={<Jobdetails/>}/>
        <Route path="/resources" element={<Resource/>}/>
        <Route path="/ATS" element={<ATSResume/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/communityChat" element={<CommunityChat/>}/>
        <Route path="/communicate" element={<Improve/>}/>
        <Route path="/challenge" element={<CoursesList/>}/>
        <Route path="/course/:language" element={<ChallengePage />} />
        <Route path="/watch" element={<Watch/>} />   
        <Route path="/ytcontent" element={<HomepageYT/>} />   

        <Route path="*" element={<div className="text-white">Page not found!</div>} />


        {/* admin */}
        <Route path="/admin/companies" element={<Companies/>}/>
        <Route path="/admin/jobs" element={<AdminJobs/>}/>
        <Route path="/company/create" element={<ResisterCompany/>}/>
        <Route path="/company/setup/:id" element={<SetupCompany/>}/>
        <Route path="/admin/postjob" element={<PostJob/>}/>
        <Route path="/admin/job/:id/applicants" element={<Applicants/>}/>
        

      </Routes>
      <Footer/>
     </Router>
     <Toaster/>
   </>
  )
}

export default App
