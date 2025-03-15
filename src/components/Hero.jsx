import { useState } from "react";
import { useDispatch } from "react-redux";
import { setJobQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  console.log(query);
  dispatch(setJobQuery(query));

  const handleJobSearch = () => {
    navigate("/resources");
  };

  return (
    <>
      <div className="hero min-h-screen relative">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/bg2.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="hero-overlay bg-black bg-opacity-30 absolute top-0 left-0 w-full h-full"></div>

        {/* Content */}
        <div className="hero-content text-neutral-content text-center relative z-">
          <div className="md:w-[500px]">
            <h1 className="mb-5 text-5xl font-bold text-white">
              <ReactTyped
                className="text-white font-bold text-3xl sm:text-3xl md:text-5xl md:w-[700px]"
                strings={[
    'The Ultimate Platform for <span class="text-blue-500 font-extrabold">Job Seekers  </span> and  <span class="text-orange-500 font-extrabold"> Skill Builders </span> ',
    
                ]}
                typeSpeed={50}
                backSpeed={50}
                loop={false}
              />
            </h1>
            <p className="mb-5 text-white md:text-2xl">
              Discover endless opportunities and take the next step in your
              career journey.
            </p>
            <div className="flex items-center justify-center">
              <input
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                type="text"
                placeholder="Search your Dream job ... "
                className="pl-2 py-2 outline-none border border-gray-300 shadow-lg rounded-xl w-3/4 text-black"
              />
              <button
                onClick={handleJobSearch}
                className="bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-800 ml-2 text-white font-semibold transition duration-300"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
