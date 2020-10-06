import React from 'react';
import { create } from 'react-test-renderer';
import App from '../../App';
import Header from '../../components/Header';
import TriviaList from '../../components/TriviaList';
import puppeteer from 'puppeteer';

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

describe('E2E', () => {
  test('Title of the page', async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 80
    });

    const page = await browser.newPage();
    await page.goto('https://trivia-search-api.herokuapp.com/');

    const title = await page.title();
    expect(title).toBe('Trivia API');
  }, 10000);

  test('Form filter', async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 80
    });

    const page = await browser.newPage();
    await page.goto('https://trivia-search-api.herokuapp.com/');

    await page.evaluate(() => {
      document.querySelector('#amount').value = '';
    });

    await page.type('#amount', '15');
    await page.select('select#type', 'multiple');
    await page.select('select#difficulty', 'easy');
    await page.select('select#category', '9');

    await page.click('button#btn-searchNew');

    await delay(5000);

    const triviaCardsLength = await page.$$eval(
      'div.TriviaCard',
      cards => cards.length
    );

    const triviaCardDifficulty = await page.$eval(
      'span.TriviaCard-question-difficulty',
      card => card.textContent
    );

    const triviaCardCategory = await page.$eval(
      'p.TriviaCard-category > span',
      card => card.textContent
    );

    const triviaCardType = await page.$eval(
      'p.TriviaCard-type > span',
      card => card.textContent
    );

    expect(triviaCardsLength).toBe(15);
    expect(triviaCardDifficulty).toBe('easy');
    expect(triviaCardCategory).toBe('General Knowledge');
    expect(triviaCardType).toBe('multiple');

    await browser.close();
  }, 30000);
});

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
