import React from 'react';
import { mount, shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import QuestionMock from '../../__mocks__/QuestionMock';
import App from '../../App';
import Header from '../../components/Header';
import TriviaList from '../../components/TriviaList';
import TriviaCard from '../../components/TriviaCard';

// describe('<App />', () => {
//   test('Component TriviaList render', () => {
//     const triviaList = shallow(<TriviaList />);

//     expect(triviaList.length).toEqual(1);
//   });

//   test('Component TriviaList Title', () => {
//     const wrapper = shallow(<TriviaList />);

//     const title = wrapper.find('h2.TriviaList-title');
//     expect(title.text()).toMatch('Questions');
// });

describe('App Snapshot', () => {
  test('App Snapshot', () => {
    const triviaList = create(
      <App>
        <Header />
        <TriviaList />
      </App>
    );

    expect(triviaList.toJSON()).toMatchSnapshot();
  });
});
