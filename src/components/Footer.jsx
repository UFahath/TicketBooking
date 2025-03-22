import sitelogo from '../assets/images/Sitelogo.jpg'
import {SocialIcon} from 'react-social-icons'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <>
    <div className="container-fluid" style={{background:"#DAD0F1"}}>
      <div className="row">
        <div className="col-md-3 p-3 fs-4 fw-normal ms-2 mt-4 text-center"> 
          <Link to="/">
           <img src={sitelogo} className="site-logo mb-3" alt="" />
        </Link>
          <div className="row ">
          <Link to="/aboutus" className="nav-link">About Us</Link>
          </div>
          <div className="row">
          <a href="" className="nav-link">Contact Us</a>
          </div>
          <div className="row">
          <a href="" className="nav-link">Privacy Policy</a>
          </div>
          <div className="row">
          <a href="" className="nav-link">FAQ</a>
          </div>
          <div className="row">
          <a href="" className="nav-link">T&C</a>
          </div>
        </div>
       

        <div className="col-md-5 fs-4 fw-normal p-5 mt-5 border border-dark rounded-top-5 bg-warning bg-gradient text-center"> 
          <div className="row ">
          <a href="" className="nav-link">Movie Ticket Booking
          </a>
          </div>
          <div className="row">
          <a href="" className="nav-link">Flight Ticket Booking</a>
          </div>
          <div className="row">
          <a href="" className="nav-link">Bus Ticket Booking</a>
          </div>
          <div className="row">
          <a href="" className="nav-link">Reach Us On</a>
          </div>
          <div className="row mt-4">
            <div className="col my-2">
            <SocialIcon url="https://twitter.com" />
            </div>
            <div className="col my-2">
            <SocialIcon url="https://instagram.com" />
            </div>
            <div className="col my-2">
            <SocialIcon url="https://facebook.com" />
            </div>
            <div className="col my-2">
            <SocialIcon url="https://telegram.com" />
            </div>
            <div className="col my-2">
            <SocialIcon url="https://whatsapp.com" />
            </div>
            <div className="col my-2">
            <SocialIcon url="https://linkedin.com" />
            </div>
            <div className="col my-2">
            <SocialIcon url="https://youtube.com" />
            </div>
          </div>
        </div>


        <div className="col-md p-3 fs-4 fw-normal ms-5 mt-5"> 
        
         
          <p>Bright Star Conference Center</p>
       
          <p>123,Innovation Avenue</p>
          
         
          <p>Tech Park District,</p>
         
         
          <p>Patna,</p>
         
         
          <p>Bihar 800001,</p>
          
        </div>
      </div>
    </div>
    </>
  )
}



export default Footer