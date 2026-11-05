import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName }) => {
  const [nameInput, setNameInput] = useState(playerName);
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setPlayerName(nameInput.trim());
    navigate('/play');
  };

  return (
    <div className="home-page">
      <h1>Thử thách 3 mạng</h1>
      <p>Luật chơi: Trả lời lần lượt 15 câu hỏi trong vòng 90 giây với 3 mạng tối đa...</p>
      <form onSubmit={handleStart}> 
        <input 
          type="text" 
          placeholder="Nhập Tên người chơi" 
          value={nameInput} 
          onChange={e => setNameInput(e.target.value)} 
        />
        <button type="submit" disabled={!nameInput.trim()}>Bắt đầu</button>
      </form>
    </div>
  );
};

export default Home; 