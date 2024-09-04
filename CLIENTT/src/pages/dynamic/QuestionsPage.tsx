import { useEffect, useState } from 'react';
import axios from 'axios';

interface Question {
  _id: string;
  questionText: string;
  type: string;
  options?: string[]; // Optional for dropdown questions
  required: boolean;
}

interface Answer {
  [key: string]: string | number; // Key-value pair for questionId and answer
}

function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions', {
          params: {
            category: 'detailed', // Change this to 'detailed' for detailed questions
          },
        });
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, questionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/submit-answers', {
        userId: 1, // Placeholder; later this will be the authenticated user's ID
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      });

      console.log('Answers submitted:', response.data);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Questions</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question._id}>
            <label htmlFor={question._id}>{question.questionText}</label>

            {question.type === 'text' && (
              <input
                type="text"
                name={question._id}
                id={question._id}
                onChange={(e) => handleChange(e, question._id)}
                required={question.required}
                placeholder={`Enter ${question.questionText.toLowerCase()}`} // Adding a placeholder for text inputs
                title={question.questionText} // Adding title attribute for accessibility
              />
            )}

            {question.type === 'number' && (
              <input
                type="number"
                name={question._id}
                id={question._id}
                onChange={(e) => handleChange(e, question._id)}
                required={question.required}
                placeholder={`Enter ${question.questionText.toLowerCase()}`} // Adding a placeholder for number inputs
                title={question.questionText} // Adding title attribute for accessibility
              />
            )}

            {question.type === 'dropdown' && question.options && (
              <select
                name={question._id}
                id={question._id}
                onChange={(e) => handleChange(e, question._id)}
                required={question.required}
                title={question.questionText} // Adding title attribute for accessibility
              >
                <option value="">Select an option</option>
                {question.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QuestionsPage;
