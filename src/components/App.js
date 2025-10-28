import React, { useEffect,useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
     const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((data) => setQuestions(data));
  }, []);

  const addQuestion = async (newQuestion) => {
    const response = await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: newQuestion.prompt,
        answers: [newQuestion.answer1, newQuestion.answer2],
        correctIndex: parseInt(newQuestion.correctAnswer, 10),
      }),
    });
    const created = await response.json();
    setQuestions([...questions, created]);
    setPage("List");
  };

  const deleteQuestion = async (id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = async (id, correctIndex) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    });
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, correctIndex } : q
      )
      
    );
  };


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ?
       <QuestionForm onAddQuestion={addQuestion} /> 
      :
       <QuestionList 
          questions={questions}
          onDeleteQuestion={deleteQuestion}
          onUpdateCorrectAnswer={updateQuestion}
       />}
    </main>
  );
}

export default App;
