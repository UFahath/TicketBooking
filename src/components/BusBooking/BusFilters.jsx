import { useState} from "react";
import BusType1 from '../../assets/images/BusType1.png'
import BusType2 from '../../assets/images/BusType2.png'
import BusType3 from '../../assets/images/BusType3.png'
import BusType4 from '../../assets/images/BusType4.png'

import Time1 from '../../assets/images/Time1.png'
import Time2 from '../../assets/images/Time2.png'
import Time3 from '../../assets/images/Time3.png'
import Time4 from '../../assets/images/Time4.png'

const BusFilters = ({setNavi}) => {
  const [selectBusType,setSelectedBusType]=useState("");
  const [selectDepartureTime,setDepartureTime]=useState("");
  const [selectArrivalTime,setArrivalTime]=useState("");
  const [busOperator,setBusOperator]=useState([]);

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

  const icons1=[BusType1,BusType2,BusType3,BusType4]
  const icons2=[Time1,Time2,Time3,Time4]
  function handleBusType(e)
  {
    setSelectedBusType(e.target.textContent);
  }

  function handleDepartureTime(e)
  {
    setDepartureTime(e.target.textContent)
  }

  function handleArrivalTime(e)
  {
    setArrivalTime(e.target.textContent)
  }

  function handleCheckbox(e)
  {
     if(e.target.checked===true)
     {
      setBusOperator((p)=>{
        if(!p.includes(e.target.value))
        {
          return [...p,e.target.value]
        }
        return p
      })
     }
     else
     {
      setBusOperator((p)=>
      {
        return p.filter((item)=>item!==e.target.value)
      }
      )
     }
  }

  function handleCancel(){
    setBusOperator([])
    setSelectedBusType("")
    setDepartureTime("");
    setArrivalTime("")
    if(localStorage.getItem("Filterdata:"))
    {
      localStorage.removeItem("Filterdata:")
    }
   
  }
// console.log(busOperator)
function handleApply(){

  if(selectBusType&&selectDepartureTime&&selectArrivalTime&&busOperator&&busOperator.length>0)
  {
          localStorage.setItem("Filterdata:",JSON.stringify({
            selectBusType,selectDepartureTime,selectArrivalTime,busOperator
          }))   
          
            setNavi(2);       
  }
}
  return (
    <>
      <div className="container">
        <h4 className="text-danger my-3">Filter</h4>
        <div className="row p-4" style={{ backgroundColor: "#FFEFE2" }}>
          <h5 className="fw-bold">Bus Type</h5>
          <div className="row g-2 mb-4">
            {busTypes.map((types, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                
                <button className={`btn ${types===selectBusType?"btn-danger":"btn-outline-danger"} w-100 `}onClick={(e)=>handleBusType(e)}>
                     <img src={icons1[index]} alt="icons" className="me-3" key={index} />
               {types}
                </button>
               
              </div>
            ))}
          </div>

          <h5 className="fw-bold">Departure Time</h5>
          <div className="row g-2 mb-4">
            {timeRanges.map((ranges, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                <button className={`btn ${ranges===selectDepartureTime?"btn-danger":"btn-outline-danger"} w-100 `} onClick={(e)=>handleDepartureTime(e)}>
                <img src={icons2[index]} alt="icons" className="me-3" key={index}/>
                  {ranges}
                </button>
              </div>
            ))}
          </div>

          <h5 className="fw-bold">Arrival Time</h5>
          <div className="row g-2 mb-4">
            {timeRanges.map((ranges, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                <button className={`btn ${ranges===selectArrivalTime?"btn-danger":"btn-outline-danger"} w-100 `} onClick={(e)=>handleArrivalTime(e)}>
                <img src={icons2[index]} alt="icons" className="me-3" key={index}  />
                  {ranges}
                </button>
              </div>
            ))}
          </div>

          <h5 className="fw-bold">Operator</h5>

          <div className="row g-2 mb-4">
            {operators.map((company, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={company}
                    id={company}
                    onChange={handleCheckbox}
                    checked={busOperator?.includes(company)}
                  />
                  <label className="form-check-label" htmlFor={company}>
                    {company}
                  </label>
                </div>
              </div>
            ))}
          </div>


          <div className="row g-2 mb-4">
            <div className="col text-end">
               <button className="btn btn-primary" disabled={!(selectBusType&&selectDepartureTime&&selectArrivalTime&&busOperator&&busOperator.length>0)} onClick={handleApply}>Apply</button>
            </div>
            <div className="col">
               <button className="btn btn-primary" disabled={!(selectBusType||selectArrivalTime||selectDepartureTime||busOperator&&busOperator.length>0)} onClick={handleCancel}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BusFilters;
