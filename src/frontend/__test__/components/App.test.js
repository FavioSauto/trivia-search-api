import React from 'react';
import { create } from 'react-test-renderer';
import App from '../../App';
import Header from '../../components/Header';
import TriviaList from '../../components/TriviaList';
import puppeteer from 'puppeteer'



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

describe("E2E", () => {
  test('Should filter', async () => {
    const browser = await puppeteer.launch({
      headless:false,
      slowMo: 80,
      args:['--windows-size=1920,1080']
    })

    const page = await browser.newPage();
    await page.goto('D:/Documents/Trabajos/Platzi/prueba/trivia-search-api/index.html');
  }, 10000)
})