import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { keyframes } from '@vanilla-extract/css';

export const heading = style({
  fontSize: vars.fontSize.xxlarge,
  textAlign: 'center',
  color: vars.color.accent.warm.secondary,
});

const throwAndSpin = keyframes({
  '0%': {
    transform: 'translateY(-1000px) translateX(-1000px) rotate(-720deg)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateY(0) translateX(0) rotate(0deg)',
    opacity: 1,
  },
});

export const titleCard = style({
  maxWidth: '100vw',
  height: 'auto',
  maxHeight: '70vh',
  marginBottom: '-100px',
  animation: `${throwAndSpin} 1.3s ease-out`,
});
