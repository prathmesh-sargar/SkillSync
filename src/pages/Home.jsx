
import { useEffect } from "react"
import Hero from "../components/Hero"
import LatestJobs from "../components/LatestJobs"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getJobs } from "../redux/jobSlice"
import { useNavigate } from "react-router-dom"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Home = () => {

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   useEffect(()=>{   
    if(user?.role === 'recruiter'){
      navigate("/admin/companies");
    }
},[navigate, user?.role]);

const jobQuery = useSelector((state)=>state.jobs.jobQuery)


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/job/get?keyword=${jobQuery}`, {
          withCredentials: true, // Include if backend uses cookies or sessions
        });
        // console.log("Jobs fetched successfully:", res.data.jobs);
        dispatch(getJobs(res.data.jobs));
      } catch (error) {
        if (error.response) {
          console.error("Response error:", error.response.data);
        } else if (error.request) {
          console.error("No response from server:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    };

    fetchJobs();
  }, [dispatch, jobQuery]);


  return (
    <>
     <Hero/>
     <LatestJobs/>
    
    </>
  )
}

export default Home