import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/global.css";

interface SQLExercise {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  problemStatement: string;
  options: string[];
  correctOption: string;
  hint: string;
  explanation: string;
}

const SQLQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<SQLExercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [attempt, setAttempt] = useState<number>(1);
  const [feedback, setFeedback] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<
    {
      question: string;
      selected: string;
      correct: string;
      explanation: string;
    }[]
  >([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false); // Disable answer selection after correct response

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch("/exercises/sql");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (questions.length === 0) return <div>No questions available.</div>;

  const currentQuestion = questions[currentIndex];

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      setFeedback("⚠ Please select an option.");
      return;
    }

    if (selectedAnswer === currentQuestion.correctOption) {
      setFeedback("✅ Correct! Click 'Next Question' to continue.");
      setScore(score + 1);
      setIsDisabled(true);
      setAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.problemStatement,
          selected: selectedAnswer,
          correct: currentQuestion.correctOption,
          explanation: currentQuestion.explanation,
        },
      ]);
    } else {
      if (attempt === 1) {
        setFeedback(`❌ Incorrect. Hint: ${currentQuestion.hint}`);
        setAttempt(2);
      } else {
        setFeedback(
          `❌ Incorrect again. The correct answer is: ${currentQuestion.correctOption}. Explanation: ${currentQuestion.explanation}`
        );
        setIsDisabled(true); // Prevent further attempts
        setAnswers((prev) => [
          ...prev,
          {
            question: currentQuestion.problemStatement,
            selected: selectedAnswer,
            correct: currentQuestion.correctOption,
            explanation: currentQuestion.explanation,
          },
        ]);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer("");
      setAttempt(1);
      setFeedback("");
      setIsDisabled(false);
    } else {
      setQuizCompleted(true);
      navigate("/results", {
        state: { score, total: questions.length, answers },
      });
    }
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>SQL Quiz</h1>

      {!quizCompleted ? (
        <motion.div
          className="question-container"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2>
            Question {currentIndex + 1}: {currentQuestion.title}
          </h2>
          <p>{currentQuestion.problemStatement}</p>

          <div className="options-container">
            {currentQuestion.options.map((option, idx) => (
              <motion.label
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                  disabled={isDisabled}
                />
                {option}
              </motion.label>
            ))}
          </div>

          {!feedback ||
          (!feedback.startsWith("✅ Correct") &&
            !feedback.includes("The correct answer is")) ? (
            <motion.button
              onClick={handleSubmitAnswer}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              disabled={isDisabled}
            >
              Submit Answer
            </motion.button>
          ) : (
            <motion.button
              onClick={handleNextQuestion}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Next Question
            </motion.button>
          )}

          {feedback && <p className="feedback">{feedback}</p>}
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default SQLQuiz;
