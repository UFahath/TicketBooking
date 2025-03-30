import loading from "../assets/images/TheatreLoading.gif"

export const Loading = () => {
  return (
   <>
   <div className="container">
    <div className="row my-5">
      

   <div className="col text-center">
    
   <div className="spinner-grow text-danger">
       <span className="visually-hidden">loading...</span>
   </div>
   <div className="spinner-grow text-danger">
       <span className="visually-hidden">loading...</span>
   </div>
   <div className="spinner-grow text-danger">
       <span className="visually-hidden">loading...</span>
   </div>
   </div>
   </div>

    <div className="row">
       <div className="col text-center">
        <img src={loading} alt="movie loading" />
       </div>
      </div>

      <div className="row">
        <div className="col text-center">
        <p className="fs-2 text-danger fw-bold" >Movies on the Way</p>
        </div>
      </div>
      </div>
   </>
  )
}
