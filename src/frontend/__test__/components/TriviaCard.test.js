import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import QuestionMock from '../../__mocks__/QuestionMock';
import TriviaCard from '../../components/TriviaCard';

describe('<TriviaCard />', () => {
  test('Component TriviaCard render', () => {
    const triviaCard = shallow(<TriviaCard question={QuestionMock[0]} />);

    expect(triviaCard.length).toEqual(1);
  });

  test('Info renders with question type multiple', () => {
    const wrapper = shallow(<TriviaCard question={QuestionMock[0]} />);

    const questionTitle = wrapper.find('h3.TriviaCard-question-title');
    expect(questionTitle.text()).toBeDefined();

    const questionCategory = wrapper.find('p.TriviaCard-category span');
    expect(questionCategory.text()).toBeDefined();

    const questionType = wrapper.find('p.TriviaCard-type');
    expect(questionType.text()).toBeDefined();

    const questionIncorrectAnswers = wrapper.find(
      'p.TriviaCard-answer.incorrect'
    );
    expect(questionIncorrectAnswers.length).toEqual(3);

    const questionCorrectAnswer = wrapper.find('p.TriviaCard-answer.correct');
    expect(questionCorrectAnswer.length).toEqual(1);
  });

  test('Info renders with question type boolean', () => {
    const wrapper = shallow(<TriviaCard question={QuestionMock[1]} />);

    const questionTitle = wrapper.find('h3.TriviaCard-question-title');
    expect(questionTitle.text()).toBeDefined();

    const questionCategory = wrapper.find('p.TriviaCard-category span');
    expect(questionCategory.text()).toBeDefined();

    const questionType = wrapper.find('p.TriviaCard-type');
    expect(questionType.text()).toBeDefined();

    const questionIncorrectAnswer = wrapper.find(
      'p.TriviaCard-answer.incorrect'
    );
    expect(questionIncorrectAnswer.text()).toBeDefined();

    const questionCorrectAnswer = wrapper.find('p.TriviaCard-answer.correct');
    expect(questionCorrectAnswer.text()).toBeDefined();
  });
});

describe('TriviaCard Snapshot', () => {
  test('TriviaCard type multiple Snapshot', () => {
    const triviaCard = create(<TriviaCard question={QuestionMock[0]} />);

    expect(triviaCard.toJSON()).toMatchSnapshot();
  });

  test('TriviaCard type boolean Snapshot', () => {
    const triviaCard = create(<TriviaCard question={QuestionMock[1]} />);

    expect(triviaCard.toJSON()).toMatchSnapshot();
  });
});
