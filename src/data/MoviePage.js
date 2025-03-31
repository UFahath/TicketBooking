// Button text resources
export const btnResource = [
  {
    languages: [
      "Japanese",
      "Hindi",
      "English",
      "Mongolian",
      "Malayalam",
      "Kannada",
    ],
  },
  {
    genre: [
      "Drama",
      "Family",
      "Thriller",
      "Comedy",
      "Action",
      "Fantasy",
      "Horror",
      "Animation",
    ],
  },
];

//genres
export const genres = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  Science_Fiction: 878,
  TV_Movie: 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

//language mapping
let languageMapping = {
  Japanese: "ja",
  Hindi: "hi",
  English: "en",
  Mongolian: "mn",
  Malayalam: "ml",
  Kannada: "kn",
  French: "fr",
  Danish: "da",
  Spanish: "es",
};
//language mapping
export function languageMapper(lan, key) {
  console.log(key);
  for (let item in languageMapping) {
    if (lan !== 0 && lan === item) {
      return languageMapping[item];
    }
    if (key === languageMapping[item]) {
      return item;
    }
  }
}

//genre Mapping
export function genreMapper(gen, key) {
  let genr = [];
  for (let item in genres) {
    if (gen !== 0 && gen === item) {
      return genres[item];
    } else if (key !== undefined) {
      console.log(item)
      for (let genreids of key) {
        if (genreids === genres[item]) {
          genr.push(item);
        }
      }
    }
  }
  return genr!==null&&genr;
}
