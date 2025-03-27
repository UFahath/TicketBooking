import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";

const Test = () => {

  let [languagePicked,setLanguage]=useState("");
  let [genre,setGenre]=useState("");
  let [fliteredResult,setResult]=useState([]);

  let movies=[
    {Movie:"Emphuran",language:"Tamil",Genre:'Thriller'},
    {Movie:"MazeRunner",language:"English",Genre:'Adventure'},
    {Movie:"mera naam khan",language:"Hindi",Genre:'Comedy'},
    {Movie:"Behan",language:"Hindi",Genre:'Thriller'},
    {Movie:"Dragon",language:"Tamil",Genre:'Comedy'},
  ]

  function movieFilter()
  {
    // if(languagePicked===""&&genre==="")
    // {
    //   setResult(movies.filter((item)=>{
    //     return languagePicked===item.language;
    //   }))
    // }
    if(languagePicked!==""&&genre==="")
    {
   
      setResult(movies.filter((item)=>{
        return languagePicked===item.language;
      }))
  
    }
    else if(genre!=""&&languagePicked==="")
    {
      setResult(movies.filter((item)=>{
        return genre===item.Genre;
      }))
    }
    else if(languagePicked!=""&&genre!="")
    {
      setResult(movies.filter((item)=>{
        return languagePicked===item.language&&genre===item.Genre;
      }))
    }

  }

 
  return (
    <>
    <div className="container">
      <div className="row my-5">
        <div className="col">
    <button className={`btn ${(languagePicked==="Tamil")?"btn-primary":"btn-outline-primary"}`} onClick={()=>{
      setLanguage("Tamil")
      movieFilter()
      }}>Tamil</button>
     </div>
     <div className="col">
    <button className={`btn ${(languagePicked==="English")?"btn-primary":"btn-outline-primary"}`}  onClick={()=>{
      setLanguage("English")

      movieFilter()
      }}>English</button>
    </div>
    <div className="col">
    <button className={`btn ${(languagePicked==="Hindi")?"btn-primary":"btn-outline-primary"}`}  onClick={()=>{
      setLanguage("Hindi")
      movieFilter()
      }}>Hindi</button>
    </div>
    </div>
 
     <div className="row">
      <div className="col">
    <button className={`btn ${(genre==="Thriller")?"btn-primary":"btn-outline-primary"}`} onClick={()=>{
      setGenre("Thriller")
      movieFilter()
      }}>Thriller</button>
    </div>
    <div className="col">
    <button className={`btn ${(genre==="Adventure")?"btn-primary":"btn-outline-primary"}`}  onClick={()=>{
      setGenre("Adventure")
      movieFilter()
      }}>Adventure</button>
    </div>
    <div className="col">
    <button className={`btn ${(genre==="Comedy")?"btn-primary":"btn-outline-primary"}`}  onClick={()=>{
      setGenre("Comedy")
      movieFilter()
      }}>Comedy</button>
    </div>
    </div>
    </div>
    <div className="row">
    <ul className="text-center mt-5">
    {
      fliteredResult.map((item)=>(
       <li key={Math.random()}>{item.Movie}</li>
      ))
    }
    </ul>
    </div>
    </>
  )
}



export default Test