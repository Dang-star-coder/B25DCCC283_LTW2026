import { POINTS, STREAK_BONUS } from './data';

export const calcScore = (results, questions) => {
  let score = 0;
  let streak = 0;
  
  results.forEach((res, index) => {
    if (res === 'correct') {
      streak += 1;
      const currentLevel = questions[index]?.level || 1;
      let base = POINTS[currentLevel] || 100;
      if (streak >= 3) {
        base += STREAK_BONUS;
      }
      score += base;
    } else {
      streak = 0;
    } 
  });

  return { score, streak };
};