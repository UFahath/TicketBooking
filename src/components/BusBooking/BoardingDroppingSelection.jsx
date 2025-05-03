import { useEffect, useState } from "react";

const BoardingDroppingSelection = ({ resultData }) => {
  const data = Array.isArray(resultData) ? resultData[0] : resultData;
  const [selectedBoarding, setSelectedBoarding] = useState(null);
  const [selectedDropping, setSelectedDropping] = useState(null);
  const [boardingTimes, setBoardingTimes] = useState([]);

  // Function to generate all times
  function generateTimes(start, end, interval) {
    const time = [];
    let [hours, minutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);

    while (hours < endHours || (hours === endHours && minutes <= endMinutes)) {
      let formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      time.push(formattedTime);
      minutes += interval;
      if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      }
    }
    return time;
  }

  // Generate random time from available list
  function getRandomTime(times) {
    const randomIndex = Math.floor(Math.random() * times.length);
    return times[randomIndex];
  }

  useEffect(() => {
    const allTimes = generateTimes("06:00", "10:00", 30);
    if (data?.boardingPoints) {
      const timesWithPoints = data.boardingPoints.map(() => getRandomTime(allTimes));
      setBoardingTimes(timesWithPoints);
    }
  }, [data]);

  useEffect(() => {
    console.log("Selected Boarding:", selectedBoarding);
    console.log("Selected Dropping:", selectedDropping);
  }, [selectedBoarding, selectedDropping]);

  if (!data || !data.boardingPoints || !data.droppingPoints) {
    return <div>Loading boarding and dropping points...</div>;
  }

  return (
    <div className="container py-4 my-3 rounded-3" style={{ backgroundColor: '#FFF5F2' }}>
      <div className="row mb-4">
        <div className="col-md-6">
          <h5 className="text-center">
            <strong className="text-success fs-3">Select Boarding Point</strong>
          </h5>
          <div className="border p-3 rounded-4">
            {data.boardingPoints.map((point, index) => (
              <div className="form-check mb-2 p-3" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="boarding"
                  id={`boarding-${index}`}
                  value={point}
                  checked={selectedBoarding === point}
                  onChange={() => setSelectedBoarding(point)}
                />
                <label className="form-check-label d-block" htmlFor={`boarding-${index}`}>
                  <div><strong>{point}</strong></div>
                  <div className="text-muted">Time: {boardingTimes[index]}</div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6 my-4 my-md-0">
          <h5 className="text-center">
            <strong className="text-danger fs-3">Select Dropping Point</strong>
          </h5>
          <div className="border p-3 rounded-4">
            {data.droppingPoints.map((point, index) => (
              <div className="form-check mb-2 p-3" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="dropping"
                  id={`dropping-${index}`}
                  value={point}
                  checked={selectedDropping === point}
                  onChange={() => setSelectedDropping(point)}
                />
                <label className="form-check-label d-block" htmlFor={`dropping-${index}`}>
                  <div><strong>{point}</strong></div>
                  {/* You can also add dropping times here if needed */}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          className="btn btn-info text-white"
          disabled={!selectedBoarding || !selectedDropping}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BoardingDroppingSelection;
