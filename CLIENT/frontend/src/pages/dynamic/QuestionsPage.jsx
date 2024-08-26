import { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('http://localhost:5000/api/questions');
      setQuestions(response.data);
    };

    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/submit-answers', { answers });
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <div>
      <h1>Questions</h1>
      <form>
        {questions.map((q) => (
          <div key={q._id}>
            <label>{q.text}</label>
            <input
              type="text"
              name={q._id}
              value={answers[q._id] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default QuestionsPage;
