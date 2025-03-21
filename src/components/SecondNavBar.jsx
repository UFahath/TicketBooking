import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Headset,SquareMenu} from 'lucide-react'

export const SecondNavBar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-outline-teritary position-sticky">
    <div className="container ">
      <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#myNav">
      <SquareMenu/>
      </button>
      <div className="collapse navbar-collapse" id="myNav">
        <ul className="navbar-nav fw-bold">
          <li className="nav-item mx-2">
            <a href="" className="nav-link">Home</a>
          </li>
          <li className="nav-item mx-2">
            <a href="" className="nav-link">Travel</a>
          </li>
          <li className="nav-item mx-2">
            <a href="" className="nav-link">Movies</a>
            </li>
            <li className="nav-item dropdown mx-2">
          <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Languages
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
            <li><a className="dropdown-item" href="#">English</a></li>
            <li><a className="dropdown-item" href="#">Hindi</a></li>
            <li><a className="dropdown-item" href="#">Tamil</a></li>
            <li><a className="dropdown-item" href="#">Kannada</a></li>
          </ul>
        </li>
        </ul>

      </div>
      
      <div className="row my-2 my-sm-0 me-1 border border-white" style={{width:"200px"}}>
          <div className="col">
            <a href="#" className="fw-bold" style={{textDecoration:"none"}}>
            Offers
            </a>
          </div>
          <div className="col">
              <a className="col fw-bold" href="#" style={{textDecoration:"none"}}><Headset/>
              Help
           </a>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}
