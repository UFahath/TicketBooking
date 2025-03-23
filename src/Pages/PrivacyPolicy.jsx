import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import {Heading} from '../styles/Styled'


const PrivacyPolicy = () => {
  return (
    <>
    <Navbar/>
    <div className="container">
        <Heading className="fw-bold mt-5">Privacy Policy</Heading>
        <div className="row">
          <div className="col">
            <h1 className="my-3 fw-bold">Introduction</h1>
            <p className="fs-4 ms-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolores alias voluptas aperiam consequatur sint accusamus explicabo vitae sequi architecto odio non vero ipsum itaque excepturi suscipit dolorum, neque sapiente!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet est maxime asperiores, tenetur illum ducimus facere, vitae aspernatur ipsa, odit ullam quod molestiae voluptatem praesentium minus? Atque eum totam optio.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="my-3">Personal Information:</h2>
            <p className="fs-4 ms-5">When you use our services, we may collect personal information such as your name, email address, phone number, payment details, and booking history.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="my-3">Non Personal Information:</h2>
            <p className="fs-4 ms-5">We may also collect non-personal information such as your IP address, browser type, and usage data t help us improve our services.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="my-3 fw-bold">How We Use Your Information</h2>
            <div className="fs-4 ms-5">
                        <p className="fw-bold">To Provide Services: </p>We use your information your bookings, payments,and to deliver the services you request.
            
                        <p className="fw-bold mt-4">To Improve Our Services:</p> We analyze your usage data to enhance and optimize our website, services, and customer experience.

                       <p className="fw-bold mt-4">To Communicate With You:</p>We may use your contact information to send you updates, promotions, and important information about your bookings.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col mb-4">
            <h2 className="my-3">Data Security</h2>
            <div className="fs-4 ms-5">
            We take the security of your data seriously and implement appropriate technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, or destruction. 

            <h2 className="my-4">Sharing Your Information </h2>
            <h3>Third-Party Service Providers:</h3>We may share your information with trusted third-party service providers who assist us in delivering our services, such as payment processors and travel partners. 

            <h3 className="my-4">Legal Requirements:</h3>We may disclose your information if required by law or in response to valid requests by public authorities. 
            <h3 className="my-4">Your Rights</h3>
            You have the right to access, update, or delete your personal information. You can do this by logging into your account or contacting us directly at <a href="#"> privacy@brand.com</a>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col">
            <h2 className="my-3">Changes to Privacy Policy</h2>
            <p className="fs-4 ms-5">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. Your continued use of our website. Your continued use of our services after any changes constitutes your acceptance of the new policy.
            </p>
          </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}



export default PrivacyPolicy