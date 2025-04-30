import { useEffect, useState } from "react"


export const BusInfo = ({filterData={}}) => {
const [busDetails,setBusDetails]=useState([])

  useEffect(()=>{
          const busDetails=JSON.parse(localStorage.getItem("bus_detail"));
          if(busDetails)
          {
            setBusDetails(busDetails)
          }
  },[])


  useEffect(()=>{
     console.log(busDetails)
  },[busDetails])
  return (
    <div>BusInfo:{filterData.selectBusType}</div>
  )
}
