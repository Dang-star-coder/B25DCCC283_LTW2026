import React from 'react';
import { formatScore } from '../data';

const StatusBar = ({ timeLeft, lives, score, streak, onAddLife, canAddLife }) => {
  return (
    <div className="status-bar">
      <div>Thời gian: {timeLeft} giây</div>
      <div>
        Mạng: {Array.from({ length: lives }).map((_, i) => (
          <span key={i} className="heart-icon">❤️</span>
        ))}
      </div>
      <div>Điểm: {formatScore(score)}</div>
      <div>Chuỗi đúng: {streak}</div>
      {onAddLife && (
        <button onClick={onAddLife} disabled={!canAddLife}>
          Thêm 1 mạng
        </button>
      )}
    </div>
  );
};

export default StatusBar; 