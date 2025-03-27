import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import topBanner from '../assets/images/MoviePageBanner.png'

// buttonsResources
let btnResource=[
  {languages:["Tamil","Hindi","English","Telgu","Malaylam","Kannada"]},
  {genre:["Drama","Family","Thriller","Comedy","Romantic","Fantasy","Horror","Sci-Fi"]}
]

const MoviePage = () => {
  return (
    <>
    <Navbar/>
     <div className="container">
      <div className="row my-5">
        <img src={topBanner} alt="" />
      </div>
     </div>
     <div className="container">
      <div className="row">
        <div className="col">
        <div className="row bg-warning rounded-3 border border-secondary" style={{width:"36%",boxShadow:"7px 7px 0 black"}}>
          <div className="col border-5 pt-5">
            <h3 className="text-center mb-3">Languages</h3>
        <FilterOptions row={1}/>
        </div>
        </div>
        <div className="row  bg-warning rounded-3 mt-5 shadow-lg" style={{width:"36%",boxShadow:"7px 7px 0 black"}}>
          <div className="col border-5 pt-5">
          <h3 className="text-center mb-3">Genre</h3>
        <FilterOptions row={2}/>
        </div>
        </div>
        </div>
      </div>
     </div>
    <Footer/>
    </>
  )
}

const FilterOptions=({row})=>{
  return (
    <>
    {
    row===1?btnResource[0].languages.map((item1,index)=>(
      <button className="btn btn-primary mb-5 me-2" key={index}>{item1}</button>
    )):
    btnResource[1].genre.map((item2,index)=>(
         <button className="btn btn-primary mb-5 me-2" key={index}>{item2}</button>
      ))
     }
    </>
  )
}




export default MoviePage;
