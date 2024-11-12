import { vars } from '@/styles/theme.css';
import { globalStyle, keyframes } from '@vanilla-extract/css';

globalStyle('@font-face', {
  fontFamily: '"VT323", monospace',
  fontWeight: 400,
  fontStyle: 'normal',
});

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  fontFamily: 'VT323',
});

globalStyle('body', {
  backgroundImage: 'url(/bg.png)',
  color: vars.color.light.main,
  margin: vars.spacing.xlarge,
  lineHeight: '170%',
});

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

globalStyle('table', {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '20px',
  animation: `${fadeIn} 1.3s ease-out`,
  tableLayout: 'auto',
});

globalStyle('th', {
  fontWeight: 'bold',
  padding: '10px',
  textAlign: 'center',
  borderBottom: '2px solid #ddd',
  fontSize: '1.5rem',
  whiteSpace: 'nowrap',
});

globalStyle('td', {
  padding: '5px',
  borderBottom: '1px solid #ddd',
  textAlign: 'center',
  fontSize: '1.5rem',
  whiteSpace: 'nowrap',
});
