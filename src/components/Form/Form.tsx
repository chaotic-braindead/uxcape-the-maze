import {overlay, content} from './form.css';
import { useState } from 'react';

interface FormProps {
  children?: React.ReactNode;
}

export const Form = ({ children }: FormProps) => {  
  return (
    <div className={overlay}>
      <div className={content}>
        {children}
      </div>
    </div>
  );
};

export default Form;
