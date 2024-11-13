import { Question } from '@/model/question';
import {
  overlay,
  choicesListLi,
  content,
  correctAnswer,
  wrongAnswer,
  background,
} from './Popup.css';
import { useState } from 'react';

interface PopupProps {
  question: Question;
  onSelectChoice: (choice: number) => void;
}

export const Popup = ({ question, onSelectChoice }: PopupProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const onChoiceSelected = (index: number) => {
    onSelectChoice(index);
    setShowAnswer(true);
  };
  return (
    <div id="popup" className={overlay}>
      <div className={content}>
        <img src="/form.png" className={background} />
        <h1 style={{ fontSize: '3vw' }}>{question.question}</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2vh',
          }}
        >
          {question.choices.map((choice, index) => {
            if (showAnswer) {
              if (question.answer === index) {
                return (
                  <span
                    key={index}
                    className={`${choicesListLi} ${correctAnswer}`}
                  >
                    {choice}
                  </span>
                );
              }
              return (
                <span key={index} className={`${choicesListLi} ${wrongAnswer}`}>
                  {choice}
                </span>
              );
            }
            return (
              <span
                key={index}
                className={choicesListLi}
                onClick={() => onChoiceSelected(index)}
              >
                {choice}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Popup;
