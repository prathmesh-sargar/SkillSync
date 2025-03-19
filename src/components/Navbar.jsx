import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userLogout = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success("User logout successfully...", res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-white text-black border border-gray-200 shadow-xl sticky  px-4 z-50">
      <div className="flex-1 text-2xl font-bold">
         <Link to="/">Skill<span className="text-xl font-bold text-purple-500">Sync</span></Link>
      </div>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          <FiMenu />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-20 p-4 flex flex-col gap-4">
          {user && user.role === "recruiter" ? (
            <>
              <Link to="/admin/companies" onClick={() => setMenuOpen(false)}>Companies</Link>
              <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/resources" onClick={() => setMenuOpen(false)}>Resource</Link>
              <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
              <Link to="/challenge" onClick={() => setMenuOpen(false)}>Challenges</Link>
              <Link to="/ATS" onClick={() => setMenuOpen(false)}>check Resume</Link>
              <Link to="/communicate" onClick={() => setMenuOpen(false)}>Talk</Link>
              <Link to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link>
              <Link to="/communityChat" onClick={() => setMenuOpen(false)}>Community</Link>
              <Link to="/ytcontent" onClick={() => setMenuOpen(false)}>Search</Link>
            </>
          )}
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 mr-[35%] px-2 font-semibold">
        {user && user.role === "recruiter" ? (
          <>
            <Link to="/admin/companies">Companies</Link>
            <Link to="/admin/jobs">Jobs</Link>
          </>
        ) : (
          <>
            <Link to="/resources">Resource</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/challenge">Challenges</Link>
            <Link to="/ATS">Resume</Link>
            <Link to="/communicate">Talk</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/communityChat">Community</Link>
            <Link to="/ytcontent">Search</Link>
          </>
        )}
      </div>
      
      {/* Authentication Buttons */}
      {!user ? (
        <div className="gap-2 flex">
          <button className="px-3 py-2 bg-purple-600 hover:bg-purple-800 rounded-lg text-white font-semibold">
            <Link to="/login">Login</Link>
          </button>
          <button className="px-3 py-2 bg-slate-600 hover:bg-slate-800 rounded-lg text-white font-semibold">
            <Link to="/signup">Signup</Link>
          </button>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="User profile Photo" src={user.profile?.profilephoto} />
            </div>
          </button>
          {dropdownOpen && (
            <ul
              className="flex-col absolute right-0 mt-[50px] w-[120px] bg-white text-black rounded-lg shadow p-2 z-10"
              onClick={() => setDropdownOpen(false)}
            >
              {user?.role === "student" && (
                <li>
                  <Link to="/profile">View Profile</Link>
                </li>
              )}
              <li>
                <a>Settings</a>
              </li>
              <li>
                <span className="cursor-pointer" onClick={userLogout}>Logout</span>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
