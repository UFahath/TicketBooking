
import {cities} from '../data/data1'
import { SearchBar } from '../components/SearchBar.jsx';
import { LocateFixed } from 'lucide-react';

 export const SearchBarContainer = () => {
  return (
    <div className="container rounded-3 p-4 text-center" 
    style={{ width: '70%', maxHeight: '480px', background: 'rgba(255, 0, 0, 0.7)' }}>
 
 {/* Search Bar */}
 <div className="row mb-3">
   <div className="col">
     <SearchBar item={2} />
   </div>
 </div>

 {/* Current Location */}
 <div className="row mb-3">
   <div className="col d-flex align-items-center justify-content-center">
     <button className="btn btn-outline-light d-flex align-items-center">
       <LocateFixed className="me-2" />
       Use my Current Location
     </button>
   </div>
 </div>

 {/* Divider */}
 <hr className="border-white border-2" />

 {/* Popular Cities */}
 <div className="row text-white fw-bold ">
   <div className="col-sm-3"></div>
   <div className="col-12 col-sm-4 mx-auto">
     <h4>Popular Cities</h4>
   </div>
   <div className="col-sm-3"></div>
 </div>

 {/* City List */}
 <div className="row text-white mt-2 d-flex align-items-baseline">
  {
    cities.map((item)=>(
   <div key={Math.random()} className="col">
     <div className="row gy-0">
       <div className="col">
       <img src={item.image} alt="" className='w-50'/>
       <p>{item.title}</p>
       </div>
     </div>
     </div>
     ))
 }
 </div>
</div>
  )
}



export default SearchBarContainer