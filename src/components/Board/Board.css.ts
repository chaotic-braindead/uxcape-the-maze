import { style } from '@vanilla-extract/css';
import { elevation, vars } from '@/styles/theme.css';

export const container = style([
  elevation,
  {
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--current-board-height), 1fr)',
    // gridTemplateRows: 'repeat(var(--current-board-height), 1fr)',
    // width: '90vmin',
    // height: '90vmin',
    padding: vars.spacing.medium,
    // margin: 'auto'
  },
]);
