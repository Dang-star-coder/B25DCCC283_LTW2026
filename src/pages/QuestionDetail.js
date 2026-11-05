import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LEVELS, POINTS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const numericId = Number(id);
  const currentQuestion = questions.find(q => q.id === numericId);

  if (!currentQuestion) {
    return (
      <div>
        <h3>Không tìm thấy câu hỏi.</h3>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const currentIndex = questions.findIndex(q => q.id === numericId);
  const prevQuestion = questions[currentIndex - 1];
  const nextQuestion = questions[currentIndex + 1];

  return (
    <div className="question-detail">
      <h3>
        Câu hỏi số {currentQuestion.id} ({LEVELS[currentQuestion.level]} · {POINTS[currentQuestion.level]} điểm)
      </h3>
      <p><strong>{currentQuestion.question}</strong></p>
      <ul>
        {currentQuestion.options.map((opt, idx) => {
          const isCorrect = idx === currentQuestion.answer;
          return (
            <li key={idx} style={{ color: isCorrect ? 'green' : 'inherit', fontWeight: isCorrect ? 'bold' : 'normal' }}>
              {LETTERS[idx]}. {opt} {isCorrect && '(Đáp án đúng)'}
            </li>
          );
        })}
      </ul>

      <div className="nav-buttons">
        {prevQuestion ? <Link to={`/questions/${prevQuestion.id}`}>← Câu trước</Link> : <span>Không có Câu trước</span>}
        {' | '}
        {nextQuestion ? <Link to={`/questions/${nextQuestion.id}`}>Câu sau →</Link> : <span>Không có Câu sau</span>}
      </div>

      <br />
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default QuestionDetail; 