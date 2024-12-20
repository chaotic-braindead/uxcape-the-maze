import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const singleCell = style({
  border: `3px solid ${vars.color.accent.warm.main}`,
  overflow: 'hidden',
  width: '1.5rem',
  height: '1.5rem',
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
});

export const facingLeft = style({
  backgroundImage: `url("/left.png")`,
});

export const facingRight = style({
  backgroundImage: `url("/right.png")`,
});

export const facingTop = style({
  backgroundImage: `url("/top.png")`,
});

export const facingBottom = style({
  backgroundImage: `url("/bottom.png")`,
});

export const stunned = style({
  backgroundImage: `url("/stunned.gif")`,
});

export const locked = style({
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url("/lock.gif")`,
});
