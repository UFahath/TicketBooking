import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const SearchHeader = ({ from, to, date }) => {
   let history=useNavigate();
  let [dateString]=useState(()=>{
    let dateObj=new Date(date);
    return dateObj.toDateString()
  })

  function updateSearch(){
     history(-1)
  }
  return (
    <div className="bg-info text-white text-center p-4 rounded">
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <div className="bg-primary px-4 py-2 rounded">{from}</div>
        <div className="bg-primary px-4 py-2 rounded">{to}</div>
        <div className="bg-primary px-4 py-2 rounded">{dateString}</div>
      </div>
      <button className="btn btn-light mt-3" onClick={updateSearch}>
        Update Search
      </button>
    </div>
  );
};

export default SearchHeader;
