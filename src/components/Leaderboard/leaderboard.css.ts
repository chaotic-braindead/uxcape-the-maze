import { focus, vars } from '@/styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';
vars;
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
  overflowY: 'auto',
  maxHeight: '53vh',
  width: '30vw',
  marginBottom: '3vh',
});

const slideUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const button = style([
  focus,
  {
    bottom: 30,
    position: 'absolute',
    margin: '0 auto',
    padding: `${vars.spacing.small} ${vars.spacing.large}`,
    border: 'none',
    background: 'none',
    color: vars.color.dark.main,
    fontSize: vars.fontSize.medium,
    borderRadius: '0.25rem',

    animation: `${slideUp} 1s ease-out`,
    transition: 'opacity 0.3s ease-in-out',
    ':hover': {
      opacity: 0.7,
      cursor: 'pointer',
    },
    ':disabled': {
      background: 'none',
      cursor: 'not-allowed',
    },
  },
]);
