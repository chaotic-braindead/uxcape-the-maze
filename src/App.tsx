import { useCallback, useEffect, useRef, useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Difficulty } from '@/model/enums/difficulty';
import { Game } from '@/components/Game';
import { mainContainer, screenDisclaimer } from '@/App.css';
import { useMediaQuery } from '@/hooks/';

export const App = () => {
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [initialDifficulty, setInitialDifficulty] = useState<Difficulty>();
  const [displayLeaderboard, setDisplayLeaderboard] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isScreenLargeEnough = useMediaQuery('screen and (min-width: 720px)');
  const userAgent = navigator.userAgent.toLowerCase();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPC =
    userAgent.includes('windows') ||
    userAgent.includes('macintosh') ||
    userAgent.includes('linux');

  useEffect(() => {
    const cssBackgroundImages = [
      '/left.png',
      '/right.png',
      '/top.png',
      '/bottom.png',
      '/lock.gif',
      '/stunned.gif',
    ];

    const loadImages = () => {
      const promises = cssBackgroundImages.map(
        (src) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          }),
      );

      Promise.all(promises).then(() => setIsLoaded(true));
    };

    loadImages();
  }, []);

  const startGame = useCallback((difficulty: Difficulty) => {
    setIsGameInProgress(true);
    setInitialDifficulty(difficulty);

    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15;
      audioRef.current.play().catch((error) => {
        console.log(error);
      });
    }
  }, []);

  const endGame = useCallback(() => {
    setIsGameInProgress(false);
  }, []);

  const clearDifficulty = useCallback(() => {
    setInitialDifficulty(undefined);
  }, []);

  const onLeaderboardClick = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
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

  if (!isLoaded) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <img src="/spinner.svg" />
      </div>
    );
  }

  return (
    <main className={mainContainer}>
      <audio ref={audioRef} src="/background-music.mp3" />
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
