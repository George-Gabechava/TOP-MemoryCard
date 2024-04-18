export let characterList = [
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
  {
    name: "Satoru Gojou",
    id: 164471,
    url: ""
  }
]

export function shuffleList(array) {
  let result = [];
  let characterListCopy = [...array];
  let itemsToSort = characterListCopy.length;

  while (itemsToSort > 0) {
    let randomItem = Math.floor(Math.random()*itemsToSort);
    result.push(characterListCopy[randomItem]);
    itemsToSort = itemsToSort -1;
    characterListCopy.splice(randomItem, 1);
  }
  return result;
}

// export let shuffledList = shuffle(characterList);
