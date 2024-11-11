import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

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
});

export const content = style({
  backgroundColor: vars.color.dark.main,
  padding: '50px',
  borderRadius: '20px',
  textAlign: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  display: 'flex',
});

export const close = style({
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
});

export const choicesList = style({
  listStyle: 'none',
  padding: 0,
});

export const choicesListLi = style({
  padding: '10px',
  cursor: 'pointer',
  marginTop: '1rem',
  borderRadius: '10px',
  ':hover': {
    backgroundColor: `rgba(45, 32, 54, 0.75)`,
  },
});

export const correctAnswer = style({
  backgroundColor: '#32a852',
  ':hover': {
    backgroundColor: '#32a852',
  },
});

export const wrongAnswer = style({
  backgroundColor: '#c42339',
  ':hover': {
    backgroundColor: '#c42339',
  },
});
