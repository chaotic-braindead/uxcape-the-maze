import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const resultText = style({
  fontSize: vars.fontSize.large,
  margin: `${vars.spacing.medium} 0 0`,
});

export const button = style({
  height: '4vh',
  color: '#8937b3',
  border: '2px solid #8937b3',
  borderRadius: '10px',
  backgroundColor: 'white',
  fontSize: '1.25vw',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: `rgba(255, 255, 255, 0.75)`,
  },
});
