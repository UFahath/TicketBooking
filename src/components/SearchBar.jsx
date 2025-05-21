import {Search} from 'lucide-react'
import { useState,useEffect } from 'react';
import { flightData } from '../api/flightapi';
import { fetchBusData } from '../api/busapi';
import "../styles/Home.css"
import  fetchMovies  from '../api/movieapi';
import OfferAir from '../assets/images/OfferAir6.jpg'
export const SearchBar = ({item}) => {
  const[inputField,setInputField]=useState("");
  const [flightDataList, setFlightDataList] = useState([]);
  const[filteredFlightDataList,setFilteredFlightDataList]=useState([]);
  const [busDataList, setBusDataList] = useState([]);
  const [movieDataList, setMovieDataList] = useState([]);
   const handleInputChange=(event)=>{
    setInputField(event.target.value);
   }
   
   
   useEffect(()=>{
    async function fetchData() {
       let response=Promise.allSettled([
         flightData(),
         fetchBusData("/TicketBooking/db1.json"),
        //  fetchMovies()
       ])
      
      let data=await response;
           setFlightDataList(data[0].value);
             setBusDataList(data[1].value);
            // setMovieDataList(data[2].value);
       
      }
    fetchData();
   },[])

   useEffect(()=>{  
    // console.log("Flight Data List:", flightDataList);
    // console.log("Bus Data List:", busDataList);
    // console.log("Movie Data List:", movieDataList);
     let filteredFlightData=flightDataList.filter((item)=>{
    return item.source?.toLowerCase().trim().includes(inputField.toLowerCase())||item.destination?.toLowerCase().trim().includes(inputField.toLowerCase());
     })
  setFilteredFlightDataList(filteredFlightData);

  (inputField==="")&&setFilteredFlightDataList([])
   },[inputField,flightDataList]);

  // let query=inputField.toLowerCase();
 

  // let filteredBusData=busDataList.filter((item)=>{
  //    return item.from.toLowerCase().includes(query)||item.to.toLowerCase().includes(query);
  // })
    if(item===1)
    {
      return (
    <div className="col">
    <div className="input-group mb-3 mt-3">
    <button className="btn btn-outline-none bg-white">
      <Search />
    </button>
    <input
      type="text"
      className="form-control"
      value={inputField}
      onChange={handleInputChange}
      style={{ outline: "none" }}
      placeholder={"Search for Bus Tickets,Movies and Events"}
      aria-label="search"
      aria-describedby="button"
    />
    {
      filteredFlightDataList&&filteredFlightDataList.length>0&&(
        <ul className='searchbarList'>
          {filteredFlightDataList.map((item, index) => (
            < div key={index} className='d-flex justify-content-between m-2  mx-auto bg-warning text-white align-items-center fs-5 fw-bold'>
              <img src={OfferAir} alt="offer" className='img-fluid rounded-3' style={{width:"100px",height:"100px"}}/>
            <li className="list-group-item" >
              <a href="#" className='nav-link' onClick={(e)=>{
                e.preventDefault();
                setInputField(`${item.source} to ${item.destination}`);
                setFilteredFlightDataList([]);
              }}>{item.source} to {item.destination}</a>
            </li>
            <hr/>
            </div>
          ))}
        </ul>
      )
    }
    </div>
  </div>
      )
    }
    else{
      return (
        <div className="col">
        <div className="input-group mb-3 mt-3">
        <button className="btn btn-outline-none bg-white">
          <Search />
        </button>
        <input
          type="text"
          className="form-control"
          style={{ outline: "none" }}
          placeholder={"Search for Your City"}
          aria-label="search"
          aria-describedby="button"
        />
        </div>
      </div>
          )
    }
}

