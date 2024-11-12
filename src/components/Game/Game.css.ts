import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { keyframes } from '@vanilla-extract/css';

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

const slideUp = keyframes({
  '0%': {
    transform: 'translateY(1000px)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: 1,
  },
});

export const gameTitle = style({
  width: '100%',
  maxWidth: '300px',
  height: 'auto',
  marginBottom: '-40px',
  animation: `${dropDown} 1.1s ease-out`,
});

export const gameContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  animation: `${slideUp} 0.8s ease-out`,
  gap: '10px'
});
