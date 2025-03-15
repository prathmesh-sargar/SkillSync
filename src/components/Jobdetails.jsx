import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from 'react-loader-spinner';
import { setLoading } from "../redux/authSlice";
import { motion } from "framer-motion";

const Jobdetails = () => {
  const [jobdata, setJobdata] = useState({});
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const applyJobHandler = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/application/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/job/get/${jobId}`, { withCredentials: true });
        setJobdata(res.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error.response?.data.message || error.message);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  return (
    <motion.div 
      className="min-h-screen bg-gray-100 py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-semibold text-gray-800 mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {jobdata.title}
        </motion.h1>
        
        <motion.div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-gray-700">Description</h2>
            <p className="text-gray-600 mt-2">{jobdata.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">Requirements</h2>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              {jobdata?.requirements?.map((requirement, index) => (
                <motion.li 
                  key={index} 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {requirement}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-700">Salary</h2>
              <p className="text-gray-600 mt-1">{jobdata.salary} <span className="font-bold">LPA</span></p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-700">Experience</h2>
              <p className="text-gray-600 mt-1">{jobdata.experienceLevel}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-700">Location</h2>
              <p className="text-gray-600 mt-1">{jobdata.location}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-700">Job Type</h2>
              <p className="text-gray-600 mt-1">{jobdata.jobType}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-700">Position <span className="text-sm text-slate-500"> ( number of openings )</span></h2>
              <p className="text-gray-600 mt-1">{jobdata.position}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="submit"
            className="md:w-[160px] bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            onClick={applyJobHandler}
          >
            {loading ? (
              <div className="flex justify-center">
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </div>
            ) : (
              <>Apply Now</>
            )}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Jobdetails;
