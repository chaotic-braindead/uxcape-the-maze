import { Difficulty } from '@/model/enums/difficulty';
import {
  description,
  heading,
} from '@/components/WelcomeScreen/WelcomeScreen.css';
import { DifficultySelector } from '@/components/DifficultySelector';
import { useRef, useState } from 'react';
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
      <h1 className={heading}>UXCape the Maze</h1>
      <p className={description}>
        The objective is to complete the maze in the shortest time possible,
        with correct answers unlocking paths and wrong answers resulting in a
        temporary stun.
      </p>
      <p>Movement: Arrow Keys</p>
      <DifficultySelector
        onDifficultyChosen={onGameStart}
        onLeaderboardClick={onLeaderboardClick}
      />
    </>
  );
};
