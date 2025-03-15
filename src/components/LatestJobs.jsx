import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const jobs = useSelector((state) => state.jobs.job);

  return (
    <>
      {/* Heading with Smooth Fade-in Effect */}
      <motion.h1
        className="text-purple-600 font-bold text-4xl p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Latest Jobs
      </motion.h1>

      {/* Job Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {jobs?.slice(0, 6).map((data, index) => (
          <motion.div
            key={index}
            className="w-[330px] max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link to={`jobs/description/${data._id}`}>
              {/* Company Logo & Job Title */}
              <div className="flex gap-1">
                <div className="flex mb-4">
                  <img
                    src={data?.company?.logo}
                    alt="Company Logo"
                    className="w-[50px] h-[50px] rounded-xl"
                  />
                </div>
                <div className="m-auto font-bold text-xl">{data.title}</div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{data.description}</p>

              {/* Job Details */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">Job Type:</span>
                  <span>{data.jobType}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">Salary:</span>
                  <span>{data.salary} LPA</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">Location:</span>
                  <span>{data.location}, India</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default LatestJobs;
