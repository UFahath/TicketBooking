import Footer from "../components/Footer";
import MovieCarousel from "../components/MovieCarousel";
import MovieTicketCarousel from "../components/MovieTicketCarousel";
// import MovieCarousel from "../components/MovieCarousel"
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Heading } from "../styles/Styled";
import { MoveRight } from "lucide-react";

const Movies = () => {
  // datas

  let benefits = [
    {
      point: "Convenience Guaranteed",
      desc: "Book tickets from the comfort of your own home, 24/7, and avoid long queues",
    },
    {
      point: "Wide Selection of Movies",
      desc: "Choose from a vast selection of movies,including the latest release and classic films",
    },
    {
      point: "Secure and Easy Payment",
      desc: "Enjoy a secure and hassle-free payment process with multiple payment options",
    },
    {
      point: "Competitive Prices",
      desc: "Get the best value for your money with our competitive pricing and exclusive discounts",
    },
    {
      point: "Real-Time Seat Selection",
      desc: "Select your seats in real-time and get a clear view of the theter layout",
    },
    {
      point: "Quick Refunds and Cancellations",
      desc: "Enjoy hassle-free refunds and cancellations with our flexible policies.",
    },
    {
      point: "Dedicated Customer Support",
      desc: "Our responsive customer team is available to assist your 24/7.",
    },
    {
      point: "Exclusive Offers and Discounts",
      desc: "Get access to special promotions, loyalty rewards, and discounts only available on our website",
    },
    {
      point: "User-Friendly Interface",
      desc: "enjoy a seamless and intuitive booking experience with our user-friendly interface",
    },
    {
      point: "Rewarding Loyalty Program",
      desc: "Earn Points and rewards for every booking, and redeem them for exciting offers and discounts",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <MovieTicketCarousel />
        </div>
      </div>

      <div className=" p-3 d-flex justify-content-between mt-5">
        <Heading className="fs-1 fw-bold  rounded-3">Recommeded Movies</Heading>

        <Link to="/moviepage" className="fs-3 nav-link">
          View All <MoveRight className="ms-1" />{" "}
        </Link>
      </div>

      <MovieCarousel />

    

      <div className="container">
      <Heading className="fs-1 fw-bold  rounded-3 my-5 ms-3">
        Benefits of Choosing us For Online Ticket Booking
      </Heading>
        <div className="row mb-5">
          <div className="col">
           <ol type="1">
            {
              benefits.map((item,index)=>(
                <li key={index} className="fs-3">
                  <p >{item.point}</p>
                  <p className="fs-4">{item.desc}</p>
                  </li>
              ))
            }
           </ol>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

Movies.propTypes = {};

export default Movies;
