import { keyframes, style } from '@vanilla-extract/css';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: `rgba(45, 32, 54, 0.5)`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  animation: `${fadeIn} 0.5s`,
});

export const content = style({
  textAlign: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  display: 'flex',
  gap: '5vh',
});

export const background = style({
  position: 'absolute',
  top: '28%',
  left: '22%',
  width: '55%',
  height: '55%',
  objectFit: 'cover',
  zIndex: -1,
});
