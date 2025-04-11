import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useState,useEffect, useRef } from "react";
import theater from '../assets/images/Theater.png'
import { useNavigate } from "react-router-dom";
export const MovieBookingPage = () => {
  // const [space, setSpace] = useState(null);
  const selectedTheater = useRef();
  let[seatPicked,setSeat]=useState(0);
  let seatButton=useRef(0);
  let [seatsBooked]=useState([]);

  let category1=useRef();
  let category2=useRef();

  let navigate=useNavigate();
  const seatsName = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18", "E19"],
    // ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19"],
  ];

  useEffect(() => {

  
      console.clear();
    const storedSlot = JSON.parse(localStorage.getItem("PickedSlot:"));
    // setSlot(storedSlot);

    if (selectedTheater.current && storedSlot) {
      selectedTheater.current.innerHTML = storedSlot;
      let buttons = selectedTheater.current.querySelectorAll("button");
      buttons.forEach((item) => {
        if (!item.className.includes("btn-danger")) {
          item.setAttribute("disabled", "");
        }
      });
    }
    return ()=>{}
   
  }, []);
  
  let lastRowIndex=1;
useEffect(()=>{
  if(seatsBooked)
    {
      localStorage.setItem("seats::",[JSON.stringify(seatsBooked)])
    }
})


  function seatValidation(event){

    if(seatPicked<JSON.parse(localStorage.getItem("seatCount::"))&&(!event.target.className.includes(" btn-danger text-white")))
    {
         event.target.className+=" btn-danger text-white"
         setSeat(seatPicked+1)
         let seatSelected=event.target.textContent;
       
      
        // console.log(category1.current.innerText)
        // console.log(category2.current.innerText)
        // console.log(seatSelected.charCodeAt(0)) ascii value
        if(seatSelected.charCodeAt(0)>=65&&seatSelected.charCodeAt(0)<=69)
        {
          let seatCategory=category1.current.textContent;
          seatsBooked.push({seatSelected,seatCategory})
          
        }
        else{
          let seatCategory=category2.current.textContent;
          seatsBooked.push({seatSelected,seatCategory})
        }
    }
    else
    {
     
       alert("Seat Limit Reached")
     
    }
  }
  console.log(seatsBooked)


  function nextPage(){
        if(seatsBooked.length!==0)
        {
           navigate('/bookingdetails')
        }
        else
        {
          alert("please select seat first")
        }
  }
  return (
    <>
      <Navbar />
      <div ref={selectedTheater} className="container my-4"></div>

      <div className="container-fluid shadow-lg">
        <div className="row text-danger my-4 fw-bold w-100">
          <p ref={category1} className="m-3">Rs.190 CLUB</p>
          <div className="col table-responsive">
            <table className="table w-100">
              <tbody>
                {/* Seat column numbers */}
                <tr className="text-center">
                  <td></td>
                  {Array.from({ length: 19 }, (_, i) => (
                  //   i===4||i==5||i===16||i===17?
                  // (<td key={i}>&nbsp;</td>):(
                    <td key={i}>{i + 1}</td>
                  ))}
                </tr>

                {/* Seat Rows */}
                {seatsName.map((row, rowIndex) => (
                  
                  <tr key={rowIndex}>
                   
                    <td><div className="gy-0">{String.fromCharCode(65 + rowIndex)}</div></td>
                    {
                    row.map((seat, colIndex) => (
                      // colIndex===4||colIndex===5||colIndex===16||colIndex===17?
                      // (<td key={colIndex}>&nbsp;</td>):(
                      <td key={colIndex}  >
                        {
                        <button className="btn btn-outline-danger" ref={seatButton} onClick={seatValidation}>{seat}</button>
                         }
                      </td>
                    ))
                    }
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div ref={category2} className="col fs-5 text-danger fw-bold m-3">Rs.60 Executive</div>
          <div className="table-responsive">
            <table className="table">
                 <tbody>
                  <tr>
                    <td className="ms-0">F</td>
                    {
                      Array.from({length:19},(_,i)=>(
                        <td key={i} ><button className="btn btn-outline-danger" ref={seatButton} onClick={seatValidation}>F{i+lastRowIndex}</button></td>
                      ))
                    }
                  </tr>
                 </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col text-center my-5">
          <img src={theater} className="w-50 h-50" alt="theaterscreen" />
          <p className="fs-3 fw-bold text-info">All eyes this way...Please!</p>
          </div>
        </div>
        <div className="row">
          <div className="col text-center" style={{minHeight:"180px"}}>
            <div className="row w-50 h-50 mx-auto p-4 d-flex justify-content-center">
              <div className="col-md-2 border border-danger bg-danger rounded-3" style={{width:"10px",height:"30px"}}></div>
              <div className="col-md-3 fs-4">Selected</div>
              <div className="col-md-2 border border-danger border-2 bg-outline-danger rounded-3 ms-2" style={{width:"10px",height:"30px"}}></div>
              <div className="col-md-5 fs-4">Not Selected</div>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-4"></div>
        <div className="col-4">
        <button className="btn btn-warning w-100 mb-5 fs-4" onClick={nextPage}>Pay</button>
        </div>
        <div className="col-4"></div>
        </div>
      </div>


      <Footer />
    </>
  );
};
