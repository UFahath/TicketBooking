import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import topBanner from "../assets/images/MoviePageBanner.png";
import { useState, useEffect } from "react";

// Button resources
const btnResource = [
  { languages: ["Tamil", "Hindi", "English", "Telugu", "Malayalam", "Kannada"] },
  { genre: ["Drama", "Family", "Thriller", "Comedy", "Romantic", "Fantasy", "Horror", "Sci-Fi"] }
];

const MoviePage = () => {
  const [languagePicked, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [filteredResult, setResult] = useState([]);
  const [fetchedData, setData] = useState([]);

  useEffect(() => {
    const imdbIDs = [
  // Tamil Movies
  "tt15097216", // Vikram (2022)
  "tt9161182",  // Kaithi (2019)
  "tt7019946",  // Aruvi (2016)
  "tt10545484", // Super Deluxe (2019)
  "tt0375777",  // Anbe Sivam (2003)
  
  // Hindi Movies
  "tt1187043",  // 3 Idiots (2009)
  "tt5074352",  // Dangal (2016)
  "tt1954470",  // Gangs of Wasseypur (2012)
  "tt8108198",  // Andhadhun (2018)

  // Malayalam Movies
  "tt4729430",  // Premam (2015)
  "tt3919028",  // Drishyam (2013)
  "tt9561862",  // Kumbalangi Nights (2019)

  // Telugu Movies
  "tt4849438",  // Bahubali 2 (2017)
  "tt6998126",  // Arjun Reddy (2017)
  "tt7919680",  // Jersey (2019)

  // Kannada Movies
  "tt15327088", // Kantara (2022)
  "tt10698680", // KGF 2 (2022)
  "tt7466810",  // 777 Charlie (2022)

  // English Movies
  "tt1375666",  // Inception (2010)
  "tt0468569",  // The Dark Knight (2008)
  "tt0848228",  // The Avengers (2012)
  "tt0133093",  // The Matrix (1999)
];
    const fetchMovies = async () => {
      try {
        const movieData = [];
        for (let id of imdbIDs) {
          const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=1c692422`);
          const result = await response.json();
          if (response.ok) {
            console.log(result)
            movieData.push(result);
          }
        }
        setData(movieData);
        setResult(movieData); 
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovies();
  }, []);

  function movieFilter() {
    let filtered = fetchedData;

    if (languagePicked !== "") {
      filtered = filtered.filter((item) => item.Language && item.Language.includes(languagePicked));
    }

    if (genre !== "") {
      filtered = filtered.filter((item) => item.Genre && item.Genre.includes(genre));
    }

    setResult(filtered);
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row my-5">
          <img src={topBanner} alt="Movie Page Banner" className="img-fluid" />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <FilterSection title="Languages" row={1} options={btnResource[0].languages} selected={languagePicked} setSelected={setLanguage} movieFilter={movieFilter} />
            <FilterSection title="Genre" row={2} options={btnResource[1].genre} selected={genre} setSelected={setGenre} movieFilter={movieFilter} />
          </div>
          <div className="col border border-dark p-3">
            <div className="row border border-dark p-1">
              {filteredResult.map((item, index) => (
                <div key={index} className="col-3 text-center border border-danger">
                  <img src={item.Poster} className="w-75 rounded-4" alt={item.Title} />
                  <p>{item.Title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const FilterSection = ({ title, options, selected, setSelected, movieFilter }) => (
  <div className="row bg-warning rounded-3 border border-secondary p-3 mt-4" style={{ width: "100%", boxShadow: "7px 7px 0 black" }}>
    <h3 className="text-center mb-3">{title}</h3>
    {options.map((item, index) => (
      <button
        key={index}
        className={`btn ${selected === item ? "btn-primary" : "btn-outline-primary"} mb-2 me-2`}
        onClick={() => {
          setSelected(item);
          movieFilter();
        }}
      >
        {item}
      </button>
    ))}
  </div>
);

export default MoviePage;
