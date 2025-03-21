import {Search} from 'lucide-react'
export const SearchBar = ({item}) => {
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
      style={{ outline: "none" }}
      placeholder={"Search for Bus Tickets,Movies and Events"}
      aria-label="search"
      aria-describedby="button"
    />
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

