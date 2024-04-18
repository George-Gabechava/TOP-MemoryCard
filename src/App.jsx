import React, { useEffect, useState } from 'react';
import './App.css';
import jikanGet from './jikanAPI.js';
import {characterList, shuffleList} from './list.js';

function App() {
  const [urlList, setUrlList] = useState([]);
  const [clickedList, setClickedList] = useState([])

  const [currentScore, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  let newShuffle = shuffleList(characterList);
  
  useEffect(() => {
    async function fetchData() {
      const urls = await Promise.all(
        newShuffle.map(async character => {
          const result = await jikanGet(character.id);

          // place URLs in characterlist
          let currentCharacter = newShuffle.find(char => char.id === character.id);
          currentCharacter.urlList = result;
          currentCharacter.url = result[0].jpg.image_url;
          console.log(currentCharacter);


          // get first URL
          return result[0].jpg.image_url;

          // If I want a random image from the set, I'll need to find out how many images I have using:
          //console.log("len", result.length);
        })
      );
      setUrlList(urls);
    }
    fetchData();
  }, []);

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
    console.log(clickedList, "score:", currentScore); // seems to be 1 action behind

    // Function to randomly shuffle the rendering order of cards after every click
    newShuffle = shuffleList(characterList);
    console.log(newShuffle);
  }

  let renderCards = newShuffle.map((character) => (
    <div className='card' onClick={handler} key={character.id} data-name={character.name}>
      {character.name}
      <br />
      {/* Display the URL from urlList */}
      <img src={character.url}></img>
    </div>
  ));

  return (
  <>
    <div>
      <h2>Current Score: {currentScore}</h2>
      
      <h3>High Score: {highScore}</h3>
    </div>
    <div id='cardContain'>
      {renderCards}
    </div>
  </>
  )
}

export default App;
