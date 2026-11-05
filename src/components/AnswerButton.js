import React from 'react';
import { LETTERS } from '../data';

const AnswerButton = ({ index, optionText, status, selectedOption, correctAnswer, onSelect }) => {
  let btnColor = '';
  if (status === 'locked' && selectedOption === index) {
    btnColor = 'yellow'; // đang chốt
  } else if (status === 'revealed') {
    if (index === correctAnswer) btnColor = 'green';
    else if (selectedOption === index) btnColor = 'red';
  }

  return (
    <button 
      onClick={() => onSelect(index)}
      disabled={status !== 'answering'}
      style={{ backgroundColor: btnColor, color: '#000', padding: '10px', cursor: 'pointer' }}
    >
      {LETTERS[index]}. {optionText}
    </button>
  );
};

export default AnswerButton; 