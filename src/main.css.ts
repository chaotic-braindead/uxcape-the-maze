import { vars } from '@/styles/theme.css';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('body', {
  backgroundImage: 'url(/bg.png)',
  color: vars.color.light.main,
  margin: vars.spacing.xlarge,
  lineHeight: '170%',
});

globalStyle('table', {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '20px 0',
});

globalStyle('th', {
  fontWeight: 'bold',
  padding: '12px',
  textAlign: 'center',
  borderBottom: '2px solid #ddd',
});

globalStyle('td', {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  textAlign: 'center',
});

globalStyle('tr:nth-child(even)', {
  backgroundColor: '#394245',
});
