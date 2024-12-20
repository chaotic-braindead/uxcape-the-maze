import { useState, useEffect, useRef } from 'react';
import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { Button } from '../Button';
import { button, content, spinner, tableContainer } from './leaderboard.css';
import { titleCard, buttonImg } from './leaderboard.css';

interface Player {
  id: string;
  rank: number;
  username: string;
  timeTaken: number; // in seconds
}

interface LeaderboardProps {
  onLeaderboardExit: () => void;
}

export const Leaderboard = ({ onLeaderboardExit }: LeaderboardProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const firstTimeLoadingRef = useRef<boolean>(true);

  const fetchTopPlayers = async () => {
    if (firstTimeLoadingRef.current) {
      setLoading(true);
      firstTimeLoadingRef.current = false;
    }
    try {
      const playersQuery = query(
        collection(db, 'players'),
        orderBy('timeTaken', 'asc'),
      );
      const querySnapshot = await getDocs(playersQuery);

      const playersList: Player[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Player[];

      const uniquePlayers = playersList.filter(
        (player, index, self) =>
          index == self.findIndex((p) => p.username === player.username),
      );

      setPlayers(uniquePlayers);
      setLoading(false);
    } catch (error) {
      setError('Error fetching top players: ' + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopPlayers();
    const id = setInterval(fetchTopPlayers, 3500);
    return () => clearInterval(id);
  }, []);

  const getRankedPlayers = () => {
    let rank = 1;
    return players.map((player, index) => {
      if (index === 0) {
        return { ...player, rank };
      }
      if (index > 0 && player.timeTaken == players[index - 1].timeTaken) {
        const p = { ...player, rank };
        rank += 1;
        return p;
      }
      rank += 1;
      return { ...player, rank };
    });
  };

  if (loading) {
    return <img src="/spinner.svg" />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className={content}>
      <img
        className={titleCard}
        src="/leaderboard-title.png"
        alt="leaderboards"
      />
      <div className={tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player Name</th>
              <th>Time Taken</th>
            </tr>
          </thead>
          <tbody>
            {getRankedPlayers().map((player) => (
              <tr key={player.id}>
                <td>{player.rank}</td>
                <td>{player.username}</td>
                <td>
                  {Math.floor(player.timeTaken / 60)}:
                  {String(player.timeTaken % 60).padStart(2, '0')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
        }}
      >
        <button className={button} onClick={onLeaderboardExit}>
          <img className={buttonImg} src="/back.png" alt="back" />
        </button>
      </div>
    </div>
  );
};
