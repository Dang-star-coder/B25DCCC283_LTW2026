import React from 'react';

const ProgressBar = ({ questions, results, currentIndex }) => {
  return (
    <div className="progress-bar">
      {questions.map((q, idx) => {
        let bg = 'gray';
        if (idx < results.length) {
          bg = results[idx] === 'correct' ? 'green' : 'red';
        } else if (idx === currentIndex) {
          bg = 'darkblue';
        }
        return (
          <span 
            key={q.id} 
            style={{ 
              display: 'inline-block', 
              width: 20, 
              height: 20, 
              backgroundColor: bg, 
              margin: 2, 
              border: idx === currentIndex ? '2px solid yellow' : 'none',
              textAlign: 'center',
              color: 'white',
              fontSize: '11px'
            }}
          >
            {idx + 1}
          </span>
        );
      })}
    </div>
  );
};

export default ProgressBar; 