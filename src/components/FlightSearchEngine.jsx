import { useState } from "react"


const FlightSearchEngine = () => {
  let [tripMode,setTripMode]=useState("");


  //trip selection
 const tripSelection =(mode)=>{
  // console.log(mode)
  setTripMode(mode);

 }
  return (
    <>

      <div className="row my-4">
        <div className="col">
          <div className="btn-group" role="group">
            <button className={`btn ${tripMode==="oneway"?"btn-danger":"btn-outline-danger"}`} onClick={()=>tripSelection("oneway")}>
              One Way
              </button>
              <button className={`btn ${tripMode==="roundedtrip"?"btn-danger":"btn-outline-danger"}`} onClick={()=>tripSelection("roundedtrip")}>
              Rounded Trip
              </button>
          </div>
        </div>
      </div>


      <div className="row">
       {
        tripMode==="roundedtrip"?
        "roundedtrip"
         :
         (
          <>
          <OneWayTrip/>
          </>
        )

       }
      </div>


    </>
  )
}

const OneWayTrip=()=>{
  return (
    <>
    <div className="container border border-5 border-warning mb-3 fs-4" >
      <div className="row row-cols-1 row-cols-md-4 my-5 gy-4">
        <div className="col">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="from"/>
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="to" />
          </div>
        </div>
        <div className="col">
        <div className="input-group">
          <input type="date" className="form-control" />
        </div>
        </div>
        <div className="col">
        <div class="input-group">
  <select class="form-select"aria-label="Example select with button addon">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
 
</div>
        </div>
      </div>


      <div className="row row-cols-1 row-cols-md-4 my-4 g-2">
        <div className="col">Special Fares {"("} optional{")"}:</div>
        <div className="col">
          <input  className="form-check-input" type="radio" name="radio" id="" />
          <span className="ms-2">Student</span> <label  className=" form-check-label" type="radio" name="" id="" />
        </div>
        <div className="col">
        <input  className="form-check-input" type="radio" name="radio" id="" />
        <span className="ms-2">Army</span> <label  className=" form-check-label" type="radio" name="" id="" />
        </div>
        <div className="col">
        <input  className="form-check-input" type="radio" name="radio" id="" />
        <span className="ms-2">Doctor</span> <label  className=" form-check-label" type="radio" name="" id="" />
        </div>
        <div className="col">
        <input  className="form-check-input" type="radio" name="radio" id="" />
        <span className="ms-2">SeniorCitizen</span> <label  className=" form-check-label" type="radio" name="" id="" />
        </div>
      </div>

      <div className="row w-25 my-5 mx-auto">
        <button className="btn btn-primary">
          Search
        </button>
      </div>
    </div>
    </>
  )
}

export default FlightSearchEngine