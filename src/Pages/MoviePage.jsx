import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import topBanner from "../assets/images/MoviePageBanner.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import { FailedResponse } from "../components/FailedResponse";

// Button resources
const btnResource = [
  { languages: ['Japanese','Hindi','English','Mongolian','Malayalam','Kannada'] },
  { genre: ["Drama", "Family", "Thriller", "Comedy", "Romantic", "Fantasy", "Horror", "Sci-Fi"] }
];

//genres
// const genres={
//   Action          :28,
//   Adventure       :12,
//   Animation       :16,
//   Comedy          :35,
//   Crime           :80,
//   Documentary     :99,
//   Drama           :18,
//   Family          :10751,
//   Fantasy         :14,
//   History         :36,
//   Horror          :27,
//   Music           :10402,
//   Mystery         :9648,
//   Romance         :10749,
//   Science_Fiction :878,
//   TV_Movie        :10770,
//   Thriller        :53,
//   War             :10752,
//   Western         :37
// }

const MoviePage = () => {
  const [languagePicked, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [filteredResult, setResult] = useState([]);
  const [fetchedData, setData] = useState([]);

  //for button color change
  const [temp,setTemp]=useState("");

  //genre ids
  const[genreIds,setGenreIds]=useState(null)

  //loading state
  const[loading,setLoading]=useState(true);

  //failed response
  const[fail,setFail]=useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
     
        const movieData=[];
          async function fetchData()
          {
            await fetch("https://api.themoviedb.org/3/discover/movie?api_key=02f0070fc6a039796d5d22b61ee42ba6")
            .then((res)=>{
              return res.json();
            })
            .then((dat)=>{
              // console.log("results:",dat.results[0].genre_ids)
              setGenreIds(dat.results[0].genre_ids)
              for(let item of dat.results)
              {
                movieData.push(item)
              }
               setData(movieData);
              setResult(movieData); 
              setLoading(false);
            })
            .catch(()=>{
              setLoading(false)
              setFail(true)
              alert("Failed to Fetch Data because this api cannot be accessed sometime due to regional restriction..use vpn if it's not working")
            })
          }
          
          fetchData();
    
       
     return ()=>{};
      
    };

    fetchMovies();
  }, []);

  console.log("uponloading",filteredResult)
  console.log("genreids:",genreIds)
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
  


  //Movie Picker function

  function pickedDetails(movieName){
    let output=filteredResult.filter((movie)=>{
      return movie.original_title.includes(movieName)
    })
     localStorage.setItem('MoviePicked:',JSON.stringify(output))
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
            <FilterSection title="Languages" row={1} options={btnResource[0].languages} selected={languagePicked} setSelected={setLanguage} languageMapper={languageMapper} movieFilter={movieFilter} temp={temp} setTemp={setTemp} />
            <FilterSection title="Genre" row={2} options={btnResource[1].genre} selected={genre} setSelected={setGenre} movieFilter={movieFilter} />
          </div>
          <div className="col border border-dark p-3">
            <div className="row  border border-danger border-5 p-1">
              {loading===true?
              (
                <Loading/>
              ) 
              :fail===true?(<FailedResponse/>):filteredResult.map((item, index) => ( 
                <div key={index} className="col-3 text-center border border-danger">
                   <Link to="/movies/moviepage/movieselected" onClick={()=>pickedDetails(item.original_title)}><img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="w-75  rounded-4 p-2" alt={item.Title} /></Link>
                 </div> 
               ) 
               )
               }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const FilterSection = ({ title, options, setSelected, movieFilter,languageMapper,temp,setTemp }) =>
(
  <div className="row bg-warning rounded-3 border border-secondary p-3 mt-4" style={{ width: "100%", boxShadow: "7px 7px 0 black" }}>
    <h3 className="text-center mb-3">{title}</h3>
    <button onClick={()=>{setSelected("");setTemp("");movieFilter()}}>Clear All</button>
    {options.map((item, index) => (
      <button
        key={index}
        className={`btn ${temp === item ? "btn-primary" : "btn-outline-primary"} mb-2 me-2`}
        onClick={() => {
          // event.stopPropagation();
          setTemp(item)
          // console.log("languageInsider:",temp)
          // console.log("title",title)
          // let name=title.toLowerCase().concat("picked").split('s').join('');
          //   console.log("extracted::",name)
          let language=languageMapper(item)  //languages
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
