import {useState,useEffect, useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as bootstrap from 'bootstrap'
export const TravellersClass = ({setDropdown}) => {
  let [adults, setAdults] = useState(0);
  let [children, setChildren] = useState(0);
  let [infants, setInfants] = useState(0);
  let[result,setResult]=useState(0)
 let[classSelected,setClassSelected]=useState("");
  let dropdownRef=useRef(null)
  useEffect(()=>{
    setResult({adults,children,infants,classSelected})
    if((adults||children||infants)&&classSelected)
    {
      console.log("why")
      setDropdown(true)
      console.log("iam not working")
    }
  },[adults,children,infants,classSelected,setDropdown])

  useEffect(()=>{
   localStorage.setItem("passengercount:",JSON.stringify(result))
  },[result]);

 
  const increaseAdults = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (adults < 9) 
      {
        setAdults(adults + 1);
      }
  };

  const decreaseAdults = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (adults > 0) setAdults(adults - 1);
  };

  const increaseChildren = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (children < 9) 
      {
        setChildren(children + 1);
      }
  }

  const decreaseChildren = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (children > 0)
      {
        setChildren(children - 1);
      }
  };

  const increaseInfants = (event) => {
  //   let buttonParent=event.target.parentNode;
  //   let mainParent=buttonParent.closest("li");
  //   let targetText=mainParent.querySelector("Strong").textContent
  //  console.log(targetText)
    event.preventDefault();
    event.stopPropagation();
    if (infants < 9) 
      {
        setInfants(infants + 1);
      }
  };

  const decreaseInfants = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (infants > 0) 
    {
      setInfants(infants - 1);
    }
  };



  let ages=[
    { person:"Adult",
      age:"+12 Years",
      increase:increaseAdults,
      decrease:decreaseAdults,
      stage:adults,
      },
    { person:"Children",
      age:"2-12 Years",
      increase:increaseChildren,
      decrease:decreaseChildren,
      stage:children,
    },
    { person:"Infants",
      age:"<2 Years",
      increase:increaseInfants,
      decrease:decreaseInfants,
      stage:infants,
    },
]

let ecoclass=[
  "Economy",
  "Premium Economy",
  "First Class",
  "Business",
  ]

  function handleClass(event)
  {
    event.preventDefault();
    event.stopPropagation();
    let classSelected=event.target.textContent;
    // console.log(classSelected)
    if(classSelected)
    {
      let parent=event.target.closest(".row")
      let buttons=parent.querySelectorAll("button");
     buttons.forEach((btn)=>{
       if(classSelected!==btn.textContent)
       {
         btn.setAttribute("disabled","");
       }
      })
     
    }
    setClassSelected(classSelected)
  }

  return (
    <>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button"  
          ref={dropdownRef} id="passenger"
            onClick={()=>{
                  if (dropdownRef.current) {
             const dropdown=new bootstrap.Dropdown(dropdownRef.current);
              dropdown.toggle();
            }
            }}
            aria-expanded="false">
          Select Passengers
        </button>
        <ul className="dropdown-menu" aria-labelledby="passenger">
          {
            ages.map((items,index)=>(
          <li className="ms-2 mb-2 text-center"  key={index}>
            <strong>{items.person}</strong>
            <p>{items.age}</p>
            <div className="border border-dark rounded-3 mx-auto" style={{width:"fit-content"}}>
            <button className=" btn " onClick={items.increase}>
              +
            </button>
            <span className="mx-3">{items.stage}</span>
            <button className=" btn" onClick={items.decrease}>
              -
            </button>
            </div>
          </li>
          ))
         }
         
          <li className="ms-3 mb-2 me-3 text-center" style={{width:"320px"}}>
            <strong>Travel Class</strong>
            <br/>
            <div className="row row-cols-2 gy-2">
              {
                ecoclass.map((item,index)=>(
              <div className="col" key={index}>
            <button className="btn btn-primary" onClick={handleClass}>{item}</button>
            </div>
                ))
              }
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};


