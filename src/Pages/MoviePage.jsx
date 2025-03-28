import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import topBanner from "../assets/images/MoviePageBanner.png";
import { useState, useEffect } from "react";

// Button resources
const btnResource = [
  { languages: ['Japanese','Hindi','English','Mongolian','Malayalam','Kannada'] },
  { genre: ["Drama", "Family", "Thriller", "Comedy", "Romantic", "Fantasy", "Horror", "Sci-Fi"] }
];

const MoviePage = () => {
  const [languagePicked, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [filteredResult, setResult] = useState([]);
  const [fetchedData, setData] = useState();

  const [temp,setTemp]=useState("");


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData=[];
          async function fetchData()
          {
            await fetch("https://api.themoviedb.org/3/discover/movie?api_key=02f0070fc6a039796d5d22b61ee42ba6")
            .then((res)=>{
              return res.json();
            })
            .then((dat)=>{
              console.log(dat.results)
              for(let item of dat.results)
              {
                movieData.push(item)
              }
              console.log("fetched here",movieData)
            })
          }
          
          fetchData();
    
        setData(movieData);
        setResult(movieData); 
     
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovies();
  }, []);

  let languageMapping={
    Japanese:"ja",
    Hindi:"hi",
    English:"en",
    Mongolian:"mn",
    Malayalam:"ml",
    Kannada:"kn",
  }
  function languageMapper(lan){
     for(let item in languageMapping)
     {
      if(lan===item)
      {
        return languageMapping[item];
      }
     }
  }

  function movieFilter() {
    let filtered = fetchedData;
    console.log(filtered+"check")
    if(languagePicked==="")
    {
        filtered=filtered.map((item)=>{
          return item
                                    })
    }
    if (languagePicked !== "") {
      filtered = filtered.filter((item) => item.original_language &&  item.original_language.includes(languagePicked));
    }
    // if (genre !== "") {
    //   filtered = filtered.filter((item) => item.Genre && item.Genre.includes(genre));
    // }
    setResult(filtered);
  }
  
  // poster_path


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
            <FilterSection title="Languages" row={1} options={btnResource[0].languages} selected={languagePicked} setSelected={setLanguage} languageMapper={languageMapper} movieFilter={movieFilter} temp={temp} setTemp={setTemp} />
            <FilterSection title="Genre" row={2} options={btnResource[1].genre} selected={genre} setSelected={setGenre} movieFilter={movieFilter} />
          </div>
          <div className="col border border-dark p-3">
            <div className="row border border-dark p-1">
              {filteredResult.map((item, index) => (
                <div key={index} className="col-3 text-center border border-danger">
                  <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="w-75 rounded-4" alt={item.Title} />
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

const FilterSection = ({ title, options, selected, setSelected, movieFilter,languageMapper,temp,setTemp }) =>
(
  <div className="row bg-warning rounded-3 border border-secondary p-3 mt-4" style={{ width: "100%", boxShadow: "7px 7px 0 black" }}>
    <h3 className="text-center mb-3">{title}</h3>
    <button onClick={()=>{setSelected("");movieFilter()}}>Clear All</button>
    {options.map((item, index) => (
      <button
        key={index}
        className={`btn ${temp === item ? "btn-primary" : "btn-outline-primary"} mb-2 me-2`}
        onClick={() => {
          setTemp(item)
          console.log(item)
          let language=languageMapper(item)
          setSelected(language);
          movieFilter();
        }}
      >
        {item}
      </button>
    ))}
  </div>
)

export default MoviePage;
