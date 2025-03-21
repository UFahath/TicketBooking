import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "../assets/images/Sitelogo.jpg";
import { User } from "lucide-react";
import { SecondNavBar } from '../components/SecondNavBar'
import "../styles/Home.css";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-warning">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" className="site-logo ms-0" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="container" style={{ maxWidth: "700px" }}>
              <div className="row">
                <div className="col-1"></div>
                <div className=" col">
                  <SearchBar item={1}/>
                </div>
                <div className="col-1"></div>
              </div>
            </div>

            <div className=" d-flex justify-content-center">
              <div className="dropdown me-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown button
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
              <button className="btn btn-outline-dark mb-2">
                <User className="me-2" />
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* secondnavbar */}
           <SecondNavBar/>

    </>
  );
};

