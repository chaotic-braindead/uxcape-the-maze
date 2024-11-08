import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import character from '../../assets/character.png'

export const singleCell = style({
  border: `3px solid ${vars.color.accent.warm.main}`,
  overflow: "hidden",
  width: "2em",
  height: "2em",
  padding:'4px'
});

export const singleCellSolutionPart = style({
  backgroundColor: vars.color.accent.warm.secondary,
});

export const singleCellMazeEnd = style({
  backgroundColor: vars.color.accent.cold.main,
});

export const singleCellCurrentlyVisited = style({
  width: '100%',
  height: '100%',
  backgroundSize: 'cover', 
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat', 
  backgroundImage: `url("character.png")`
});

export const asset = style({
  width: '100%',
  height: '100%',
  backgroundSize: 'cover', 
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat', 
  backgroundImage: `url("lock.png")`
});