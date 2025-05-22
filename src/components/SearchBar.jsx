import {MoveRight, Search} from 'lucide-react'
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
  const [noResultFound,setNoResultFound]=useState(false);
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

useEffect(() => {
const filteredFlightData = flightDataList.filter((item) => {
  const fullRoute = `${item.source} to ${item.destination}`.toLowerCase().trim();
  const query = inputField.toLowerCase().trim();
  return (
    item.source?.toLowerCase().includes(query) ||
    item.destination?.toLowerCase().includes(query) ||
    fullRoute.includes(query)
  );
});


 
  setFilteredFlightDataList(inputField === ""? [] : filteredFlightData);

  
  setNoResultFound((inputField !== "" && filteredFlightData.length === 0));

}, [inputField]);


useEffect(()=>{
    console.log("No Result Found::",noResultFound)
},[noResultFound])

// useEffect(()=>{
//      setNoResultFound((inputField!==""&&filteredFlightDataList.length===0)&&false)
//      console.log("No Result Found:",noResultFound)
// },[filteredFlightDataList])

  // let query=inputField.toLowerCase();
 

  // let filteredBusData=busDataList.filter((item)=>{
  //    return item.from.toLowerCase().includes(query)||item.to.toLowerCase().includes(query);
  // })
    if(item===1)
    {
      return (
    <div className="col position-relative">
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
        <ul className='searchbarList rounded-4 mt-1'>
          {filteredFlightDataList.map((item, index) => (
            < div key={index} className='d-flex justify-content-between m-2  mx-auto  align-items-center fs-5 rounded-3 border border-2 shadow-sm'>
              <img src={OfferAir} alt="offer" className='img-fluid rounded-3 shadow-sm border border-2' style={{width:"80px",height:"80px"}}/>
            <li className="list-group-item" >
              <a href="#" className='nav-link' onClick={(e)=>{
                e.preventDefault();
                 setFilteredFlightDataList([])
                  setInputField(`${item.source} to ${item.destination}`);
                 
              }}>{item.source} to {item.destination}</a>
            </li>
            <span style={{fontSize:"0.9rem",color:'grey'}}>flight</span>
            <hr/>
             <button className='btn btn-outline-danger me-2'>
              <MoveRight/>
             </button>
            </div>
          ))}
        </ul>
      )
    }
    </div>
    <div>
    {
      noResultFound&&(
      <div className='noresultfound'>
      <p className='bg-white text-danger p-3 position-absolute w-100 rounded-3 shadow-lg'>No Result Found</p>
      </div>
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

