import { useEffect, useState } from 'react'
import './App.css'
import jikanGet from './jikanAPI'

function App() {
  // const [count, setCount] = useState(0)
  let list = [
    {
      name: "Alphonse Elric",
      id: 12,
      url: "placeholder"
    },
    {
      name: "Erwin Smith",
      id: 46496,
      url: "placeholder"
    },
    // {
    //   name: "Satoru Gojou",
    //   id: 164471,
    //   url: ""
    // }
  ]

  // populate the url field for each character
  //might need to useEffect/useState here
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
      {/* image from url here */}
      </div>
  );
  
  return (
    <>
     {renderCards}
    </>
  )
}

export default App
