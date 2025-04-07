import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import image1 from "../assets/images/google-pay.png";
import image2 from "../assets/images/qr-code.png";
import image3 from "../assets/images/credit-card.png";
import image4 from "../assets/images/mobile-banking.png";
import image5 from "../assets/images/wallet.png";
import { useNavigate } from "react-router-dom";

export const MoviePaymentPage = () => {
  let details = [
    {
      heading: "Share Your Contact Details",
      types: ["email", "tel"],
      holderText: ["Enter Your Email Address", "+91"],
      buttonText: "Continue",
    },
    {
      heading: "Apply Promo Code (Optional)",
      types: ["text"],
      holderText: ["Apply Promo Code"],
      buttonText: "Check",
    },
  ];

  let paymentOptions = [
    "Pay by any UPI App",
    "Scan by QR Code",
    "Pay by Debit or Credit Card",
    "Net Banking",
    "Pay using Wallet",
  ];

  let [margin, setMargin] = useState("my-5");
  let [mail, setMail] = useState("");
  let [phno, setPhno] = useState("");
  let [promoCode, setPromoCode] = useState("");
  let [selectedPayment, setPayment] = useState("");
  let navigate=useNavigate();

  useEffect(() => {
    const updateMargin = () => {
      if (window.innerWidth <= 768) {
        setMargin("my-3");
      } else {
        setMargin("my-5");
      }
    };
    updateMargin();
    window.addEventListener("resize", updateMargin);
    return () => window.removeEventListener("resize", updateMargin);
  }, []);

  function validate(event) {
    event.preventDefault();
    if (!mail || !phno || !selectedPayment) {
      alert("Please fill in all required fields.");
      return;
    }
    else{
      // alert(`Email: ${mail}\nPhone: ${phno}\nPayment Method: ${paymentOptions[selectedPayment]}\nPromo: ${promoCode || "N/A"}`);
      navigate("/qr-payment");
    }
   
  }

  return (
    <>
      <Navbar />
      <form onSubmit={validate}>
        <Details
          details={details[0]}
          margin={margin}
          setMail={setMail}
          setPhno={setPhno}
          mail={mail}
          phno={phno}
        />
        <Details
          details={details[1]}
          margin={margin}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
        />
        <PaymentDetails
          paymentOptions={paymentOptions}
          margin={margin}
          setPayment={setPayment}
        />
      </form>
      <Footer />
    </>
  );
};

const Details = ({ details, margin, setMail, setPhno, mail, phno, promoCode, setPromoCode }) => {
  let { heading, holderText, buttonText, types } = details;
  let inputs = useRef();
  let inputs1 = useRef();

  useEffect(() => {
    if (inputs.current && inputs1.current) {
      inputs.current.setAttribute("required", "");
      inputs1.current.setAttribute("required", "");
    }
  }, []);

  const isContactDetails = heading === "Share Your Contact Details";

  return (
    <div className="container shadow">
      <div className="row bg-danger text-white fs-3 fw-bold p-3 rounded-top-4 mt-3">
        <p className="my-auto">{heading}</p>
      </div>

      <div className="row border mb-5">
        <div className={`col-md-4 ${margin}`}>
          <input
            ref={inputs}
            value={isContactDetails ? mail : promoCode}
            type={types[0]}
            name={types[0]}
            id={types[0]}
            onChange={(e) => {
              isContactDetails ? setMail(e.target.value) : setPromoCode(e.target.value);
            }}
            className="form-control fs-4"
            placeholder={holderText[0]}
            required={isContactDetails}
          />
        </div>

        {isContactDetails && (
          <div className={`col-md-4 ${margin}`}>
            <input
              ref={inputs1}
              type={types[1]}
              name={types[1]}
              id={types[1]}
              value={phno}
              onChange={(e) => setPhno(e.target.value)}
              className="form-control fs-4"
              placeholder={holderText[1]}
              pattern="[0-9]{10}"
              required
            />
          </div>
        )}

        <div className={`col-md-2 ${margin} text-center`}>
          <button type="button" className="btn btn-primary fs-4">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentDetails = ({ paymentOptions, margin, setPayment }) => {
  const images = [image1, image2, image3, image4, image5];

  return (
    <div className="container shadow">
      <div className="row bg-danger text-white fs-3 fw-bold p-3 rounded-top-4 mt-3">
        <p className="my-auto">Payment Options</p>
      </div>

      <div className="row border mb-3">
        <div className={`col-md-4 ${margin}`}>
          {paymentOptions.map((item, index) => (
            <div className="form-check fs-4 my-4" key={index}>
              <input
                className="form-check-input"
                type="radio"
                value={index}
                onClick={(e) => setPayment(e.target.value)}
                name="flexRadioDefault"
                id={`payment-${index}`}
              />
              <label className="form-check-label" htmlFor={`payment-${index}`}>
                <img src={images[index]} alt="payment" className="me-2" style={{ maxWidth: "40px" }} />
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="row d-flex justify-content-center mb-5">
        <button className="btn btn-primary w-25" type="submit">
          Continue
        </button>
      </div>
    </div>
  );
};
