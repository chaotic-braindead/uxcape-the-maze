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
