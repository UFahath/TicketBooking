import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { Scanner } from '@yudiel/react-qr-scanner';
// import qrImage from "../assets/images/qr-code.png"; 
import QRCode from "react-qr-code";
export const QRPaymentPage = () => {
  let [timeLeft, setTimeLeft] = useState(300); 
  let [totalTime]=useState(300);
  let [randomQr,setRandomQr]=useState(Math.random());
  let [qrId,setqrId]=useState("");
  // console.log(randomQr)
  // let[paymentDone,setDone]=useState(false);
  // console.log("totaltime",totalTime)
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
       setRandomQr(String(randomQr))

    }, 1000);


// async function scan(){
//     const url = 'http(s)://api.qrserver.com/v1/read-qr-code/?fileurl=[URL-encoded-webaddress-url-to-qrcode-image-file]';
// const options = {
// 	method: 'POST',
// 	// headers: {
// 	// 	'x-rapidapi-key': 'ec069a1f2fmsh5a7063c9766da06p121b3bjsncdae84a68e63',
// 	// 	'x-rapidapi-host': 'qr-code-and-barcode-manager.p.rapidapi.com',
// 	// 	'Content-Type': 'application/x-www-form-urlencoded'
// 	// },
// 	// body: new URLSearchParams({})
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
// }
// scan();

    return () => clearInterval(timer);
  }, []);

  useEffect(()=>{
    let loadingTime=((totalTime - timeLeft ) / totalTime) * 100
    setWidth(loadingTime);
  },[timeLeft,totalTime])

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  function checkQr(){
    if(qrId)
    {
      console.log(qrId)
    }
    else
    {
      console.log("no id present")
    }
  }

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <h4 className="mb-4">Please wait while your payment is processed</h4>
        
        <div className="progress mb-4" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-gradient"
            role="progressbar"
            style={{ width:`${width}%`, backgroundColor: "blue" }}
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

        {/* <img src={qrImage} alt="QR Code" className="img-fluid" style={{ maxWidth: "220px" }} /> */}
       
        {/* <Scanner onScan={(result) => console.log(result)} >;    */}
    <QRCode className="mb-5"
    size={256}
    style={{ maxWidth: "100%" }}
    value={randomQr}
    viewBox={`0 0 256 256`}/>
      {/* </Scanner> */}
      <div className="text-center">
        <button className="btn btn-outline-danger w-50 mb-5" onClick={checkQr}>Confirm</button>
      </div>
       </div>

    

      <Footer />
    </>
  );
};

const Success=()=>{
  return(
    <>

    </>
  )
}
