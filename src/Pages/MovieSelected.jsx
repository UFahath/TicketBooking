import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import popularityimage from "../assets/images/popularity.png";

const MovieSelected = () => {
  let jsonString = localStorage.getItem("MoviePicked:");
  let pickedItem = JSON.parse(jsonString);
  // console.log(pickedItem)
  let [color1, setColor1] = useState("☆");
  let [color2, setColor2] = useState("☆");
  let [color3, setColor3] = useState("☆");
  let [color4, setColor4] = useState("☆");

  // console.log(typeof pickedItem[0].vote_average)
  let rating=pickedItem[0].vote_average.toString();
   console.log(typeof rating)
  let [rateFlag, setRateFlag] = useState(0);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <h1 className="text-danger fw-bold my-4">
            {pickedItem[0].original_title}
          </h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${pickedItem[0].poster_path}`}
              className=" w-100 h-75 rounded-4 shadow-lg"
            />
          </div>
          <div className="col-md-8 border border-danger border-5 rounded-5 h-75 mb-5 p-5 shadow-normal">
            <h2 className="text-primary fw-bolder mb-4">Overview</h2>
            <p className="fs-4">{pickedItem[0].overview}</p>
            <div className="row bg-warning">
              <table className="table my-5 table-borderless">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="fs-4">
                      Title:
                    </th>
                    <td className="fs-4">{pickedItem[0].original_title}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="fs-4">
                      Language:
                    </th>
                    <td className="fs-4">{pickedItem[0].original_language}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="fs-4">
                      Release Date:
                    </th>
                    <td className="fs-4">{pickedItem[0].release_date}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="fs-4">
                      Rating:
                    </th>
                    <td className="fs-4">{rating.slice(0,rating.indexOf(".")+2)}/10</td>
                  </tr>
                  <tr>
                    <th scope="row" className="fs-4">
                      Rate Now:
                    </th>
                    <td className="fs-4">
                      <button
                        className="btn ps-0 fs-4 border border-0"
                        onClick={() => {
                          setColor1("★");
                          setRateFlag(rateFlag + 1);
                        }}
                      >
                        {color1}
                      </button>
                      <button
                        className="btn fs-4 border border-0"
                        onClick={
                          rateFlag === 1
                            ? () => {
                                setColor2("★");
                                setRateFlag(rateFlag + 1);
                              }
                            : undefined
                        }
                      >
                        {color2}
                      </button>
                      <button
                        className="btn fs-4 border border-0"
                        onClick={
                          rateFlag === 2
                            ? () => {
                                setColor3("★");
                                setRateFlag(rateFlag + 1);
                              }
                            : undefined
                        }
                      >
                        {color3}
                      </button>
                      <button
                        className="btn fs-4 border border-0"
                        onClick={
                          rateFlag === 3
                            ? () => {
                                setColor4("★");
                                setRateFlag(rateFlag + 1);
                              }
                            : undefined
                        }
                      >
                        {color4}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="fs-4">
                      Popularity:
                    </th>
                    <td className="fs-4">
                      {Math.floor(Number(pickedItem[0].popularity))}K
                      <span>
                        {" "}
                        <img
                          src={popularityimage}
                          className="mx-3"
                          style={{ height: "30px" }}
                          alt="popularity"
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row my-3">
              <div className="col-md-5"></div>
              <div className="col-md-2">
                <button className="btn btn-danger">Book Ticket</button>
              </div>
            </div>
            <div className="col-md-5"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

MovieSelected.propTypes = {};

export default MovieSelected;
