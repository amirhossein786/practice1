import{ useState } from 'react';
import wordList from './Word';

function App() {
  const [inputWord, setInputWord] = useState('');
  const [similarWords, setSimilarWords] = useState([]);

  const handleInput = (event) => {
    setInputWord(event.target.value);
  };

  const getSimilarWords = () => {
    if (inputWord.trim() === '') {
      setSimilarWords([]);
      return;
    }
    const inputWordLower = inputWord.toLowerCase();
    const similarWords = wordList.filter((word) => {
      let correctLetters = 0;
      for (let i = 0; i < inputWordLower.length; i++) {
        if (word.toLowerCase().includes(inputWordLower[i])) {
          correctLetters++;
        }
      }
      return correctLetters > 0;
    });
    setSimilarWords(similarWords);
  };

  const clear = () => {
    setInputWord('');
    setSimilarWords([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputWord}
        onChange={handleInput}
        placeholder="write a 3-letter word"
      />
      <button onClick={getSimilarWords}>Find</button>
      <button onClick={clear}>Clear word</button>
      {similarWords.length > 0 ? (
        <ul>
          {similarWords.map((word) => (
            <li key={word}>
              {Array.from(word).map((letter, index) => (
                <span
                  key={index}
                  style={{
                    color: inputWord.toLowerCase().includes(letter) ? 'green' : 'yellow',
                  }}
                >
                  {letter}
                  
                </span>
              ))}
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No similar words found.</p>
      )}
    </div>
  );
}
export default App;