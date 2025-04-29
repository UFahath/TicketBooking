import { useState} from "react";

const BusFilters = () => {
  const [selectBusType,setSelectedBusType]=useState("");
  const [selectDepartureTime,setDepartureTime]=useState("");
  const busTypes = ["AC", "Non AC", "Sleeper", "Seater"];
  const timeRanges = [
    "12 AM - 6 AM",
    "6 AM - 12 PM",
    "12 PM - 6 PM",
    "6 PM - 12 AM",
  ];
  const operators = [
    "A1 Travels",
    "FlixBus",
    "NueGo",
    "Jabbar Travels",
    "Mettur Super Services",
    "No 1 Travels",
    "Royal Buses",
    "AAHAA Travels",
  ];

  function handleBusType(e)
  {
    setSelectedBusType(e.target.textContent);
  }

console.log(selectBusType)

  return (
    <>
      <div className="container">
        <h4 className="text-danger my-3">Filter</h4>
        <div className="row p-4" style={{ backgroundColor: "#FFEFE2" }}>
          <h5 className="fw-bold">Bus Type</h5>
          <div className="row g-2 mb-4">
            {busTypes.map((types, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                <button className={`btn ${types===selectBusType?"btn-danger":"btn-outline-danger"} w-100`}onClick={(e)=>handleBusType(e)}>
                  {types}
                </button>
              </div>
            ))}
          </div>

          <h5 className="fw-bold">Departure Time</h5>
          <div className="row g-2 mb-4">
            {timeRanges.map((ranges, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                <button className="btn btn-outline-danger w-100" >
                  {ranges}
                </button>
              </div>
            ))}
          </div>

          <h5 className="fw-bold">Arrival Time</h5>
          <div className="row g-2 mb-4">
            {timeRanges.map((ranges, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                <button className="btn btn-outline-danger w-100" >
                  {ranges}
                </button>
              </div>
            ))}
          </div>

          <h5 className="fw-bold">Arrival Time</h5>

          <div className="row g-2 mb-4">
            {operators.map((company, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckIndeterminate"
                  />
                  <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                    {company}
                  </label>
                </div>
              </div>
            ))}
          </div>


          <div className="row g-2 mb-4">
            <div className="col text-end">
               <button className="btn btn-primary">Apply</button>
            </div>
            <div className="col">
               <button className="btn btn-primary">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BusFilters;
