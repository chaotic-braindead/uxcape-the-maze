import { MazeCell } from '@/model/maze';
import {
  singleCell,
  singleCellCurrentlyVisited,
  singleCellMazeEnd,
  singleCellSolutionPart,
  asset
} from './Cell.css';
import { useEffect, useMemo, useRef } from 'react';
import lock from '../../assets/lock.png';

interface CellProps {
  cell: MazeCell;
  playerVisiting: boolean;
  mazeEnd: boolean;
  solution: Array<MazeCell>;
  showSolution: boolean;
}

export const Cell = ({
  cell,
  playerVisiting,
  mazeEnd,
  solution,
  showSolution,
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

  useEffect(() => {lockedRef.current = cell.locked;}, [cell.locked])

  return (
    <div
      style={cellStyles}
      data-testid={`cell_${cell.coordinates.y}_${cell.coordinates.x}`}
      className={`${singleCell} ${mazeEnd ? singleCellMazeEnd : ''} ${
        playerVisiting ? singleCellCurrentlyVisited : ''
      } ${showSolution && partOfTheSolution ? singleCellSolutionPart : ''} ${cell.locked ? asset: ''}`}
      key={`${cell.coordinates.y}${cell.coordinates.x}`}
    >
      {/* {cell.locked && <img src={lock} className={asset}/>} */}
      </div>
  );
};
