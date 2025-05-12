import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "../assets/images/Sitelogo.jpg";
import { CircleChevronDown, CircleUserRound, User } from "lucide-react";
import { SecondNavBar } from "../components/SecondNavBar";
import "../styles/Home.css";
import { SearchBar } from "./SearchBar";
import { Link } from "react-router-dom";
import googlepng from '../assets/images/google.png'
import React, { useEffect, useRef, useState } from "react";
import * as bootstrap from 'bootstrap'
import { app,provider } from "../../firebase.config";
import { getAuth,signInWithPopup } from "firebase/auth";
const Login = ({modalRef,id,closeModal,isLogin,setIsLogin,setEventFlagger}) => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
 const handleGoogleSignIn = async () => {
  const auth = getAuth(app);
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("google:",JSON.stringify(user))

    localStorage.setItem("isLogin:", JSON.stringify(true));
    setIsLogin(true);
    setEventFlagger(false);
    closeModal();
  } catch (error) {
    setError("Google Sign-In failed. Try again.");
    console.error("Google Sign-In Error:", error);
  }
};

 let handleSubmit = () => {
  setError(""); // Clear previous errors

  if (!email || !password) {
    setError("Both fields are required.");
    return;
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Please enter a valid email.");
    return;
  }

  const stored = JSON.parse(localStorage.getItem("emailandpassword:"));

  if (!stored || email !== stored.email || password !== stored.password) {
    setError("Invalid email or password.");
    return;
  }

  setIsLogin(true);
  setEventFlagger(false);
  closeModal();
};

  return (
    <>
 
    <button
                type="button"
                className="btn btn-outline-dark mb-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                disabled={isLogin&&true}
              >
                {!isLogin?(
                  <>
                <User className="me-2" />
                <span>Login</span>
                </>):(
                  <>
                  <CircleUserRound/> User
                  </>
                )}
              </button>
      <div
        className="modal fade"
        id={id}
        ref={modalRef}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
       
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 mx-auto fw-semibold" id="staticBackdropLabel">
               Login
              </h1>
             
            </div>
            <form action="" onSubmit={(e)=>e.preventDefault()} className="w-100" style={{margin:"10px auto"}}>
            <div className="modal-body w-75 mx-auto">
            
              <label htmlFor="email" className="form-label mb-3 text-primary">Enter Email Or Mobile Number</label>
              <input type="email" value={email} className="form-control mb-3" onChange={(e)=>setEmail(e.target.value)} id="email" name="email" placeholder="Email Or Mobile"/>
              <label htmlFor="pwd" className="form-label mb-3 text-primary" style={{margin:"10px auto"}}>Enter your Password</label>
              <input type="password" value={password} className="form-control mb-3" onChange={(e)=>setPassword(e.target.value)} id="pwd" name="pwd" placeholder="Password"/>
                
{error && (
  <p className="text-danger text-center mb-3">
    {error}
  </p>
)}


            </div>
            <div className="modal-footer">
              <div className="container">
                <div className="row text-center">
                  <div className="col-3"></div>
                  <div className="col-6">
              <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100">Login</button>
              </div>
              
              <div className="col-3"></div>
              </div>
              
              <p className="text-center my-3"> Or Continue With</p>

               <div className="row text-center">
                  <div className="col-3"></div>
                  <div className="col-6">
              <button className="btn btn-outline-dark w-100" type="button" onClick={handleGoogleSignIn}>
                <img src={googlepng} alt="googlelogo" style={{width:"20px"}} />&nbsp;
                Sign In With Google</button>
              </div>
              <div className="col-3"></div>
              </div>
              <div className="row my-4 text-center">
                <p><span className="text-danger">Email:&nbsp;</span>dummy@gmail.com</p>
                <p><span className="text-primary">Password:&nbsp;</span>12345</p>
              </div>
              <div className="row my-2">
                <span><CircleChevronDown/>&nbsp;Need Help?</span>
              </div>
              </div>
            </div>
            </form>
          </div>
          
        </div>
      </div>
    </>
  );
};

const Navbar = React.memo(() => {
  const [id]=useState("staticBackdrop");

  let initialLoginState=()=>{
    try{
        const stored=localStorage.getItem("isLogin:");
        return stored?JSON.parse(stored):false;
    }
    catch(e)
    {
      console.log("error",e)
      return false;
    }
  }
  let initialEventFlagger=()=>{
    try{
      const stored=localStorage.getItem("eventFlagger:");
      return stored?JSON.parse(stored):true;
    }
    catch(e)
    {
      console.log("error",e)
    }
  }
   const [isLogin,setIsLogin]=useState(initialLoginState);
  const modalRef=useRef(null);
  const [eventFlagger,setEventFlagger]=useState(initialEventFlagger);
  useEffect(()=>{
        localStorage.setItem("emailandpassword:",JSON.stringify({email:"dummy@gmail.com",password:"12345"}))
  },[])

  useEffect(()=>{
      localStorage.setItem("isLogin:",JSON.stringify(isLogin))
  },[isLogin])
  useEffect(()=>{
    localStorage.setItem("eventFlagger:",JSON.stringify(eventFlagger))
  },[eventFlagger])
  useEffect(()=>{
   if(!modalRef.current || !eventFlagger) return;
  const modal=new bootstrap.Modal(modalRef.current)
   
  const modalShow=()=>{
      console.log("screen touched")
       modal.show();
  }
  if(eventFlagger)
  {
     window.addEventListener("click",modalShow)
  }
    return ()=>{
         window.removeEventListener("click",modalShow);
         console.log("event removed")
    }
    
  
  },[eventFlagger])

  const closeModal=()=>{
    const activeElement=document.activeElement;
    if(modalRef.current?.contains(activeElement))
    {
      activeElement.blur();
    }
    const modal=bootstrap.Modal.getInstance(modalRef.current);
    setEventFlagger(false)
   
    console.log("close end")
    return modal?.hide();
  }



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

              <Login modalRef={modalRef} id={id} closeModal={closeModal} isLogin={isLogin} setIsLogin={setIsLogin} setEventFlagger={setEventFlagger}/>
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
