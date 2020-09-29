import React, { useState, useEffect } from 'react';

// components
import PageLoading from './PageLoading/PageLoading';
import TriviaCard from './TriviaCard';

// styles
import '../styles/TriviaList.styl';

function TriviaList() {
  const [API, setAPI] = useState(
    'https://opentdb.com/api.php?amount=10&category=&type=&difficulty='
  );
  const [formValues, setFormValues] = useState({
    amount: 10,
    category: '',
    difficulty: '',
    type: ''
  });
  const [searchWord, setSearchWord] = useState('');
  const [questions, setQuestions] = useState([]);
  const [displayQuestions, setDisplayQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results);
        setDisplayQuestions(data.results);
        setLoading(false);
      })
      .catch(error => console.log(eror));
  }, [API]);

  return (
    <div className="TriviaList">
      <h2 className="TriviaList-title">Questions</h2>

      <form onSubmit={handleSubmit} className="TriviaList-form">
        <div className="TriviaList-formGroup">
          <label htmlFor="amount">Number of questions: </label>
          <input
            onChange={handleChange}
            type="number"
            name="amount"
            id="amount"
            value={formValues.amount}
            className="formControl"
          />
        </div>

        <div className="TriviaList-formGroup">
          <label htmlFor="category">Select Category: </label>
          <select
            onChange={handleChange}
            name="category"
            id="category"
            className="formControl"
            value={formValues.category}
          >
            <option value="">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musical & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
          </select>
        </div>

        <div className="TriviaList-formGroup">
          <label htmlFor="difficulty">Select Difficulty: </label>
          <select
            onChange={handleChange}
            name="difficulty"
            id="difficulty"
            className="formControl"
            value={formValues.difficulty}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="TriviaList-formGroup">
          <label htmlFor="type">Select Type: </label>
          <select
            onChange={handleChange}
            name="type"
            id="type"
            className="formControl"
            value={formValues.type}
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True or False</option>
          </select>
        </div>

        <div className="TriviaList-formGroup">
          <label htmlFor="words">Search words: </label>
          <input
            onChange={handleSearch}
            type="text"
            name="words"
            className="FormControl"
            value={searchWord}
          />
        </div>

        <button className="TriviaList-buttonFormControl">
          Search New Trivia
        </button>
        <button className="TriviaList-buttonFormControl" onClick={handleReset}>
          Reset
        </button>
      </form>

      {loading ? (
        <PageLoading />
      ) : (
        displayQuestions.map((question, index) => (
          <TriviaCard key={index} question={question} />
        ))
      )}
    </div>
  );

  function handleSubmit(event) {
    event.preventDefault();

    setAPI(
      `https://opentdb.com/api.php?amount=${formValues.amount}&category=${formValues.category}&type=${formValues.type}&difficulty=${formValues.difficulty}`
    );
  }

  function handleChange(event) {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  }

  function handleSearch(event) {
    setSearchWord(event.target.value);

    if (searchWord !== '') {
      let newList = questions.filter(question =>
        question.question.toLowerCase().includes(event.target.value)
      );

      setDisplayQuestions(newList);
    } else {
      setDisplayQuestions(questions);
    }
  }

  function handleReset() {
    setFormValues({
      amount: 10,
      category: '',
      difficulty: '',
      type: ''
    });

    setSearchWord('');

    setAPI(
      `https://opentdb.com/api.php?amount=${formValues.amount}&category=${formValues.category}&type=${formValues.type}&difficulty=${formValues.difficulty}`
    );
  }
}

export default TriviaList;
