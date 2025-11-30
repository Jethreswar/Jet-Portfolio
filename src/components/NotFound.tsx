import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          className="bg-gray-800 rounded-lg p-10 shadow-lg border border-gray-700 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AlertTriangle size={40} className="text-red-500" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            404
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Oops, the page you are looking for does not exist.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-4"
          >
            <Link to="/">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="mr-2" size={18} />
                Back to Homepage
              </motion.button>
            </Link>
            
            <p className="text-gray-400 mt-6">
              If you think something is broken, please email at{' '}
              <a 
                href="mailto:jethreswarvarada@gmail.com" 
                className="text-blue-400 hover:underline"
              >
                jethreswarvarada@gmail.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
