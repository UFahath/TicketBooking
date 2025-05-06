import { useEffect, useState } from "react";

const SeatSelection = ({setNavi=()=>{}}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  // const navigationEntry=performance.getEntriesByType("navigation")[0].type;
  // console.log(navigationEntry)

  useEffect(()=>{
     
    return ()=>{if(!sessionStorage.getItem("naviindex:")||sessionStorage.getItem("naviindex:")==="1"||sessionStorage.getItem("naviindex:")==="2")
     {
      sessionStorage.removeItem("seats:")
     }
    }
  },[])
  const seatsData = [
    { id: "L1", status: "ladies", level: "lower" },
    { id: "L2", status: "booked", level: "lower" },
    { id: "L3", status: "available", level: "lower" },
    { id: "L4", status: "available", level: "lower" },
    { id: "L5", status: "ladies", level: "lower" },
    { id: "L6", status: "booked", level: "lower" },
    { id: "L7", status: "available", level: "lower" },
    { id: "L8", status: "booked", level: "lower" },
    { id: "L9", status: "booked", level: "lower" },
    { id: "L10", status: "available", level: "lower" },
    { id: "L11", status: "available", level: "lower" },
    { id: "L12", status: "ladies", level: "lower" },

    { id: "U1", status: "booked", level: "upper" },
    { id: "U2", status: "available", level: "upper" },
    { id: "U3", status: "available", level: "upper" },
    { id: "U4", status: "ladies", level: "upper" },
    { id: "U5", status: "available", level: "upper" },
    { id: "U6", status: "booked", level: "upper" },
    { id: "U7", status: "booked", level: "upper" },
    { id: "U8", status: "available", level: "upper" },
    { id: "U9", status: "ladies", level: "upper" },
    { id: "U10", status: "available", level: "upper" },
    { id: "U11", status: "booked", level: "upper" },
    { id: "U12", status: "available", level: "upper" },
  ];

  const handleSeatClick = (seat) => {
    if (seat.status === "booked" || seat.status === "ladies") return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handleProceed=()=>{
    sessionStorage.setItem("seats:",JSON.stringify(selectedSeats))
    setNavi(5);
  }
  const renderSeat = (seat) => {
    let className = "seat ";
    if (seat.status === "ladies") className += "ladies";
    else if (seat.status === "booked") className += "booked";
    else if (selectedSeats.includes(seat.id)) className += "selected";
    else className += "available";

    return (
      <div
        key={seat.id}
        className={className}
        onClick={() => handleSeatClick(seat)}
      ></div>
    );
  };

  const lowerSeats = seatsData.filter((seat) => seat.level === "lower");
  const upperSeats = seatsData.filter((seat) => seat.level === "upper");

  return (
    <div className="container">
      <h2>Select Seats</h2>
  
      <div className="row levels">
        <div className=" col-12 col-md-5 level border border-dark rounded-4">
          <h3>Lower Seats</h3>
          <div className="seats gap-5 my-5">{lowerSeats.map(renderSeat)}</div>
        </div>
        <div className=" col-12 col-md-5 level border border-dark rounded-4">
          <h3>Upper Seats</h3>
          <div className="seats gap-5 my-5">{upperSeats.map(renderSeat)}</div>
        </div>
      </div>

      <div className="legend flex-wrap p-3">
        <div><div className="seat ladies"></div> Ladies</div>
        <div><div className="seat available"></div> Available</div>
        <div><div className="seat booked"></div> Booked</div>
        <div><div className="seat selected"></div> Selected</div>
      </div>
      <button
        onClick={handleProceed}
        disabled={selectedSeats.length === 0}
      >
        Continue
      </button>

      <style jsx="true">{`
        .container {
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }
        .levels {
          display: flex;
          justify-content: space-around;
          margin: 20px 0;
        }
        .level h3 {
          color: orange;
          background: #ddd;
          padding: 10px;
          border-radius: 5px;
        }
        .seats {
          display: grid;
          grid-template-columns: repeat(4, 30px);
          gap: 10px;
          justify-content: center;
          margin-top: 10px;
        }
        .seat {
          width: 30px;
          height: 40px;
          border: 1px solid #999;
          border-radius: 5px;
        }
        .ladies {
          background: linear-gradient(to top, red 50%, white 50%);
        }
        .booked {
          background: #ccc;
        }
        .available {
          background: #fff;
        }
        .selected {
          background: green;
        }
        .legend {
          display: flex;
          justify-content: space-around;
          margin: 20px 0;
        }
        .legend div {
          display: flex;
          align-items: center;
        }
        .legend .seat {
          margin-right: 5px;
        }
        button {
          padding: 10px 20px;
          background-color: #1e90ff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }
        @media (min-width:320px) and (max-width:335px)
        {
         .legend div:nth-child(3),.legend div:nth-child(4){
            margin-top:30px;
         }
        }
        @media (min-width:335px) and (max-width:427px)
        {
         .legend div:nth-child(4)
         {
           margin-top:30px;
         }
        }
         @media (min-width:468px) and (max-width:472px)
         {
           .legend div{
             margin-right:10px;
           }
         }
      `}</style>
    </div>
  );
};

export default SeatSelection;
