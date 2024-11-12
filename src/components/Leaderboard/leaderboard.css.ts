import { keyframes, style } from '@vanilla-extract/css';

export const content = style({
  alignItems: 'center',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
});

export const spinner = style({
  backgroundImage: 'url("/spinner.svg")',
});

const dropDown = keyframes({
  '0%': {
    transform: 'translateY(-1000px)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateY(0) translateX(0) rotate(0deg)',
    opacity: 1,
  },
});

export const titleCard = style({
  maxWidth: '25vw',
  maxHeight: '35vh',
  animation: `${dropDown} 1s ease-out`,
});

export const buttonImg = style({
  height: '3.25rem',
});

export const tableContainer = style({
  overflowX: 'auto',
  maxWidth: '100%',
  margin: '0 auto',
});
