import {useState, useEffect } from "react"
import Footer from "./Footer"
import { Navbar } from "./Navbar"



const BookingDetails = () => {
  //1)Get details from the local storage and store in seatsDetails
  //2)After storing filtering based on the seatcategory using reduce function
         //2.1)First Check whether the accumulator contain that seat category as key if not set an empty array
        //2.2)After that push the current item into array with key as seat category
        //Finally we will get one array based on the seat category
  //3)Now if outputseats is updated then store the club array since it is async function first iam checking if outputseats contain club if not empty array
  //4)Finally we will render
 let[seatsDetails,setDetails]=useState([]);
 let[outputseats,setOutput]=useState([]);
 
 
  useEffect(()=>{
    // console.log(JSON.parse(localStorage.getItem("seats::")))
     const storedData=JSON.parse(localStorage.getItem("seats::"));
     if(storedData)
     {
        setDetails( [...JSON.parse(localStorage.getItem("seats::"))]);
     }
     else
     {
      console.log("no data present")
     }
         
  },[])

  useEffect(()=>{
    let ans=seatsDetails.reduce((accu,item)=>{
      if(item.seatCategory)
      {
       let key=item.seatCategory.slice(item.seatCategory.indexOf(" ")+1).toLowerCase();
      accu[key]=accu[key]||[]
      accu[key].push(item);
      
      return accu;
      }
      else{
        console.log("no seatcategory")
      }

     },{});
  
    
     setOutput(ans)
    //  console.log(outputseats)
  },[seatsDetails])
let [club,setClub]=useState([])
 useEffect(()=>{
  setClub(outputseats['club']||[]);
 },[outputseats])
  return (
    <>
    <Navbar/>
     <div className="container w-50 border shadow-lg rounded-4 p-5 my-5">
      <div className="row text-center">
        <div className="col fs-4 text-warning fw-bold">Booking Summary</div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col">
            <table className="table">
              <tbody>
               <tr className="border border-dark">
                <th className="border border-danger">
                 Club-{club&&club.map((item,index,arr)=>(<span>{arr.length-1!==index?item.seatSelected+",":item.seatSelected}</span>))}({club.length} Tickets)</th>
                <td>Rs.{club.length*190}</td>
               </tr>
               <tr>
                <th>Dummy2</th>
                <td>2</td>
               </tr>
               <tr>
                <th>SubTotal</th>
                <td>2</td>
               </tr>
              </tbody>
            </table>
            </div>
      </div>
      <div className="row text-center">
        <div className="col">
        <button className="btn btn-danger mx-auto">Proceed to Pay</button>
        </div>
      </div>
     </div>
    <Footer/>
    </>
  )
}



export default BookingDetails