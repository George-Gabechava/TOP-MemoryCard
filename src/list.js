export let characterList = [
  {
    name: "Alphonse Elric",
    id: 12,
  },
  {
    name: "Erwin Smith",
    id: 46496,
  },
  {
    name: "Satoru Gojou",
    id: 164471,
  },
  {
    name: "Kamina",
    id: 2075,
  },
  {
    name: "Killua Zoldyck",
    id: 27,
  },
  {
    name: "Genos",
    id: 73979,
  },
  {
    name: "Ruijerd Superdia",
    id: 111739,
  },
  {
    name: "Pochita",
    id: 174750,
  },
  {
    name: "Jet Black",
    id: 3,
  },
  {
    name: "Pack",
    id: 137541,
  },
  {
    name: "Tet",
    id: 97769,
  },
  {
    name: "Kazuma Satou",
    id: 117221,
  },
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
