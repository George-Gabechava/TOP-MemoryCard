import React, { useEffect, useState } from 'react';
import './App.css';
import jikanGet from './jikanAPI.js';
import {characterList, shuffleList} from './list.js';
import delay from './timeout.js';

function App() {
  const [urlList, setUrlList] = useState([]);
  const [clickedList, setClickedList] = useState([])

  const [currentScore, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  let newShuffle = shuffleList(characterList);

  useEffect(() => {
    // Add a delay before setting the URL list state
    const fetchUrlList = async () => {
      const urls = [];
      for (const character of newShuffle) {
        const result = await jikanGet(character.id);
        urls.push(result);
        // place URLs in characterlist
        let currentCharacter = newShuffle.find(char => char.id === character.id);
        currentCharacter.urlList = result;
        // place first url in list
        currentCharacter.firstUrl = result[0].jpg.image_url;
        // place random url in list
        let randomUrlIndex = Math.floor(Math.random()*result.length);
        currentCharacter.randomUrl = result[randomUrlIndex].jpg.image_url;
        // Add a delay between each request due to API request limitations
        await delay(500);
      }
      setUrlList(urls);
    };
    fetchUrlList();
  }, []);
  

  function randomizeImages() {
    console.log("click");
    // place random url in list
    for (var i in newShuffle) {
      let currentCharacter = newShuffle[i];
      let randomUrlIndex = Math.floor(Math.random()*currentCharacter.urlList.length);
      currentCharacter.randomUrl = currentCharacter.urlList[randomUrlIndex].jpg.image_url;
    }
    setUrlList([]);    
  }

  const handler = function(e) {
    const clickedName = e.currentTarget.getAttribute("data-name");
    if (clickedList.includes(clickedName)) {
      console.log("repeated character!");

      if (currentScore > highScore) {
        setHighScore(currentScore);
      }

      setClickedList([])
      setScore(prevScore => 0);
      return;
    }
    setScore(prevScore => prevScore + 1);
    setClickedList(clickedList => [...clickedList, clickedName])

    // Function to randomly shuffle the rendering order of cards after every click
    newShuffle = shuffleList(characterList);
  }

  let renderCards = newShuffle.map((character) => (
    <div className='card' onClick={handler} key={character.id} data-name={character.name}>
      <h4>{character.name}</h4>
      {/* Display the URL from urlList */}
      <img src={character.randomUrl}></img>
    </div>
  ));

  return (
  <>
    <div id='headContain'>
    <button onClick={randomizeImages}>Randomize Images!</button>
    <div>
      <h2>Current Score: {currentScore}</h2>
      
      <h3>High Score: {highScore}</h3>
    </div>
    </div>
    <div id='cardContain'>
      {renderCards}
    </div>
    <footer>
      <p> Author: <a href="https://github.com/George-Gabechava">George Gabechava</a></p>
      <p> <a href="https://github.com/George-Gabechava/TOP-MemoryCard">Source Code</a></p>
      <p> Powered by <a href="https://jikan.moe/">Jikan API</a></p>
    </footer>
  </>
  )
}

export default App;
