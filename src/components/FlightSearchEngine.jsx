import { useState } from "react";

const FlightSearchEngine = () => {
  const [tripMode, setTripMode] = useState("oneway");
  const [returnDate, setReturnDate] = useState(null);

  return (
    <>
      <div className="row my-4">
        <div className="col">
          <div className="btn-group" role="group">
            <button
              className={`btn ${tripMode === "oneway" ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => {
                setTripMode("oneway");
                setReturnDate(null);
              }}
            >
              One Way
            </button>
            <button
              className={`btn ${tripMode === "roundedtrip" ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => setTripMode("roundedtrip")}
            >
              Round Trip
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <OneWayTrip tripMode={tripMode} returnDate={returnDate} setReturnDate={setReturnDate} />
      </div>
    </>
  );
};

const OneWayTrip = ({ tripMode, returnDate, setReturnDate }) => {
  returnDate=returnDate===null?"":returnDate;
  return (
    <div className="container border border-5 border-warning mb-3 fs-4">
      <div className="row row-cols-1 row-cols-md-4 my-5 gy-4">
        <div className="col">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="From" />
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="To" />
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <input type="date" className="form-control" placeholder="Departure Date" />
          </div>
        </div>
        
      
        {tripMode === "roundedtrip" && (
          <div className="col">
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                placeholder="Return Date"
                value={returnDate}
                onChange={(event) => setReturnDate(event.target.value)}
              />
            </div>
          </div>
        )}

       
        <div className="col">
          <div className="input-group">
            <select className="form-select" aria-label="Select Passengers">
              <option value="Choose">Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-4 my-4 g-2">
        <div className="col">Special Fares (Optional):</div>
        <div className="col">
          <input className="form-check-input" type="radio" name="radio" id="student" />
          <span className="ms-2">Student</span>
        </div>
        <div className="col">
          <input className="form-check-input" type="radio" name="radio" id="army" />
          <span className="ms-2">Army</span>
        </div>
        <div className="col">
          <input className="form-check-input" type="radio" name="radio" id="doctor" />
          <span className="ms-2">Doctor</span>
        </div>
        <div className="col">
          <input className="form-check-input" type="radio" name="radio" id="seniorCitizen" />
          <span className="ms-2">Senior Citizen</span>
        </div>
      </div>

      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchEngine;
