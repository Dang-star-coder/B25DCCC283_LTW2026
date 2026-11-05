import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { formatScore } from '../data';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { playerName, score, correctCount, lives, reason, maxStreak } = location.state;

  return (
    <div className="result-page">
      <h2>Kết quả lượt chơi</h2>
      <p><strong>Lý do:</strong> {reason}</p>
      <p><strong>Người chơi:</strong> {playerName}</p>
      <p><strong>Số câu trả lời đúng:</strong> {correctCount}/15</p>
      <p><strong>Số mạng còn lại:</strong> {lives}</p>
      <p><strong>Điểm:</strong> {formatScore(score)}</p>
      {maxStreak && <p><strong>Chuỗi dài nhất:</strong> {maxStreak}</p>}

      <button onClick={() => navigate('/play')}>Chơi lại</button>
      <button onClick={() => navigate('/')}>Về trang chủ</button>
    </div>
  );
};

export default Result; 