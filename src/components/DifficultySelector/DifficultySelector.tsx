import { Difficulty } from '@/model/enums/difficulty';
import { Button } from '@/components/Button';
import { buttonsContainer } from '@/components/DifficultySelector/DifficultySelector.css';
import { useRef } from 'react';

interface DifficultySelectorProps {
  onDifficultyChosen: (gameDifficulty: Difficulty) => void;
  onLeaderboardClick: () => void;
}

export const DifficultySelector = ({
  onDifficultyChosen,
  onLeaderboardClick,
}: DifficultySelectorProps) => {
  return (
    <div className={buttonsContainer}>
      {/* <Button onClick={() => onDifficultyChosen(Difficulty.EASY)}>Easy</Button> */}
      <Button onClick={() => onDifficultyChosen(Difficulty.NORMAL)}>
        Play
      </Button>
      <Button onClick={onLeaderboardClick}>Leaderboard</Button>
      {/* <Button onClick={() => onDifficultyChosen(Difficulty.HARD)}>Hard</Button> */}
    </div>
  );
};
