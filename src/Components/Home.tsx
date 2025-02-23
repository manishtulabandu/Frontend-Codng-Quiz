import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1>Welcome to the Coding Quiz</h1>
      <p>Select a topic to start your quiz:</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <motion.button
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/sql-quiz")}
        >
          Start SQL Quiz
        </motion.button>

        <motion.button
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/java-quiz")}
        >
          Start Java Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Home;
