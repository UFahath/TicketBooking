import {  useState } from "react";
import FlightSearchEngine from "./FlightSearchEngine";
import BusSearchEngine from "./BusSearchEngine";



const TravelSearchBar = ({setType}) => {
  let [tripType, setTripType] = useState("");
  // let [searchEngine, setEngineType] = useState("");
  return (
    <>
      <div
        className="container-fluid bg-warning text-dark rounded-4 w-75 "
        style={{marginTop:"30%"}}
      >
        <div className="row">
          <div className="col text-center">
            <div className="btn-group p-3" role="group">
              <button
                className={`btn fs-4 ${
                  tripType === "Flight"
                    ? "btn-warning"
                    : "btn-danger"
                }`}
                onClick={() =>{
                  setTripType("Flight")
                  setType("Flight")
                }}
              >
                Flight
              </button>
              <button
                className={`btn fs-4 ${
                  tripType === "Bus" ? "btn-warning" : "btn-danger"
                }`}
                onClick={() => {
                  setTripType("Bus")
                  setType("Bus")
                }}
              >
                Bus
              </button>
            </div>
          </div>
        </div>

        <div className="row border border-dark">
          <div className="col">
            {
              tripType==="Flight"?(<FlightSearchEngine/>):(
              <BusSearchEngine/>
            )
            }
          </div>
        </div>

     
      </div>
     
    </>
  );
};

export default TravelSearchBar;
