import React from 'react';
import AnswerButton from './AnswerButton';
import { LEVELS, POINTS } from '../data';

const QuestionCard = ({ currentQuestion, currentIndex, status, selectedOption, onSelectOption }) => {
  return (
    <div className="question-card">
      <h3>
        Câu {currentIndex + 1}/15 · {LEVELS[currentQuestion.level]} · {POINTS[currentQuestion.level]} điểm
      </h3>
      <p><strong>{currentQuestion.question}</strong></p>
      <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {currentQuestion.options.map((opt, idx) => (
          <AnswerButton 
            key={idx}
            index={idx}
            optionText={opt}
            status={status}
            selectedOption={selectedOption}
            correctAnswer={currentQuestion.answer}
            onSelect={onSelectOption}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard; 