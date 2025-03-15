import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

const JobsPage = () => {
  const Alljobs = useSelector((state) => state.jobs.filterJob);

  return (
    <>
      <div className="flex gap-2 mt-2">
        {/* Sidebar with fade-in effect */}
        <motion.div
          className="w-[20%]"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Sidebar />
        </motion.div>

        {/* Job Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 overflow-y p-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {Alljobs.length <= 0 ? (
            <motion.div
              className="text-gray-600 text-center col-span-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              No Jobs Available
            </motion.div>
          ) : (
            Alljobs.map((data, index) => (
              <motion.div
                key={index}
                className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
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

                {/* Job Description */}
                <p className="text-gray-600 text-sm mb-4">{data.description}</p>

                {/* Buttons with Animations */}
                <div className="flex gap-4">
                  <Link to={`/jobs/description/${data._id}`}>
                    <motion.button
                      className="w-[100px] bg-gray-200 text-purple-700 mt-6 py-2 px-4 rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Details
                    </motion.button>
                  </Link>
                  <motion.button
                    className="w-1/2 bg-indigo-600 text-white mt-6 py-2 px-4 rounded-lg hover:bg-indigo-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Apply Now
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </>
  );
};

export default JobsPage;
