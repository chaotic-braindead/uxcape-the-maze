import { Difficulty } from '@/model/enums/difficulty';
import { useMaze } from '@/hooks/';
import { Board } from '@/components/Board';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GameResult } from '@/model/gameResult';
import { Result } from '@/components/Result';
import { Popup } from '../Popup';
import { Question, questions } from '@/model/question';
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
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const finishGame = useCallback((result: GameResult) => setResult(result), []);
  const indexRef = useRef<number>(0);
  const canMoveRef = useRef<boolean>(true);
  const availableQuestionsRef = useRef<Question[]>(questions);
  const startNewGame = useCallback(
    (difficulty: Difficulty) => {
      generateNewMaze(difficulty);
    },
    [generateNewMaze],
  );

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
    if (
      availableQuestionsRef.current[indexRef.current].answer !==
      selectedChoice.current
    ) {
      const audio = new Audio('/wrong.mp3');
      audio.play();
      canMoveRef.current = false;
      setTimeout(() => (canMoveRef.current = true), 5000);
    } else {
      const audio = new Audio('/correct.mp3');

      audio.play();
    }

    setTimeout(() => {
      setIsLockTouched(false);
      availableQuestionsRef.current = availableQuestionsRef.current.filter(
        (value, index) => index != indexRef.current,
      );
      indexRef.current = Math.floor(
        Math.random() * availableQuestionsRef.current.length,
      );
    }, 1000);
  };

  const displayPopup = useCallback(() => {
    if (availableQuestionsRef.current.length === 0) {
      availableQuestionsRef.current = questions;
    }
    indexRef.current = Math.floor(
      Math.random() * availableQuestionsRef.current.length,
    );
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
        height: '90vh',
        gap: '10px',
      }}
    >
      <img className={gameTitle} src="/titlecard.png" alt="TitleCard" />
      {isLockTouched && (
        <Popup
          question={availableQuestionsRef.current[indexRef.current]}
          onSelectChoice={handleSelectChoice}
        />
      )}
      <div className={gameContainer}>
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
