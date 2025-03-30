
import failed from '../assets/images/404notfound.png'
export const FailedResponse = () => {
  return (
<>
 <div className="container">
      <div className="row">
        <div className="col text-center">
           <img src={failed} alt="error" className='w-100' />
          <p className="fs-4 fw-bold my-5 text-danger">Connection Establishment Failed</p>
        </div>
      </div>
    </div>
</>
  )
}
