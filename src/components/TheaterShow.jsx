import { Heart,Info } from "lucide-react";
import { useState } from "react";

import ticketicon from '../assets/images/TicketIcon.jpg'
// import DateObject from 'react-date-object'

// function dateArray(){
//   let dateObj=new DateObject();
//   let dateArr=[];
//   let k=1;
//   for(let i=0;i<3;i++)
//   {
//     if(i==0)
//     {
//       dateArr.push(dateObj.format("ddd DD MMM"))
//     }
//     dateObj.day+=k;
//     dateArr.push(dateObj.format("ddd DD MMM"));
//   }
//   return dateArr;
// }

// let dates=dateArray();

let dates=[{day:"Tue",date:"01",month:"Apr"},
           {day:"Wed",date:"02",month:"Apr"},
           {day:"Thru",date:"03",month:"Apr"},
           {day:"Fri",date:"04",month:"Apr"}
];

export const TheaterShow = () => {
  // let[popUp,setPop]=useState(false);
  let [btnColor,setBtnColor]=useState(0);
  const theaters = [
    {
      name: "PVR Cinemas",
      timings: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
    },
    {
      name: "INOX",
      timings: ["9:00 AM", "12:30 PM", "4:00 PM", "7:30 PM"]
    },
    {
      name: "Cinepolis",
      timings: ["11:00 AM", "2:45 PM", "6:15 PM", "9:45 PM"]
    },
    {
      name: "IMAX",
      timings: ["10:15 AM", "1:45 PM", "5:15 PM", "8:45 PM"]
    }
  ];
  
  // console.log(theaters);
  
  return (
    <>
    {/* <ConfirmationBox/> */}
    <DateSlider/>
    
    {
    
      theaters.map((item,index)=>(
    <div className="container my-5 shadow-lg rounded-5" key={index} style={{zIndex:0}}>
      <div className="row ">
        <div className="col-md-1 p-4">
          <Heart size={50}/>
        </div>
        <div className="col-md-5  p-4 fs-4">
          <p>{item.name}:Coimbatore</p>
          <p><Info/> Info</p></div>
        <div className="col-md-6 my-auto">
          {
            item.timings.map((item,index)=>(
         <TimingButtons buttonText={item} key={index} btnColor={btnColor} setBtnColor={setBtnColor}/>
                   ))
          }
        </div>
      </div>
    </div>
    ))
  }
  <ConfirmationBox />
    </>
  )
}

const TimingButtons=({buttonText})=>{

  const selectTiming=(event)=>{
      //  console.log(event.target.textContent)
      if(!event.target.className.includes("btn-danger text-white"))
      {
      event.target.className+=" btn-danger text-white"
      }
       let selectedTheater=event.target.closest('.row');
       console.log(selectedTheater)

  }
  return (<button className={`btn btn-outline-danger rounded-2 mx-3 m-4`} data-bs-toggle="modal" data-bs-target="#showMenu"  onClick={selectTiming}>{buttonText}</button>)
}


const ConfirmationBox=()=>{
  let numbers=[1,2,3,4,5,6,7,8,9];
  let [seatBtnColor,setBColor]=useState("");


  return (
    <>
       <div className="container">
        <div className="modal fade" id="showMenu" tabIndex={"-1"}  data-bs-backdrop="static"  data-bs-keyboard="false" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <h2 className="mx-auto">How Many Seats?</h2>
              </div>

              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                  <img src={ticketicon} alt="ticketlogo" className="w-100 h-100"/>
                  </div>
                  <div className="col-4"></div>
                  </div>

                  <div className="row my-4">
                    <div className="col-1"></div>
                    {
                     numbers.map((item,index)=>(
                      <div className="col-1" key={index}>
                     <button className={`btn ${index===seatBtnColor?"btn-danger ":""}border-0 `} onClick={()=>{setBColor(index)}}>{item}</button>
                      </div>
                      ))
                    }
                     <div className="col-1"></div>
                  </div>
                  <div className="row">
                    <div className="col-4"></div>
                    <div className="col-2">
                  <p>Club</p>
                  <p className="text-danger">Rs.190</p>
                  </div>

                  <div className="col-2">
                  <p>Executive</p>
                  <p className="text-danger">Rs.60</p>
                  </div>
                  <div className="col-4"></div>
                </div>
             
                  </div>
              </div>

              <div className="modal-footer">
              
              <button type="button" className="btn btn-primary mx-auto" >Select Seats</button>
                   
              </div>
            </div>
          </div>
        </div>
       </div>
    </>
  )
}

const DateSlider = () => {
  // console.log(dates[0].split(" "))
  return (
    <div className="container bg-warning my-5 rounded-5">
      <div className="row p-4">
       {
        dates.map((item,index)=>(
        <div className={`col-md-2 ${index===1?"bg-white text-dark rounded-3":"text-white my-auto"}`} key={index}>
          <button className="btn ms-5 border-0">
          <div className="row fs-4">{item.day}</div>
          <div className="row fs-4 fw-bold">{item.date}</div>
          <div className="row fs-4 ">{item.month}</div>
          </button>
        </div>
        ))
       }
       <div className="col-md-2 border border-left-3">
           <p>English</p>
       </div>
      </div>
    </div>
  );
};

