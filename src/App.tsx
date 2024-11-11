import { useCallback, useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Difficulty } from '@/model/enums/difficulty';
import { Game } from '@/components/Game';
import { mainContainer, screenDisclaimer } from '@/App.css';
import { useMediaQuery } from '@/hooks/';

export const App = () => {
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [initialDifficulty, setInitialDifficulty] = useState<Difficulty>();
  const [displayLeaderboard, setDisplayLeaderboard] = useState<boolean>(false);
  const isScreenLargeEnough = useMediaQuery(
    'screen and (min-width: 720px) and (min-height: 790px)',
  );
  const userAgent = navigator.userAgent.toLowerCase();
  const isPC =
    userAgent.includes('windows') ||
    userAgent.includes('macintosh') ||
    userAgent.includes('linux');

  const startGame = useCallback((difficulty: Difficulty) => {
    setIsGameInProgress(true);
    setInitialDifficulty(difficulty);
  }, []);

  const endGame = useCallback(() => {
    setIsGameInProgress(false);
  }, []);

  const clearDifficulty = useCallback(() => {
    setInitialDifficulty(undefined);
  }, []);

  const onLeaderboardClick = useCallback(() => {
    setDisplayLeaderboard(true);
  }, []);

  const onLeaderboardExit = useCallback(() => {
    setDisplayLeaderboard(false);
  }, []);

  if (!isScreenLargeEnough || !isPC) {
    return (
      <main className={mainContainer}>
        <h1 className={screenDisclaimer}>
          This game can only be played on a desktop‑sized screen and with a
          keyboard.
        </h1>
      </main>
    );
  }

  return (
    <main className={mainContainer}>
      {initialDifficulty ? (
        <Game
          initialDifficulty={initialDifficulty}
          isGameInProgress={isGameInProgress}
          clearDifficulty={clearDifficulty}
          onGameEnd={endGame}
          onLeaderboardClick={onLeaderboardClick}
          onLeaderboardExit={onLeaderboardExit}
        />
      ) : (
        <WelcomeScreen
          onGameStart={startGame}
          displayLeaderboard={displayLeaderboard}
          onLeaderboardClick={onLeaderboardClick}
          onLeaderboardExit={onLeaderboardExit}
        />
      )}
    </main>
  );
};
