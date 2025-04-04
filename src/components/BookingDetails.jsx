import Footer from "./Footer"
import { Navbar } from "./Navbar"


const BookingDetails = () => {
  return (
    <>
    <Navbar/>
     <div className="container w-50 border shadow-lg rounded-4 p-5 my-5">
      <div className="row text-center">
        <div className="col fs-4 text-warning fw-bold">Booking Summary</div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-5">
            <table className="table">
              <tbody>
               <tr>
                <th>Dummy</th>
                <td>1</td>
               </tr>
               <tr>
                <th>Dummy2</th>
                <td>2</td>
               </tr>
               <tr>
                <th>SubTotal</th>
                <td>2</td>
               </tr>
              </tbody>
            </table>
            </div>
      </div>
      <div className="row text-center">
        <div className="col">
        <button className="btn btn-danger mx-auto">Proceed to Pay</button>
        </div>
      </div>
     </div>
    <Footer/>
    </>
  )
}



export default BookingDetails