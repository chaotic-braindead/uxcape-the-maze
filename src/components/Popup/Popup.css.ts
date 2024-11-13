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

export const choicesList = style({
  listStyle: 'none',
  padding: 0,
});

export const choicesListLi = style({
  width: '10vw',
  color: '#8937b3',
  height: '5vh',
  fontSize: '1.25vw',
  alignContent: 'center',
  textAlign: 'center',
  cursor: 'pointer',
  border: '2px solid #8937b3',
  borderRadius: '10px',
  backgroundColor: 'white',
  ':hover': {
    backgroundColor: `rgba(255, 255, 255, 0.75)`,
  },
});

export const correctAnswer = style({
  color: 'white',
  backgroundColor: '#3ec241',
  ':hover': {
    backgroundColor: '#3ec241',
  },
});

export const wrongAnswer = style({
  color: 'white',
  backgroundColor: '#c2403e',
  ':hover': {
    backgroundColor: '#c2403e',
  },
});

export const background = style({
  position: 'absolute',
  top: '26%',
  left: '22%',
  width: '55%',
  height: '55%',
  objectFit: 'cover',
  zIndex: -1,
});
