import{c as n,r,v as x,j as e,N as j,h as u,R as N,F as b}from"./index-DmrBCa5m.js";/**
 * @license lucide-react v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}]],v=n("Book",y);/**
 * @license lucide-react v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M8 2h8",key:"1ssgc1"}],["path",{d:"M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",key:"qtp12x"}],["path",{d:"M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0",key:"ygeh44"}]],S=n("Milk",f);/**
 * @license lucide-react v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]],w=n("Phone",k);/**
 * @license lucide-react v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",key:"goz73y"}],["path",{d:"m2 22 3-3",key:"19mgm9"}],["path",{d:"M7.5 13.5 10 11",key:"7xgeeb"}],["path",{d:"M10.5 16.5 13 14",key:"10btkg"}],["path",{d:"m18 3-4 4h6l-4 4",key:"16psg9"}]],M=n("PlugZap",I);/**
 * @license lucide-react v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]],D=n("Wifi",O),B=()=>{var m;const[c]=r.useState(()=>{let s=x().substring(0,x().indexOf("-")).toUpperCase(),a=sessionStorage.getItem("Id:");return a?JSON.parse(a):s}),[t]=r.useState(()=>{const s=sessionStorage.getItem("resultdata:");return s?JSON.parse(s)[0]:[]}),[l]=r.useState(()=>{const s=sessionStorage.getItem("boardingDroppingProps");return s?JSON.parse(s):{}}),[h]=r.useState(()=>{const s=sessionStorage.getItem("selectedBoarding");return s?JSON.parse(s):{}}),[p]=r.useState(()=>{const s=sessionStorage.getItem("selectedDropping");return s?JSON.parse(s):{}}),[o]=r.useState(()=>{const s=sessionStorage.getItem("traveller");return s?JSON.parse(s):{}}),[d]=r.useState(()=>{const s=sessionStorage.getItem("seats:");return s?JSON.parse(s):[]}),i=[D,S,v,M];return r.useEffect(()=>(sessionStorage.setItem("Id:",JSON.stringify(c)),()=>{sessionStorage.removeItem("Id:")}),[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{jsx:"true",children:`
  .OuterBox {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    margin-bottom: 30px;
  }

  @media (max-width: 568px) {
    .OuterBox {
      width: 95%;
    }
    .innerContainer {
      margin-left: 0;
    }
  }
`}),e.jsx(j,{}),e.jsxs("div",{className:"OuterBox",children:[e.jsxs("div",{className:"row justify-content-between align-items-center border border-dark p-3 mb-4 rounded-4 bg-info",children:[e.jsxs("div",{className:"col-12 col-md-auto text-center text-md-start",children:[e.jsx("span",{className:"fs-4 fw-bold text-warning me-2",children:"Booking ID:"}),e.jsx("span",{className:"fs-4 text-white",children:c})]}),e.jsx("div",{className:"col-12 col-md-auto text-center my-2 my-md-0",children:e.jsx("button",{className:"btn btn-danger",children:"Download Invoice"})})]}),e.jsxs("div",{className:"row border border-dark p-3 mb-4 rounded-4",children:[e.jsx("div",{className:"col-12 col-sm-6",children:e.jsx("p",{className:"fs-5 fw-semibold text-primary mb-1",children:t.operator})}),e.jsx("div",{className:"col-12 col-sm-6",children:e.jsx("p",{className:"fs-6 text-secondary mb-1",children:t.busType})}),e.jsx("hr",{}),e.jsx("div",{className:"innerContainer",children:e.jsx(u,{result:t,travelDay:l.travelDay,nextDay:l.nextDay,selectedBoarding:h,selectedDropping:p})}),e.jsx("hr",{}),e.jsxs("div",{className:"row mt-3",children:[e.jsxs("div",{className:"col",children:[e.jsx("p",{className:"fw-semibold text-capitalize",children:o.name}),e.jsx("p",{className:"text-secondary",children:`${o.gender}, ${o.age} yr`})]}),e.jsxs("div",{className:"col",children:[e.jsxs("p",{className:"fw-semibold",children:["Seat No:",e.jsx("span",{className:"text-success ms-2",children:d&&d.length>0&&d.map((s,a,g)=>a!==g.length-1?s+", ":s)})]}),e.jsx("p",{className:"text-secondary",children:((m=t.busType)==null?void 0:m.substring(t.busType.indexOf(" ")))||""})]})]})]}),e.jsx("div",{className:"text-center my-4",children:e.jsxs("button",{className:"btn btn-outline-danger d-flex align-items-center mx-auto",children:[e.jsx(w,{className:"me-2"}),e.jsx("a",{className:"nav-link d-inline p-0",href:"tel:1234567890",children:"+91 7234567890"})]})}),e.jsxs("div",{className:"row border border-dark p-3 my-5 rounded-top-4",children:[e.jsx("h4",{className:"text-center mb-3 fs-3 fw-bold text-primary",children:"Amenities"}),e.jsx("div",{className:"row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 text-center",children:t&&Array.isArray(t.amenities)&&t.amenities.map((s,a)=>e.jsxs("div",{className:"col border border-secondary p-2 rounded-start rounded-end",style:{boxShadow:"10px 2px 10px black"},children:[e.jsx("span",{className:"fw-semibold",children:s}),e.jsx("br",{}),e.jsx("span",{className:"text-muted",children:i[a]&&N.createElement(i[a])})]},a))})]}),e.jsx("div",{className:"row text-center my-4",children:e.jsx("div",{className:"table-responsive col-12 col-sm-8 mx-auto",children:e.jsxs("table",{className:"table table-bordered",children:[e.jsx("thead",{className:"table-primary",children:e.jsx("tr",{children:e.jsx("th",{colSpan:2,children:"Total Amount"})})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Paid Online"}),e.jsxs("td",{children:["$",t.fare]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"UPI"}),e.jsx("td",{children:"$0"})]})]})]})})})]}),e.jsx(b,{})]})};export{B as BusPaymentSuccess,B as default};
