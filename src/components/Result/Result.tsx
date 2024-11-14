import { Difficulty } from '@/model/enums/difficulty';
import { GameResult } from '@/model/gameResult';
import { DifficultySelector } from '@/components/DifficultySelector';
import { resultText } from '@/components/Result/Result.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { db } from '@/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Form } from '../Form';
import { button } from './Result.css';

interface ResultProps {
  onNewGame: (difficulty: Difficulty) => void;
  clearDifficulty: () => void;
  onGameEnd: () => void;
  stopTimer: () => void;
  timeInSeconds: number;
  onLeaderboardClick: () => void;
}

export const Result = ({
  onNewGame,
  clearDifficulty,
  onGameEnd,
  stopTimer,
  timeInSeconds,
  onLeaderboardClick,
}: ResultProps) => {
  const localStorageUsername = localStorage.getItem('username');
  const usernameRef = useRef<string>('');
  const [error, setError] = useState<string>('Username cannot be empty');

  const handleUsernameSubmit = () => {
    const addData = async () => {
      try {
        await addDoc(collection(db, 'players'), {
          username: localStorageUsername
            ? localStorageUsername
            : usernameRef.current,
          timeTaken: timeInSeconds,
        });
      } catch (e) {
        console.error('Error adding player: ', e);
      }
    };

    if (localStorageUsername === null)
      localStorage.setItem('username', usernameRef.current);

    stopTimer();
    addData();
    onLeaderboardClick();
    onGameEnd();
    clearDifficulty();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.value.trim() === '') {
      setError('Username cannot be empty');
    } else {
      setError('');
    }
    usernameRef.current = event.target.value;
  };

  useEffect(() => {
    if (localStorageUsername !== null) {
      handleUsernameSubmit();
    }
    onGameEnd();
  }, []);

  if (localStorageUsername === null) {
    return (
      <Form>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2vh',
          }}
        >
          <h1 className={resultText} style={{ fontSize: '2.5vw' }}>
            Congratulations!
          </h1>
          <label style={{ fontSize: '1.25vw' }} htmlFor="username">
            Enter username:
          </label>
          <input
            style={{
              borderRadius: '5px',
              height: '3.25vh',
              padding: '5px',
              color: '#8937b3',
              fontSize: '1.25vw',
            }}
            type="text"
            name="username"
            onChange={handleInputChange}
          />
          {error && <p style={{ color: 'red', fontSize: '1.1vw' }}>{error}</p>}
          <button
            className={button}
            onClick={handleUsernameSubmit}
            disabled={error !== ''}
          >
            Submit
          </button>
        </div>
      </Form>
    );
  }
  return <></>;
};
