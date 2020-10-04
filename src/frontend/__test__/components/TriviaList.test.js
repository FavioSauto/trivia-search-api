import React from 'react';
import { mount, shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import QuestionMock from '../../__mocks__/QuestionMock';
import TriviaList from '../../components/TriviaList';
import TriviaCard from '../../components/TriviaCard';
import { WatchIgnorePlugin } from 'webpack';

describe('<TriviaList />', () => {
  test('Component TriviaList render', () => {
    const triviaList = shallow(<TriviaList />);

    expect(triviaList.length).toEqual(1);
  });

  test('Component TriviaList Title', () => {
    const wrapper = shallow(<TriviaList />);

    const title = wrapper.find('h2.TriviaList-title');
    expect(title.text()).toMatch('Questions');
  });
});

describe('TriviaList Snapshot', () => {
  test('TriviaList Snapshot', () => {
    const triviaList = create(
      <TriviaList>
        {QuestionMock.map((question, index) => (
          <TriviaCard key={index} question={question} />
        ))}
      </TriviaList>
    );

    expect(triviaList.toJSON()).toMatchSnapshot();
  });
});
