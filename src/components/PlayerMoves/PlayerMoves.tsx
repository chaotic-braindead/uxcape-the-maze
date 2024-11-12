import { RelativeDirection } from '@/model/enums/relativeDirection';
import { useEffect, useMemo, useState } from 'react';
import { Coordinates, Maze } from '@/model/maze';
import { useWindowEventListener } from '@/hooks/';
import { Move } from '@/model/move';
import { ArrowKey } from '@/model/enums/arrowKey';
import {
  arrowsContainer,
  arrowTile,
  arrowTileInvalid,
} from '@/components/PlayerMoves/PlayerMoves.css';
import { KEY_TO_DIRECTION, KEY_TO_SYMBOL, KEY_TO_WALL } from '@/constants/key';

interface PlayerMovesProps {
  onPlayerMove: (direction: RelativeDirection) => void;
  board: Maze;
  playerPosition: Coordinates;
  onGameFinish: (moves: number) => void;
  onTouchLock: () => void;
  canMoveRef: React.MutableRefObject<boolean>;
}

export const PlayerMoves = ({
  onPlayerMove,
  board,
  playerPosition,
  onGameFinish,
  onTouchLock,
  canMoveRef,
}: PlayerMovesProps) => {
  const [allMoves, setAllMoves] = useState<Array<Move>>([]);

  const handlePress = (pressedKey: ArrowKey) => {
    const isValidMove =
    !board[playerPosition.y][playerPosition.x].walls[KEY_TO_WALL[pressedKey]];

  if (isValidMove && canMoveRef.current) {
    onPlayerMove(KEY_TO_DIRECTION[pressedKey]);
  }
  setAllMoves((moves) => [...moves, { key: pressedKey, valid: isValidMove }]);
  }

  const keyDownHandler = ({ key }: KeyboardEvent) => {
    const wasd = 'wasd';
    if (wasd.includes(key)){
      let pressedKey: ArrowKey = ArrowKey.UP;
      if (key === 'w') {
        pressedKey = ArrowKey.UP;
      } else if (key === 'a') {
        pressedKey = ArrowKey.LEFT;
      } else if (key === 's') {
        pressedKey = ArrowKey.DOWN;
      } else if (key === 'd') {
        pressedKey = ArrowKey.RIGHT;
      }
      handlePress(pressedKey);
      return;
    }
    if (
      key === ArrowKey.UP ||
      key === ArrowKey.DOWN ||
      key === ArrowKey.LEFT ||
      key === ArrowKey.RIGHT
    ) {
      handlePress(key);
    }
  };

  useEffect(() => {
    if (
      playerPosition.y === board.length - 1 &&
      playerPosition.x === board.length - 1
    )
      onGameFinish(allMoves.length);
  }, [board, allMoves, onGameFinish, playerPosition]);

  useWindowEventListener('keydown', keyDownHandler);

  return <></>;
};
