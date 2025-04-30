import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BusSearchEngine = () => {
  const [fetchedBusData, setFetchedBusData] = useState([]);

  const [fromInput, setFrom] = useState("");
  const [toInput, setTo] = useState("");
  const [dateInput, setDate] = useState("");
  const [filteredFromResult, setFilteredFromResult] = useState([]);
  const [filteredToResult, setFilteredToResult] = useState([]);
  const [fromfieldChecker, setChecker1] = useState(false);
  const [tofieldChecker, setChecker2] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate=useNavigate();
  
  useEffect(() => {
    async function fetchBusData() {
      try {
        const response = await fetch("/TicketBooking/db1.json");
        const data = await response.json();
        setFetchedBusData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBusData();

  }, []);

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    if (value.trim() === "") {
      setFilteredFromResult([]);
      setChecker1(false);
    } else {
      const matches = fetchedBusData.filter((item) =>
        item.from.toLowerCase().includes(value.toLowerCase())
      );
      setChecker1(matches.length > 0);
      setFilteredFromResult(matches);
    }
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    if (value.trim() === "") {
      setFilteredToResult([]);
      setChecker2(false);
    } else {
      const matches = fetchedBusData.filter((item) =>
        item.to.toLowerCase().includes(value.toLowerCase())
      );
      setChecker2(matches.length > 0);
      setFilteredToResult(matches);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
  
    if (!fromInput.trim() || !toInput.trim() || !dateInput.trim()) {
      setErrorMsg("All fields are required.");
      return;
    }
  
    if (!fromfieldChecker || !tofieldChecker) {
      setErrorMsg("Please select valid 'From' and 'To' destinations.");
      return;
    }
  
    setErrorMsg("");
    // console.log(dateInput.split("-").reverse().join("-"))
    const targetedResult = fetchedBusData.filter(
      (item) =>
        item.from.toLowerCase()===fromInput.toLowerCase() &&
        item.to.toLowerCase()===toInput.toLowerCase() &&
        item.date===dateInput.split("-").reverse().join("-")
    );
    

    
    if (targetedResult.length > 0) {
      localStorage.setItem("bus_detail", JSON.stringify(targetedResult));
      alert("Bus details stored in localStorage");
      navigate("/busresults")
    } else {
      setErrorMsg("No Bus Available");
      setTimeout(() => setErrorMsg(""), 2000);
    }
    
  };
  
  return (
    <>
      <div className="container fs-4">
        {/* From Field */}
        <form className="row g-3">
          <div className="col-12 col-md-12 position-relative">
            <label htmlFor="from">From</label>
            <input
              type="text"
              value={fromInput}
              onChange={handleFromChange}
              className="form-control"
            />
            {fromInput.trim() !== "" && filteredFromResult.length > 0 && (
              <ul
                className="position-absolute bg-white w-50 z-3 rounded-3"
                style={{ overflowY: "scroll", listStyle: "none",maxHeight:"200px"}}
              >
                {filteredFromResult.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setFrom(item.from);
                        setFilteredFromResult([]);
                      }}
                    >
                      {item.from}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {fromInput.trim() !== "" && !fromfieldChecker && (
              <NoResultFound error="No result Found" />
            )}
          </div>
        </form>

        {/* To Field */}
        <form className="row g-3">
          <div className="col-12 col-md-12 position-relative">
            <label htmlFor="to">To</label>
            <input
              type="text"
              value={toInput}
              onChange={handleToChange}
              className="form-control"
            />
            {toInput.trim() !== "" && filteredToResult.length > 0 && (
              <ul
                className="position-absolute bg-white w-50 z-3 rounded-3"
                style={{ overflowY: "scroll", listStyle: "none" ,maxHeight:"200px"}}
              >
                {filteredToResult.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setTo(item.to);
                        setFilteredToResult([]);
                      }}
                    >
                      {item.to}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {toInput.trim() !== "" && !tofieldChecker && (
              <NoResultFound error="No result Found" />
            )}
          </div>
        </form>

        {/* Date & Search */}
        <div className="row p-4 border border-dark text-center position-relative">
          <div className="col">
            <form className="row g-3 ms-3">
              <div className="col-auto">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                  id="date"
                />
              </div>
            </form>
          </div>
          <div className="col my-md-auto my-3 ">
            <button className="btn btn-success w-50 " onClick={handleSearch}>
              Search
              {errorMsg && (
          <div className="alert alert-danger mt-3 w-25 mx-auto position-absolute" style={{left:"28%",top:"10%"}}>{errorMsg}</div>
            )}
            </button>
          </div>
        </div>

       
      </div>
    </>
  );
};

const NoResultFound = ({ error }) => {
  return <p className="text-danger position-absolute bg-white p-3 z-3">{error}</p>;
};

export default BusSearchEngine;

