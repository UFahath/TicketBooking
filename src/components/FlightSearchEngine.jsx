import { useRef, useState } from "react"


const FlightSearchEngine = () => {
  let [tripMode,setTripMode]=useState("");

  let containerElement=useRef(null);
  let date=useRef(null);
  let [dataFlag,setDataFlag]=useState(false)
 
  
  //trip selection
 const tripSelection =(mode)=>{
  setTripMode(mode);
  console.log(tripMode)//tripmode check
  if(tripMode==="roundedtrip"&&dataFlag===false)
  {
    // console.log(tripMode)
    // console.log(containerElement.current)
    let newDate=date.current.cloneNode(true);
    console.log(date.current)

    date.current.after(newDate)
    newDate.id="newDate"
    setDataFlag(true)
  }
  else if(tripMode==="oneway"&&dataFlag===true)
  {
      let newDate=document.getElementById("newDate")
      newDate.remove();
      setDataFlag(false)
  }
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
        (
          <>
        <OneWayTrip containerElement={containerElement} date={date}/>
        </>
        )
         :
         (
          <>
          <OneWayTrip />
          </>
        )

       }
      </div>


    </>
  )
}

const OneWayTrip=({containerElement,date})=>{
  return (
    <>
    <div ref={containerElement} className="container border border-5 border-warning mb-3 fs-4" >
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
          <input ref={date} type="date" className="form-control" />
        </div>
        </div>
        <div className="col">
        <div className="input-group">
  <select className="form-select"aria-label="Example select with button addon">
    <option value="Choose">Choose...</option>
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

      <div className="row my-5 ">
        <div className="col d-flex justify-content-center">
        <button className="btn btn-primary">
          Search
        </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default FlightSearchEngine