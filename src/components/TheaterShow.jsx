import { Heart,Info } from "lucide-react";
import { useState } from "react";
export const TheaterShow = () => {
  // let[popUp,setPop]=useState(false);
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
  
  console.log(theaters);
  
  return (
    <>
    {/* <ConfirmationBox/> */}
    
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
         <TimingButtons buttonText={item} key={index} />
                   ))
          }
        </div>
      </div>
    </div>
    ))
  }
    </>
  )
}

const TimingButtons=({buttonText,setPop})=>{
  let [btnColor,setBtnColor]=useState(0);
  const selectTiming=(event)=>{
      //  console.log(event.target.textContent)
       setBtnColor(1)
       let selectedTheater=event.target.closest('.row');
       console.log(selectedTheater)
       setPop(true)
  }
  return (<button className={`btn ${btnColor===0?"btn-outline-danger":"btn-danger"} rounded-2 mx-3 m-4`}  onClick={selectTiming}>{buttonText}</button>)
}


// const ConfirmationBox=()=>{
//   return (
//     <>
//     <div className="container border border-danger bg-danger rounded-4" style={{width:"300px",height:"300px",position:"absolute",zIndex:"9999",backgroundColor:"black"}}>
//      <p className="w-100 h-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores error incidunt consectetur dolore nemo temporibus, accusamus molestiae amet tempore quaerat, maiores odit modi, illo a rerum vitae facere unde sed?</p>
//     </div>
//     </>
//   )
// }
