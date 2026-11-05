import React from 'react';
import { formatScore } from '../data';

const History = ({ history }) => {
  return (
    <div className="history-page">
      <h2>Lịch sử các lượt chơi</h2>
      {history.length === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Người chơi</th>
              <th>Điểm số</th>
              <th>Số câu đúng</th>
              <th>Mạng còn lại</th>
              <th>Lý do kết thúc</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.playerName}</td>
                <td>{formatScore(item.score)}</td>
                <td>{item.correctCount}/15</td>
                <td>{item.lives}</td>
                <td>{item.reason}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History; 