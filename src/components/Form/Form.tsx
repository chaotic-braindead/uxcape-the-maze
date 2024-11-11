import { overlay, content } from './Form.css';

interface FormProps {
  children?: React.ReactNode;
}

export const Form = ({ children }: FormProps) => {
  return (
    <div className={overlay}>
      <div className={content}>{children}</div>
    </div>
  );
};
