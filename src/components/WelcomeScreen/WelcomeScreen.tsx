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

export const WelcomeScreen = ({ onGameStart, displayLeaderboard, onLeaderboardClick, onLeaderboardExit }: WelcomeScreenProps) => {
 
  if (displayLeaderboard){
    return (<Leaderboard onLeaderboardExit={onLeaderboardExit}/>)
  } 
  return (
  <>
    <h1 className={heading}>UXCape the Maze</h1>
    <p className={description}>
      Description
    </p>
    <DifficultySelector onDifficultyChosen={onGameStart} onLeaderboardClick={onLeaderboardClick}/>
  </>
)};
