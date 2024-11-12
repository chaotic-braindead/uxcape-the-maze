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

  const keyDownHandler = ({ key }: KeyboardEvent) => {
    if (key === 'w') {
      key = ArrowKey.UP;
    } else if (key === 'a') {
      key = ArrowKey.LEFT;
    } else if (key === 's') {
      key = ArrowKey.DOWN;
    } else if (key === 'd') {
      key = ArrowKey.RIGHT;
    }

    if (
      key === ArrowKey.UP ||
      key === ArrowKey.DOWN ||
      key === ArrowKey.LEFT ||
      key === ArrowKey.RIGHT
    ) {
      const isValidMove =
        !board[playerPosition.y][playerPosition.x].walls[KEY_TO_WALL[key]];

      if (isValidMove && canMoveRef.current) {
        onPlayerMove(KEY_TO_DIRECTION[key]);
      }
      setAllMoves((moves) => [...moves, { key, valid: isValidMove }]);
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
