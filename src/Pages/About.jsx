import { Navbar } from "../components/Navbar"

import Footer from "../components/Footer"

import {Heading} from '../styles/Styled'


const About = () => {
  return (
   <>
   <Navbar/>
   <div className="container">
   <Heading className="fw-bold mt-5">About Us</Heading>
   <div className="row fs-3">
      <div className="col">
      <h1 className="my-3">Welcome to us</h1>
      <p className="fs-4 ms-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, delectus fuga. Alias, dolor officia sint vitae vero accusantium libero nam architecto quos, quod illum placeat, inventore assumenda esse eveniet veritatis.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat eaque quaerat soluta optio repellat at veritatis. Sed illo eos hic doloremque sint dolor, aliquid tempora! Sint fugit nam sapiente sed.
      </p>
      </div>
    </div>



    <div className="row fs-3">

    <div className="col">
      <h1 className="my-3">Our Mission</h1>
      <p className="fs-4 ms-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, delectus fuga. Alias, dolor officia sint vitae vero accusantium libero nam architecto quos, quod illum placeat, inventore assumenda esse eveniet veritatis.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat eaque quaerat soluta optio repellat at veritatis. Sed illo eos hic doloremque sint dolor, aliquid tempora! Sint fugit nam sapiente sed.
      </p>
      </div> 
    </div>



    <div className="row fs-3">
    <div className="col">
      <h1 className="my-3">Our Story</h1>
      <p className="fs-4 ms-5 mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, delectus fuga. Alias, dolor officia sint vitae vero accusantium libero nam architecto quos, quod illum placeat, inventore assumenda esse eveniet veritatis.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat eaque quaerat soluta optio repellat at veritatis. Sed illo eos hic doloremque sint dolor, aliquid tempora! Sint fugit nam sapiente sed.
      </p>
      </div>
    </div>

   </div>
   <Footer/>
   </>
  )
}

About.propTypes = {}

export default About