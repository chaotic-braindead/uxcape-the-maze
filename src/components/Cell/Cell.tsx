import { MazeCell } from '@/model/maze';
import {
  singleCell,
  singleCellCurrentlyVisited,
  singleCellMazeEnd,
  singleCellSolutionPart,
  locked,
  facingBottom,
  facingLeft,
  facingRight,
  facingTop,
  stunned,
} from './Cell.css';
import { useEffect, useMemo, useRef } from 'react';
import { RelativeDirection } from '@/model/enums/relativeDirection';

interface CellProps {
  cell: MazeCell;
  playerVisiting: boolean;
  mazeEnd: boolean;
  solution: Array<MazeCell>;
  playerDirection: RelativeDirection;
  canMoveRef: React.MutableRefObject<boolean>;
}

export const Cell = ({
  cell,
  playerVisiting,
  mazeEnd,
  solution,
  playerDirection,
  canMoveRef,
}: CellProps) => {
  const partOfTheSolution = useMemo(
    () => solution.includes(cell),
    [cell, solution],
  );
  const lockedRef = useRef<boolean>(false);

  const cellStyles = useMemo(
    () => ({
      borderLeft: cell.walls.left ? undefined : 0,
      borderRight: cell.walls.right ? undefined : 0,
      borderTop: cell.walls.top ? undefined : 0,
      borderBottom: cell.walls.bottom ? undefined : 0,
    }),
    [cell],
  );

  const getPlayerDirectionImage = () => {
    if (canMoveRef.current === false) {
      return stunned;
    }
    let image: string = '';
    switch (playerDirection) {
      case RelativeDirection.DOWN:
        image = facingBottom;
        break;
      case RelativeDirection.UP:
        image = facingTop;
        break;
      case RelativeDirection.LEFT:
        image = facingLeft;
        break;
      case RelativeDirection.RIGHT:
        image = facingRight;
        break;
    }
    return image;
  };

  useEffect(() => {
    lockedRef.current = cell.locked;
  }, [cell.locked]);

  return (
    <div
      style={cellStyles}
      data-testid={`cell_${cell.coordinates.y}_${cell.coordinates.x}`}
      className={`${singleCell} ${mazeEnd ? singleCellMazeEnd : ''} ${
        playerVisiting
          ? `${singleCellCurrentlyVisited} ${getPlayerDirectionImage()}`
          : ''
      } ${cell.locked ? locked : ''}`}
      key={`${cell.coordinates.y}${cell.coordinates.x}`}
    ></div>
  );
};
