import { Question } from '@/model/question';
import {overlay, choicesListLi, content, correctAnswer, wrongAnswer} from './Popup.css';
import { useState } from 'react';

interface PopupProps {
    question: Question,
    onSelectChoice: (choice: number) => void;
}

export const Popup = ({ question, onSelectChoice }: PopupProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const onChoiceSelected = (index: number) => {
    onSelectChoice(index);
    setShowAnswer(true);
  }
  return (
    <div className={overlay}>
      <div className={content}>
        <h2>{question.question}</h2>
          {question.choices.map((choice, index) => {
            if(showAnswer){
              if(question.answer === index){
                return (<span key={index} className={`${choicesListLi} ${correctAnswer}`}>
                  {choice}
                </span>)
              }
              return (<span key={index} className={`${choicesListLi} ${wrongAnswer}`}>
                {choice}
              </span>)
            }
            return (<span key={index} className={choicesListLi} onClick={() => onChoiceSelected(index)}>
                {choice}
              </span>)
          })}
      </div>
    </div>
  );
};

export default Popup;
