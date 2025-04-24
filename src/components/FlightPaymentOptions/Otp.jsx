import Footer from "../Footer"
import { Navbar } from "../Navbar"


export const Otp = () => {
  return (
    <>
    <Navbar/>
    <div className="container border border-dark text-center fs-5 p-3">
      <p>Enter 6 digit <span className="text-primary">OTP</span> Received on your Mobile Number</p>
      <input type="text" pattern="[0-9]{4}" className="form-control w-25 mx-auto my-5"/>
      <button className="btn btn-danger">Proceed To Pay</button>
    </div>
    <Footer/>
    </>
  )
}
