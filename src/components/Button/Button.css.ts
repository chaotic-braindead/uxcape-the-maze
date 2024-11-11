import { style, keyframes } from '@vanilla-extract/css';
import { focus, vars } from '@/styles/theme.css';

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
    padding: `${vars.spacing.small} ${vars.spacing.large}`,
    border: 'none',
    background: 'none',
    color: vars.color.dark.main,
    fontSize: vars.fontSize.medium,
    borderRadius: '0.25rem',

    animation: `${slideUp} 1s ease-out`,
    marginBottom: '-50px',
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
