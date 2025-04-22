import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

let importantInformation = [
  {
    Check_travel_guidelines_and_baggage_information_below: [
      "Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy extra charges.",
    ],
  },
  {
    Unaccompanied_Minors_Travelling: [
      "An unaccompanied minor usually refers to a child traveling without an adult aged 18 or older.",
      "Please check with the airline for their rules and regulations regarding unaccompanied minors, as these can differ between airlines.",
    ],
  },
];

const CancellationPolicy = ({ winglogo,state:presistOne,setFlightReviewBooking}) => {
  // console.log(presistOne)
  let location = useLocation();
  let { source, destination, date } = location.state;
   let navigate=useNavigate();

  let dayAndMonth = useMemo(() => {
    let newDate = new Date(date);
    let dateArray = newDate.toDateString().split(" ");
    let afterDate = dateArray[2] + " " + dateArray[1];
    let beforeDate = Number(dateArray[2]) - 1 + " " + dateArray[1];
    return [beforeDate, afterDate];
  }, [date]);

  let [countryCode, setCountryCode] = useState({});
  let [buttonColorMap, setButtonColorMap] = useState({});
  let [formErrors, setFormErrors] = useState({});
  let codeText=useRef(null);
  let [beforeDate, afterDate] = dayAndMonth;

  let [passengerCount] = useState(() => {
    let stored = JSON.parse(localStorage.getItem("passengercount:"));
    let resultArray = [];
    for (let key in stored) {
      if (stored[key] !== 0 && key !== "classSelected") {
        resultArray.push({ type: key, count: stored[key] });
      }
    }
    return resultArray;
  });

  function handleDropdownChange(mainIndex, subIndex, code) {
    let key = `${mainIndex}-${subIndex}`;
    setCountryCode((prev) => ({ ...prev, [key]: code }));
  }

  function handleGender(mainIndex, subIndex, gender) {
    let key = `${mainIndex}-${subIndex}`;
    setButtonColorMap((prev) => ({ ...prev, [key]: gender }));
  }

  function getError(mainIndex, subIndex, field) {
    return formErrors?.[`${mainIndex}-${subIndex}`]?.[field] || null;
  }

  return (
    <div className="row d-flex flex-wrap justify-content-between">
      <div className="col-12 col-xl-10 col-xxl-8">
        <div className="fs-5 rounded-4 p-3 bg-warning bg-gradient bg-opacity-75 my-5 p-3">
          <h2 className="ms-3 mb-5">Cancellation & Data Change Policy</h2>

          <div className="container bg-white rounded-3 p-3" style={{ width: "95%" }}>
            <div className="row row-cols-1 row-cols-sm-2">
              <div className="col">
                <img src={winglogo} alt="winglogo" style={{ mixBlendMode: "hard-light" }} />
                <p className="fw-bold">{source} - {destination}</p>
              </div>
              <div className="col d-flex justify-content-sm-center">
                <button type="button" className="btn text-danger fs-4">View Policy</button>
              </div>
            </div>
            <div className="row mt-2 text-center">
              <div className="col">₹4579</div>
              <div className="col">₹5499</div>
            </div>
            <div className="row p-4">
              <div className="col" style={{ height: "10px", background: "linear-gradient(to right,rgb(17, 167, 44),rgb(236, 177, 0),red)" }}></div>
            </div>
            <div className="row p-4">
              <div className="col fw-semibold">Now</div>
              <div className="col text-center fw-semibold">{beforeDate}<br /><span className="fw-normal">22:00</span></div>
              <div className="col text-end fw-semibold">{afterDate}<br /><span className="fw-normal">02:00</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-10 col-xxl-3">
        <div className="fs-5 rounded-4 p-3 bg-danger bg-gradient bg-opacity-75 my-5 mx-auto">
          <p>
            Prices for this itinerary have been decreased by Rs 106 by the airline. Grab this fare right now! Please review baggage allowance, cancellation policies & other ticket inclusions
          </p>
        </div>
      </div>

      <div className="row p-4 fs-4 w-100">
        <h1>Important Information</h1>
        <div className="col">
          {importantInformation.map((info, index) => {
            const [title, messages] = Object.entries(info)[0];
            return (
              <div key={index} className="mb-3">
                <h5 className="fw-bold">{title.replaceAll("_", " ")}</h5>
                <ul>
                  {messages.map((msg, idx) => (
                    <li key={idx} className="ms-5">{msg}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          let isValid = true;
          let newErrors = {};
          let collectedData = [];

          passengerCount.forEach((item, mainIndex) => {
            for (let i = 0; i < item.count; i++) {
              const fname = document.getElementById(`firstname-${mainIndex}-${i}`).value.trim();
              const lname = document.getElementById(`lastname-${mainIndex}-${i}`).value.trim();
              const phone = document.getElementById(`mobileno-${mainIndex}-${i}`).value.trim();
              const email = document.getElementById(`email-${mainIndex}-${i}`).value.trim();
              const gender = buttonColorMap[`${mainIndex}-${i}`];
              const code = countryCode[`${mainIndex}-${i}`];

              let currentErrors = {};
              if (!fname) currentErrors.fname = "First name is required.";
              if (!lname) currentErrors.lname = "Last name is required.";
              if (!gender) currentErrors.gender = "Gender is required.";
              if (mainIndex === 0 && i === 0) {
                if (!email) currentErrors.email = "Email is required.";
                if (!phone) currentErrors.phone = "Phone number is required.";
                else if (!/^[0-9]+$/.test(phone)) currentErrors.phone = "Phone number must be digits only.";
              }

              if (Object.keys(currentErrors).length > 0) {
                isValid = false;
                newErrors[`${mainIndex}-${i}`] = currentErrors;
              }

              collectedData.push({
                type: item.type,
                firstName: fname,
                lastName: lname,
                gender: gender || "",
                countryCode: code || "",
                mobile: phone,
                email: email,
              });
            }
          });

          setFormErrors(newErrors);
          if (isValid) {
            localStorage.setItem("travellersDetails", JSON.stringify(collectedData));
            alert("Traveller details saved successfully!");

            let timeoutId=setTimeout(()=>{
              clearTimeout(timeoutId)
              setFlightReviewBooking(false)
              navigate("/flightpaymentoption",{state:{presistOne}})
            },100)
            // 
            
          }
        }}
      >
        <h4>Traveller Details</h4>
        {passengerCount.map((item, mainIndex) =>
          [...Array(item.count)].map((_, subIndex) => (
            <div key={`${mainIndex}-${subIndex}`}>
              <h4>{item.type}-{subIndex + 1}</h4>
              <div className="row text-center my-2">
                <div className="col-12 col-sm-4 col-md-5 my-4 my-sm-0">
                  <input type="text" className="form-control" id={`firstname-${mainIndex}-${subIndex}`} placeholder="Firstname" />
                  {getError(mainIndex, subIndex, "fname") && <small className="text-danger">{getError(mainIndex, subIndex, "fname")}</small>}
                </div>
                <div className="col">
                  <input type="text" className="form-control" id={`lastname-${mainIndex}-${subIndex}`} placeholder="Lastname" />
                  {getError(mainIndex, subIndex, "lname") && <small className="text-danger">{getError(mainIndex, subIndex, "lname")}</small>}
                </div>
                <div className="col">
                  <button type="button" className={`btn ${buttonColorMap[`${mainIndex}-${subIndex}`] === "Male" ? "btn-danger" : "btn-outline-danger"} rounded-end-0`} onClick={() => handleGender(mainIndex, subIndex, "Male")}>Male</button>
                  <button type="button" className={`btn ${buttonColorMap[`${mainIndex}-${subIndex}`] === "Female" ? "btn-danger" : "btn-outline-danger"} rounded-start-0`} onClick={() => handleGender(mainIndex, subIndex, "Female")}>Female</button>
                  {getError(mainIndex, subIndex, "gender") && <small className="text-danger d-block">{getError(mainIndex, subIndex, "gender")}</small>}
                </div>
              </div>
              <div className="row text-center my-4">
                <div className="col-3 col-md-1">
                  <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false" ref={codeText}>
                      {countryCode[`${mainIndex}-${subIndex}`] || ""}
                    </button>
                    <ul className="dropdown-menu">
                      {["+1", "+44", "+61", "+56", "+91"].map(code => (
                        <li key={code}>
                          <a href="#" className="dropdown-item" onClick={(event) => {
                            event.preventDefault();
                            handleDropdownChange(mainIndex, subIndex, code);
                          }}>{code}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <input type="text" className="form-control" id={`mobileno-${mainIndex}-${subIndex}`} placeholder={`${!(mainIndex === 0 && subIndex === 0) ? "MobileNo (Optional)" : "MobileNo"}`} />
                  {getError(mainIndex, subIndex, "phone") && <small className="text-danger">{getError(mainIndex, subIndex, "phone")}</small>}
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg my-4 my-md-0">
                  <input type="email" className="form-control" id={`email-${mainIndex}-${subIndex}`} placeholder={`${!(mainIndex === 0 && subIndex === 0) ? "Email (Optional)" : "Email"}`} />
                  {getError(mainIndex, subIndex, "email") && <small className="text-danger">{getError(mainIndex, subIndex, "email")}</small>}
                </div>
              </div>
            </div>
          ))
        )}

        <div className="row my-4 text-center">
          <div className="col">
            <button type="submit" className="btn btn-danger fs-4">Continue</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CancellationPolicy;