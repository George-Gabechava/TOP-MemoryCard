import { useState, useEffect } from 'react'

// API Website: https://jikan.moe/ 

function jikanGet(characterID, pictureIndex) {
  // Call format: https://api.jikan.moe/v4/characters/{ID}/pictures where ID is found from https://myanimelist.net/character/{ID}
  // GET request using fetch with error handling
  console.clear();

  let currentComponent;
  let url = 'https://api.jikan.moe/v4/characters/' + characterID + '/pictures'
  console.log(url);
  fetch(url)
  .then(async response => {
      const dataList = await response.json();
      console.log(dataList.data.length)
      console.log(response)
      // check for error response
      if (response.statusText !== "OK") {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      console.log("we made it")
      currentComponent.setState({ data })
  })


//// work on error cathcing
  .catch(error => {
      currentComponent.setState({ errorMessage: error.toString() });
      console.error('There was an error!', error);
  });

  console.log(currentComponent);
  return (
    currentComponent
    // return the image  
  )
}

export default jikanGet
