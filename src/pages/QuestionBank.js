import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, formatScore } from '../data';

const QuestionBank = ({ questions }) => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filtered = questions.filter(q => {
    const matchLevel = selectedLevel === 'all' || q.level === Number(selectedLevel);
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLevel && matchSearch;
  });

  const handleRandom = () => {
    if (filtered.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    navigate(`/questions/${filtered[randomIndex].id}`);
  };

  return (
    <div className="question-bank">
      <h2>Ngân hàng câu hỏi</h2>
      <div className="filters">
        <label>
          Mức độ: 
          <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="1">Dễ</option>
            <option value="2">Trung bình</option>
            <option value="3">Khó</option>
          </select>
        </label>
        <label>
          Tìm kiếm: 
          <input 
            type="text" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            placeholder="Nhập nội dung..."
          />
        </label>
        <button onClick={handleRandom} disabled={filtered.length === 0}>
          Câu ngẫu nhiên
        </button>
      </div>

      <p>Có {filtered.length} câu hỏi</p>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Điểm</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((q, idx) => (
            <tr key={q.id}>
              <td>{idx + 1}</td>
              <td>{LEVELS[q.level]}</td>
              <td>{formatScore(POINTS[q.level])}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank; 