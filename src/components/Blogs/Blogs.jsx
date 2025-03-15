import { useState } from 'react';
import { motion } from 'framer-motion';

function Blogs() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

   // Dummy blog data for each category
   const dummyBlogs = {
    "MERN": [
      { title: 'Getting Started with MERN Stack', snippet: 'Learn the basics of MERN Stack development...', url: 'https://dev.to/bhavik786/getting-started-with-mern-stack-a-step-by-step-guide-kcn' },
      { title: 'Advanced MERN Techniques', snippet: 'Take your MERN skills to the next level...', url: 'https://dev.to/sasvbahub/advanced-mern-stack-course-2od3' },
      { title: 'React Hooks Overview', snippet: 'Understand React hooks in depth...', url: 'https://dev.to/galabeketov/mastering-react-hooks-a-comprehensive-guide-for-frontend-developers-41c3' },
    ],
    "Web Development": [
      { title: 'Responsive Web Design Tips', snippet: 'Make your website look great on any device...', url: 'https://dev.to/estheridabor/tips-on-creating-a-responsive-design-13e1' },
      { title: 'Essential Tools for Web Developers', snippet: 'Discover the tools every web developer should know...', url: 'https://dev.to/qmoniqs/8-tools-every-web-developers-should-learn-in-2023-1l08' },
    ],
    "Python Full Stack": [
      { title: 'Building Full-Stack Apps with Django', snippet: 'Learn to build web applications with Python...', url: 'https://dev.to/philipokiokio/how-to-build-a-django-rest-framework-post-end-46cn' },
      { title: 'Flask for Beginners', snippet: 'Get started with Flask for Python web development...', url: 'https://dev.to/ketanip/flask-for-beginners-5h5j' },
    ],
    "College Startup Story": [
      { title: 'How We Built Our College Startup', snippet: 'Our journey from idea to execution...', url: 'https://dev.to/antoinette0x53/couch-cms-and-the-lazy-developer' },
      { title: 'Challenges of Running a College Startup', snippet: 'Discover the challenges and how we overcame them...', url: 'https://dev.to/josiahmann/how-i-went-from-9hr-to-selling-a-company-for-7-figures-part-1-3lh0' },
    ],
    "AR VR": [
      { title: 'Introduction to AR VR', snippet: 'Explore the basics of AR and VR...', url: 'https://dev.to/code_passion/introduction-to-virtual-and-augmented-reality-vrar-ab9' },
      { title: 'Building AR Apps', snippet: 'Learn how to build AR applications...', url: 'https://dev.to/forasoft/why-should-android-developers-start-building-ar-apps-before-2024-4ea4' },
    ],
  };

  const filteredBlogs = Object.entries(dummyBlogs)
    .filter(([category]) => !selectedCategory || category === selectedCategory)
    .flatMap(([, blogs]) =>
      blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase()) ||
          blog.snippet.toLowerCase().includes(query.toLowerCase())
      )
    );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 text-center"
    >
      <motion.form 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-6"
      >
        <input
          type="text"
          placeholder="Search for blogs or content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded-md w-full max-w-md"
        />
      </motion.form>

      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {Object.keys(dummyBlogs).map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md text-white ${selectedCategory === category ? 'bg-purple-700' : 'bg-purple-500'}`}
            whileHover={{ scale: 1.1 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <motion.div 
              key={index} 
              className="bg-slate-100 shadow-md rounded-lg p-4"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold text-blue-700 bg-purple-100 rounded-lg">{blog.title}</h3>
              <p className="text-gray-700">{blog.snippet}</p>
              <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
                Read More
              </a>
            </motion.div>
          ))
        ) : (
          <motion.p className="text-gray-500">No blogs found. Try another search term or select a category.</motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Blogs;
