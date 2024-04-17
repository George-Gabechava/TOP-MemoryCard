import React, { useEffect, useState } from 'react';
import './App.css';
import jikanGet from './jikanAPI.js';
import characterList from './list.js';

function App() {
  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const urls = await Promise.all(
        characterList.map(async character => {
          const result = await jikanGet(character.id);
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
    console.log(e.currentTarget.getAttribute("data-name"));
  }

  const renderCards = characterList.map((character, index) => (
    <div className='card' onClick={handler} key={character.id} data-name={character.name}>
      {character.name}
      <br />
      {/* Display the URL from urlList */}
      <img src={urlList[index]}></img>
    </div>
  ));

  return (
  <>
    <div id='cardContain'>
      {renderCards}
    </div>
  </>
  )
}

export default App;
