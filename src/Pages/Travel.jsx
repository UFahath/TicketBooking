import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { BannerDiv } from "../styles/Styled"
import travel from "../assets/images/Travel.jpg"

const Travel = () => {
  return (
    <>
    <Navbar/>
    <BannerDiv style={{ paddingTop: '20%',backgroundImage:`url(${travel})` }}>
      
      
    </BannerDiv>
    <Footer/>
    </>
  )
}



export default Travel