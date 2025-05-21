import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import topBanner from "../assets/images/MoviePageBanner.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import { FailedResponse } from "../components/FailedResponse";

import { btnResource,languageMapper,genreMapper} from "../data/MoviePage";
import  fetchMovies from "../api/movieapi";
// const API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY;


const MoviePage = () => {
  const [languagePicked, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [filteredResult, setResult] = useState([]);
  const [fetchedData, setData] = useState([]);

  //for button color change
  const [temp, setTemp] = useState("");

  //genre ids
  const [temp1, setTemp1] = useState(null);

  //loading state
  const [loading, setLoading] = useState(true);

  //failed response
  const [fail, setFail] = useState(false);

  useEffect(() => {
    // let controller = new AbortController();
    // let signal = controller.signal;
    const fetchResult = async () => {

      
      try{
         let response=await fetchMovies();
         console.log("response",response)
       
            setData(response);
            setResult(response);;
            setLoading(response);
      }
      catch(error) {
        console.log(error);
            setLoading(false);
            setFail(true);
            alert(
              "Failed to Fetch Data because this api cannot be accessed sometime due to regional restriction..use vpn if it's not working"
            );
          }
      }

      fetchResult();
    },[]);

   


  
 //language mapping
  // function languageMapper(lan) {
  //   for (let item in languageMapping) {
  //     if (lan === item) {
  //       return languageMapping[item];
  //     }
  //   }
  // }
//genre mapping
  // function genreMapper(gen) {
  //   for (let item in genres) {
  //     if (gen === item) {
  //       return genres[item];
  //     }
  //   }
  // }

  //MovieFilterFunction
  function movieFilter() {
    let filtered = fetchedData;
    // console.log(filtered+"check")
    if (languagePicked === "") {
      filtered = filtered.map((item) => {
        return item;
      });
    }
    if (languagePicked !== "") {
      filtered = filtered.filter(
        (item) =>
          item.original_language &&
          item.original_language.includes(languagePicked)
      );
    }
    if (genre !== "") {
      filtered = filtered.filter(
        (item) => item.genre_ids && item.genre_ids.includes(genre)
      );
    }
    setResult(filtered);
  }

  //Movie Picker function
  function pickedDetails(movieName) {
    let output = filteredResult.filter((movie) => {
      return movie.original_title.includes(movieName);
    });
    localStorage.setItem("MoviePicked:", JSON.stringify(output));
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
            <FilterSection
              title="Languages"
              row={1}
              options={btnResource[0].languages}
              selected={languagePicked}
              setSelected={setLanguage}
              languageMapper={languageMapper}
              movieFilter={movieFilter}
              temp={temp}
              setTemp={setTemp}
            />
            <FilterSection
              title="Genre"
              row={2}
              options={btnResource[1].genre}
              selected={genre}
              setSelected={setGenre}
              movieFilter={movieFilter}
              genreMapper={genreMapper}
              temp={temp1}
              setTemp={setTemp1}
            />
          </div>
          <div className="col p-3">
            <div className="row border-5 p-1">
              {loading === true ? (
                <Loading />
              ) : fail === true ? (
                <FailedResponse />
              ) : (
                filteredResult.map((item, index) => (
                  <div key={index} className="col-md-3 text-center">
                    <Link
                      to="/movies/moviepage/movieselected"
                      onClick={() => pickedDetails(item.original_title)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        className="w-75  rounded-4 p-2"
                        alt={item.Title}
                      />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const FilterSection = ({
  title,
  options,
  selected,
  setSelected,
  movieFilter,
  languageMapper,
  genreMapper,
  temp,
  setTemp,
}) => {
  useEffect(() => {
    movieFilter();
  }, [selected]);

  return (
    <div
      className="row bg-warning rounded-3 border border-secondary p-3 mt-4"
      style={{ width: "100%", boxShadow: "7px 7px 0 black" }}
    >
      <h3 className="text-center mb-3">{title}</h3>
      <button
        className="btn btn-danger mb-3"
        onClick={() => {
          setSelected("");
          setTemp("");
          movieFilter();
        }}
      >
        Clear All
      </button>
      {options.map((item, index) => (
        <button
          key={index}
          className={`btn ${
            temp === item ? "btn-primary" : "btn-outline-primary"
          } mb-2 me-2`}
          onClick={() => {
            setTemp(item); //btn color changing purpose
            // console.log("languageInsider:",temp)
            // console.log("title",title)
            // let name=title.toLowerCase().concat("picked").split('s').join('');
            // console.log("extracted::",name)
            if (title === "Languages") {
              let language = languageMapper(item); //languages
              setSelected(language);
            } else {
              let genreid = genreMapper(item); //genre
              // console.log(genreid)
              setSelected(genreid);
            }
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};


export default MoviePage;
