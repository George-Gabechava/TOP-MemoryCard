import { useEffect, useState } from 'react'
import './App.css'
import jikanGet from './jikanAPI.js'
import characterList from './list.js'

function App() {
  let list = characterList;

  // populate the url field for each character from the API
  for (let i = 0; i < list.length; i++) {
    console.log("get pictures urls for", list[i].name);
    useEffect(() => {
      async function startFetching() {
        const result = await jikanGet(list[i].id);
        if (!ignore) {
          console.log(i, list[i].url);
          list[i].url = result;
          console.log(i, list[i].url);
        }
      }

      let ignore = false;
      startFetching();
      return () => {
        ignore = true;
      }
    }, []);
  }

  const renderCards = list.map(character =>
    <div className='card' key={character.id}>
      {character.name}
      <br></br>
      {character.id}
      <br></br>
      {character.url}
      {/* image from url here. I'll probably need a new <div> or something*/}
      </div>
  );
  
  return (
    <>
     {renderCards}
    </>
  )
}

export default App
