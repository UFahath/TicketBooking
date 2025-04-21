import { useMemo,useState} from "react";
import { useLocation } from "react-router-dom";


let importantInformation=[
  {
    Check_travel_guidelines_and_baggage_information_below:
    ["Carry no more than 1 check-in baggage and 1 hand baggage per passenger.If violated,airline may levy extra charges."]
  },
  {
    Unaccompanied_Minors_Travelling:["An unaccompanied minor usually refers to a child traveling without an adult aged 18 or older.",
      "Please check with the airline for their rules and regulations regarding unaccompanied minors, as these can differ between arilines."]
  }
]

const CancellationPolicy = ({ winglogo }) => {
  let location = useLocation();
  let { source, destination,date} = location.state;

let dayAndMonth=useMemo(()=>{
  console.log("Memo")
  let newDate=new Date(date)
  let dateArray=newDate.toDateString().split(" ");
  let afterDate= dateArray[2]+" "+dateArray[1];
  let beforeDate=Number(dateArray[2])-1+" "+dateArray[1];
  return [beforeDate,afterDate]
},[date])
 
let[countryCode,setCountryCode]=useState("")
let[selectedmainIndex,setMainIndex]=useState("")
let[selectedsubIndex,setSubIndex]=useState("")
let[beforeDate,afterDate]=dayAndMonth;
let[passengerCount]=useState(()=>{
  let stored=JSON.parse(localStorage.getItem("passengercount:"))
  let resultArray=[];
  for(let key in stored)
  {
    if(stored[key]!==0&&key!=="classSelected")
    {
     resultArray.push({type:key,count:stored[key]})
    }
  }
  return resultArray;
})



  return (
    <div className="row d-flex flex-wrap justify-content-between">
      <div className="col-12 col-xl-10 col-xxl-8">
        <div className="fs-5 rounded-4 p-3 bg-warning bg-gradient bg-opacity-75 my-5 p-3">
          <h2 className="ms-3 mb-5">Cancellation & Data Change Policy</h2>

          <div
            className="container bg-white rounded-3 p-3"
            style={{ width: "95%" }}
          >
            <div className="row row-cols-1 row-cols-sm-2">
              <div className="col">
                <img
                  src={winglogo}
                  alt="winglogo"
                  style={{ mixBlendMode: "hard-light" }}
                />
                <p className="fw-bold">
                  {source} - {destination}
                </p>
              </div>
              <div className="col d-flex justify-content-sm-center">
                <button className="btn text-danger fs-4 fw-">
                  View Policy
                </button>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col text-center">
                {String.fromCharCode(8377)}4579
              </div>
              <div className="col text-center">
                {String.fromCharCode(8377)}5499
              </div>
            </div>
            <div className="row p-4">
              <div
                className="col"
                style={{
                  height: "10px",
                  background:
                    "linear-gradient(to right,rgb(17, 167, 44),rgb(236, 177, 0),red)",
                }}
              ></div>
            </div>

            <div className="row p-4">
              <div className="col"><span className="fw-semibold">Now</span></div>
              <div className="col text-center"><span className="fw-semibold">{beforeDate}<br/><span className="fw-normal">22:00</span></span></div>
              <div className="col text-end"><span className="fw-semibold">{afterDate}<br/><span className="fw-normal">02:00</span></span></div>
            </div>
          </div>
        </div>

       

      </div>

      <div className="col-xxl-1"></div>

      <div className="col-12 col-xl-10 col-xxl-3">
        <div className="fs-5 rounded-4 p-3 bg-danger bg-gradient bg-opacity-75 my-5 mx-auto">
          <p className="w-100">
            Prices for this itinerary have been decreased by Rs 106 by the
            airline. Grab this fare right now! Please review baggage allowance,
            cancellation policies & other ticket inclusions
          </p>
        </div>
      </div>

      <div className="row p-4 fs-4" style={{width:"100%"}}>
    <h1>Important Information</h1>
    <div className="col">
  {
    importantInformation.map((info, index) => {
  
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
    })
  }
  </div>
     </div>

     <div className="row">
      <h4>Traveller Details</h4>
      {
        (
          ()=>{
            function check(index,i){
              console.log("mainindex::",index)
              console.log("SubIndex:",i)
            }
              let output=[];
              let c=10;
               passengerCount.map((item,index)=>{
                for(let i=0;i<item["count"];i++)
                {
                  output.push(
                    <div key={c++}>
                    <h4>{item.type}-{i+1}</h4>
                    <div className="row  text-center my-2">
                      <div className="col">
                    <input type="text" className="form-control" id="firstname" placeholder="Firstname"/>
                    </div>
                    <div className="col">
                    <input type="text" className="form-control" id="lastname" placeholder="Lastname" />
                    </div>
                    <div className="col">
                      <button className="btn btn-outline-danger rounded-end-0">Male</button>
                      <button className="btn btn-outline-danger rounded-start-0">Female</button>
                    </div>
                    </div>
                    

                    <div className="row text-center my-4">
                      <div className="col">
                       <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          {i===selectedsubIndex&&index===selectedmainIndex?(countryCode):"CountryCode"}
                        </button>

                        <ul className="dropdown-menu">
                          <li><a href="#" className="dropdown-item" name="+1" onClick={(event)=>{
                            event.preventDefault();
                            console.log(event.target.name)
                            setMainIndex(index);
                            setSubIndex(i)
                            check(index,i)
                            // setCountryCode("+1")
                          }} >+1</a></li>
                          <li><a href="#" className="dropdown-item"
                          onClick={(event)=>{
                            event.preventDefault();
                            // setIndex(i);
                            setMainIndex(index);
                            setSubIndex(i)
                            setCountryCode("+44")
                          }} 
                          >+44</a></li>
                          <li><a href="#" className="dropdown-item"
                          onClick={(event)=>{
                            event.preventDefault();
                            setMainIndex(index);
                            setSubIndex(i)
                            setCountryCode("+61")
                          }} 
                          >+61</a></li>
                          <li><a href="#" className="dropdown-item"
                          onClick={(event)=>{
                            event.preventDefault();
                            setMainIndex(index);
                            setSubIndex(i)
                            setCountryCode("+56")
                          }} 
                          >+56</a></li>
                          <li><a href="#" className="dropdown-item"
                          onClick={(event)=>{
                            event.preventDefault();
                            setMainIndex(index);
                            setSubIndex(i)
                            setCountryCode("+91")
                          }} 
                          >+91</a></li>
                        </ul>
                       </div>
                    </div>
                    <div className="col">
                    <input type="text" className="form-control" id="lastname" placeholder={`${!(index===0&&i===0)?"MobileNo (Optional)":"MobileNo"}`} />
                    </div>
                    <div className="col">
                    <input type="email" className="form-control" id="lastname" placeholder={`${!(index===0&&i===0)?"Email (Optional)":"Email"}`}/>
                    </div>
                    </div>
                    </div>
                  )
                }
    
               })

              return output;

          }
        )()
      }
      <div className="row my-4 text-center">
        <div className="col">
        <button type="submit" className="btn btn-danger fs-4">Continue</button>
        </div>
      </div>
     </div>
    </div>
  );
};

export default CancellationPolicy;
