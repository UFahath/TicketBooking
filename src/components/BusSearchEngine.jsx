// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

const BusSearchEngine = () => {
  return (
    <>
      <div className="container fs-4">
        <div className="row p-5">
          <div className="col">
            <form class="row g-3">
              <div class="col">
                <label for="from">From</label>
                <input type="text" className="form-control" name="" id="" />
              </div>
            </form>
          </div>
        </div>

        <div className="row p-5">
          <div className="col">
            <form class="row g-3">
              <div class="col">
                <label for="to">To</label>
                <input type="text" className="form-control" name="to" id="" />
              </div>
            </form>
          </div>
        </div>

        
        <div className="row p-4 border border-dark  text-center">
          <div className="col">
            <form class="row g-3 ms-3">
              <div class="col-auto">
                <label for="to">Date</label>
                <input type="date" className="form-control" name="to" id="" />
              </div>
            </form>
          </div>
          <div className="col my-md-auto my-3">
            <button className="btn btn-success w-50">search</button>
          </div>
        </div>

      </div>
    </>
  );
};

export default BusSearchEngine;