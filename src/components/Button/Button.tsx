import React, { ChangeEvent } from 'react';
import { button } from '@/components/Button/Button.css';

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button = ({ onClick, disabled, children }: ButtonProps) => (
  <button className={button} onClick={onClick} disabled={disabled}>
    {children ?? 'Click'}
  </button>
);
