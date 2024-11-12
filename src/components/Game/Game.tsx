import { Difficulty } from '@/model/enums/difficulty';
import { useMaze } from '@/hooks/';
import { Board } from '@/components/Board';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GameResult } from '@/model/gameResult';
import { Result } from '@/components/Result';
import { Popup } from '../Popup';
import { Question } from '@/model/question';
import { gameContainer, gameTitle } from './Game.css';

interface GameProps {
  initialDifficulty: Difficulty;
  isGameInProgress: boolean;
  clearDifficulty: () => void;
  onGameEnd: () => void;
  onLeaderboardClick: () => void;
  onLeaderboardExit: () => void;
}

export const Game = ({
  initialDifficulty,
  isGameInProgress,
  clearDifficulty,
  onGameEnd,
  onLeaderboardClick,
  onLeaderboardExit,
}: GameProps) => {
  const { maze, generateNewMaze, solution } = useMaze(initialDifficulty);
  const [result, setResult] = useState<GameResult>();
  const [isLockTouched, setIsLockTouched] = useState<boolean>(false);
  const selectedChoice = useRef<number>(-1);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const finishGame = useCallback((result: GameResult) => setResult(result), []);
  const indexRef = useRef<number>(0);
  const intervalRef = useRef<number | undefined>(undefined);
  const canMoveRef = useRef<boolean>(true);
  const startNewGame = useCallback(
    (difficulty: Difficulty) => {
      generateNewMaze(difficulty);
    },
    [generateNewMaze],
  );

  const questions: Question[] = [
    { question: 'What is UI?', choices: ['wee', 'woo'], answer: 0 },
    { question: 'What is UX?', choices: ['wee', 'woo'], answer: 1 },
    { question: 'What is UX?', choices: ['wee', 'woo'], answer: 1 },
    { question: 'What is UX?', choices: ['wee', 'woo'], answer: 1 },
    { question: 'What is UX?', choices: ['wee', 'woo'], answer: 1 },
  ];

  useEffect(() => {
    setResult(undefined);
  }, [maze]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeInSeconds((prev) => {
        if (isGameInProgress) return prev + 1;
        else return prev;
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [isGameInProgress]);

  const handleSelectChoice = (choice: number) => {
    selectedChoice.current = choice;
    if (questions[indexRef.current].answer !== selectedChoice.current) {
      const audio = new Audio('/wrong.mp3');

      audio.play();
      canMoveRef.current = false;
      setTimeout(() => (canMoveRef.current = true), 3000);
    } else {
      const audio = new Audio('/correct.mp3');

      audio.play();
    }

    setTimeout(() => {
      setIsLockTouched(false);
      indexRef.current = indexRef.current + 1;
    }, 1000);
    // setIsLockTouched(false);
  };

  const displayPopup = useCallback(() => {
    setIsLockTouched(true);
  }, []);

  const stopTimer = useCallback(() => {
    setTimeInSeconds(0);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        height: '90vh',
      }}
    >
      <img className={gameTitle} src="/titlecard.png" alt="TitleCard" />
      {isLockTouched && (
        <Popup
          question={questions[indexRef.current]}
          onSelectChoice={handleSelectChoice}
        />
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className={gameContainer}
      >
        <Board
          solution={solution}
          isLockTouched={isLockTouched}
          onGameFinish={finishGame}
          gameInProgress={!result}
          board={maze}
          onTouchLock={displayPopup}
          canMoveRef={canMoveRef}
        />
        <h2>
          Time Taken: {Math.floor(timeInSeconds / 60)}:
          {String(timeInSeconds % 60).padStart(2, '0')}
        </h2>
      </div>
      {result && (
        <Result
          onNewGame={startNewGame}
          clearDifficulty={clearDifficulty}
          onGameEnd={onGameEnd}
          stopTimer={stopTimer}
          timeInSeconds={timeInSeconds}
          onLeaderboardClick={onLeaderboardClick}
        />
      )}
    </div>
  );
};
