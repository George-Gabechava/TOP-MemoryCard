import { useState, useEffect } from 'react'

// API Website: https://jikan.moe/ 

function jikanGet(characterID, pictureIndex) {
  // Call format: https://api.jikan.moe/v4/characters/{ID}/pictures where ID is found from https://myanimelist.net/character/{ID}
  // GET request using fetch with error handling
  let url = 'https://api.jikan.moe/v4/characters/' + characterID + '/pictures'
  fetch(url)
    .then(response => {
      // check for error response
      if (response.statusText !== "OK" || response.status !== 200) {
        const error = (response.statusText || response.status);
        return error;
      }
      response = response.json();
      return response;
    }).then(response => {
      console.log("jikanGet", response.data);
      // to return first image: use response.data[0].jpg.image_url
      return response.data;
    });
}

export default jikanGet
