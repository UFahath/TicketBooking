import { useEffect, useState } from "react";


export const BusInfo = ({ filterData = {} }) => {
  const [busDetails, setBusDetails] = useState([]);
  const [resultData, setResultData] = useState([]);

  useEffect(()=>{
    const busDetailsFromStorage = JSON.parse(localStorage.getItem("bus_detail"));
    if (busDetailsFromStorage) {
      setBusDetails(busDetailsFromStorage);
    }
  },[])
  useEffect(() => {

    const output = busDetails.filter((bus) => {
      const matchBusType =
        !filterData.selectBusType || filterData.selectBusType.toLowerCase()==="ac"?(!bus.busType.toLowerCase().includes("non")):(bus.busType.toLowerCase().includes(filterData.selectBusType.toLowerCase()));

      const matchOperator =
        !filterData.busOperator || filterData.busOperator.includes(bus.operator);

      const matchDeparture =
        !filterData.selectDepartureTime || isTimeInRange(bus.departureTime, filterData.selectDepartureTime);

      const matchArrival =
        !filterData.selectArrivalTime || isTimeInRange(bus.arrivalTime, filterData.selectArrivalTime);

      return matchBusType && matchOperator && matchDeparture && matchArrival;
    });
     
    for(let i=0;i<busDetails.length;i++)
    {
      if(busDetails[i].operator==="NueGo")
      {
        console.log("Present at:",i,"is=",busDetails[i].operator);break;
      }
      else
      {
        console.log("Not Present")
      }
    }
    setResultData(output);
  }, [busDetails,filterData]);

  function convertToMinute(timeStr) {
    const [time, modifier] = timeStr.trim().split(" ");
    let [hour, minute] = time.split(":");
    hour = parseInt(hour, 10);
    minute = parseInt(minute || "0", 10);

    if (modifier === "PM" && hour !== 12) hour += 12;
    if (modifier === "AM" && hour === 12) hour = 0;

    return hour * 60 + minute;
  }

 
  function isTimeInRange(time, range) {
    if (!range) return true; 
    const dataTime = convertToMinute(time);
    const [startStr, endStr] = range.split("-").map(str => str.trim());
    const start = convertToMinute(startStr);
    const end = convertToMinute(endStr);

    if (start < end) {
      return dataTime >= start && dataTime <= end;
    } else {
  
      return dataTime >= start || dataTime <= end;
    }
  }



  return (
    <div className="container">
      <h3 className="my-4 text-danger text-center text-sm-start">Bus Info:</h3>
      {resultData&&resultData.length > 0 ? (
        <ul style={{listStyle:"none",paddingLeft:"0"}}>
          {resultData.map((item, index) => (
            <li key={index}>
               <div className="card mb-3 shadow-sm border-2 border-dark">
      <div className="card-body d-flex flex-column flex-sm-row gap-sm-4 gap-md-0 justify-content-sm-between align-items-sm-center flex-wrap" style={{boxShadow:"7px 5px 10px black"}}>
        {/* Left: Operator and Bus Type */}
        <div>
          <h5 className="card-title mb-1 text-primary fw-bold">{item.operator}</h5>
          <p className="card-text text-muted small">{item.busType}</p>

          {/* Rating */}
          <div className="d-flex align-items-center gap-2">
            <div className="bg-info text-white px-2 py-1 rounded">
              {item.rating || "4.4"} / 5
            </div>
            <span className="text-muted small">
              {item.ratingCount || "43"} Ratings
            </span>
          </div>
        </div>

        {/* Departure Info */}
        <div className="text-center mx-3 my-3 my-sm-0">
          <h6 className="mb-0">{item.departureTime}</h6>
          <small className="text-muted">{item.from}</small>
        </div>

        {/* Arrival Info */}
        <div className="text-center mx-3">
          <h6 className="mb-0">{item.arrivalTime}</h6>
          <small className="text-muted">{item.to}</small>
        </div>

        {/* Fare and Button */}
        <div className={`text-end border border-info bg-warning mx-md-0 mx-auto my-md-0 my-5 rounded-top-2 border-bottom-0`}>
          <h5 className="text-danger text-center">₹ {item.fare}</h5>
          <button className="btn btn-info text-white fw-semibold mt-2">
            Select Seat
          </button>
        </div>
      </div>
    </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching buses found.</p>
      )}
    </div>
  );
};
