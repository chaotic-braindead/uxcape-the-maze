import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const buttonsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xlarge,
});

export const buttonImg = style({
  height: '5rem',
});
