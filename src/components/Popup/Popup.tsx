import { Question } from '@/model/question';
import {overlay} from './Popup.css';

interface PopupProps {
    question: Question,
    onSelectChoice: (choice: number) => void;
}

export const Popup = ({ question, onSelectChoice }: PopupProps) => {
  return (
    <div className={overlay}>
      <div>
        <h2>{question.question}</h2>
        <ul>
          {question.choices.map((choice, index) => (
            <li key={index} onClick={() => onSelectChoice(index)}>
              {choice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;
