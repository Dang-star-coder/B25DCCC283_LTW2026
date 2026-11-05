import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { TOTAL_TIME, MAX_LIVES } from '../data';
import { calcScore } from '../utils';
import StatusBar from '../components/StatusBar';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';

const PlaySession = ({ questions, playerName, setHistory }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('answering');
  const [selectedOption, setSelectedOption] = useState(null);
  const [canAddLife, setCanAddLife] = useState(false);
  const sessionRef = useRef({});

  useEffect(() => {
    if (status !== 'answering') return;
    if (timeLeft <= 0) {
      sessionRef.current.finishGame('Hết giờ!');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          sessionRef.current.finishGame('Hết giờ!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, timeLeft]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optIndex) => {
    if (status !== 'answering') return;
    setSelectedOption(optIndex);
    setStatus('locked');
  };

  useEffect(() => {
    if (status === 'locked') {
      const t1 = setTimeout(() => {
        setStatus('revealed');
      }, 1000);
      return () => clearTimeout(t1);
    } else if (status === 'revealed') {
      const { currentIndex, currentQ, finishGame, lives, questions, results, selectedOption } = sessionRef.current;
      const isCorrect = selectedOption === currentQ.answer;
      const newResults = [...results, isCorrect ? 'correct' : 'wrong'];
      setResults(newResults);

      let newLives = lives;
      if (!isCorrect) {
        newLives -= 1;
        setLives(newLives);
        setCanAddLife(true); // Mở nút thêm 1 mạng khi trả lời sai
      }

      const t2 = setTimeout(() => {
        if (newLives <= 0) {
          finishGame('Bạn đã hết mạng', newResults, newLives);
        } else if (currentIndex + 1 >= questions.length) {
          finishGame('Xuất sắc! Bạn đã trả lời đúng cả 15 câu', newResults, newLives);
        } else {
          setCurrentIndex(prev => prev + 1);
          setSelectedOption(null);
          setStatus('answering');
        }
      }, 1000);

      return () => clearTimeout(t2);
    }
  }, [status]);

  const handleAddLife = () => {
    if (canAddLife && lives < MAX_LIVES) {
      setLives(prev => prev + 1);
      setCanAddLife(false); // Khóa hẳn nút sau khi dùng
    }
  };

  const finishGame = (reason, finalResults = results, finalLives = lives) => {
    const { score, streak } = calcScore(finalResults, questions);
    const correctCount = finalResults.filter(r => r === 'correct').length;

    const gameData = {
      playerName,
      score,
      correctCount,
      lives: finalLives,
      reason,
      date: new Date().toLocaleString()
    };

    setHistory(prev => [gameData, ...prev]);

    navigate('/result', { 
      replace: true, 
      state: { ...gameData, maxStreak: streak } 
    });
  };

  sessionRef.current = {
    currentIndex,
    currentQ,
    finishGame,
    lives,
    questions,
    results,
    selectedOption
  };

  if (!currentQ) return <div>Đang tải câu hỏi...</div>;

  const currentStats = calcScore(results, questions);

  return (
    <div className="play-screen">
      <StatusBar 
        timeLeft={timeLeft}
        lives={lives}
        score={currentStats.score}
        streak={currentStats.streak}
        onAddLife={handleAddLife}
        canAddLife={canAddLife && lives < MAX_LIVES}
      />

      <ProgressBar 
        questions={questions}
        results={results}
        currentIndex={currentIndex}
      />

      <QuestionCard 
        currentQuestion={currentQ}
        currentIndex={currentIndex}
        status={status}
        selectedOption={selectedOption}
        onSelectOption={handleSelectOption}
      />
    </div>
  );
};

const Play = ({ questions, playerName, setHistory }) => {
  if (!playerName) {
    return <Navigate to="/" replace />;
  }

  return <PlaySession questions={questions} playerName={playerName} setHistory={setHistory} />;
};

export default Play;