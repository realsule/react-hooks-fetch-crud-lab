import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("0");
  
   const handleSubmit = (e) => {
    e.preventDefault();
    onAddQuestion({ prompt, answer1, answer2, correctAnswer });
    setPrompt("");
    setAnswer1("");
    setAnswer2("");
    setCorrectAnswer("0");
  };

  return (
    <section>
      <h1>New Question</h1>
       <form onSubmit={handleSubmit}>
      <label>
        Prompt
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          aria-label="Prompt"
        />
      </label>
      <label>
        Answer 1
        <input
          type="text"
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
          aria-label="Answer 1"
        />
      </label>
      <label>
        Answer 2
        <input
          type="text"
          value={answer2}
          onChange={(e) => setAnswer2(e.target.value)}
          aria-label="Answer 2"
        />
      </label>
      <label>
        Correct Answer
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          aria-label="Correct Answer"
        >
          <option value="0">Answer 1</option>
          <option value="1">Answer 2</option>
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
      
    </section>
  );
}

export default QuestionForm;
