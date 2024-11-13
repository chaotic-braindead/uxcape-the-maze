import { Size } from '@/model/size';
import { Maze, MazeCell } from '@/model/maze';
import { RelativeDirection } from '@/model/enums/relativeDirection';
import { maxLocks, minLockSpacing } from '@/constants/num';

export const generateMaze = ({ width, height }: Size): Maze => {
  const maze: Maze = createMazeBoilerplate(width, height);
  const firstCell = maze[0][0];
  const cellStack: Array<MazeCell> = [maze[0][0]];
  let lockedCount = 0;

  firstCell.visitedDuringGenerating = true;

  // Standard backtracking-based maze generation
  const backTrack = (cell: MazeCell): void => {
    const neighbour = getRandomUnvisitedNeighbour(cell, maze);

    if (neighbour) {
      neighbour.visitedDuringGenerating = true;
      cellStack.push(neighbour);
      carveWalls([cell, neighbour]);
      backTrack(neighbour);
      return;
    }

    cellStack.pop();
    if (cellStack[cellStack.length - 1]) {
      backTrack(cellStack[cellStack.length - 1]);
    }
  };

  // Start the backtracking process from the first cell
  backTrack(firstCell);

  // Optional: Add extra paths to make the maze more accessible
  addExtraPaths(maze, width, height);

  const visitedCells = maze
    .flat()
    .filter((cell) => cell.visitedDuringGenerating);
  const endCell = maze[height - 1][width - 1];
  placeLocks(visitedCells, firstCell, endCell, width, height);
  return maze;
};

// Function to create extra paths after the initial maze generation
const addExtraPaths = (maze: Maze, width: number, height: number) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = maze[y][x];
      if (Math.random() < 0.3) {
        // 30% chance to carve an extra path
        const randomNeighbour = getRandomNeighbour(cell, maze);
        if (randomNeighbour) {
          carveWalls([cell, randomNeighbour]);
        }
      }
    }
  }
};

const getRandomNeighbour = (
  cell: MazeCell,
  maze: Maze,
): MazeCell | undefined => {
  const { x, y } = cell.coordinates;
  const neighbours: Array<MazeCell> = [];

  if (maze[y + 1]?.[x]) neighbours.push(maze[y + 1][x]);
  if (maze[y - 1]?.[x]) neighbours.push(maze[y - 1][x]);
  if (maze[y]?.[x + 1]) neighbours.push(maze[y][x + 1]);
  if (maze[y]?.[x - 1]) neighbours.push(maze[y][x - 1]);

  return neighbours[Math.floor(Math.random() * neighbours.length)];
};

const createMazeBoilerplate = (width: number, height: number): Maze =>
  new Array(height).fill(null).map((_, currentY) =>
    new Array(width).fill(null).map((_, currentX) => ({
      walls: {
        top: true,
        bottom: true,
        left: true,
        right: true,
      },
      coordinates: { x: currentX, y: currentY },
      visitedDuringGenerating: false,
      locked: false,
    })),
  );

const getRandomUnvisitedNeighbour = (
  { coordinates: { x, y } }: MazeCell,
  maze: Maze,
): MazeCell | undefined => {
  const neighbours: Array<MazeCell> = [];

  if (maze[y + 1]?.[x]?.visitedDuringGenerating === false)
    neighbours.push(maze[y + 1][x]);
  if (maze[y - 1]?.[x]?.visitedDuringGenerating === false)
    neighbours.push(maze[y - 1][x]);
  if (maze[y]?.[x + 1]?.visitedDuringGenerating === false)
    neighbours.push(maze[y][x + 1]);
  if (maze[y]?.[x - 1]?.visitedDuringGenerating === false)
    neighbours.push(maze[y][x - 1]);

  return neighbours[Math.floor(Math.random() * neighbours.length)];
};

const carveWalls = ([cell1, cell2]: [MazeCell, MazeCell]): void => {
  const directionToCarve = getCellsRelativeDirection([cell1, cell2]);

  switch (directionToCarve) {
    case RelativeDirection.UP: {
      cell1.walls.top = cell2.walls.bottom = false;
      break;
    }
    case RelativeDirection.DOWN: {
      cell1.walls.bottom = cell2.walls.top = false;
      break;
    }
    case RelativeDirection.RIGHT: {
      cell1.walls.right = cell2.walls.left = false;
      break;
    }
    case RelativeDirection.LEFT: {
      cell1.walls.left = cell2.walls.right = false;
      break;
    }
  }
};

const getCellsRelativeDirection = ([
  { coordinates: coordinates1 },
  { coordinates: coordinates2 },
]: [MazeCell, MazeCell]): RelativeDirection => {
  const isYDifference = coordinates1.y !== coordinates2.y;
  const isPositiveDifference = isYDifference
    ? coordinates1.y < coordinates2.y
    : coordinates1.x < coordinates2.x;

  if (isPositiveDifference) {
    return isYDifference ? RelativeDirection.DOWN : RelativeDirection.RIGHT;
  }
  return isYDifference ? RelativeDirection.UP : RelativeDirection.LEFT;
};

const placeLocks = (
  visitedCells: MazeCell[],
  start: MazeCell,
  end: MazeCell,
  width: number,
  height: number,
) => {
  const locksPerQuadrant = Math.floor(maxLocks / 4);
  const quadrants: MazeCell[][] = [[], [], [], []]; // Four quadrants
  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);

  // Divide cells into quadrants
  for (const cell of visitedCells) {
    const { x, y } = cell.coordinates;
    if (x < width / 2 && y < height / 2) quadrants[0].push(cell);
    // Top-left
    else if (x >= width / 2 && y < height / 2) quadrants[1].push(cell);
    // Top-right
    else if (x < width / 2 && y >= height / 2) quadrants[2].push(cell);
    // Bottom-left
    else quadrants[3].push(cell); // Bottom-right
  }

  const lockedCells: MazeCell[] = [];
  let lockedCount = 0;

  // Place locks in each quadrant, prioritizing cells near the center
  for (let i = 0; i < quadrants.length; i++) {
    const quadrantCells = quadrants[i];

    // Sort quadrant cells by distance to the center, prioritizing center cells
    const sortedCells = quadrantCells.sort((a, b) => {
      const distA =
        Math.abs(a.coordinates.x - centerX) +
        Math.abs(a.coordinates.y - centerY);
      const distB =
        Math.abs(b.coordinates.x - centerX) +
        Math.abs(b.coordinates.y - centerY);
      return distA - distB;
    });

    let quadrantLockCount = 0;

    for (const cell of sortedCells) {
      if (
        cell === start ||
        cell === end ||
        cell.locked ||
        quadrantLockCount >= locksPerQuadrant
      ) {
        continue;
      }

      let canPlaceLock = true;

      // Ensure minimum spacing between locks
      for (const otherCell of lockedCells) {
        const distance =
          Math.abs(cell.coordinates.x - otherCell.coordinates.x) +
          Math.abs(cell.coordinates.y - otherCell.coordinates.y);

        if (distance < minLockSpacing) {
          canPlaceLock = false;
          break;
        }
      }

      // Place lock if spacing is sufficient
      if (canPlaceLock) {
        cell.locked = true;
        lockedCells.push(cell);
        lockedCount++;
        quadrantLockCount++;

        if (lockedCount >= maxLocks) {
          return; // Stop if we reach the max lock count
        }
      }
    }
  }
};
