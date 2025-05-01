import { useEffect, useState } from "react";
import { fetchBusData } from "../../data/BusDataFetch";

export const BusInfo = ({ filterData = {} }) => {
  const [busDetails, setBusDetails] = useState([]);
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    const busDetailsFromStorage = JSON.parse(localStorage.getItem("bus_detail"));
    if (busDetailsFromStorage) {
      setBusDetails(busDetailsFromStorage);
    }

    const output = busDetails.filter((bus) => {
      const matchBusType =
        !filterData.selectBusType || bus.busType.toLowerCase().includes(filterData.selectBusType.toLowerCase());

      const matchOperator =
        !filterData.busOperator || filterData.busOperator.includes(bus.operator);

      const matchDeparture =
        !filterData.selectDepartureTime || isTimeInRange(bus.departureTime, filterData.selectDepartureTime);

      const matchArrival =
        !filterData.selectArrivalTime || isTimeInRange(bus.arrivalTime, filterData.selectArrivalTime);

      return matchBusType && matchOperator && matchDeparture && matchArrival;
    });

    setResultData(output);
  }, [filterData]);

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
    <div>
      <h3>Bus Info:</h3>
      {resultData.length > 0 ? (
        <ul style={{listStyle:"none"}}>
          {resultData.map((item, index) => (
            <li key={index}>
               <div className="card mb-3 shadow-sm border-0">
      <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
        {/* Left: Operator and Bus Type */}
        <div>
          <h5 className="card-title mb-1">{item.operator}</h5>
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
        <div className="text-center mx-3">
          <h6 className="mb-0">{item.departureTime}</h6>
          <small className="text-muted">{item.from}</small>
        </div>

        {/* Arrival Info */}
        <div className="text-center mx-3">
          <h6 className="mb-0">{item.arrivalTime}</h6>
          <small className="text-muted">{item.to}</small>
        </div>

        {/* Fare and Button */}
        <div className="text-end">
          <h5 className="text-dark">₹ {item.fare}</h5>
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
