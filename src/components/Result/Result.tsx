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
  const usernameRef = useRef<string>('');
  const [error, setError] = useState<string>('Username cannot be empty');

  const handleUsernameSubmit = () => {
    const addData = async () => {
      try {
        await addDoc(collection(db, 'players'), {
          username: usernameRef.current,
          timeTaken: timeInSeconds,
        });
      } catch (e) {
        console.error('Error adding player: ', e);
      }
    };

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

  useEffect(() => onGameEnd(), []);
  return (
    <Form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <h1 className={resultText} style={{ fontSize: '2.5vw' }}>
          Congratulations!
        </h1>
        <label htmlFor="username">Enter username:</label>
        <input
          style={{
            borderRadius: '5px',
            height: '3vh',
            padding: '2px',
            color: '#8937b3',
          }}
          type="text"
          name="username"
          onChange={handleInputChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          className={button}
          onClick={handleUsernameSubmit}
          disabled={error !== ''}
        >
          Submit
        </button>
        {/* <Button onClick={handleUsernameSubmit} disabled={error !== ''}>
          <img
            style={{ height: '3rem', marginBottom: '1.5rem' }}
            src="/submit.png"
            alt="submit"
          />
        </Button> */}
      </div>
    </Form>
  );
};
