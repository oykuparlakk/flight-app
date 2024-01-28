import React, { useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }} 
      className="bg-gray-300 rounded-lg text-black p-5 relative flex items-center mb-3"
    >
      <button
        onClick={onClose}
        className="close-button absolute top-2 right-5 text-xl"
      >
        &times;
      </button>
      <div className="flex items-center">
        <FaInfoCircle className="text-5xl mb-2 mr-2" />
      </div>
      <span>{message}</span>
    </motion.div>
  );
};

export default Notification;
