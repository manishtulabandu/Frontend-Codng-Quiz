import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Answer {
  question: string;
  selected: string;
  correct: string;
  explanation: string;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, answers, quizType } = location.state as {
    score: number;
    total: number;
    answers: Answer[];
    quizType: string;
  };

  return (
    <motion.div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        background: "rgba(255, 255, 255, 0.15)",
        borderRadius: "15px",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        color: "white",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>🎉 {quizType} Quiz Completed!</h1>
      <p
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}
      >
        Your Score: <span style={{ color: "#4caf50" }}>{score}</span> / {total}
      </p>

      <h2 style={{ fontSize: "1.4rem", marginBottom: "15px" }}>
        Results Summary:
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
        }}
      >
        {answers.map((answer, idx) => (
          <motion.div
            key={idx}
            style={{
              width: "100%",
              maxWidth: "700px",
              padding: "20px",
              borderRadius: "10px",
              background: "rgba(0, 0, 0, 0.4)",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
              textAlign: "left",
              borderLeft: `6px solid ${
                answer.selected === answer.correct ? "#4caf50" : "#e74c3c"
              }`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3>
              Q{idx + 1}: {answer.question}
            </h3>
            <p>
              <strong>Your Answer: </strong>
              <span
                style={{
                  color:
                    answer.selected === answer.correct ? "#4caf50" : "#e74c3c",
                }}
              >
                {answer.selected}
              </span>
            </p>
            <p>
              <strong>Correct Answer: </strong>
              <span style={{ color: "#4caf50" }}>{answer.correct}</span>
            </p>
            <p>
              <strong>Explanation: </strong>
              {answer.explanation}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => navigate("/")}
        style={{
          background: "#ff7eb3",
          border: "none",
          color: "white",
          padding: "12px 18px",
          fontSize: "16px",
          fontWeight: "bold",
          marginTop: "20px",
          cursor: "pointer",
          borderRadius: "8px",
        }}
        whileHover={{ scale: 1.05 }}
      >
        Go to Home
      </motion.button>
    </motion.div>
  );
};

export default Results;
