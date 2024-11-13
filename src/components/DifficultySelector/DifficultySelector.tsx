import { Difficulty } from '@/model/enums/difficulty';
import { Button } from '@/components/Button';
import {
  buttonImg,
  buttonsContainer,
} from '@/components/DifficultySelector/DifficultySelector.css';
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
      <Button onClick={() => onDifficultyChosen(Difficulty.HARD)}>
        <img className={buttonImg} src="/play.png" alt="Play" />
      </Button>
      <Button onClick={onLeaderboardClick}>
        <img className={buttonImg} src="/leaderboard.png" alt="Leaderboard" />
      </Button>
    </div>
  );
};
