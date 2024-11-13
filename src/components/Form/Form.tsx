import { overlay, content, background } from './Form.css';

interface FormProps {
  children?: React.ReactNode;
}

export const Form = ({ children }: FormProps) => {
  return (
    <div className={overlay}>
      <div className={content}>
        <img src="/form.png" className={background} />
        {children}
      </div>
    </div>
  );
};
