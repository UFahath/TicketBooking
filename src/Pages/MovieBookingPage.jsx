import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useState,useEffect, useRef } from "react";

export const MovieBookingPage = () => {
  const [space, setSpace] = useState(null);
  const selectedTheater = useRef();

  const seatsName = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18", "E19"],
  ];

  useEffect(() => {
    const storedSlot = JSON.parse(localStorage.getItem("PickedSlot:"));
    // setSlot(storedSlot);

    if (selectedTheater.current && storedSlot) {
      selectedTheater.current.innerHTML = storedSlot;
      let buttons = selectedTheater.current.querySelectorAll("button");
      buttons.forEach((item) => {
        if (!item.className.includes("btn-danger")) {
          item.setAttribute("disabled", "");
        }
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div ref={selectedTheater} className="container my-4"></div>

      <div className="container-fluid shadow-lg">
        <div className="row text-danger my-4 fw-bold w-100">
          <p className="m-3">Rs.190 CLUB</p>
          <div className="col">
            <table className="table w-100">
              <tbody>
                {/* Seat column numbers */}
                <tr className="text-center">
                  <td></td>
                  {Array.from({ length: 19 }, (_, i) => (
                    i===4||i==5||i===16||i===17?
                  (<td key={i}>&nbsp;</td>):(
                    <td key={i}>{i + 1}</td>)
                  ))}
                </tr>

                {/* Seat Rows */}
                {seatsName.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td><div>{String.fromCharCode(65 + rowIndex)}</div></td>
                    {row.map((seat, colIndex) => (
                      colIndex===4||colIndex===5||colIndex===16||colIndex===17?
                      (<td key={colIndex}>&nbsp;</td>):(
                      <td key={colIndex}>
                        <button className="btn btn-outline-danger">{seat}</button>
                      </td>)
                    ))
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
