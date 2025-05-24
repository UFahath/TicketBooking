import { MoveRight, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { flightData } from "../api/flightapi";
import { fetchBusData } from "../api/busapi";
import "../styles/Home.css";
import fetchMovies from "../api/movieapi";
import OfferAir from "../assets/images/OfferAir6.jpg";
import bus from "../assets/images/OfferBus1.jpg";
import { useNavigate } from "react-router-dom";
import * as bootstrap from 'bootstrap'
import { TravellersClass } from "./TravellersClass";
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
  const [showFlightModal,setFlightModal]=useState(false);
  const navigate = useNavigate();
  const modalRef=useRef(null);
  const handleInputChange = (event) => {
    setInputField(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await Promise.allSettled([
        flightData(),
        fetchBusData("/TicketBooking/db1.json"),
        fetchMovies(),
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
    } else if (query === "" || selected === true) {
      setFilteredFlightDataList([]);
      setFilteredBusDataList([]);
      setFilteredMovieDataList([]);
      setNoResultFound(false);
    }

    if (query === "") setSelected(false);
  }, [inputField, selected, flightDataList, busDataList, movieDataList]);


  //Flight Modal Navigation
  function handleNavigation(){
    console.log("hello this is flightModal")
    // const modalInstance= bootstrap.Modal.getInstance(modalRef.current);
    // modalInstance.hide();
    // document.querySelectorAll(".modal-backdrop").forEach((item)=>{
    //   item.remove();
    // })
    // document.body.classList.remove('.modal-open');
    // document.body.style="";
    // navigate("/flightresults")
  }
  //search function
  function handleSearch() {
    //  console.log(inputField)
    //  Bangalore, India to Chennai, India

    let targetMovie = movieDataList.find((movie) => {
      return movie.title === inputField;
    });
    let targetBus = busDataList.find((bus) => {
      const fullRoute = `${bus.from} to ${bus.to}`;
      return fullRoute === inputField;
    });
    let targetFlight=flightDataList.find((flight)=>{
      const fullRoute =`${flight.source} to ${flight.destination}`;
      return fullRoute === inputField;
    })

    let choice = targetMovie || targetBus||targetFlight;

    switch (choice) {
      case targetMovie: {
        if (targetMovie) {
          localStorage.setItem("MoviePicked:", JSON.stringify([targetMovie]));
          navigate("/movies/moviepage/movieselected");
        } 
      } break;
      case targetBus: {
        if(targetBus)
        {
          localStorage.setItem("bus_detail",JSON.stringify([targetBus]))
          navigate("/busresults")
        } break;
      }
      case targetFlight: {
        if(targetFlight)
        {
          // /flightresults
          // const modal=new bootstrap.Modal(document)
          // setFlightModal(true)
          //   setTimeout(()=>{
          //   const modalInstance=new bootstrap.Modal(modalRef.current);
          //   modalInstance.show();
          //   },10)
           
           
        }
      }
    }
  }

  return item === 1 ? (
    <div className="col position-relative">
      <div className="input-group mb-3 mt-3">
        <button
          className="btn btn-outline-none bg-white"
          onClick={handleSearch}
        >
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
        {(filteredFlightDataList.length > 0 ||
          filteredBusDataList.length > 0 ||
          filteredMovieDataList.length > 0) && (
          <ul className="searchbarList rounded-4 mt-1">
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
          </ul>
        )}
      </div>
      {
       showFlightModal&&(
      <>

      {/* <!-- Modal --> */}
      
<div className="modal fade" id="travellersClass" ref={modalRef} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Passenger Count</h1>
      </div>
      <div className="modal-body border border-dark">
        <div className="text-center">
        <TravellersClass/>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleNavigation}>Next</button>
      </div>
    </div>
  </div>
</div>

      </>
       )
      }
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

const ResultItem = ({ label, route, onClick, imgsrc }) => {
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
      <span className="me-2" style={{ fontSize: "0.9rem", color: "grey" }}>{label}</span>
      {/* <button className="btn btn-outline-danger me-2">
        <MoveRight />
      </button> */}
    </div>
  );
};
