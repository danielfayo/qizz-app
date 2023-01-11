import React, { useState } from "react";
import LauchPage from "./components/LauchPage";
// import LauchPage from "./components/LauchPage";
import QuestionPage from "./components/QuestionPage";

function App() {

  const [startQuiz, setStartQuiz] = useState(false)
  
  return (
    <>
      {startQuiz ? <QuestionPage onClick={()=>setStartQuiz(false)} /> : <LauchPage onClick={()=>setStartQuiz(true)} />}
    </>
  );
}

export default App;
