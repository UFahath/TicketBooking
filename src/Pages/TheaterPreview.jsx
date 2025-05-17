import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { TheaterShow } from "../components/TheaterShow";
import { languageMapper, genreMapper } from "../data/MoviePage";

export let language=0
export const TheaterPreview = () => {
  let jsonString = localStorage.getItem("MoviePicked:");
  let pickedItem = JSON.parse(jsonString);
  let genres = genreMapper(0, pickedItem[0].genre_ids);
  language=languageMapper(0, pickedItem[0].original_language)



  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {/* Movie Title & Language */}
        <h1 className="text-center fw-bold">
          <span className="me-3">{pickedItem[0].original_title}</span> - 
          <span className="ms-3 text-secondary">({languageMapper(0, pickedItem[0].original_language)})</span>
        </h1>

        {/* Age Rating & Genres */}
        <div className="text-center mt-3">
          <span className="badge bg-danger fs-5 px-3 py-2">
            {pickedItem[0].adult === false ? "U/A" : "A"}
          </span>
          {genres.map((item, index) => (
            <span key={index} className="badge bg-warning text-dark mx-2 fs-6 px-3 py-2">
              {item}
            </span>
          ))}
        </div>

        {/* Date Carousel Section */}
        {/* <div className="container mt-5 ">
          <h3 className="text-center text-primary mb-3">Pick a Date</h3>
          <div className="d-flex justify-content-center p-3 bg-light rounded-4 shadow">
         
          </div>
        </div> */}
        <div className="container">
        <TheaterShow/>
        </div>
      </div>
      <Footer />
    </>
  )
}
