import { MoveRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { flightData } from "../api/flightapi";
import { fetchBusData } from "../api/busapi";
import "../styles/Home.css";
import fetchMovies from "../api/movieapi";
import OfferAir from "../assets/images/OfferAir6.jpg";
import bus from '../assets/images/OfferBus1.jpg'

export const SearchBar = ({ item }) => {
  const [inputField, setInputField] = useState("");
  const [flightDataList, setFlightDataList] = useState([]);
  const [busDataList, setBusDataList] = useState([]);
  const [movieDataList, setMovieDataList] = useState([]);

  const [filteredFlightDataList, setFilteredFlightDataList] = useState([]);
  const [filteredBusDataList, setFilteredBusDataList] = useState([]);
  const [filteredMovieDataList, setFilteredMovieDataList] = useState([]);

  const [noResultFound, setNoResultFound] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleInputChange = (event) => {
    setInputField(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await Promise.allSettled([
        flightData(),
        fetchBusData("/TicketBooking/db1.json"),
        fetchMovies()
      ]);

      setFlightDataList(response[0].value || []);
      setBusDataList(response[1].value || []);
      setMovieDataList(response[2].value || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const query = inputField.toLowerCase().trim();

    if (!selected && query !== "") {
      const filteredFlights = flightDataList.filter((item) => {
        const fullRoute = `${item.source} to ${item.destination}`.toLowerCase();
        return (
          item.source.toLowerCase().includes(query) ||
          item.destination.toLowerCase().includes(query) ||
          fullRoute.includes(query)
        );
      });

      const filteredBuses = busDataList.filter((item) => {
        const fullRoute = `${item.from} to ${item.to}`.toLowerCase();
        return (
          item.from.toLowerCase().includes(query) ||
          item.to.toLowerCase().includes(query) ||
          fullRoute.includes(query)
        );
      });

      const filteredMovies = movieDataList.filter((item) =>
        item.title?.toLowerCase().includes(query)
      );

      setFilteredFlightDataList(filteredFlights);
      setFilteredBusDataList(filteredBuses);
      setFilteredMovieDataList(filteredMovies);

      setNoResultFound(
        filteredFlights.length === 0 &&
        filteredBuses.length === 0 &&
        filteredMovies.length === 0
      );
    } else if (query === ""||selected===true) {
      setFilteredFlightDataList([]);
      setFilteredBusDataList([]);
      setFilteredMovieDataList([]);
      setNoResultFound(false);
    }

    if (query === "") setSelected(false);
  }, [inputField, selected, flightDataList, busDataList, movieDataList]);

   //search function
  function handleSearch()
  {
     console.log(inputField)
    //  Bangalore, India to Chennai, India
  }
  

  return item === 1 ? (
    <div className="col position-relative">
      <div className="input-group mb-3 mt-3">
        <button className="btn btn-outline-none bg-white" onClick={handleSearch}>
          <Search />
        </button>
        <input
          type="text"
          className="form-control"
          value={inputField}
          onChange={handleInputChange}
          style={{ outline: "none" }}
          placeholder={"Search for Bus Tickets, Movies and Events"}
          aria-label="search"
          aria-describedby="button"
        />
        {(filteredFlightDataList.length>0||filteredBusDataList.length>0||filteredMovieDataList.length>0)&&
        (<ul className="searchbarList rounded-4 mt-1">
          {filteredFlightDataList.map((item, index) => (
            <ResultItem
              key={`flight-${index}`}
              label="Flight"
              route={`${item.source} to ${item.destination}`}
              onClick={() => {
                setSelected(true);
                setInputField(`${item.source} to ${item.destination}`);
              }}
              imgsrc={OfferAir}
            />
          ))}
          {filteredBusDataList.map((item, index) => (
            <ResultItem
              key={`bus-${index}`}
              label="Bus"
              route={`${item.from} to ${item.to}`}
              onClick={() => {
                setSelected(true);
                setInputField(`${item.from} to ${item.to}`);
              }}
              imgsrc={bus}
            />
          ))}
          {filteredMovieDataList.map((item, index) => (
            <ResultItem
              key={`movie-${index}`}
              label="Movie"
              route={item.title}
              onClick={() => {
                setSelected(true);
                setInputField(item.title);
              }}
              imgsrc={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            />
          ))}
        </ul>)}
      </div>
      {noResultFound && (
        <div className="noresultfound">
          <p className="bg-white text-danger p-3 position-absolute w-100 rounded-3 shadow-lg">
            No Result Found
          </p>
        </div>
      )}
    </div>
  ) : (
    <div className="col">
      <div className="input-group mb-3 mt-3">
        <button className="btn btn-outline-none bg-white">
          <Search />
        </button>
        <input
          type="text"
          className="form-control"
          style={{ outline: "none" }}
          placeholder={"Search for Your City"}
          aria-label="search"
          aria-describedby="button"
        />
      </div>
    </div>
  );
};

const ResultItem = ({ label, route, onClick,imgsrc}) => {
  
 
  return (
  <div className="d-flex justify-content-between m-2 mx-auto align-items-center fs-5 rounded-3 border border-2 shadow-sm">
    <img
      src={imgsrc}
      alt="offer"
      className="img-fluid rounded-3 shadow-sm border border-2"
      style={{ width: "80px", height: "80px" }}
    />
    <li className="list-group-item">
      <a
        href="#"
        className="nav-link"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {route}
      </a>
    </li>
    <span style={{ fontSize: "0.9rem", color: "grey" }}>{label}</span>
    <button className="btn btn-outline-danger me-2">
      <MoveRight />
    </button>
  </div>
);
}