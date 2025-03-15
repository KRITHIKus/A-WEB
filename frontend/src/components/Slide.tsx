import { motion } from "framer-motion";
import React from "react";

interface SlideProps {
  title: string;
  content: string;
}

const Slide: React.FC<SlideProps> = ({ title, content }) => {
  return (
    <motion.div
      className="w-full h-screen flex flex-col justify-center items-center px-6 text-center bg-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-3xl transition-all duration-500">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

export default Slide;
