import React, { useState, useEffect } from 'react';
import './App.css';
import { languages, generateUtf16Strings } from './languages';

const Flashcard = ({ front, back, fontSize, onClick, clicked, flipped, onFlip }) => {
  const handleClick = () => {
    onFlip();
    onClick();
  };

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={handleClick}
      style={{
        fontSize: `${fontSize}px`,
        border: clicked ? '3px solid #555' : '1px solid #ccc', // Dark grey border if clicked
      }}
    >
      {flipped ? back : front}
    </div>
  );
};

const FlashcardGrid = ({ fontSize, clickedCards, flippedCards, handleCardClick, handleCardFlip, flashcardsData, columns }) => {
  return (
    <div className="flashcard-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {flashcardsData.map((card, index) => (
        <Flashcard
          key={index}
          front={card.front}
          back={card.back}
          fontSize={fontSize}
          onClick={() => handleCardClick(index)}
          clicked={clickedCards[index]}
          flipped={flippedCards[index]}
          onFlip={() => handleCardFlip(index)}
        />
      ))}
    </div>
  );
};

const App = () => {
  const languageKeys = Object.keys(languages);
  const defaultFrontLanguage = languageKeys.length > 0 ? languageKeys[0] : '';
  const defaultBackLanguage = languageKeys.length > 1 ? languageKeys[1] : defaultFrontLanguage;

  const [fontSize, setFontSize] = useState(120);
  const [clickedVowelCards, setClickedVowelCards] = useState(Array(16).fill(false));
  const [flippedVowelCards, setFlippedVowelCards] = useState(Array(16).fill(false));
  const [clickedConsonantCards, setClickedConsonantCards] = useState(Array(19).fill(false));
  const [flippedConsonantCards, setFlippedConsonantCards] = useState(Array(19).fill(false));
  const [frontLanguage, setFrontLanguage] = useState(defaultFrontLanguage);
  const [backLanguage, setBackLanguage] = useState(defaultBackLanguage);
  const [vowelFlashcardsData, setVowelFlashcardsData] = useState([]);
  const [consonantFlashcardsData, setConsonantFlashcardsData] = useState([]);

  useEffect(() => {
    if (frontLanguage && backLanguage) {
      const frontLetters = generateUtf16Strings(languages[frontLanguage].startCode, languages[frontLanguage].endCode);
      const backLetters = generateUtf16Strings(languages[backLanguage].startCode, languages[backLanguage].endCode);

      const vowels = frontLetters.slice(0, 16).map((letter, index) => ({
        front: letter,
        back: backLetters[index] || '',
      }));

      const consonants = frontLetters.slice(16).map((letter, index) => ({
        front: letter,
        back: backLetters[index + 16] || '',
      }));

      setVowelFlashcardsData(vowels);
      setConsonantFlashcardsData(consonants);
    }
  }, [frontLanguage, backLanguage]);

  const handleSliderChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleVowelCardClick = (index) => {
    const newClickedCards = [...clickedVowelCards];
    newClickedCards[index] = true;
    setClickedVowelCards(newClickedCards);
  };

  const handleVowelCardFlip = (index) => {
    const newFlippedCards = [...flippedVowelCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedVowelCards(newFlippedCards);
  };

  const handleConsonantCardClick = (index) => {
    const newClickedCards = [...clickedConsonantCards];
    newClickedCards[index] = true;
    setClickedConsonantCards(newClickedCards);
  };

  const handleConsonantCardFlip = (index) => {
    const newFlippedCards = [...flippedConsonantCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedConsonantCards(newFlippedCards);
  };

  const handleResetBordersClick = () => {
    setClickedVowelCards(Array(16).fill(false));
    setClickedConsonantCards(Array(19).fill(false));
  };

  const handleResetFlipsClick = () => {
    setFlippedVowelCards(Array(16).fill(false));
    setFlippedConsonantCards(Array(19).fill(false));
  };

  const handleFrontLanguageChange = (event) => {
    setFrontLanguage(event.target.value);
  };

  const handleBackLanguageChange = (event) => {
    setBackLanguage(event.target.value);
  };

  return (
    <div className="App">
      <h1>Flashcards</h1>
      <div className="controls-container">
        <div className="slider-container">
          <label htmlFor="fontSizeSlider">Font Size: {fontSize}px</label>
          <input
            id="fontSizeSlider"
            type="range"
            min="48"
            max="120"
            value={fontSize}
            onChange={handleSliderChange}
          />
        </div>
        <button onClick={handleResetBordersClick}>Reset Borders</button>
        <button onClick={handleResetFlipsClick}>Reset Flips</button>
      </div>
      {languageKeys.length > 0 ? (
        <>
          <div className="dropdown-container">
            <label htmlFor="frontLanguage">Front Language:</label>
            <select id="frontLanguage" value={frontLanguage} onChange={handleFrontLanguageChange}>
              {languageKeys.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            <label htmlFor="backLanguage">Back Language:</label>
            <select id="backLanguage" value={backLanguage} onChange={handleBackLanguageChange}>
              {languageKeys.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <h2>Vowels</h2>
          <FlashcardGrid
            fontSize={fontSize}
            clickedCards={clickedVowelCards}
            flippedCards={flippedVowelCards}
            handleCardClick={handleVowelCardClick}
            handleCardFlip={handleVowelCardFlip}
            flashcardsData={vowelFlashcardsData}
            columns={8}
          />
          <h2>Consonants</h2>
          <FlashcardGrid
            fontSize={fontSize}
            clickedCards={clickedConsonantCards}
            flippedCards={flippedConsonantCards}
            handleCardClick={handleConsonantCardClick}
            handleCardFlip={handleConsonantCardFlip}
            flashcardsData={consonantFlashcardsData}
            columns={5}
          />
        </>
      ) : (
        <p>No languages available.</p>
      )}
    </div>
  );
}

export default App;