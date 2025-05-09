import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";


export const ReviewBooking = ({setNavi}) => {

  const [resultData] = useState(() => {
    const stored = sessionStorage.getItem("resultdata:");
    return stored ? JSON.parse(stored) : null;
  });

  const [seats] = useState(() => {
    const storedSeats = sessionStorage.getItem("seats:");
    return storedSeats ? JSON.parse(storedSeats).join(", ") : null;
  });

  const [selectedBoarding] = useState(() => {
    const boarding = sessionStorage.getItem("selectedBoarding");
    return boarding ? JSON.parse(boarding) : null;
  });

  const [selectedDropping] = useState(() => {
    const dropping = sessionStorage.getItem("selectedDropping");
    return dropping ? JSON.parse(dropping) : null;
  });

  const [nextDay, setNextDay] = useState(null);
  const [travelDay, setTravelDay] = useState(null);

  const [traveller, setTraveller] = useState({ name: "", age: "", gender: "" });
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [travelType, setTravelType] = useState("");
  const [errors, setErrors] = useState({});

  const formatDate = (input) => {
    let date = new Date(input);
    return date.toDateString();
  };

  useEffect(() => {
    if (!resultData || !selectedBoarding || !selectedDropping) return;

    let dateString = formatDate(resultData[0].date);
    let dateOnly = dateString.split(" ");

    const day = parseInt(dateOnly[2], 10);
    setTravelDay(`${day}th ${dateOnly[1]} ${dateOnly[3]}`);

    if (selectedBoarding.time.includes("PM") && selectedDropping.time.includes("AM")) {
      setNextDay(`${day + 1}th ${dateOnly[1]} ${dateOnly[3]}`);
    } else {
      setNextDay(`${day}th ${dateOnly[1]} ${dateOnly[3]}`);
    }
  }, [resultData, selectedBoarding, selectedDropping]);

  useEffect(()=>{
    sessionStorage.setItem("boardingDroppingProps", JSON.stringify({
      travelDay,
      nextDay,
    }));
  },[travelDay,nextDay,resultData,selectedBoarding,selectedDropping])

  const handleTravellerChange = (e) => {
    const { name, value } = e.target;
    setTraveller((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setTraveller((prev) => ({ ...prev, gender }));
  };

  const handleTravelTypeChange = (e) => {
    setTravelType(e.target.value);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!traveller.name.trim()) newErrors.name = "Full name is required.";
    if (!traveller.age || traveller.age <= 0) newErrors.age = "Valid age required.";
    if (!traveller.gender) newErrors.gender = "Please select gender.";
    if (!contact.email || !/^\S+@\S+\.\S+$/.test(contact.email)) newErrors.email = "Valid email required.";
    if (!contact.phone || !/^\d{10}$/.test(contact.phone)) newErrors.phone = "Valid 10-digit mobile number required.";
    if (!travelType) newErrors.travelType = "Select travel type.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Save to sessionStorage
      sessionStorage.setItem("traveller", JSON.stringify(traveller));
      sessionStorage.setItem("contact", JSON.stringify(contact));
      sessionStorage.setItem("travelType", travelType);

      alert("Details saved and proceeding to payment!");
      setNavi(6);
    }
  };

  return (
    <>
      {resultData && resultData.length > 0 &&
        resultData.map((result, index) => (
          <div key={index}>
            <div className="container-fluid">
              <div className="row" style={{ backgroundColor: "#FF000033" }}>
                <div className="col-12 col-sm-7 col-md-6 col-lg-4 ms-0 mx-sm-auto ms-lg-5 my-5">
                  <h2 className="fw-bold mb-5">Review Your Booking</h2>
                  <p className="fw-bold fs-5">
                    {result.from} to {result.to} &nbsp; | &nbsp;
                    <span className="fw-normal">{formatDate(result.date)}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="container mt-4" style={{ position: "relative", bottom: "70px" }}>
              <div className="card mb-3">
                <div className="card-body shadow">
                  <h5 className="card-title fw-bold">{result.operator}</h5>
                  <p className="card-text">{result.busType}</p>
                  <hr />
                  <div className="d-flex justify-content-between flex-wrap gap-3 gap-sm-0">
                    <div>
                      Seats Selected: {seats && <strong>{seats}</strong>}
                    </div>
                    <button className="nav-link text-danger">Cancellation policy</button>
                  </div>
                </div>
              </div>

              <BoardingDropping
                selectedBoarding={selectedBoarding}
                selectedDropping={selectedDropping}
                travelDay={travelDay}
                nextDay={nextDay}
                result={result}
              />

              <div className="mb-4">
                <h5 className="fw-bold">Traveller Details</h5>
                <small className="text-muted">Enter the Name as in the Govt. ID</small>
                <div className="border rounded p-3 mt-2">
                  <h6 className="fw-bold">Traveller 1 Details</h6>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Full Name"
                        name="name"
                        value={traveller.name}
                        onChange={handleTravellerChange}
                      />
                      {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Age"
                        name="age"
                        value={traveller.age}
                        onChange={handleTravellerChange}
                      />
                      {errors.age && <small className="text-danger">{errors.age}</small>}
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className={`btn ${traveller.gender === "Male" ? "btn-primary" : "btn-outline-primary"}`}
                          onClick={() => handleGenderSelect("Male")}
                        >
                          Male
                        </button>
                        <button
                          type="button"
                          className={`btn ${traveller.gender === "Female" ? "btn-primary" : "btn-outline-primary"}`}
                          onClick={() => handleGenderSelect("Female")}
                        >
                          Female
                        </button>
                      </div>
                      {errors.gender && <small className="text-danger d-block mt-1">{errors.gender}</small>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold">Contact Details</h5>
                <small className="text-muted">
                  Your E-ticket and updates will be sent to the following details
                </small>
                <div className="row mt-2">
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email Address"
                      name="email"
                      value={contact.email}
                      onChange={handleContactChange}
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      name="phone"
                      value={contact.phone}
                      onChange={handleContactChange}
                    />
                    {errors.phone && <small className="text-danger">{errors.phone}</small>}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold">Travel Type</h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="travelType"
                    id="personal"
                    value="Personal"
                    checked={travelType === "Personal"}
                    onChange={handleTravelTypeChange}
                  />
                  <label className="form-check-label" htmlFor="personal">
                    Personal
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="travelType"
                    id="business"
                    value="Business"
                    checked={travelType === "Business"}
                    onChange={handleTravelTypeChange}
                  />
                  <label className="form-check-label" htmlFor="business">
                    Business
                  </label>
                </div>
                {errors.travelType && <small className="text-danger">{errors.travelType}</small>}
              </div>

              <div className="text-center">
                <button className="btn btn-danger px-5 py-2" onClick={handleSubmit}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        ))}

    </>
  );
};

 export const BoardingDropping = ({ selectedBoarding={}, travelDay="", result={}, nextDay="", selectedDropping={} }) => {
  return (
    <>
    <style jsx="true">{`
      .boardinganddropping {
        background-color: #dc3545;
        color: white;
        text-align: center;
        padding: 0.5em;
        border-radius: 10px;
        width: 30%;
      }
      @media (min-width: 320px) and (max-width: 768px) {
        .boardinganddropping {
          margin-left: auto;
          margin-right: auto;
          width: 70%;
        }
      }
      @media (min-width: 768px) and (max-width: 992px) {
        .boardinganddropping {
          margin-left: initial;
          width: 60%;
        }
      }
      @media (min-width: 992px) and (max-width: 1900px) {
        .boardinganddropping {
          width: 30%;
        }
      }
    `}</style>
    <div className="row mb-4">
      <div className="col-md-6">
        <div className="border rounded p-3" style={{ background: "#FFEFE1" }}>
          <span>Boarding point details</span>
          <p className="boardinganddropping mt-2">
            {selectedBoarding.time}
            <span className="ms-2">{travelDay}</span>
          </p>
          <h6 className="fw-bold mb-1">{result.from}</h6>
          <p>{selectedBoarding.point}</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="border rounded p-3" style={{ background: "#FFEFE1" }}>
          <span>Dropping point details</span>
          <p className="boardinganddropping mt-2">
            {selectedDropping.time}
            <span className="ms-2">{nextDay}</span>
          </p>
          <h6 className="fw-bold mb-1">{result.to}</h6>
          <p>{selectedDropping.point}</p>
        </div>
      </div>
    </div>
    </>
  );
};
