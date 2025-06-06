import { useEffect, useState } from "react";

const BoardingDroppingSelection = ({ resultData,setNavi=()=>{} }) => {
  const [selectedBoarding, setSelectedBoarding] = useState(null);
  const [selectedDropping, setSelectedDropping] = useState(null);
  const [boardingTimes, setBoardingTimes] = useState([]);
  const [droppingTimes, setDroppingTimes] = useState([]);
  const [selectedBoardingTime, setSelectedBoardingTime] = useState("");
  const [selectedDroppingTime, setSelectedDroppingTime] = useState("");
  const [effectiveResultData, setEffectiveResultData] = useState(null);

  useEffect(() => {
    if (resultData) {
      setEffectiveResultData(Array.isArray(resultData) ? resultData[0] : resultData);
    } else {
      const stored = sessionStorage.getItem("resultdata:");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setEffectiveResultData(Array.isArray(parsed) ? parsed[0] : parsed);
        } catch (error) {
          console.error("Failed to parse stored resultdata:", error);
        }
      }
    }
  }, [resultData]);

  const parse12HourTime = (timeStr) => {
    const [time, period] = timeStr.trim().split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (period.toUpperCase() === "AM" && hour === 12) hour = 0;

    return hour * 60 + minute;
  };

  const formatTo12Hour = (minutes) => {
    const hour = Math.floor(minutes / 60) % 24;
    const minute = minutes % 60;
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${String(minute).padStart(2, "0")} ${ampm}`;
  };

  const generateTimes = (start12h, end12h, interval) => {
    const times = [];

    let startMinutes = parse12HourTime(start12h);
    let endMinutes = parse12HourTime(end12h);

    if (endMinutes <= startMinutes) {
      endMinutes += 24 * 60;
    }

    for (let min = startMinutes; min <= endMinutes; min += interval) {
      times.push(formatTo12Hour(min % (24 * 60)));
    }

    return times;
  };

  useEffect(() => {
    if (effectiveResultData) {
      const departure = effectiveResultData.departureTime || "09:00 AM";
      const arrival = effectiveResultData.arrivalTime || "05:00 AM";

      const boardingTimesGenerated = generateTimes(departure, arrival, 20);

      if (effectiveResultData.boardingPoints?.length > 0) {
        const generatedBoarding = effectiveResultData.boardingPoints.map(
          (_, index) => boardingTimesGenerated[index]
        );
        setBoardingTimes(generatedBoarding);
      }

      if (effectiveResultData.droppingPoints?.length > 0) {
        const lastBoardingTime = boardingTimesGenerated[boardingTimesGenerated.length - 1];
        const lastBoardingMinutes = parse12HourTime(lastBoardingTime);
        const arrivalMinutes = parse12HourTime(arrival);

        const gap = arrivalMinutes - lastBoardingMinutes;
        const droppingInterval = gap / effectiveResultData.droppingPoints.length;

        const generatedDropping = [];
        for (let i = 0; i < effectiveResultData.droppingPoints.length; i++) {
          const timeIndex = lastBoardingMinutes + i * droppingInterval;
          generatedDropping.push(formatTo12Hour(timeIndex % (24 * 60)));
        }

        generatedDropping[generatedDropping.length - 1] = arrival;

        setDroppingTimes(generatedDropping);
      }
    }
  }, [effectiveResultData]);

  useEffect(() => {
    console.log("Selected Boarding:", selectedBoarding);
    console.log("Selected Dropping:", selectedDropping);
    console.log("selectedBoardingTime:", selectedBoardingTime);
    console.log("selectedDroppingTime:", selectedDroppingTime);
  }, [selectedBoarding, selectedDropping, selectedBoardingTime, selectedDroppingTime]);

  if (
    !effectiveResultData ||
    !effectiveResultData.boardingPoints ||
    !effectiveResultData.droppingPoints ||
    boardingTimes.length === 0 ||
    droppingTimes.length === 0
  ) {
    return <div>Loading boarding and dropping points...</div>;
  }

  function handleProceed(){
    setNavi(4)
  }
  return (
    <div className="container py-4 my-3 rounded-3" style={{ backgroundColor: "#FFF5F2" }}>
      <div className="row mb-4">
        {/* Boarding Points */}
        <div className="col-md-6">
          <h5 className="text-center">
            <strong className="text-success fs-3">Select Boarding Point</strong>
          </h5>
          <div className="border p-3 rounded-4">
            {effectiveResultData.boardingPoints.map((point, index) => (
              <div className="form-check mb-2 p-3" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="boarding"
                  id={`boarding-${index}`}
                  value={point}
                  checked={selectedBoarding === point}
                  onChange={() => {
                    const time = boardingTimes[index];
                    setSelectedBoarding(point);
                    setSelectedBoardingTime(time);
                    sessionStorage.setItem(
                      "selectedBoarding",
                      JSON.stringify({ point, time })
                    );
                  }}
                />
                <label className="form-check-label d-block" htmlFor={`boarding-${index}`}>
                  <div><strong>{point}</strong></div>
                  <div className="text-muted">Time: {boardingTimes[index]}</div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Dropping Points */}
        <div className="col-md-6 my-4 my-md-0">
          <h5 className="text-center">
            <strong className="text-danger fs-3">Select Dropping Point</strong>
          </h5>
          <div className="border p-3 rounded-4">
            {effectiveResultData.droppingPoints.map((point, index) => (
              <div className="form-check mb-2 p-3" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="dropping"
                  id={`dropping-${index}`}
                  value={point}
                  checked={selectedDropping === point}
                  onChange={() => {
                    const time = droppingTimes[index];
                    setSelectedDropping(point);
                    setSelectedDroppingTime(time);
                    sessionStorage.setItem(
                      "selectedDropping",
                      JSON.stringify({ point, time })
                    );
                  }}
                />
                <label className="form-check-label d-block" htmlFor={`dropping-${index}`}>
                  <div><strong>{point}</strong></div>
                  <div className="text-muted">Time: {droppingTimes[index]}</div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <div className="text-center">
        <button
          className="btn btn-info text-white"
          disabled={!selectedBoarding || !selectedDropping}
          onClick={handleProceed}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BoardingDroppingSelection;
