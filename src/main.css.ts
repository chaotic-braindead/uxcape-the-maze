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
  animation: `${fadeIn} 1.3s ease-out`,
  tableLayout: 'auto' ,
  overflow: 'auto'
});

globalStyle('th', {
  fontWeight: 'bold',
  padding: '10px',
  textAlign: 'center',
  borderBottom: '2px solid #ddd',
  fontSize: 'min(2vw, 1.5rem)',
  whiteSpace: 'nowrap',
  position: 'sticky',
  zIndex: 1,
  top: 0,  
  backgroundColor: '#371968'
});

globalStyle('td', {
  padding: '5px',
  borderBottom: '1px solid #ddd',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  fontSize: 'min(2vw, 1.5rem)',
});
