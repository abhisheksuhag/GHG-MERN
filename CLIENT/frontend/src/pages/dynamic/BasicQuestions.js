import { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout';

const BasicQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        setQuestions(response.data.filter(q => q.type === 'basic'));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Answers:', answers);
    // Here you would send the answers to your backend
  };

  return (
    <MainLayout>
      <h1>Basic Questions</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q._id}>
            <label>{q.text}</label>
            <input
              type={q.fieldType}
              name={q._id}
              value={answers[q._id] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </MainLayout>
  );
};

export default BasicQuestions;
