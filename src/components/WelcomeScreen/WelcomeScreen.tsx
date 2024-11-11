import { Difficulty } from '@/model/enums/difficulty';
import {
  heading,
  titleCard,
} from '@/components/WelcomeScreen/WelcomeScreen.css';
import { DifficultySelector } from '@/components/DifficultySelector';
import { Leaderboard } from '../Leaderboard';

export interface WelcomeScreenProps {
  onGameStart: (gameDifficulty: Difficulty) => void;
  displayLeaderboard: boolean;
  onLeaderboardClick: () => void;
  onLeaderboardExit: () => void;
}

export const WelcomeScreen = ({
  onGameStart,
  displayLeaderboard,
  onLeaderboardClick,
  onLeaderboardExit,
}: WelcomeScreenProps) => {
  if (displayLeaderboard) {
    return <Leaderboard onLeaderboardExit={onLeaderboardExit} />;
  }
  return (
    <>
      <h1 className={heading}>
        <img
          className={titleCard}
          src="/titlecard.png"
          alt="UX-Scape The Maze"
        />
      </h1>
      <DifficultySelector
        onDifficultyChosen={onGameStart}
        onLeaderboardClick={onLeaderboardClick}
      />
    </>
  );
};
