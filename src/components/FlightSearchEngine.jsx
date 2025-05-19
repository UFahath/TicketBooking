import { useState, useEffect, useRef } from "react";
import { TravellersClass } from "./TravellersClass";
import { useNavigate } from "react-router-dom";
import * as bootstrap from 'bootstrap';
const FlightSearchEngine = () => {
  const [tripMode, setTripMode] = useState("oneway");
  const [returnDate, setReturnDate] = useState(null);

  // Lifted state from child
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const[error,setError]=useState({errorFlag:false,errorMessage:""});
  //  let todayDate=new Date();
    function today(dateObj){
    let date=dateObj.getDate();
    let month=dateObj.getMonth()+1;
    let year=dateObj.getFullYear();
    if(date<10)
    {
      date="0".concat(date);
    }
    if(month<10)
    {
      month="0".concat(month);
    }
    return year+"-"+month+"-"+date;
    }
  const[minDate]=useState(()=>today(new Date()));
  const[maxDate]=useState(()=>{
    let futureDate=new Date();
    futureDate.setFullYear(futureDate.getFullYear()+1);
    return today(futureDate);
  });
  const errorToast=useRef(null);
  const navigate = useNavigate();
  const [passengersDropdown,setDropdown]=useState(false);
  useEffect(() => {
    async function flightData() {
      try {
        let response = await fetch("/TicketBooking/db.json");
        let data = await response.json();
        setFetchedData(data.ticket_booking);
        console.log(data.ticket_booking)
      } catch (error) {
        console.log(error);
      }
    }
    flightData();

  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
   
    const availableFlights = fetchedData.filter(
      (item) =>
        item.source.toLowerCase().includes(fromInput.toLowerCase()) &&
        item.destination.toLowerCase().includes(toInput.toLowerCase())
    );
   if(fromInput&&toInput&&departureDate&&passengersDropdown&&fromInput!==toInput)
   {
   console.log(fromInput,toInput,departureDate,passengersDropdown)
   setTimeout(()=>{
    navigate("/flightresults", {
      state: {
        availableFlights,
        from: fromInput,
        to: toInput,
        departureDate,
        returnDate: tripMode === "roundedtrip" ? returnDate : null,
      },
   });
   },100);
  }
  else{
    if(!fromInput||!toInput||!departureDate||!passengersDropdown)
    {
    setError({errorFlag:true,errorMessage:"Please fill all the fields"});
    const toast=bootstrap.Toast.getOrCreateInstance(errorToast.current);
    toast.show();
    return;
    }
     else if(fromInput===toInput)
    {
      console.log("From and To fields should be different");
      setError({errorFlag:true,errorMessage:"From and To fields should be different"})
      const toast=bootstrap.Toast.getOrCreateInstance(errorToast.current);
      toast.show();
      return;
    } 
  }
  };

  return (
    <>
      <div className="row my-4">
        <div className="col">
          <div className="btn-group" role="group">
            <button
              className={`btn ${
                tripMode === "oneway" ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => {
                setTripMode("oneway");
                setReturnDate(null);
              }}
            >
              One Way
            </button>
            <button
              className={`btn ${
                tripMode === "roundedtrip" ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => setTripMode("roundedtrip")}
            >
              Round Trip
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <OneWayTrip
          tripMode={tripMode}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          fromInput={fromInput}
          setFromInput={setFromInput}
          toInput={toInput}
          setToInput={setToInput}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          fetchedData={fetchedData}
          handleSearch={handleSearch}
          setDropdown={setDropdown}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
      {
        error?.errorFlag&&(
        <>
         

         <div className="toast-container bottom-0 start-50 translate-middle-x p-4 z-3" style={{top:"740px"}}>
  <div
    ref={errorToast}
    className="toast align-items-center text-white bg-danger border-0 show"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-bs-delay="3000"
  >
    <div className="d-flex">
      <div className="toast-body">
        {error?.errorMessage}
      </div>
      <button
        type="button"
        className="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</div>

        </>
        )
      }
    </>
  );
};

const OneWayTrip = ({
  tripMode,
  returnDate,
  setReturnDate,
  fromInput,
  setFromInput,
  toInput,
  setToInput,
  departureDate,
  setDepartureDate,
  fetchedData,
  handleSearch,
  setDropdown,
  minDate,
  maxDate

}) => {
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFromInput(value);
    setFromSuggestions(
      value === ""
        ? []
        : fetchedData.filter((item) =>
            item.source.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setToInput(value);
    setToSuggestions(
      value === ""
        ? []
        : fetchedData.filter((item) =>
            item.destination.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  const selectFrom = (val) => {
    setFromInput(val);
    setFromSuggestions([]);
  };

  const selectTo = (val) => {
    setToInput(val);
    setToSuggestions([]);
  };

  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
    <div className="container border border-5 border-warning mb-3 fs-4">
      <div className="row row-cols-1 row-cols-md-4 my-5 gy-4">
        {/* FROM input */}
        <div className="col position-relative">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="From"
              value={fromInput}
              onChange={handleFromChange}
              required
            />
          </div>
          {fromSuggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 z-3">
              {fromSuggestions.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => selectFrom(item.source)}
                >
                  {item.source}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* TO input */}
        <div className="col position-relative">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="To"
              value={toInput}
              onChange={handleToChange}
              required
            />
          </div>
          {toSuggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 z-3">
              {toSuggestions.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => selectTo(item.destination)}
                >
                  {item.destination}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Departure Date */}
        <div className="col">
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              min={minDate}
              max={maxDate}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Return Date */}
        {tripMode === "roundedtrip" && (
          <div className="col">
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                value={returnDate || ""}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <TravellersClass setDropdown={setDropdown}/>
      </div>

      {/* Special fares */}
      <div className="row row-cols-1 row-cols-md-4 my-4 g-2">
        <div className="col">Special Fares (Optional):</div>
        {["Student", "Army", "Doctor", "Senior Citizen"].map((fare, idx) => (
          <div className="col" key={idx}>
            <input
              className="form-check-input"
              type="radio"
              name="radio"
              id={fare.toLowerCase()}
            />
            <span className="ms-2">{fare}</span>
          </div>
        ))}
      </div>

      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <button className="btn btn-primary"  onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
    </form>
  );
};

export default FlightSearchEngine;
