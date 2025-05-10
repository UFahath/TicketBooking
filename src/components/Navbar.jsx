import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "../assets/images/Sitelogo.jpg";
import { CircleChevronDown, User } from "lucide-react";
import { SecondNavBar } from "../components/SecondNavBar";
import "../styles/Home.css";
import { SearchBar } from "./SearchBar";
import { Link } from "react-router-dom";
import googlepng from '../assets/images/google.png'
import React, { useEffect } from "react";

const Login = () => {
  return (
    <>
    <button
                type="button"
                className="btn btn-outline-dark mb-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <User className="me-2" />
                Login
              </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 mx-auto fw-semibold" id="staticBackdropLabel">
               Login
              </h1>
             
            </div>
            <div className="modal-body">
            <form action="" className="w-75" style={{margin:"10px auto"}}>
              <label htmlFor="email" className="form-label mb-3 text-primary">Enter Email Or Mobile Number</label>
              <input type="email" className="form-control mb-3" id="email" name="email" placeholder="Email Or Mobile"/>

              <label htmlFor="pwd" className="form-label mb-3 text-primary" style={{margin:"10px auto"}}>Enter your Password</label>
              <input type="password" className="form-control mb-3" id="pwd" name="pwd" placeholder="Password"/>
            </form>


            </div>
            <div className="modal-footer">
              <div className="container">
                <div className="row text-center">
                  <div className="col-3"></div>
                  <div className="col-6">
              <button className="btn btn-primary w-100">Login</button>
              </div>
              <div className="col-3"></div>
              </div>
              
              <p className="text-center my-3"> Or Continue With</p>

               <div className="row text-center">
                  <div className="col-3"></div>
                  <div className="col-6">
              <button className="btn btn-outline-dark w-100">
                <img src={googlepng} alt="googlelogo" style={{width:"20px"}}/>&nbsp;
                Sign In With Google</button>
              </div>
              <div className="col-3"></div>
              </div>

              <div className="row my-2">
                <span><CircleChevronDown/>&nbsp;Need Help?</span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Navbar = React.memo(() => {
  useEffect(()=>{
  
    window.addEventListener("touchstart",()=>{
      console.log("screen touched")
    })
     window.addEventListener("click",()=>{
      console.log("screen touched")
    })
     window.addEventListener("keydown",()=>{
      console.log("screen touched")
    })
    
  },[])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-warning">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" className="site-logo ms-0" />
          </Link>
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
                  <SearchBar item={1} />
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
              {/* login */}

              <Login/>
            </div>
          </div>
        </div>
      </nav>

      {/* secondnavbar */}
      <SecondNavBar />
    </>
  );
});
export { Navbar };
