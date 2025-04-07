import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import qrImage from "../assets/images/qr-code.png"; 

export const QRPaymentPage = () => {
  let [timeLeft, setTimeLeft] = useState(300); 
  let [width,setWidth]=useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
      setWidth((prev)=>prev+4)
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <h4 className="mb-4">Please wait while your payment is processed</h4>
        
        <div className="progress mb-4" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-gradient"
            role="progressbar"
            style={{ width:width, backgroundColor: "blue" }}
            aria-valuenow={width}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <p className="fw-medium">Scan the QR code from one of the supported UPI apps.<br />Please pay before it times out!</p>
        <hr className="my-4" />

        <h5 className="mb-3">Remaining Time</h5>
        <div className="mb-4 text-primary fw-bold fs-4">
          ● {formatTime(timeLeft)}
        </div>

        <img src={qrImage} alt="QR Code" className="img-fluid" style={{ maxWidth: "220px" }} />

        <div className="mt-5">
          <button className="btn btn-outline-danger">Cancel</button>
        </div>
      </div>
      <Footer />
    </>
  );
};
