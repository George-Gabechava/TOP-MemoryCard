function jikanGet(characterID) {
  let url = 'https://api.jikan.moe/v4/characters/' + characterID + '/pictures';
  
  // Return a promise
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      return data.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
        throw new Error("Error", error);
    });
}

export default jikanGet;
