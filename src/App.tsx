import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import SQLExercises from "./Components/SQLQuiz";
import JavaExercises from "./Components/JavaQuiz";
import Results from "./Components/Results";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sql-quiz" element={<SQLExercises />} />
        <Route path="/java-quiz" element={<JavaExercises />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
