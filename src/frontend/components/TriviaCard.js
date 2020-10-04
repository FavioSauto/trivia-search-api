import React from 'react';

// styles
import '../styles/TriviaCard.styl';

function TriviaCard(props) {
  const {
    question: {
      question,
      category,
      type,
      difficulty,
      correct_answer,
      incorrect_answers
    }
  } = props;

  const answers = [...incorrect_answers, correct_answer].sort();

  return (
    <div className="TriviaCard">
      <h3 className="TriviaCard-question-title">
        {question}{' '}
        <span className={`TriviaCard-question-difficulty ${difficulty}`}>
          {difficulty}
        </span>
      </h3>

      <p className="TriviaCard-category">
        Category: <span>{category}</span>
      </p>

      <p className="TriviaCard-type">
        Type: <span>{type}</span>
      </p>

      <div className="TriviaCard-answers-container">
        {answers.map((answer, index) => (
          <p
            key={index}
            className={`TriviaCard-answer ${
              answer === correct_answer ? 'correct' : 'incorrect'
            }`}
          >
            {answer}
          </p>
        ))}
      </div>
    </div>
  );
}

export default TriviaCard;
