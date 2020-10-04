import React from 'react';
import { mount, shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import Header from '../../components/Header';

describe('<Header />', () => {
  test('Component Header render', () => {
    const header = shallow(<Header />);

    expect(header.length).toEqual(1);
  });

  test('Title render', () => {
    const header = mount(<Header />);

    expect(header.find('.Header-title').text()).toEqual('Trivia Search API');
  });
});

describe('Header SnapShot', () => {
  test('Header SnapShot', () => {
    const header = create(<Header />);

    expect(header.toJSON()).toMatchSnapshot();
  });
});
