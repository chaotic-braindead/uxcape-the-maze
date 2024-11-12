import { Difficulty } from '@/model/enums/difficulty';
import { GameResult } from '@/model/gameResult';
import { DifficultySelector } from '@/components/DifficultySelector';
import { resultText } from '@/components/Result/Result.css';
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { db } from '@/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Button } from '../Button';
import { Form } from '../Form';

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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 className={resultText} style={{ marginBottom: '25px' }}>
          Congratulations!
        </h2>
        <label htmlFor="username">Enter username:</label>
        <input
          style={{
            borderRadius: '5px',
            height: '25px',
            marginBottom: '10px',
            marginTop: '10px',
          }}
          type="text"
          name="username"
          onChange={handleInputChange}
        />
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <Button onClick={handleUsernameSubmit} disabled={error !== ''}>
          Submit
        </Button>
      </div>
    </Form>
  );
};
